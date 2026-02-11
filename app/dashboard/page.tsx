'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const router = useRouter()
  const [userEmail, setUserEmail] = useState('')

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('isAuthenticated')
    const email = sessionStorage.getItem('userEmail')

    if (!isAuthenticated) {
      router.push('/login')
    } else {
      setUserEmail(email || '')
    }
  }, [router])

  const handleLogout = () => {
    sessionStorage.removeItem('isAuthenticated')
    sessionStorage.removeItem('userEmail')
    router.push('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex">
              <div className="flex shrink-0 items-center">
                <h1 className="text-xl font-bold text-gray-900">FW ERP</h1>
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-gray-700 mr-4">{userEmail}</span>
              <button
                onClick={handleLogout}
                className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              Dashboard
            </h2>
            <p className="mt-2 text-sm text-gray-700">
              Welcome to your enhanced ERP solution
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
              <dt className="truncate text-sm font-medium text-gray-500">Total Orders</dt>
              <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">0</dd>
            </div>
            <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
              <dt className="truncate text-sm font-medium text-gray-500">Active Projects</dt>
              <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">0</dd>
            </div>
            <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
              <dt className="truncate text-sm font-medium text-gray-500">Pending Tasks</dt>
              <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">0</dd>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

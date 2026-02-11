'use client'

import { useEffect, useState, useMemo } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  TransitionChild,
} from '@headlessui/react'
import {
  Bars3Icon,
  BellIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  ArrowRightStartOnRectangleIcon,
} from '@heroicons/react/24/outline'
import { ChevronRightIcon } from '@heroicons/react/20/solid'
import { navigation, bottomNav, type NavItem } from '@/lib/navigation'
import { classNames, getInitials } from '@/lib/utils'
import { AppShellContext } from '@/lib/app-shell-context'

// ── Expanded sidebar nav with labels and disclosure ──
function SidebarNavExpanded({ items }: { items: NavItem[] }) {
  return (
    <ul role="list" className="-mx-2 space-y-1">
      {items.map((item) => (
        <li key={item.name}>
          {!item.children ? (
            <a
              href={item.href}
              className={classNames(
                item.current
                  ? 'bg-gray-50 text-primary-500'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-primary-500',
                'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
              )}
            >
              <item.icon
                aria-hidden="true"
                className={classNames(
                  item.current ? 'text-primary-500' : 'text-gray-400 group-hover:text-primary-500',
                  'size-6 shrink-0',
                )}
              />
              {item.name}
            </a>
          ) : (
            <Disclosure as="div" defaultOpen={item.current}>
              <DisclosureButton
                className={classNames(
                  item.current ? 'bg-gray-50 text-primary-500' : 'text-gray-700 hover:bg-gray-50 hover:text-primary-500',
                  'group flex w-full items-center gap-x-3 rounded-md p-2 text-left text-sm/6 font-semibold',
                )}
              >
                <item.icon
                  aria-hidden="true"
                  className={classNames(
                    item.current ? 'text-primary-500' : 'text-gray-400 group-hover:text-primary-500',
                    'size-6 shrink-0',
                  )}
                />
                {item.name}
                <ChevronRightIcon
                  aria-hidden="true"
                  className="ml-auto size-5 shrink-0 text-gray-400 group-data-[open]:rotate-90 group-data-[open]:text-gray-500"
                />
              </DisclosureButton>
              <DisclosurePanel as="ul" className="mt-1 px-2">
                {item.children.map((subItem) => (
                  <li key={subItem.name}>
                    <a
                      href={subItem.href}
                      className={classNames(
                        subItem.current
                          ? 'bg-gray-50 text-primary-500 font-semibold'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-primary-500',
                        'block rounded-md py-2 pr-2 pl-11 text-sm/6',
                      )}
                    >
                      {subItem.name}
                    </a>
                  </li>
                ))}
              </DisclosurePanel>
            </Disclosure>
          )}
        </li>
      ))}
    </ul>
  )
}

// ── Collapsed sidebar nav — icon-only with tooltips ──
function SidebarNavCollapsed({ items }: { items: NavItem[] }) {
  return (
    <ul role="list" className="flex flex-col items-center space-y-1">
      {items.map((item) => (
        <li key={item.name}>
          <a
            href={item.href || '#'}
            title={item.name}
            className={classNames(
              item.current
                ? 'bg-gray-50 text-primary-500'
                : 'text-gray-700 hover:bg-gray-50 hover:text-primary-500',
              'group flex rounded-md p-3 text-sm/6 font-semibold',
            )}
          >
            <item.icon
              aria-hidden="true"
              className={classNames(
                item.current ? 'text-primary-500' : 'text-gray-400 group-hover:text-primary-500',
                'size-6 shrink-0',
              )}
            />
            <span className="sr-only">{item.name}</span>
          </a>
        </li>
      ))}
    </ul>
  )
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('isAuthenticated')
    if (!isAuthenticated) {
      router.push('/login')
      return
    }
    setUserName(sessionStorage.getItem('userName') || '')
    setUserEmail(sessionStorage.getItem('userEmail') || '')
  }, [router])

  const handleLogout = () => {
    sessionStorage.clear()
    router.push('/login')
  }

  // Compute active nav state from current pathname
  const navWithCurrent = useMemo(() => {
    return navigation.map((item) => {
      const childMatch = item.children?.some((child) => child.href === pathname)
      return {
        ...item,
        current: item.href === pathname || !!childMatch,
        children: item.children?.map((child) => ({
          ...child,
          current: child.href === pathname,
        })),
      }
    })
  }, [pathname])

  const initials = getInitials(userName)
  const sidebarWidth = sidebarCollapsed ? 'lg:w-20' : 'lg:w-72'
  const contentPadding = sidebarCollapsed ? 'lg:pl-20' : 'lg:pl-72'
  const headerLeft = sidebarCollapsed ? 'lg:left-20' : 'lg:left-72'

  return (
    <AppShellContext.Provider value={{ userName, userEmail, sidebarCollapsed }}>
      <div>
        {/* Mobile sidebar */}
        <Dialog open={sidebarOpen} onClose={setSidebarOpen} className="relative z-50 lg:hidden">
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-closed:opacity-0"
          />
          <div className="fixed inset-0 flex">
            <DialogPanel
              transition
              className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-closed:-translate-x-full"
            >
              <TransitionChild>
                <div className="absolute top-0 left-full flex w-16 justify-center pt-5 duration-300 ease-in-out data-closed:opacity-0">
                  <button type="button" onClick={() => setSidebarOpen(false)} className="-m-2.5 p-2.5">
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon aria-hidden="true" className="size-6 text-white" />
                  </button>
                </div>
              </TransitionChild>

              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                <div className="flex h-16 shrink-0 items-center">
                  <img alt="Frameworks" src="/frameworks-logo.svg" className="h-8 w-auto" />
                </div>
                <nav className="flex flex-1 flex-col">
                  <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                      <SidebarNavExpanded items={navWithCurrent} />
                    </li>
                    <li>
                      <div className="text-xs/6 font-semibold text-gray-400">System</div>
                      <div className="mt-2">
                        <SidebarNavExpanded items={bottomNav} />
                      </div>
                    </li>
                    <li className="-mx-2 mt-auto">
                      <button
                        onClick={handleLogout}
                        className="group flex w-full gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-700 hover:bg-gray-50 hover:text-primary-500"
                      >
                        <ArrowRightStartOnRectangleIcon aria-hidden="true" className="size-6 shrink-0 text-gray-400 group-hover:text-primary-500" />
                        Logout
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </DialogPanel>
          </div>
        </Dialog>

        {/* Desktop sidebar */}
        <div className={`hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:flex-col transition-all duration-300 ${sidebarWidth}`}>
          <div className="flex grow flex-col overflow-y-auto border-r border-gray-200 bg-white">
            {sidebarCollapsed ? (
              <>
                <div className="flex h-16 shrink-0 items-center justify-center">
                  <img alt="Frameworks" src="/favicon.ico" className="size-8" />
                </div>
                <nav className="mt-2 flex flex-1 flex-col items-center">
                  <SidebarNavCollapsed items={navWithCurrent} />
                  <div className="mt-6 w-8 border-t border-gray-200" />
                  <div className="mt-6">
                    <SidebarNavCollapsed items={bottomNav} />
                  </div>
                  <div className="mt-auto mb-4 flex flex-col items-center gap-y-2">
                    <button
                      onClick={handleLogout}
                      title="Logout"
                      className="group flex rounded-md p-3 text-gray-700 hover:bg-gray-50 hover:text-primary-500"
                    >
                      <ArrowRightStartOnRectangleIcon aria-hidden="true" className="size-6 shrink-0 text-gray-400 group-hover:text-primary-500" />
                      <span className="sr-only">Logout</span>
                    </button>
                    <button
                      onClick={() => setSidebarCollapsed(false)}
                      title="Expand sidebar"
                      className="group flex rounded-md p-3 text-gray-700 hover:bg-gray-50 hover:text-primary-500"
                    >
                      <ChevronDoubleRightIcon aria-hidden="true" className="size-5 text-gray-400 group-hover:text-primary-500" />
                      <span className="sr-only">Expand sidebar</span>
                    </button>
                  </div>
                </nav>
              </>
            ) : (
              <>
                <div className="flex h-16 shrink-0 items-center justify-between px-6">
                  <img alt="Frameworks" src="/frameworks-logo.svg" className="h-8 w-auto" />
                  <button
                    onClick={() => setSidebarCollapsed(true)}
                    title="Collapse sidebar"
                    className="group rounded-md p-1 text-gray-400 hover:bg-gray-50 hover:text-primary-500"
                  >
                    <ChevronDoubleLeftIcon aria-hidden="true" className="size-5" />
                    <span className="sr-only">Collapse sidebar</span>
                  </button>
                </div>
                <nav className="flex flex-1 flex-col px-6">
                  <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                      <SidebarNavExpanded items={navWithCurrent} />
                    </li>
                    <li>
                      <div className="text-xs/6 font-semibold text-gray-400">System</div>
                      <div className="mt-2">
                        <SidebarNavExpanded items={bottomNav} />
                      </div>
                    </li>
                    <li className="-mx-2 mt-auto mb-4">
                      <button
                        onClick={handleLogout}
                        className="group flex w-full gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-700 hover:bg-gray-50 hover:text-primary-500"
                      >
                        <ArrowRightStartOnRectangleIcon aria-hidden="true" className="size-6 shrink-0 text-gray-400 group-hover:text-primary-500" />
                        Logout
                      </button>
                    </li>
                  </ul>
                </nav>
              </>
            )}
          </div>
        </div>

        {/* Mobile top bar */}
        <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
          <div className="flex-1">
            <img alt="Frameworks" src="/frameworks-logo.svg" className="h-6 w-auto" />
          </div>
          <button type="button" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
            <span className="sr-only">View notifications</span>
            <BellIcon aria-hidden="true" className="size-6" />
          </button>
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary-500 text-sm font-medium text-white">
            {initials}
          </span>
        </div>

        {/* Desktop header bar */}
        <div className={`hidden lg:fixed lg:right-0 lg:top-0 lg:z-40 lg:flex lg:h-16 lg:items-center lg:gap-x-4 lg:border-b lg:border-gray-200 lg:bg-white lg:px-8 transition-all duration-300 ${headerLeft}`}>
          <div className="flex flex-1 items-center gap-x-4 lg:gap-x-6">
            <div className="relative flex flex-1">
              <MagnifyingGlassIcon
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
              />
              <input
                type="search"
                name="search"
                placeholder="Search..."
                className="block w-full border-0 py-1.5 pl-8 pr-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm/6"
              />
            </div>
          </div>
          <div className="flex items-center gap-x-4 lg:gap-x-6">
            <button type="button" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
              <span className="sr-only">View notifications</span>
              <BellIcon aria-hidden="true" className="size-6" />
            </button>
            <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" aria-hidden="true" />
            <div className="flex items-center gap-x-3 -m-1.5 p-1.5">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary-500 text-sm font-medium text-white">
                {initials}
              </span>
              <span className="hidden lg:flex lg:flex-col lg:items-start">
                <span className="text-sm/6 font-semibold text-gray-900">{userName}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Main content area */}
        <main className={`lg:pt-16 transition-all duration-300 ${contentPadding}`}>
          {children}
        </main>
      </div>
    </AppShellContext.Provider>
  )
}

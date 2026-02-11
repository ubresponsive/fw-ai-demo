'use client'

import { useEffect, useState, type ElementType } from 'react'
import { useRouter } from 'next/navigation'
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
} from '@heroicons/react/24/outline'
import { ArrowDownIcon, ArrowUpIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import {
  HomeIcon,
  ShoppingCartIcon,
  CurrencyDollarIcon,
  BanknotesIcon,
  CubeIcon,
  TruckIcon,
  ClipboardDocumentListIcon,
  BuildingStorefrontIcon,
  CalculatorIcon,
  TagIcon,
  DocumentChartBarIcon,
  Cog6ToothIcon,
  UserIcon,
  ArrowRightStartOnRectangleIcon,
  ChartBarIcon,
  PlusCircleIcon,
  DocumentTextIcon,
  ReceiptPercentIcon,
  WrenchScrewdriverIcon,
  UsersIcon,
} from '@heroicons/react/24/outline'

type NavChild = {
  name: string
  href: string
}

type NavItem = {
  name: string
  href?: string
  icon: ElementType
  current?: boolean
  children?: NavChild[]
}

const navigation: NavItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon, current: true },
  {
    name: 'Sales',
    icon: ShoppingCartIcon,
    children: [
      { name: 'Point of Sale', href: '#' },
      { name: 'Sales Orders', href: '#' },
      { name: 'Credit Memos', href: '#' },
      { name: 'Customer Orders', href: '#' },
      { name: 'Picking Dashboard', href: '#' },
      { name: 'Projects', href: '#' },
    ],
  },
  {
    name: 'Receivables',
    icon: CurrencyDollarIcon,
    children: [
      { name: 'Customer Dashboard', href: '#' },
      { name: 'Customer Payments', href: '#' },
      { name: 'Customer Statements', href: '#' },
      { name: 'Customer Maintenance', href: '#' },
      { name: 'AR Dashboard', href: '#' },
      { name: 'Credit Approval', href: '#' },
    ],
  },
  {
    name: 'Payables',
    icon: BanknotesIcon,
    children: [
      { name: 'Supplier Dashboard', href: '#' },
      { name: 'Expense Invoice Entry', href: '#' },
      { name: 'Invoice Maintenance', href: '#' },
      { name: 'Payment Selection', href: '#' },
      { name: 'Supplier Maintenance', href: '#' },
      { name: 'Invoice Scanning', href: '#' },
    ],
  },
  {
    name: 'Inventory',
    icon: CubeIcon,
    children: [
      { name: 'Product Dashboard', href: '#' },
      { name: 'Product Maintenance', href: '#' },
      { name: 'Inventory Adjustments', href: '#' },
      { name: 'Physical Inventory', href: '#' },
      { name: 'Price Inquiry', href: '#' },
      { name: 'Product Locations', href: '#' },
    ],
  },
  {
    name: 'Purchasing',
    icon: ClipboardDocumentListIcon,
    children: [
      { name: 'Purchase Requisitions', href: '#' },
      { name: 'Purchase Orders', href: '#' },
      { name: 'Receiving', href: '#' },
      { name: 'Quick Transfers', href: '#' },
      { name: 'Reorder Inventory', href: '#' },
    ],
  },
  {
    name: 'Dispatch',
    icon: TruckIcon,
    children: [
      { name: 'Dispatch Dashboard', href: '#' },
      { name: 'Dispatch Calendar', href: '#' },
      { name: 'Runsheet Maintenance', href: '#' },
    ],
  },
  {
    name: 'Pricing',
    icon: TagIcon,
    children: [
      { name: 'Promotions', href: '#' },
      { name: 'Contracts', href: '#' },
      { name: 'Tier Pricing Dashboard', href: '#' },
      { name: 'Customer Price Books', href: '#' },
      { name: 'Discount Maintenance', href: '#' },
    ],
  },
  {
    name: 'General Ledger',
    icon: CalculatorIcon,
    children: [
      { name: 'GL Dashboard', href: '#' },
      { name: 'Journal Entry', href: '#' },
      { name: 'Bank Reconciliation', href: '#' },
      { name: 'Chart of Accounts', href: '#' },
      { name: 'Financial Reporting', href: '#' },
    ],
  },
  {
    name: 'Production',
    icon: BuildingStorefrontIcon,
    children: [
      { name: 'Process Management', href: '#' },
      { name: 'Production Dashboard', href: '#' },
      { name: 'Work Orders', href: '#' },
      { name: 'Time Sheet Entry', href: '#' },
    ],
  },
  {
    name: 'Reports',
    icon: DocumentChartBarIcon,
    children: [
      { name: 'Financial Reporting', href: '#' },
      { name: 'AR Dashboard', href: '#' },
      { name: 'Documents & Reports', href: '#' },
    ],
  },
]

const bottomNav: NavItem[] = [
  {
    name: 'Administration',
    icon: Cog6ToothIcon,
    children: [
      { name: 'System Setup', href: '#' },
      { name: 'Users & Security', href: '#' },
      { name: 'Task Scheduler', href: '#' },
      { name: 'Audit Inquiry', href: '#' },
      { name: 'Licencing', href: '#' },
    ],
  },
  {
    name: 'My Settings',
    icon: UserIcon,
    children: [
      { name: 'My Printer Configuration', href: '#' },
      { name: 'Change Password/PIN', href: '#' },
      { name: 'Reset your MFA', href: '#' },
      { name: 'Tasks', href: '#' },
    ],
  },
]

const dashboardStats = [
  { id: 1, name: 'Revenue (MTD)', stat: '$284,391', icon: CurrencyDollarIcon, change: '12.5%', changeType: 'increase' as const, color: 'bg-green-500' },
  { id: 2, name: 'Sales Orders', stat: '1,247', icon: ShoppingCartIcon, change: '8.2%', changeType: 'increase' as const, color: 'bg-primary-400' },
  { id: 3, name: 'Purchase Orders', stat: '342', icon: ClipboardDocumentListIcon, change: '3.1%', changeType: 'decrease' as const, color: 'bg-amber-500' },
  { id: 4, name: 'Inventory Value', stat: '$1.2M', icon: CubeIcon, change: '2.4%', changeType: 'increase' as const, color: 'bg-blue-500' },
  { id: 5, name: 'Outstanding AR', stat: '$127,450', icon: BanknotesIcon, change: '5.7%', changeType: 'decrease' as const, color: 'bg-rose-500' },
  { id: 6, name: 'Dispatches Today', stat: '48', icon: TruckIcon, change: '15.3%', changeType: 'increase' as const, color: 'bg-purple-500' },
]

const quickLinks = [
  { name: 'New Sales Order', initials: 'SO', href: '#', description: 'Create a sales order', bgColor: 'bg-primary-500', icon: PlusCircleIcon },
  { name: 'Customer Dashboard', initials: 'CD', href: '#', description: 'View customer accounts', bgColor: 'bg-green-600', icon: UsersIcon },
  { name: 'Invoice Entry', initials: 'IE', href: '#', description: 'Enter supplier invoices', bgColor: 'bg-amber-600', icon: DocumentTextIcon },
  { name: 'Price Inquiry', initials: 'PI', href: '#', description: 'Check product pricing', bgColor: 'bg-rose-600', icon: ReceiptPercentIcon },
  { name: 'Inventory Lookup', initials: 'IL', href: '#', description: 'Search stock levels', bgColor: 'bg-blue-600', icon: CubeIcon },
  { name: 'Financial Reports', initials: 'FR', href: '#', description: 'Run financial reports', bgColor: 'bg-purple-600', icon: ChartBarIcon },
  { name: 'Production Dashboard', initials: 'PD', href: '#', description: 'View production status', bgColor: 'bg-cyan-600', icon: WrenchScrewdriverIcon },
  { name: 'GL Journal Entry', initials: 'GL', href: '#', description: 'Post journal entries', bgColor: 'bg-teal-600', icon: CalculatorIcon },
]

const recentActivity = [
  { id: 1, action: 'Sales Order #4521 created', user: 'Sarah Chen', time: '2 min ago', type: 'sales' },
  { id: 2, action: 'Payment received — Inv #3892', user: 'System', time: '15 min ago', type: 'payment' },
  { id: 3, action: 'Purchase Order #1204 approved', user: 'Mark Thompson', time: '32 min ago', type: 'purchase' },
  { id: 4, action: 'Stock adjustment — SKU WH-4410', user: 'James Liu', time: '1 hr ago', type: 'inventory' },
  { id: 5, action: 'Customer account updated — Acme Corp', user: 'Sarah Chen', time: '1 hr ago', type: 'customer' },
  { id: 6, action: 'Dispatch run #89 completed', user: 'Driver - Route A', time: '2 hr ago', type: 'dispatch' },
  { id: 7, action: 'Credit Memo #CM-221 issued', user: 'Amy Rodriguez', time: '3 hr ago', type: 'sales' },
  { id: 8, action: 'Bank reconciliation completed', user: 'Finance Team', time: '4 hr ago', type: 'finance' },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/)
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  }
  return name.slice(0, 2).toUpperCase()
}

// Expanded sidebar nav with labels and disclosure
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
            <Disclosure as="div">
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
                      className="block rounded-md py-2 pr-2 pl-11 text-sm/6 text-gray-700 hover:bg-gray-50 hover:text-primary-500"
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

// Collapsed sidebar nav — icon-only with tooltips
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

export default function DashboardPage() {
  const router = useRouter()
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

  const initials = getInitials(userName)
  const sidebarWidth = sidebarCollapsed ? 'lg:w-20' : 'lg:w-72'
  const contentPadding = sidebarCollapsed ? 'lg:pl-20' : 'lg:pl-72'
  const headerLeft = sidebarCollapsed ? 'lg:left-20' : 'lg:left-72'

  return (
    <div>
      {/* Mobile sidebar — always expanded */}
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
                    <SidebarNavExpanded items={navigation} />
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
            /* ── Collapsed state ── */
            <>
              <div className="flex h-16 shrink-0 items-center justify-center">
                <img alt="Frameworks" src="/favicon.ico" className="size-8" />
              </div>
              <nav className="mt-2 flex flex-1 flex-col items-center">
                <SidebarNavCollapsed items={navigation} />
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
            /* ── Expanded state ── */
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
                    <SidebarNavExpanded items={navigation} />
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
        {/* Search */}
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

        {/* Right side icons */}
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
        <div className="xl:pr-96">
          <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
            {/* Page heading */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                Dashboard
              </h2>
              <p className="mt-2 text-sm text-gray-700">
                Welcome back, {userName}
              </p>
            </div>

            {/* Stats section */}
            <div>
              <h3 className="text-base font-semibold text-gray-900">Overview — Last 30 days</h3>
              <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {dashboardStats.map((item) => (
                  <div
                    key={item.id}
                    className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-12 shadow-sm sm:px-6 sm:pt-6"
                  >
                    <dt>
                      <div className={classNames(item.color, 'absolute rounded-md p-3')}>
                        <item.icon aria-hidden="true" className="size-6 text-white" />
                      </div>
                      <p className="ml-16 truncate text-sm font-medium text-gray-500">{item.name}</p>
                    </dt>
                    <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                      <p className="text-2xl font-semibold text-gray-900">{item.stat}</p>
                      <p
                        className={classNames(
                          item.changeType === 'increase' ? 'text-green-600' : 'text-red-600',
                          'ml-2 flex items-baseline text-sm font-semibold',
                        )}
                      >
                        {item.changeType === 'increase' ? (
                          <ArrowUpIcon aria-hidden="true" className="size-5 shrink-0 self-center text-green-500" />
                        ) : (
                          <ArrowDownIcon aria-hidden="true" className="size-5 shrink-0 self-center text-red-500" />
                        )}
                        <span className="sr-only"> {item.changeType === 'increase' ? 'Increased' : 'Decreased'} by </span>
                        {item.change}
                      </p>
                      <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
                        <div className="text-sm">
                          <a href="#" className="font-medium text-primary-500 hover:text-primary-400">
                            View details<span className="sr-only"> {item.name}</span>
                          </a>
                        </div>
                      </div>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Quick Links section */}
            <div className="mt-10">
              <h3 className="text-base font-semibold text-gray-900">Quick Links</h3>
              <ul role="list" className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="group flex items-center gap-x-3 rounded-lg border border-gray-200 bg-white p-3 shadow-sm hover:border-primary-400 hover:shadow-md transition-all"
                    >
                      <div className={classNames(link.bgColor, 'flex size-10 shrink-0 items-center justify-center rounded-lg')}>
                        <link.icon aria-hidden="true" className="size-5 text-white" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-900 group-hover:text-primary-500">{link.name}</p>
                        <p className="truncate text-xs text-gray-500">{link.description}</p>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Secondary column on right */}
      <aside className="fixed top-16 bottom-0 right-0 hidden w-96 overflow-y-auto border-l border-gray-200 px-4 py-6 sm:px-6 lg:px-8 xl:block">
        <h3 className="text-sm font-semibold text-gray-900">Recent Activity</h3>
        <div className="mt-4 flow-root">
          <ul role="list" className="-mb-8">
            {recentActivity.map((item, idx) => (
              <li key={item.id}>
                <div className="relative pb-8">
                  {idx !== recentActivity.length - 1 && (
                    <span aria-hidden="true" className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" />
                  )}
                  <div className="relative flex space-x-3">
                    <div>
                      <span className={classNames(
                        item.type === 'sales' ? 'bg-primary-400' :
                        item.type === 'payment' ? 'bg-green-500' :
                        item.type === 'purchase' ? 'bg-amber-500' :
                        item.type === 'inventory' ? 'bg-blue-500' :
                        item.type === 'customer' ? 'bg-purple-500' :
                        item.type === 'dispatch' ? 'bg-cyan-500' :
                        'bg-gray-500',
                        'flex size-8 items-center justify-center rounded-full ring-8 ring-white',
                      )}>
                        {item.type === 'sales' && <ShoppingCartIcon className="size-4 text-white" />}
                        {item.type === 'payment' && <BanknotesIcon className="size-4 text-white" />}
                        {item.type === 'purchase' && <ClipboardDocumentListIcon className="size-4 text-white" />}
                        {item.type === 'inventory' && <CubeIcon className="size-4 text-white" />}
                        {item.type === 'customer' && <UsersIcon className="size-4 text-white" />}
                        {item.type === 'dispatch' && <TruckIcon className="size-4 text-white" />}
                        {item.type === 'finance' && <CalculatorIcon className="size-4 text-white" />}
                      </span>
                    </div>
                    <div className="flex min-w-0 flex-1 justify-between space-x-4">
                      <div>
                        <p className="text-sm text-gray-900">{item.action}</p>
                        <p className="text-xs text-gray-500">{item.user}</p>
                      </div>
                      <div className="whitespace-nowrap text-right text-xs text-gray-500">
                        {item.time}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  )
}

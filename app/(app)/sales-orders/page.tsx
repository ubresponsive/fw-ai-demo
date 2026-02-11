'use client'

import { useState, useMemo } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import {
  XMarkIcon,
  SparklesIcon,
  PaperAirplaneIcon,
  ChevronDownIcon,
  HomeIcon,
  ChevronRightIcon,
  PlusIcon,
  CheckIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon,
  ScissorsIcon,
  CubeIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  CreditCardIcon,
  DocumentTextIcon,
  EyeSlashIcon,
  CurrencyDollarIcon,
  PauseIcon,
  TrashIcon,
  PrinterIcon,
  DocumentDuplicateIcon,
  LinkIcon,
  ClipboardDocumentListIcon,
  EllipsisHorizontalIcon,
  ShoppingCartIcon,
  TruckIcon,
  ChatBubbleLeftRightIcon,
  CheckCircleIcon,
  ClockIcon,
  PaperClipIcon,
  FunnelIcon,
  ArrowsUpDownIcon,
  Bars3BottomLeftIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline'
import { classNames } from '@/lib/utils'

// ── Order line data ──
type OrderLine = {
  ln: number
  product: string
  desc: string
  supplier: string
  qty: number
  uom: string
  sell: number
  disc: number
  total: number
  pickGroup: string
  unitCost: number
  gp: number
}

const orderLines: OrderLine[] = [
  { ln: 1, product: '1381631', desc: 'Extractor Screw #1 Prepack', supplier: '829663', qty: 2.0, uom: 'CD', sell: 9.00, disc: 0, total: 18.00, pickGroup: '', unitCost: 7.16, gp: 12.47 },
  { ln: 2, product: 'JMB3', desc: 'JODYS JMB3 PRODUCT', supplier: 'GreenTexta', qty: 5.0, uom: 'ea', sell: 2.20, disc: 0, total: 11.00, pickGroup: '', unitCost: 6.12, gp: -206.08 },
  { ln: 3, product: 'TIM4520', desc: 'Timber Pine DAR 45x20 4.8m', supplier: 'AUS-TIM', qty: 12.0, uom: 'LM', sell: 4.85, disc: 5, total: 55.29, pickGroup: 'TIMBER', unitCost: 2.90, gp: 37.11 },
  { ln: 4, product: 'CEM025', desc: 'Cement GP 20kg Bag', supplier: 'BORAL01', qty: 40.0, uom: 'ea', sell: 9.50, disc: 0, total: 380.00, pickGroup: 'HEAVY', unitCost: 6.20, gp: 34.74 },
]

// ── Status Badge ──
function StatusBadge({ label, variant }: { label: string; variant: 'green' | 'blue' | 'amber' }) {
  const styles = {
    green: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    blue: 'bg-sky-50 text-sky-700 border-sky-200',
    amber: 'bg-amber-50 text-amber-700 border-amber-200',
  }
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full border ${styles[variant]}`}>
      {variant === 'green' && <CheckCircleIcon className="size-3" />}
      {variant === 'amber' && <ClockIcon className="size-3" />}
      {label}
    </span>
  )
}

// ── Tab component ──
function Tab({ active, icon: Icon, label, count, onClick }: { active: boolean; icon: React.ElementType; label: string; count?: number; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={classNames(
        active ? 'border-primary-500 text-primary-500' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
        'flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap',
      )}
    >
      <Icon className="size-4" />
      {label}
      {count !== undefined && (
        <span className={classNames(active ? 'bg-primary-100 text-primary-700' : 'bg-gray-100 text-gray-500', 'ml-1 px-1.5 py-0 text-xs rounded-full')}>
          {count}
        </span>
      )}
    </button>
  )
}

// ── Column definitions for TanStack Table ──
const columnHelper = createColumnHelper<OrderLine>()

const columns = [
  columnHelper.display({
    id: 'select',
    header: ({ table }) => (
      <input
        type="checkbox"
        className="rounded border-gray-300"
        checked={table.getIsAllRowsSelected()}
        onChange={table.getToggleAllRowsSelectedHandler()}
      />
    ),
    cell: ({ row }) => (
      <input
        type="checkbox"
        className="rounded border-gray-300"
        checked={row.getIsSelected()}
        onChange={row.getToggleSelectedHandler()}
      />
    ),
    size: 40,
  }),
  columnHelper.accessor('ln', {
    header: 'Ln',
    cell: (info) => <span className="text-gray-400 font-mono">{info.getValue()}</span>,
    size: 50,
  }),
  columnHelper.accessor('product', {
    header: 'Product',
    cell: (info) => <button className="font-medium text-primary-500 hover:underline">{info.getValue()}</button>,
  }),
  columnHelper.accessor('desc', {
    header: 'Description',
    cell: (info) => <span className="text-gray-700">{info.getValue()}</span>,
    size: 220,
  }),
  columnHelper.accessor('supplier', {
    header: 'Supplier',
    cell: (info) => <span className="text-gray-500">{info.getValue()}</span>,
  }),
  columnHelper.accessor('qty', {
    header: () => <span className="block text-right">Qty</span>,
    cell: (info) => <span className="block text-right font-mono text-gray-700">{info.getValue().toFixed(1)}</span>,
    size: 70,
  }),
  columnHelper.accessor('uom', {
    header: () => <span className="block text-center">UOM</span>,
    cell: (info) => <span className="block text-center text-gray-500">{info.getValue()}</span>,
    size: 60,
  }),
  columnHelper.accessor('sell', {
    header: () => <span className="block text-right">Sell Price</span>,
    cell: (info) => <span className="block text-right font-mono text-gray-700">${info.getValue().toFixed(2)}</span>,
    size: 90,
  }),
  columnHelper.accessor('disc', {
    header: () => <span className="block text-right">Disc%</span>,
    cell: (info) => <span className="block text-right font-mono text-gray-400">{info.getValue().toFixed(0)}</span>,
    size: 60,
  }),
  columnHelper.accessor('total', {
    header: () => <span className="block text-right">Total</span>,
    cell: (info) => <span className="block text-right font-mono font-medium text-gray-800">${info.getValue().toFixed(2)}</span>,
    size: 100,
  }),
  columnHelper.accessor('pickGroup', {
    header: 'Pick Grp',
    cell: (info) => <span className="text-gray-500">{info.getValue()}</span>,
    size: 80,
  }),
  columnHelper.accessor('unitCost', {
    header: () => <span className="block text-right">Unit Cost</span>,
    cell: (info) => <span className="block text-right font-mono text-gray-500">${info.getValue().toFixed(2)}</span>,
    size: 90,
  }),
  columnHelper.accessor('gp', {
    header: () => <span className="block text-right">GP%</span>,
    cell: (info) => {
      const val = info.getValue()
      return (
        <span className="block text-right">
          <span className={classNames(
            val < 0 ? 'bg-red-50 text-red-700' : val < 15 ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700',
            'inline-flex items-center px-1.5 py-0.5 rounded-md text-xs font-medium font-mono',
          )}>
            {val.toFixed(1)}%
          </span>
        </span>
      )
    },
    size: 80,
  }),
  columnHelper.display({
    id: 'actions',
    cell: () => (
      <button className="p-0.5 rounded hover:bg-gray-100">
        <EllipsisHorizontalIcon className="size-4 text-gray-400" />
      </button>
    ),
    size: 40,
  }),
]

// ── Footer totals ──
const footerTotals = [
  { label: 'Total Exc', value: '$464.29', bold: true },
  { label: 'Total Inc', value: '$510.72' },
  { label: 'GP%', value: '-26.71', warn: true },
  { label: 'Rebated GP%', value: '-22.34', warn: true },
  { label: 'Total Cost', value: '$544.92' },
  { label: 'Delivery Fee', value: '$10.00' },
]

// ── Actions menu items ──
const actionItems = [
  { icon: DocumentTextIcon, label: 'Edit Header' },
  { icon: EyeSlashIcon, label: 'Hide Costs' },
  { icon: ArrowPathIcon, label: 'Reprice' },
  { icon: CurrencyDollarIcon, label: 'Gross Profit Reprice' },
  { icon: ScissorsIcon, label: 'Split Transaction' },
  { icon: CubeIcon, label: 'Pick & Release' },
  { icon: ClipboardDocumentListIcon, label: 'Picking Enquiry' },
  { icon: LinkIcon, label: 'Linked PO' },
  { icon: CreditCardIcon, label: 'Make Payment' },
  { icon: PauseIcon, label: 'Hold Order' },
  { icon: TrashIcon, label: 'Void Order', danger: true },
  { icon: PrinterIcon, label: 'Print Options' },
  { icon: DocumentDuplicateIcon, label: 'Copy Order' },
]

export default function SalesOrdersPage() {
  const [activeTab, setActiveTab] = useState('lines')
  const [aiOpen, setAiOpen] = useState(false)
  const [aiInput, setAiInput] = useState('')
  const [showActions, setShowActions] = useState(false)
  const [rowSelection, setRowSelection] = useState({})

  const data = useMemo(() => orderLines, [])

  const table = useReactTable({
    data,
    columns,
    state: { rowSelection },
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection: true,
  })

  const selectedCount = Object.keys(rowSelection).length

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col bg-gray-50">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 px-4 py-2 text-sm text-gray-500 border-b border-gray-200 bg-white">
        <a href="/dashboard" className="flex items-center gap-1 hover:text-gray-700">
          <HomeIcon className="size-4" /> Home
        </a>
        <ChevronRightIcon className="size-3" />
        <span className="text-gray-500">Sales Orders</span>
        <ChevronRightIcon className="size-3" />
        <span className="font-medium text-gray-900 bg-gray-100 px-1.5 py-0.5 rounded">SO 436/0</span>
      </div>

      {/* Order Header Card */}
      <div className="mx-4 mt-3 bg-white rounded-xl border border-gray-200 shadow-sm">
        {/* Header Top Row */}
        <div className="flex items-start justify-between px-5 pt-4 pb-3">
          <div>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h1 className="text-lg font-semibold text-gray-900">SO 436/0</h1>
              <StatusBadge label="Entry Complete" variant="green" />
              <StatusBadge label="Date Confirmed" variant="blue" />
              <StatusBadge label="Waiting on Picking" variant="amber" />
            </div>
            <p className="text-xs text-gray-500">Order &middot; PrePaid Deliveries &middot; Cash Card Holder</p>
          </div>
          <div className="flex items-center gap-2">
            {/* AI Toggle */}
            <button
              onClick={() => setAiOpen(true)}
              className={classNames(
                aiOpen ? 'border-tertiary-500 text-tertiary-500 bg-tertiary-50' : 'border-gray-200 text-gray-600 bg-white hover:bg-gray-50',
                'inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all border',
              )}
            >
              <SparklesIcon className="size-4" />
              AI Assistant
            </button>

            {/* Actions dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowActions(!showActions)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg text-white bg-primary-500 hover:bg-primary-400 transition-all"
              >
                Actions
                <ChevronDownIcon className="size-3" />
              </button>
              {showActions && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowActions(false)} />
                  <div className="absolute right-0 top-full mt-1 w-56 bg-white rounded-xl border border-gray-200 shadow-xl z-50 py-1">
                    {actionItems.map(({ icon: Icon, label, danger }) => (
                      <button
                        key={label}
                        className={classNames(
                          danger ? 'text-red-600' : 'text-gray-700',
                          'w-full flex items-center gap-2.5 px-3 py-2 text-xs hover:bg-gray-50 transition-colors',
                        )}
                      >
                        <Icon className="size-4 text-gray-400" />
                        {label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Header Fields Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-2 px-5 pb-4 text-xs">
          {[
            { label: 'Customer', value: '555555 — PrePaid Deliveries' },
            { label: 'Cust Order #', value: '3321' },
            { label: 'Sales Rep', value: 'Anne Love' },
            { label: 'Branch', value: '10 — Test Branch 010' },
            { label: 'Despatch Method', value: 'Delivery from Store' },
            { label: 'Date Required', value: '20/10/2025' },
          ].map((field) => (
            <div key={field.label}>
              <label className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">{field.label}</label>
              <div className="font-semibold text-gray-800 mt-0.5">{field.value}</div>
            </div>
          ))}
        </div>

        {/* Payment Alert */}
        <div className="mx-5 mb-3 flex items-center gap-2 px-3 py-2 rounded-lg text-xs bg-amber-50 border border-amber-200">
          <ExclamationTriangleIcon className="size-4 shrink-0 text-amber-500" />
          <span className="text-amber-800">$15.00 still to be paid on this order.</span>
          <button className="ml-auto text-xs font-medium text-primary-500 hover:text-primary-400">Make Payment</button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-0 px-4 mt-2 border-b border-gray-200 bg-white mx-4 rounded-t-lg overflow-x-auto">
        <Tab active={activeTab === 'lines'} icon={ShoppingCartIcon} label="Order Lines" count={4} onClick={() => setActiveTab('lines')} />
        <Tab active={activeTab === 'delivery'} icon={TruckIcon} label="Delivery Details" onClick={() => setActiveTab('delivery')} />
        <Tab active={activeTab === 'header'} icon={DocumentTextIcon} label="Header" onClick={() => setActiveTab('header')} />
        <Tab active={activeTab === 'diary'} icon={ClipboardDocumentListIcon} label="Diary Notes" onClick={() => setActiveTab('diary')} />
        <Tab active={activeTab === 'messages'} icon={ChatBubbleLeftRightIcon} label="Messages" onClick={() => setActiveTab('messages')} />
        <Tab active={activeTab === 'tasks'} icon={CheckCircleIcon} label="Tasks" onClick={() => setActiveTab('tasks')} />
      </div>

      {/* Line Entry + Grid */}
      <div className="flex-1 mx-4 bg-white border-x border-b border-gray-200 rounded-b-lg flex flex-col overflow-hidden mb-4">
        {/* Quick Add Bar */}
        <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-100 bg-gray-50/50 flex-wrap">
          <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
            <PlusIcon className="size-4" />
            Quick Add:
          </div>
          <input className="w-32 px-2 py-1 text-xs border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-300 focus:border-primary-300" placeholder="Product code..." />
          <input className="w-16 px-2 py-1 text-xs border border-gray-200 rounded-md text-center" placeholder="Qty" defaultValue="1" />
          <input className="w-20 px-2 py-1 text-xs border border-gray-200 rounded-md text-right" placeholder="Sell Price" />
          <input className="w-16 px-2 py-1 text-xs border border-gray-200 rounded-md text-center" placeholder="Disc%" defaultValue="0" />
          <input className="flex-1 min-w-[120px] px-2 py-1 text-xs border border-gray-200 rounded-md" placeholder="Comments..." />
          <button className="p-1.5 rounded-md text-white bg-tertiary-500 hover:bg-tertiary-600">
            <CheckIcon className="size-4" />
          </button>
          <button className="p-1.5 rounded-md bg-gray-100 text-gray-500 hover:bg-gray-200">
            <XMarkIcon className="size-4" />
          </button>
          <div className="ml-auto flex items-center gap-3 text-xs text-gray-500">
            <span>SOH: <strong className="text-gray-700">—</strong></span>
            <span>Avail: <strong className="text-gray-700">—</strong></span>
          </div>
        </div>

        {/* Table Toolbar */}
        <div className="flex items-center justify-between px-3 py-1.5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            {selectedCount > 0 && (
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary-50 text-primary-500">
                {selectedCount} selected
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
            <button className="p-1 rounded hover:bg-gray-100"><FunnelIcon className="size-4 text-gray-400" /></button>
            <button className="p-1 rounded hover:bg-gray-100"><ArrowsUpDownIcon className="size-4 text-gray-400" /></button>
            <button className="p-1 rounded hover:bg-gray-100"><Bars3BottomLeftIcon className="size-4 text-gray-400" /></button>
          </div>
        </div>

        {/* TanStack Data Table */}
        <div className="flex-1 overflow-auto">
          <table className="w-full text-xs">
            <thead className="sticky top-0 z-10">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="bg-gray-50 border-b border-gray-200">
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-2 py-2 text-left font-medium text-gray-500 uppercase tracking-wider"
                      style={{ fontSize: '10px', width: header.getSize() }}
                    >
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className={classNames(
                    row.getIsSelected() ? 'bg-primary-50' : 'hover:bg-gray-50',
                    'border-b border-gray-100 transition-colors',
                  )}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-2 py-2.5">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Totals */}
        <div className="border-t border-gray-200 bg-gray-50 px-4 py-2.5 flex items-center gap-6 text-xs shrink-0 flex-wrap">
          {footerTotals.map(({ label, value, bold, warn }) => (
            <div key={label} className="flex items-center gap-1.5">
              <span className="text-gray-400">{label}</span>
              <span className={classNames(
                warn ? 'text-red-600' : bold ? 'text-gray-900' : 'text-gray-700',
                'font-mono font-semibold',
              )}>
                {value}
              </span>
            </div>
          ))}
          <div className="ml-auto flex items-center gap-2">
            <button className="px-4 py-1.5 rounded-lg text-xs font-medium text-white bg-tertiary-500 hover:bg-tertiary-600">Save</button>
            <button className="px-4 py-1.5 rounded-lg text-xs font-medium bg-gray-200 text-gray-600 hover:bg-gray-300">Cancel</button>
            <button className="px-4 py-1.5 rounded-lg text-xs font-medium bg-white border border-gray-200 text-gray-600 hover:bg-gray-50">Close</button>
          </div>
        </div>
      </div>

      {/* ── AI Assistant Slide-Over Drawer ── */}
      <Dialog open={aiOpen} onClose={setAiOpen} className="relative z-50">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-closed:opacity-0"
        />
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <DialogPanel
                transition
                className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700"
              >
                <div className="flex h-full flex-col bg-white shadow-xl">
                  {/* Panel Header */}
                  <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <div className="size-7 rounded-lg flex items-center justify-center bg-tertiary-50">
                        <SparklesIcon className="size-4 text-tertiary-500" />
                      </div>
                      <div>
                        <DialogTitle className="text-sm font-semibold text-gray-800">AI Assistant</DialogTitle>
                        <p className="text-xs text-gray-400">Context: SO 436/0</p>
                      </div>
                    </div>
                    <button onClick={() => setAiOpen(false)} className="p-1 rounded-lg hover:bg-gray-100">
                      <XMarkIcon className="size-5 text-gray-400" />
                    </button>
                  </div>

                  {/* Quick Actions */}
                  <div className="px-3 py-2.5 border-b border-gray-100">
                    <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-2">Quick Actions</p>
                    <div className="grid grid-cols-2 gap-1.5">
                      {[
                        { icon: ArrowPathIcon, label: 'Reprice Order', color: 'text-primary-500' },
                        { icon: CubeIcon, label: 'Check Stock', color: 'text-tertiary-500' },
                        { icon: ScissorsIcon, label: 'Split Transaction', color: 'text-secondary-500' },
                        { icon: ChartBarIcon, label: 'Margin Analysis', color: 'text-purple-500' },
                        { icon: ArrowTrendingUpIcon, label: 'Customer Trends', color: 'text-green-500' },
                        { icon: CreditCardIcon, label: 'Payment Status', color: 'text-rose-500' },
                      ].map(({ icon: Icon, label, color }) => (
                        <button
                          key={label}
                          className="flex items-center gap-2 px-2.5 py-2 rounded-lg border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all text-left"
                        >
                          <Icon className={classNames(color, 'size-4 shrink-0')} />
                          <span className="text-xs text-gray-600">{label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Chat Area */}
                  <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3">
                    {/* AI Welcome */}
                    <div className="flex gap-2.5">
                      <div className="size-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 bg-tertiary-50">
                        <SparklesIcon className="size-3.5 text-tertiary-500" />
                      </div>
                      <div className="flex-1">
                        <div className="bg-gray-50 rounded-xl rounded-tl-sm px-3 py-2.5 text-xs text-gray-700 leading-relaxed">
                          <p>You&apos;re viewing <strong>SO 436/0</strong> for PrePaid Deliveries (Cust 555555). There are <strong>4 order lines</strong> totalling <strong>$464.29</strong> exc. GST.</p>
                          <p className="mt-2 flex items-center gap-1.5 text-red-600">
                            <ExclamationTriangleIcon className="size-3" />
                            <span>Line 2 has a negative GP of -206% — selling below cost.</span>
                          </p>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {['Check stock for all items', 'Reprice line 2', 'Show margin breakdown', 'Customer order history'].map((s) => (
                            <button key={s} className="px-2.5 py-1 text-xs rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-colors">
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* User Message */}
                    <div className="flex gap-2.5 justify-end">
                      <div className="bg-primary-50 border border-primary-100 rounded-xl rounded-tr-sm px-3 py-2 text-xs text-gray-700 max-w-72">
                        Show me the margin breakdown for this order
                      </div>
                    </div>

                    {/* AI Response with Chart */}
                    <div className="flex gap-2.5">
                      <div className="size-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 bg-tertiary-50">
                        <SparklesIcon className="size-3.5 text-tertiary-500" />
                      </div>
                      <div className="flex-1">
                        <div className="bg-gray-50 rounded-xl rounded-tl-sm px-3 py-2.5 text-xs text-gray-700 leading-relaxed">
                          <p className="font-medium mb-2">Margin Analysis — SO 436/0</p>
                          {/* Mini Chart */}
                          <div className="bg-white rounded-lg border border-gray-100 p-2.5 mb-2">
                            <div className="space-y-2">
                              {orderLines.map((line) => (
                                <div key={line.ln} className="flex items-center gap-2">
                                  <span className="w-20 text-xs text-gray-500 truncate">{line.product}</span>
                                  <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                      className={classNames(
                                        line.gp < 0 ? 'bg-red-400' : line.gp < 15 ? 'bg-amber-400' : 'bg-green-400',
                                        'h-full rounded-full transition-all',
                                      )}
                                      style={{ width: `${Math.max(2, Math.min(100, line.gp > 0 ? line.gp * 2 : 2))}%` }}
                                    />
                                  </div>
                                  <span className={classNames(line.gp < 0 ? 'text-red-600' : 'text-gray-700', 'w-14 text-right text-xs font-mono font-medium')}>
                                    {line.gp.toFixed(1)}%
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <p><strong className="text-red-600">Line 2 (JMB3)</strong> is selling at $2.20 against a unit cost of $6.12, resulting in a loss of $3.92 per unit ($19.60 total).</p>
                          <p className="mt-1.5">The other 3 lines average <strong className="text-emerald-600">28.1% GP</strong>, within acceptable range.</p>
                        </div>

                        {/* Action Suggestions */}
                        <div className="mt-2 space-y-1">
                          <button className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all text-left">
                            <ArrowPathIcon className="size-4 text-primary-500" />
                            <span className="text-xs text-gray-600 flex-1">Reprice JMB3 to breakeven ($6.12)</span>
                            <ArrowRightIcon className="size-3 text-gray-400" />
                          </button>
                          <button className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all text-left">
                            <CurrencyDollarIcon className="size-4 text-green-500" />
                            <span className="text-xs text-gray-600 flex-1">Reprice JMB3 to 15% GP ($7.20)</span>
                            <ArrowRightIcon className="size-3 text-gray-400" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Confirmation Preview */}
                    <div className="flex gap-2.5">
                      <div className="size-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 bg-tertiary-50">
                        <SparklesIcon className="size-3.5 text-tertiary-500" />
                      </div>
                      <div className="flex-1">
                        <div className="rounded-xl border-2 border-dashed border-secondary-400 bg-secondary-50/30 px-3 py-2.5 text-xs">
                          <p className="font-medium text-gray-700 flex items-center gap-1.5 mb-2">
                            <ExclamationTriangleIcon className="size-3 text-secondary-500" />
                            Confirm Price Change
                          </p>
                          <div className="bg-white rounded-lg border border-gray-100 overflow-hidden mb-2">
                            <table className="w-full text-xs">
                              <thead>
                                <tr className="bg-gray-50">
                                  <th className="px-2 py-1.5 text-left text-gray-500 font-medium">Field</th>
                                  <th className="px-2 py-1.5 text-right text-gray-500 font-medium">Current</th>
                                  <th className="px-2 py-1.5 text-right text-gray-500 font-medium">New</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="border-t border-gray-50">
                                  <td className="px-2 py-1.5 text-gray-600">Sell Price</td>
                                  <td className="px-2 py-1.5 text-right font-mono text-red-500 line-through">$2.20</td>
                                  <td className="px-2 py-1.5 text-right font-mono font-medium text-emerald-600">$7.20</td>
                                </tr>
                                <tr className="border-t border-gray-50">
                                  <td className="px-2 py-1.5 text-gray-600">Line Total</td>
                                  <td className="px-2 py-1.5 text-right font-mono text-gray-400">$11.00</td>
                                  <td className="px-2 py-1.5 text-right font-mono font-medium text-gray-700">$36.00</td>
                                </tr>
                                <tr className="border-t border-gray-50">
                                  <td className="px-2 py-1.5 text-gray-600">GP%</td>
                                  <td className="px-2 py-1.5 text-right font-mono text-red-500">-206.1%</td>
                                  <td className="px-2 py-1.5 text-right font-mono font-medium text-emerald-600">15.0%</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div className="flex items-center gap-2">
                            <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-white text-xs font-medium bg-tertiary-500 hover:bg-tertiary-600">
                              <CheckIcon className="size-3" /> Apply Change
                            </button>
                            <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 text-gray-600 text-xs font-medium hover:bg-gray-200">
                              <XMarkIcon className="size-3" /> Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Input Area */}
                  <div className="p-3 border-t border-gray-100">
                    <div className="flex items-end gap-2">
                      <div className="flex-1 relative">
                        <textarea
                          value={aiInput}
                          onChange={(e) => setAiInput(e.target.value)}
                          placeholder="Ask about this order..."
                          rows={1}
                          className="w-full resize-none rounded-xl border border-gray-200 px-3 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-tertiary-300 focus:border-transparent pr-10"
                        />
                        <button className="absolute right-2 bottom-2 p-1 rounded-lg hover:bg-gray-100">
                          <PaperClipIcon className="size-4 text-gray-400" />
                        </button>
                      </div>
                      <button className="p-2.5 rounded-xl text-white bg-tertiary-500 hover:bg-tertiary-600 shrink-0">
                        <PaperAirplaneIcon className="size-4" />
                      </button>
                    </div>
                    <p className="text-center text-[10px] text-gray-300 mt-1.5">
                      AI responses are generated — always verify before applying changes
                    </p>
                  </div>
                </div>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  )
}

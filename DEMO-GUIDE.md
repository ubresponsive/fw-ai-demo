# Frameworks AI Demo — User Guide

> **Base URL:** https://fw-ai-demo.vercel.app/

---

## Disclaimer

This is a **UI/UX prototype only**. It is not connected to a database — all data you see (orders, customers, financial figures) is sample content. Nothing is saved to a server. The purpose is to test layout, navigation, and interaction patterns before building the real thing.

---

## Objective

Prototype and refine the user experience for future iterations of Frameworks. Your feedback on navigation, layout, and feature placement is exactly what we're looking for.

---

## Tech Highlights

| Area | Detail |
|------|--------|
| **Component library** | Built with [Tailwind CSS](https://tailwindcss.com/) components — easily styled, themed, and white-labelled |
| **Data tables** | Powered by [TanStack Table](https://tanstack.com/table) — sorting, filtering, pagination, and column controls out of the box |
| **Responsive** | Fully mobile-friendly; adapts from phone to desktop |
| **Active pages** | Only **3 main routes** are wired up right now (see below). In the sidebar, look for the small **teal/green dot** next to menu items — it indicates which pages are live in this demo |

---

## Key Features at a Glance

- **Mobile-friendly / Responsive** — works on phone, tablet, and desktop
- **Light & Dark Mode** — three-way toggle (Light / System / Dark)
- **Global Search** — search bar in the header with quick navigation
- **Notifications** — bell icon with unread badge and slide-out drawer
- **Help Drawer** — contextual help articles + an AI Assistant chat tab
- **AI Assistant** — available on Sales Order detail and Financial Reports pages
- **Collapsible Sidebar** — full labels or icon-only mode with hover flyouts
- **Breadcrumbs** — linked navigation trail on each page (Home links back to Dashboard)
- **Recent Activity** — timeline sidebar on the Dashboard

---

## Pages to Visit

### 1. Login

**URL:** https://fw-ai-demo.vercel.app/login

- Enter **any** name, email, and password — all three fields just need to be non-empty
- There are no specific credentials; use whatever you like (e.g. `Test User` / `test@test.com` / `password`)
- After signing in you'll land on the Dashboard

---

### 2. Dashboard

**URL:** https://fw-ai-demo.vercel.app/dashboard

What you'll see:

- **6 KPI cards** — Revenue (MTD), Sales Orders, Purchase Orders, Inventory Value, Outstanding AR, Dispatches Today — each with trend sparklines
- **Period filter buttons** (1D, 7D, 30D, etc.) above the KPIs
- **Revenue trend chart** (30-day area chart) and **Sales by Category** donut chart
- **Quick Links** grid — shortcuts to common actions
- **Recent Activity** timeline — on wide screens (1280px+), look for the floating "Recent Activity" button in the top-right to toggle the right sidebar. On smaller screens it appears inline below Quick Links

---

### 3. Sales Orders

**URL:** https://fw-ai-demo.vercel.app/sales-orders

What you'll see:

- **6 summary stat cards** at the top (Open Orders, Revenue MTD, Avg Order Value, etc.)
- **Filter bar** — text search, branch selector, type (Order/Quote), status filter, and an advanced filters toggle
- **Data table** with 20 sample orders — click column headers to sort, use the filters to narrow results
- **Click any row** to open the individual Sales Order detail page
- Footer shows order count and total value

---

### 4. Individual Sales Order (e.g. SO 436-0)

**URL:** https://fw-ai-demo.vercel.app/sales-orders/436-0

This is the most feature-rich page:

- **Order header** with status badges, customer info, and an actions dropdown menu
- **6 tabs**: Order Lines, Delivery Details, Header, Diary Notes, Messages, Tasks
- **Order Lines tab** features a full TanStack table with checkbox selection, inline search, GP% colour-coded badges, sortable columns, density toggle, and a line comments system
- **AI Assistant** — click the teal **"AI Assistant"** button in the top-right corner. A drawer slides in with quick actions, a sample conversation showing margin analysis, and a chat input

---

### 5. Financial Reports

**URL:** https://fw-ai-demo.vercel.app/financial-reports

What you'll see:

- **6 financial KPIs** with sparklines (Revenue MTD, Gross Profit, AR, AP, Cash Position, GP Margin)
- **Charts** — Revenue & Margin trend (12 months), AR Aging donut, GP% by Category bar chart
- **Favourites section** — starred reports for quick access
- **Report categories** — 6 groups (Sales & Revenue, Profitability, AR, AP, Inventory, General Ledger) with search and grid/list view toggle
- **AI Report Builder** — click the teal **"AI Report Builder"** button in the toolbar. A drawer opens with quick report templates, a sample conversation generating a branch revenue report with charts and data tables, and export options

---

## Header Toolbar Guide

All of these are in the top header bar (desktop). On mobile, some are in the expandable context strip — tap your avatar/name to reveal it.

| Feature | How to access | What it does |
|---------|---------------|--------------|
| **Search** | Click the search bar (top-left on desktop) | Shows recent searches and quick navigation links grouped by module. Type to filter results |
| **Branch Selector** | Dropdown next to company name | Switch between branches (Branch 1–10) |
| **Theme Toggle** | Light/System/Dark radio buttons in the header | Switches between light mode, dark mode, or follows your system preference |
| **Notifications** | Bell icon (top-right) | Opens a slide-out drawer with colour-coded notifications. Mark as read, dismiss individually, or clear all |
| **Help** | Question-mark icon (top-right) | Opens a drawer with two tabs: **Articles** (contextual help for the current page) and **AI Assistant** (chat interface with page-aware suggestions) |
| **Collapse Sidebar** | Double-chevron icon at the top of the sidebar | Toggles between full sidebar (with labels) and icon-only mode. In collapsed mode, hover over icons to see flyout sub-menus |
| **Logout** | Bottom of the sidebar | Clears your session and returns to the login page |

---

## Mobile Tips

- **Hamburger menu** (top-left) opens the full sidebar as a slide-out panel
- **Tap your avatar** (top-right) to expand the context strip with company name, branch selector, theme toggle, and help
- Tables scroll horizontally on smaller screens
- KPI grids reflow from 6 columns (desktop) down to 2 columns (phone)
- The Dashboard's Recent Activity section appears inline rather than as a sidebar

---

## How Local Storage Works

The demo uses your browser's storage to remember certain things between page loads:

| Storage | Key | What it stores | Cleared when? |
|---------|-----|----------------|---------------|
| **sessionStorage** | `isAuthenticated`, `userName`, `userEmail` | Your login session | Automatically when you close the browser tab |
| **localStorage** | `theme` | Your light/dark mode preference | On logout, or manually via browser dev tools |
| **localStorage** | `app-notifications` | Notification read/dismissed state | On logout, or manually |
| **localStorage** | Line comments (SO detail) | Comments added to order lines | On logout, or manually |

**Logging out** clears **both** sessionStorage and localStorage, resetting everything (theme, notifications, comments) back to defaults.

To reset without logging out, open your browser's Developer Tools → Application → Storage and clear the site data.

---

## Additional Notes

### Personalisation
- The name you enter at login appears in the sidebar and user avatar (initials are auto-generated)
- Your theme preference persists across page navigations within the same session

### Accessibility
- Keyboard navigable — Tab through interactive elements, Enter/Space to activate, Escape to close drawers/modals
- Screen reader labels on all icon-only buttons
- Semantic HTML structure (nav, main, table with proper thead/tbody)
- Focus ring indicators on interactive elements

### What's Not Wired Up
- Most sidebar menu items (those **without** a teal dot) are placeholders — they don't navigate anywhere yet
- Form submissions (New Order, Save, etc.) don't persist data
- Search results link to placeholder routes
- Charts and KPIs display static sample data — period filter buttons change the visual but the underlying data is the same sample set

---

*Have feedback? Note what works, what feels off, and what's missing. This prototype exists to be iterated on.*

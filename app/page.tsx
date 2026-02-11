export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">FW AI Mockup</h1>
        <p className="text-xl text-gray-600 mb-8">
          Enhanced ERP Solution with AI Interactivity
        </p>
        <div className="flex gap-4 justify-center">
          <a
            href="#"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Get Started
          </a>
          <a
            href="#"
            className="rounded-md border border-gray-300 px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50"
          >
            Learn More
          </a>
        </div>
      </div>
    </main>
  )
}

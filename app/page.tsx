import Link from "next/link"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-950">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100">Welcome</h2>
          <p className="text-center text-gray-500 dark:text-gray-400 mt-1">Choose your role to continue</p>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid gap-4">
            <Link href="/admin/login" className="w-full">
              <button className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md">
                Admin Login
              </button>
            </Link>
            <Link href="/user/login" className="w-full">
              <button className="w-full py-2 px-4 bg-white hover:bg-gray-100 text-gray-900 font-medium rounded-md border border-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100 dark:border-gray-600">
                User Login
              </button>
            </Link>
          </div>
        </div>
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-500 dark:text-gray-400">
          Next.js Auth Roles Demo
        </div>
      </div>
    </main>
  )
}

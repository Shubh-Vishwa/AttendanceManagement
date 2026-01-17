export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-6">
        <h1 className="text-2xl font-bold mb-8">HRMS Admin</h1>

        <nav className="space-y-4">
          <a className="block hover:text-blue-400">Dashboard</a>
          <a className="block hover:text-blue-400">Employees</a>
          <a className="block hover:text-blue-400">Attendance</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-gray-100">
        {children}
      </main>
    </div>
  );
}

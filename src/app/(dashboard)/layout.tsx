export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar placeholder – build out in features/dashboard/components */}
      <aside className="hidden w-64 border-r bg-sidebar-background p-4 lg:block">
        <nav className="space-y-2">
          <p className="text-sm font-semibold text-sidebar-foreground">
            Navigation
          </p>
          {/* Add sidebar links here */}
        </nav>
      </aside>

      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}

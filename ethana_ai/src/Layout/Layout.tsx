// Layout.tsx
import { AppSidebar } from "@/components/ui/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <SidebarProvider>
      <div className="flex w-full">

        {/* Sidebar */}
        <AppSidebar />

        {/* Main Section */}
        <div className="flex flex-1 flex-col">

          {/* Top Navbar */}
          <header className="h-14 border-b flex items-center px-4 bg-white shadow-sm">
            <SidebarTrigger className="mr-4" /> {/* Hamburger button */}
            <h1 className="text-xl font-semibold">Dashboard</h1>
          </header>

          {/* Page Content */}
          <main className="flex-1 p-6 bg-gray-50">
            <Outlet />
          </main>
        </div>

      </div>
    </SidebarProvider>
  );
};

export default Layout;

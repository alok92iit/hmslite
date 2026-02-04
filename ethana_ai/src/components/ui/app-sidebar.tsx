// components/app-sidebar.tsx

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboardIcon,

  Users,
  Building2,
} from "lucide-react";

const imgUrl = "/logo.png";

export function AppSidebar() {
  const routes = [
    {
      name: "Dashboard",
      url: "/",
      icon: LayoutDashboardIcon,
    },
    {
      name: "Employee",
      url: "/employee",
      icon: Users,
    },
    
    {
      name: "Department",
      url: "/department",
      icon: Building2 ,
    },
  ];

  return (
    <Sidebar className="border-r bg-white shadow-sm">
      {/* Logo Section */}
      <SidebarHeader className="flex flex-col items-center py-6">
        <motion.img
          src={imgUrl}
          alt="logo"
          className="w-2/3"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        />
      </SidebarHeader>

      {/* Navigation Area */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {routes.map((route, idx) => {
              const Icon = route.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      className="hover:bg-gray-100 transition-all rounded-lg px-3 py-2"
                    >
                      <Link
                        to={route.url}
                        className="flex items-center gap-3 text-[15px] font-medium"
                      >
                        <Icon size={20} className="text-gray-700" />
                        {route.name}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </motion.div>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

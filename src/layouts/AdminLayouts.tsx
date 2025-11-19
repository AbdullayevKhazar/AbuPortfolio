// src/layouts/AdminLayout.tsx
import { Outlet, Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "../components/ui/sidebar";
import { Button } from "../components/ui/button";
import {
  Package,
  Users,
  LogOut,
  Moon,
  Sun,
  Code,
  Workflow,
  Plus,
  GalleryHorizontalEnd,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function AdminLayout() {
  const location = useLocation();
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains("dark")
  );

  // Sync dark mode class
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  // Load saved theme on mount
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") setIsDark(true);
  }, []);

  const menuItems = [
    { name: "All Skills", icon: Code, path: "/admin" },
    { name: "Add Skills", icon: Package, path: "/admin/add-skill" },
    { name: "All Works", icon: Users, path: "/admin/all-works" },
    { name: "Add Works", icon: Workflow, path: "/admin/add-works" },
    { name: "Add Experience", icon: Plus, path: "/admin/add-experience" },
    {
      name: "Experience",
      icon: GalleryHorizontalEnd,
      path: "/admin/experience",
    },
  ];

  return (
    <div className="flex min-h-screen bg-background text-foreground transition-colors">
      {/* Sidebar */}
      <Sidebar className="border-r border-border">
        <SidebarHeader className="p-4 font-bold text-lg">
          Admin Panel
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Main</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <SidebarMenuItem key={item.name}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        className="w-full"
                      >
                        <Link
                          to={item.path}
                          className="flex items-center gap-2"
                        >
                          <item.icon className="w-5 h-5" />
                          {item.name}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        {/* Footer with dark mode toggle */}
        <SidebarFooter>
          <Button variant="ghost" className="gap-2">
            <LogOut className="w-5 h-5" /> Logout
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsDark((prev) => !prev)}
          >
            {isDark ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </Button>
        </SidebarFooter>
      </Sidebar>

      {/* Main Content */}
      <main className="p-2 transition-colors w-full">
        <Outlet />
      </main>
    </div>
  );
}

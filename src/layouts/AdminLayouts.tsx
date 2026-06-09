// src/layouts/AdminLayout.tsx
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
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
  SidebarInset,
  SidebarTrigger,
  useSidebar,
} from "../components/ui/sidebar";
import { Button } from "../components/ui/button";
import {
  Gauge,
  BookOpen,
  BookPlus,
  BadgePlus,
  BriefcaseBusiness,
  CirclePlus,
  FolderPlus,
  LogOut,
  Sun,
  Moon,
  Home,
  PanelsTopLeft,
  Wrench,
  UserCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { clearAdminAuth, getAdminAuth } from "../utils/adminAuth";

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { setOpenMobile } = useSidebar();
  const admin = getAdminAuth()?.user;
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains("dark"),
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

  const menuGroups = [
    {
      label: "Content",
      items: [
        { name: "Skills", icon: Wrench, path: "/admin", exact: true },
        {
          name: "Add skill",
          icon: BadgePlus,
          path: "/admin/add-skill",
        },
        {
          name: "Projects",
          icon: PanelsTopLeft,
          path: "/admin/all-works",
        },
        {
          name: "Add project",
          icon: FolderPlus,
          path: "/admin/add-works",
        },
      ],
    },
    {
      label: "Profile",
      items: [
        {
          name: "Education",
          icon: BookOpen,
          path: "/admin/educations",
        },
        {
          name: "Add education",
          icon: BookPlus,
          path: "/admin/add-educations",
        },
        {
          name: "Experiences",
          icon: BriefcaseBusiness,
          path: "/admin/experience",
        },
        {
          name: "Add experience",
          icon: CirclePlus,
          path: "/admin/add-experience",
        },
      ],
    },
  ];

  const handleLogout = () => {
    clearAdminAuth();
    navigate("/admin/login", { replace: true });
  };

  return (
    <>
      <title>Admin Pages</title>
      <meta name="robots" content="noindex,follow" />
      <div className="flex min-h-svh bg-background text-foreground transition-colors">
        <Sidebar collapsible="icon" className="border-r border-border">
          <SidebarHeader className="border-b border-sidebar-border p-4">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white">
                <Gauge className="size-5" />
              </div>
              <div className="min-w-0 group-data-[collapsible=icon]:hidden">
                <p className="truncate font-bold">Admin Panel</p>
                <p className="truncate text-xs text-muted-foreground">
                  Portfolio manager
                </p>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent>
            {menuGroups.map((group) => (
              <SidebarGroup key={group.label}>
                <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {group.items.map((item) => {
                      const isActive = item.exact
                        ? location.pathname === item.path
                        : location.pathname.startsWith(item.path);
                      return (
                        <SidebarMenuItem key={item.name}>
                          <SidebarMenuButton
                            asChild
                            isActive={isActive}
                            className="w-full"
                            title={item.name}
                          >
                            <Link
                              to={item.path}
                              className="flex items-center gap-2"
                              onClick={() => setOpenMobile(false)}
                            >
                              <item.icon className="size-4" />
                              <span>{item.name}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      );
                    })}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))}
          </SidebarContent>

          <SidebarFooter className="border-t border-sidebar-border p-3 flex flex-col items-start">
            {" "}
            <div className="mb-1 flex items-center gap-2 overflow-hidden px-2 py-1 group-data-[collapsible=icon]:hidden">
              <UserCircle className="size-8 shrink-0 text-muted-foreground" />
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">
                  {admin?.username || "Administrator"}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {admin?.email}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              className="justify-start gap-2"
              onClick={() => navigate("/")}
              title="View website"
            >
              <Home className="size-4" />
              <span className="group-data-[collapsible=icon]:hidden">
                View website
              </span>
            </Button>
            <Button
              variant="ghost"
              className="justify-start gap-2"
              onClick={() => setIsDark((prev) => !prev)}
              title="Toggle theme"
            >
              {isDark ? (
                <Sun className="size-4" />
              ) : (
                <Moon className="size-4" />
              )}
              <span className="group-data-[collapsible=icon]:hidden">
                {isDark ? "Light mode" : "Dark mode"}
              </span>
            </Button>
            <Button
              variant="ghost"
              className="justify-start gap-2 text-red-500 hover:text-red-600"
              onClick={handleLogout}
              title="Logout"
            >
              <LogOut className="size-4" />
              <span className="group-data-[collapsible=icon]:hidden">
                Logout
              </span>
            </Button>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset>
          <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b bg-background/90 px-4 backdrop-blur">
            <SidebarTrigger className="size-9" />
            <div>
              <p className="text-sm font-semibold">Portfolio management</p>
              <p className="text-xs text-muted-foreground">
                Manage your public content
              </p>
            </div>
          </header>
          <main className="w-full flex-1 p-4 md:p-6">
            <Outlet />
          </main>
        </SidebarInset>
      </div>
    </>
  );
}

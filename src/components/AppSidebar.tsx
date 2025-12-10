import { Home, Ship } from "lucide-react";
import Image from "./global/Image";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "./ui/sidebar";
import { Link, useLocation } from "react-router-dom";

const AppSidebar = () => {
  const location = useLocation();

  return (
    <Sidebar collapsible="icon" side="left">
      <SidebarHeader className="py-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to="/">
                <Image
                  src="/logo.jpeg"
                  alt="Logo"
                  className="rounded-full w-4 h-4 object-cover"
                />
                <span className="ms-4">BOAT</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarSeparator className="ms-0 mb-3" />

      <SidebarContent className="mx-1.5">
        <SidebarMenu>
            <SidebarMenuItem className="mb-1">
                <SidebarMenuButton asChild isActive={location.pathname === "/"}>
                <Link to="/">
                  <Home className="me-2" />
                  <span>Dashboard</span>
                </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={location.pathname.startsWith("/piers")}>
                <Link to="/piers">
                  <Ship className="me-2" />
                  <span>Piers</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;

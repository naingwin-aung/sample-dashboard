import Image from "./global/Image";
import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "./ui/sidebar";
import { Link } from "react-router-dom";

const AppSidebar = () => {  
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
                <span className="ms-4">Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarSeparator className="ms-0" />
    </Sidebar>
  );
};

export default AppSidebar;

import { SidebarTrigger } from "./ui/sidebar"

const Navbar = () => {
  return (
    <nav className="p-4 flex items-center justify-between">
        <SidebarTrigger />
    </nav>
  )
}

export default Navbar
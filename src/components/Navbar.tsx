import { SidebarTrigger } from "./ui/sidebar"

const Navbar = () => {
  return (
    <nav className="p-3 flex items-center justify-between">
        <SidebarTrigger />
    </nav>
  )
}

export default Navbar
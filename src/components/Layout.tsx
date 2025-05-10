import { Outlet } from "react-router"
import { Footer } from "./Footer.tsx";
import { NavigationSidebar } from "./NavigationSidebar.tsx";

export function Layout() {
  return (
    <div className="h-full min-h-[100vh] flex gap-x-3 justify-between pr-12">
      <NavigationSidebar />
      <div className="flex flex-1 flex-col items-center gap-y-3">
        <Outlet/>
        <Footer/>
      </div>
    </div>
  )
}
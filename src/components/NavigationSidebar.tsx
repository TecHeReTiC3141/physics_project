import logo from '../../public/favicon/logo.png';
import { Link } from "react-router";

export function NavigationSidebar() {
  return (
    <div className="flex flex-col items-center gap-y-10 py-6 px-3 bg-blue-200">
      <Link to="/" className="btn btn-circle btn-lg">
        <img alt="logo" src={logo as string}/>
      </Link>
      <div className="flex flex-col gap-y-6">

        <Link to="/lab102" className="button">1.02</Link>
        <Link to="/lab307" className="button">3.07</Link>
      </div>
    </div>
  )
}
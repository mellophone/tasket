import NavLogo from "./NavLogo";
import NavLink from "./NavLink";
import "./NavBar.css";

const NavBar = () => {
  return (
    <div className="nav-bar-area">
      <div className="nav-bar">
        <NavLogo />
        <NavLink page="Home" />
        <NavLink page="Events" />
        <NavLink page="Assignments" />
        <NavLink page="Planner" />
        <NavLink page="Settings" />
      </div>
      <hr />
    </div>
  );
};

export default NavBar;

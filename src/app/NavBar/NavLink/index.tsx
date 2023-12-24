"use client";
import "./NavLink.css";

const NavLink = (params: { page: string }) => {
  const href = `/${params.page}`.toLowerCase();

  return (
    <div className="nav-link-area">
      <a className="nav-link" href={href}>
        {params.page}
      </a>
    </div>
  );
};

export default NavLink;

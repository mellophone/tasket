import Link from "next/link";
import { usePathname } from "next/navigation";
import "./NavLink.css";

const NavLink = (params: { page: string }) => {
  const pathname = usePathname();
  const href = `/${params.page}`.toLowerCase();

  return (
    <Link href={href} className="nav-link-area">
      <span
        className={`nav-link medium-text ${
          pathname.indexOf(`${href}`) === 0 ? "underlined" : ""
        }`}
      >
        {params.page}
      </span>
    </Link>
  );
};

export default NavLink;

"use client";
import { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";
import "./NavLink.css";

const NavLink = (params: {
  page: string;
  currentPageState: [string, Dispatch<SetStateAction<string>>];
}) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = params.currentPageState;

  const href = `/${params.page}`.toLowerCase();

  const goToPage = () => {
    setCurrentPage(params.page);
    router.push(href);
  };

  return (
    <a className="nav-link-area" onClick={goToPage}>
      <span
        className={`nav-link medium-text ${
          currentPage === params.page ? "underlined" : ""
        }`}
      >
        {params.page}
      </span>
    </a>
  );
};

export default NavLink;

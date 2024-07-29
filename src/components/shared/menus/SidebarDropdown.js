import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./MenuSidebar.css";

const SidebarDropdown = ({ item }) => {
  const pathname = usePathname();

  return (
    <>
      <ul className="child-menu-list">
        {item.map((item, index) => (
          <li key={index}>
            <Link
              href={item.route}
              className={`title ${pathname === item.route ? "text-white" : ""}`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default SidebarDropdown;

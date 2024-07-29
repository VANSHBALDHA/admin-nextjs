import React from "react";
import Link from "next/link";

import { usePathname } from "next/navigation";
import { IoIosArrowDown } from "react-icons/io";
import "./MenuSidebar.css";
import SidebarDropdown from "./SidebarDropdown";

const SidebarItem = ({ item, pageName, setPageName }) => {
  const handleClick = () => {
    const updatedPageName =
      pageName !== item.label.toLowerCase() ? item.label.toLowerCase() : "";
    return setPageName(updatedPageName);
  };

  const pathname = usePathname();

  const isActive = (item) => {
    if (item.route === pathname) return true;
    if (item.children) {
      return item.children.some((child) => isActive(child));
    }
    return false;
  };

  const isItemActive = isActive(item);

  return (
    <>
      <li className="menu-list">
        <Link
          href={item.route}
          onClick={handleClick}
          className={`${isItemActive ? "active" : ""} menu-list-route`}
        >
          <span className="menu-main-icon">{item.icon}</span>
          {item.label}
          {item.children && (
            <IoIosArrowDown
              className={`menu-arrow-icon ${
                pageName === item.label.toLowerCase() && "change-icon"
              }`}
            />
          )}
        </Link>

        {item.children && (
          <div
            className={`child-menu-box ${
              pageName !== item.label.toLowerCase() && "hidden"
            }`}
          >
            <SidebarDropdown item={item.children} />
          </div>
        )}
      </li>
    </>
  );
};

export default SidebarItem;

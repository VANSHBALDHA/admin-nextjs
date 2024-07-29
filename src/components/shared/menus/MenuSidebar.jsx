"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import "./MenuSidebar.css";
import { RxDashboard } from "react-icons/rx";
import { FiUser } from "react-icons/fi";
import {
  IoBarChartOutline,
  IoSettingsOutline,
  IoTicketOutline,
} from "react-icons/io5";
import { MdOutlineInventory2, MdOutlineShoppingCart } from "react-icons/md";
import { LuUsers2 } from "react-icons/lu";
import { FaRegFileAlt } from "react-icons/fa";
import { BsListTask } from "react-icons/bs";
import { AiOutlineSetting } from "react-icons/ai";
import ClickOutside from "./ClickOutside";
import SidebarItem from "./SidebarItem";
import useLocalStorage from "./useLocalStorage";

const MenuSidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const menuGroups = [
    {
      name: "MENU",
      menuItems: [
        {
          icon: <RxDashboard />,
          label: "Dashboard",
          route: "/",
        },
        {
          icon: <LuUsers2 />,
          label: "Manage Sub Admin Users",
          route: "/manage-admin-users",
        },
        {
          icon: <IoSettingsOutline />,
          label: "Master Managements",
          route: "#",
          children: [
            {
              label: "Display Name",
              route: "/master-managements/display-name",
            },
            {
              label: "Manage Certificate",
              route: "/master-managements/manage-certificate",
            },
            {
              label: "Manage Brand",
              route: "/master-managements/manage-brand",
            },
            {
              label: "Manage Categories",
              route: "/master-managements/manage-categories",
            },
            {
              label: "Manage Sub Categories",
              route: "/master-managements/manage-sub-categories",
            },
            {
              label: "Manage Sub Sub-Categories",
              route: "/master-managements/manage-sub-sub-categories",
            },
          ],
        },
        {
          icon: <MdOutlineShoppingCart />,
          label: "Manage Products",
          route: "/manage-products",
        },
        {
          icon: <MdOutlineInventory2 />,
          label: "Manage Inventory",
          route: "#",
          children: [
            {
              label: "Display ",
              route: "/manage-inventory/display",
            },
            {
              label: "Reserved",
              route: "/manage-inventory/reserved",
            },
            {
              label: "Sales",
              route: "/manage-inventory/sales",
            },
          ],
        },
        {
          icon: <FiUser />,
          label: "Manage Customers",
          route: "#",
          children: [
            {
              label: "Individual",
              route: "/manage-customer/individual-customer",
            },
            {
              label: "Corporate",
              route: "/manage-customer/corporate-customer",
            },
          ],
        },
        {
          icon: <BsListTask />,
          label: "Manage Request",
          route: "#",
          children: [
            {
              label: "Cart",
              route: "/manage-request/cart",
            },
            {
              label: "Quote",
              route: "/manage-request/quotes",
            },
            {
              label: "BOM",
              route: "/manage-request/bom",
            },
            {
              label: "New Product",
              route: "/manage-request/new-product",
            },
            {
              label: "Contact",
              route: "/manage-request/contact",
            },
          ],
        },
        {
          icon: <IoTicketOutline />,
          label: "Manage Ticket",
          route: "/manage-ticket",
        },
        {
          icon: <FaRegFileAlt />,
          label: "Manage Contents",
          route: "#",
          children: [
            {
              label: "Blogs",
              route: "/manage-contents/blogs",
            },
            {
              label: "Banner",
              route: "/manage-contents/banner",
            },
            {
              label: "Legal",
              route: "/manage-contents/legal",
            },
          ],
        },
        {
          icon: <IoBarChartOutline />,
          label: "Generate Reports",
          route: "/generate-reports",
        },
        {
          icon: <AiOutlineSetting />,
          label: "Settings",
          route: "/settings",
        },
      ],
    },
  ];

  const [pageName, setPageName] = useLocalStorage("selectedMenu", "dashboard");

  return (
    <>
      <ClickOutside onClick={() => setSidebarOpen(false)}>
        <aside
          className={`sidebar-start ${sidebarOpen ? "active" : "disabled"}`}
        >
          <div className="sidebar-logo">
            <Link href="/">
              <Image
                width={176}
                height={32}
                src="/img/new-logo.png"
                alt="Logo"
                priority
              />
            </Link>

            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-controls="sidebar"
              className="sidebar-btn"
            >
              <svg
                className="fill-current"
                width="20"
                height="18"
                viewBox="0 0 20 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
                  fill=""
                />
              </svg>
            </button>
          </div>
          {/* <!-- SIDEBAR HEADER --> */}

          <div className="sidebar-menu">
            {/* <!-- Sidebar Menu --> */}
            <nav className="sidebar-menu-nav">
              {menuGroups.map((group, groupIndex) => (
                <div key={groupIndex}>
                  {/* <h3 className="sidebar-menu-nav-title">{group.name}</h3> */}

                  <ul className="">
                    {group.menuItems.map((menuItem, menuIndex) => (
                      <SidebarItem
                        key={menuIndex}
                        item={menuItem}
                        pageName={pageName}
                        setPageName={setPageName}
                      />
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
            {/* <!-- Sidebar Menu --> */}
          </div>
        </aside>
      </ClickOutside>
    </>
  );
};

export default MenuSidebar;

import React from 'react';
import { NavLink } from 'react-router-dom';
import { RiDashboardLine, RiAddCircleLine, RiFileList3Line, RiShoppingBag3Line } from "react-icons/ri";

function Sidebar() {
  const links = [
    { name: "Dashboard", path: "/", icon: RiDashboardLine },
    { name: "Add Product", path: "/add", icon: RiAddCircleLine },
    { name: "Product List", path: "/lists", icon: RiFileList3Line },
    { name: "All Orders", path: "/orders", icon: RiShoppingBag3Line },
  ];

  return (
    <aside className="w-16 sm:w-64 min-h-screen bg-slate-900/60 backdrop-blur-xl border-r border-slate-800 fixed left-0 top-[70px] pt-6 z-30">
      <div className="flex flex-col gap-2 px-2 sm:px-4">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                }`
              }
            >
              <Icon className="text-lg shrink-0" />
              <span className="hidden sm:inline">{link.name}</span>
            </NavLink>
          );
        })}
      </div>
    </aside>
  );
}

export default Sidebar;

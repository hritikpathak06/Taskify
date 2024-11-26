"use client";
import {
  GroupIcon,
  HomeIcon,
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

const Sidebar = () => {
  const { pathname } = useLocation();

  return (
    <>
      <div className=" md:border-t-2  mt-2 text-sm  p-4">
        {sidebarItems.map((t, i) => {
          return (
            <div key={i} className=" flex flex-col gap-2 ">
              <span className=" hidden lg:block text-gray-400 font-light my-4">
                {t.title}
              </span>
              {t.items.map((item, i) => {
                return (
                  <NavLink
                    to={item.link}
                    className={`flex items-center justify-center lg:justify-start gap-4 text-gray-600 py-2 px-2 ${
                      pathname === item.link ? "bg-green-300" : null
                    } rounded-md`}
                    key={i}
                  >
                    {item.icon}
                    <span className=" hidden lg:block"> {item.label}</span>
                  </NavLink>
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Sidebar;

const sidebarItems = [
  {
    title: "MENU",
    items: [
      {
        icon: <HomeIcon />,
        label: "Dashboard",
        link: "/dashboard",
      },
      {
        icon: <GroupIcon />,
        label: "My Tasks",
        link: "/dashboard/tasks",
      },
    ],
  },
];

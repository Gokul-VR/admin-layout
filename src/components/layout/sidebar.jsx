import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Home,
  BarChart,
  Users,
  Settings,
  HelpCircle,
  LogOut,
  ChevronDown,
  KeyRound
} from "lucide-react";

const sidebarItems = [
  { icon: Home, label: "Dashboard", to: "/dashboard" },
  { icon: BarChart, label: "Analytics", to: "/analytics" },
  {
    icon: Users,
    label: "Customers",
    to: "#",
    children: [
      { label: "Sales Customer", to: "/customers/sales" },
      { label: "Market", to: "/customers/market" },
    ],
  },
  {
    icon: Settings,
    label: "Settings",
    to: "/settings",
  },
  { icon: HelpCircle, label: "Help & Support", to: "/help" },
  { icon: KeyRound, label: "Auth Page", to: "/authPage" },
];

const logoutItem = { icon: LogOut, label: "Logout", to: "/logout" };

function NavItem({
  icon: Icon,
  label,
  to,
  isCollapsed,
  children,
  isOpen,
  toggleOpen,
}) {
  const location = useLocation();
  const isActive =
    location.pathname === to ||
    (children && children.some((child) => location.pathname === child.to));

  const [showPopover, setShowPopover] = useState(false);
  const popoverRef = useRef(null);
  const buttonRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        popoverRef.current &&
        buttonRef.current &&
        !popoverRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setShowPopover(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleClick = (e) => {
    if (children) {
      e.preventDefault();
      if (isCollapsed) {
        setShowPopover(!showPopover);
      } else {
        toggleOpen();
      }
    }
  };

  return (
    <li className="list-none">
      <NavLink
        to={!children ? to : "#"}
        ref={buttonRef}
        className={`group flex items-center justify-between rounded-xl px-4 py-3 transition-colors duration-200 ease-in cursor-pointer ${
          isActive
            ? "bg-[#333335] text-white"
            : "text-muted-foreground hover:bg-gray-200"
        } `}
        onClick={handleClick}
      >
        <div className="flex items-center gap-3 h-7">
          <Icon className="h-5 w-5 shrink-0 text-muted-foreground" />
          {!isCollapsed && <span className="truncate">{label}</span>}

          {children && isCollapsed && showPopover && (
            <div
              ref={popoverRef}
              className="absolute left-20 bg-white rounded-xl shadow-lg border border-gray-200 min-w-48 py-2 transition-all duration-200"
            >
              <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-r-4 border-b-4 border-t-transparent border-r-white border-b-transparent"></div>
              <div className="px-2 flex flex-col gap-y-1">
                {children.map((child, index) => {
                  const isChildActive = location.pathname === child.to;
                  return (
                    <NavLink
                      key={index}
                      to={child.to}
                      className={`block px-3 py-3 text-sm transition-all rounded-xl ${
                        isChildActive
                          ? "bg-gray-200 text-gray-900"
                          : "text-black hover:bg-gray-200"
                      }`}
                      onClick={() => setShowPopover(false)}
                    >
                      {child.label}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          )}
        </div>
        {children && !isCollapsed && (
          <ChevronDown
            className={`h-4 w-4 transition-transform ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        )}
      </NavLink>{" "}
      {children && isOpen && !isCollapsed && (
        <ul className="pl-8 mt-1 space-y-1">
          {children.map((child, index) => {
            const isChildActive = location.pathname === child.to;
            return (
              <li key={index}>
                <NavLink
                  to={child.to}
                  className={`block px-3 py-3 text-sm transition-all rounded-xl ${
                    isChildActive
                      ? "bg-gray-200 text-gray-900"
                      : "text-muted-foreground hover:bg-gray-200"
                  }`}
                >
                  {child.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      )}
    </li>
  );
}
export default function Sidebar({ openNav }) {
  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (label) => {
    setOpenMenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <div
      className={`flex h-full flex-col bg-white transition-all duration-300 ease-in-out ${
        openNav ? "w-60" : "w-19"
      }`}
    >
      <div className="flex h-16 items-center px-5.5">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
            <span className="text-lg font-bold text-primary-foreground">A</span>
          </div>
          {openNav && <span className="text-lg font-semibold">Layout</span>}
        </div>
      </div>

      <div className="flex-1 overflow-x-hidden py-4">
        <nav className="grid px-3">
          <ul className="grid gap-1 list-none">
            {sidebarItems.map((item, index) => (
              <NavItem
                key={index}
                icon={item.icon}
                label={item.label}
                to={item.to}
                isCollapsed={!openNav}
                children={item.children}
                isOpen={openMenus[item.label]}
                toggleOpen={() => toggleMenu(item.label)}
              />
            ))}
          </ul>
        </nav>
      </div>

      <div className="py-4 ">
        <nav className="grid px-3">
          <ul className="list-none">
            <NavItem
              icon={logoutItem.icon}
              label={logoutItem.label}
              to={logoutItem.to}
              isCollapsed={!openNav}
            />
          </ul>
        </nav>
      </div>
    </div>
  );
}

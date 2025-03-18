import { useState, useCallback, useEffect } from "react";
import Header from "./header";
import Sidebar from "./sidebar";
import { Outlet } from "react-router-dom";

export default function Layout({ children }) {
  const [openNav, setOpenNav] = useState(true);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const handleSetOpenNav = useCallback((isOpen) => {
    setOpenNav(isOpen);
  }, []);

  const toggleMobileNav = useCallback(() => {
    setMobileNavOpen((prev) => !prev);
  }, []);

  // useEffect(() => {
  //   const handleResize = () => {
  //     if (window.innerWidth >= 768) {
  //       setMobileNavOpen(false); // Close mobile nav on larger screens
  //     }
  //   };

  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  return (
    <div className="flex min-h-screen">
      {mobileNavOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => {
            setOpenNav(true);
            setMobileNavOpen(false);
          }}
        />
      )}

      <div
        className={`fixed inset-y-0 left-0 z-[49] md:z-[49] transform transition-transform duration-300 ease-in-out ${
          mobileNavOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } ${openNav ? "md:w-60" : "md:w-19"} h-screen`}
      >
        <Sidebar openNav={openNav} setOpenNav={handleSetOpenNav} />
      </div>
      <div
        className={`flex flex-col flex-1 w-full transition-all duration-300 ease-in-out  ${
          openNav ? "md:pl-60" : "md:pl-19"
        }`}
      >
        <Header
          openNav={openNav}
          setOpenNav={handleSetOpenNav}
          toggleMobileNav={toggleMobileNav}
        />
        <main className="flex-1 flex flex-col bg-gray-50 p-4 md:p-6 mt-[-15px] transition-all duration-300 ease-in-out ">
          {children}
          <Outlet />
        </main>
      </div>
    </div>
  );
}

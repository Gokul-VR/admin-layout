// import { Menu, ChevronLeft, ChevronRight, Bell, User } from "lucide-react";

// export default function Header({ openNav, setOpenNav, toggleMobileNav }) {
//     return (
//       <header className="sticky top-0 z-30 flex h-16 items-center gap-4 bg-white px-4 md:px-6 justify-between">
//         <button
//           onClick={toggleMobileNav}
//           className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground md:hidden"
//           aria-label="Toggle mobile navigation"
//         >
//           <Menu className="h-5 w-5" />
//         </button>

//         <button
//           onClick={() => setOpenNav(!openNav)}
//           className="hidden md:inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
//           aria-label="Toggle sidebar"
//         >
//           {openNav ? (
//             <ChevronLeft className="h-5 w-5" />
//           ) : (
//             <ChevronRight className="h-5 w-5" />
//           )}
//         </button>

//         <div className="flex items-center gap-4">
//           <button className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground relative">
//             <Bell className="h-5 w-5" />
//             <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
//           </button>

//           <div className="flex items-center gap-2">
//             <div className="hidden md:block">
//               <div className="text-sm font-medium">John Doe</div>
//               <div className="text-xs text-muted-foreground">Admin</div>
//             </div>
//           </div>
//         </div>
//       </header>
//     );
//   }
// import { useState, useRef, useEffect } from "react";
// import { Menu, ChevronLeft, ChevronRight, Bell, MoreVertical } from "lucide-react";
// import { Popover } from "../customComponents/popover";

// export default function Header({ openNav, setOpenNav, toggleMobileNav }) {
//   const [isPopoverOpen, setIsPopoverOpen] = useState(false);
//   const [notifications, setNotifications] = useState([
//     { id: 1, title: "New user registered", time: "2 mins ago", read: false },
//     { id: 2, title: "System update completed", time: "5 hours ago", read: true },
//     { id: 3, title: "You have a new message", time: "1 day ago", read: false },
//     { id: 4, title: "Payment received", time: "3 days ago", read: false },
//   ]);
//   const [isOptionsOpen, setIsOptionsOpen] = useState(false);
//   const bellButtonRef = useRef(null);
//   const optionsRef = useRef(null);

//   const togglePopover = () => {
//     setIsPopoverOpen(!isPopoverOpen);
//     setIsOptionsOpen(false);
//   };

//   const toggleOptions = () => {
//     setIsOptionsOpen((prev) => !prev);
//   };

//   const markAllAsRead = () => {
//     setNotifications((prevNotifications) =>
//       prevNotifications.map((notification) => ({
//         ...notification,
//         read: true,
//       }))
//     );
//     setIsOptionsOpen(false);
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (

//         optionsRef.current &&
//         !optionsRef.current.contains(event.target)
//       ) {
//         setIsOptionsOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <header className="sticky top-0 z-30 flex h-16 items-center gap-4 bg-white px-4 md:px-6 justify-between">
//       <button
//         onClick={toggleMobileNav}
//         className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground md:hidden"
//         aria-label="Toggle mobile navigation"
//       >
//         <Menu className="h-5 w-5" />
//       </button>

//       <button
//         onClick={() => setOpenNav(!openNav)}
//         className="hidden md:inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
//         aria-label="Toggle sidebar"
//       >
//         {openNav ? (
//           <ChevronLeft className="h-5 w-5" />
//         ) : (
//           <ChevronRight className="h-5 w-5" />
//         )}
//       </button>

//       <div className="flex items-center gap-4 relative ">
//         <button
//           ref={bellButtonRef}
//           onClick={togglePopover}
//           className="dropdown-toggle inline-flex items-center justify-center rounded-md p-2  hover:bg-accent hover:text-accent-foreground relative cursor-pointer"
//         >
//           <Bell className="h-5 w-5" />
//           <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
//         </button>

//         <Popover
//           isOpen={isPopoverOpen}
//           onClose={() => setIsPopoverOpen(false)}
//           className="w-90"
//           style={{
//             top: 45,
//             right: 70,
//           }}
//         >
//           <div className="p-4 flex justify-between items-center border-b border-gray-200">
//             <h3 className="text-sm font-semibold">Notifications</h3>
//             <button
//               ref={optionsRef}
//               onClick={toggleOptions}
//               className="p-1 rounded-md hover:bg-gray-100 cursor-pointer"
//             >
//               <MoreVertical className="h-5 w-5" />
//             </button>
//             {isOptionsOpen && (
//               <div className="absolute right-5 top-12 w-36 bg-white border border-gray-200 rounded-lg shadow-md p-1">
//                 <button
//                   className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm rounded-md"
//                   onClick={markAllAsRead}
//                 >
//                   Mark all as read
//                 </button>
//               </div>
//             )}
//           </div>
//           <div className="max-h-80 overflow-auto p-1">
//             {notifications.map((notification) => (
//               <div
//                 key={notification.id}
//                 className={`p-4 mb-1 rounded-md ${
//                   notification.read ? "bg-white" : "bg-gray-50"
//                 } hover:bg-gray-100 transition-colors duration-200`}
//               >
//                 <p className="text-sm font-medium">{notification.title}</p>
//                 <p className="text-xs text-gray-500 mt-1">
//                   {notification.time}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </Popover>

//         <div className="flex items-center gap-2">
//           <div className="hidden md:block">
//             <div className="text-sm font-medium">John Doe</div>
//             <div className="text-xs text-muted-foreground">Admin</div>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }
import { useState, useRef, useEffect } from "react";
import {
  Menu,
  ChevronLeft,
  ChevronRight,
  Bell,
  MoreVertical,
} from "lucide-react";
import { Popover } from "../customComponents/popover";

export default function Header({ openNav, setOpenNav, toggleMobileNav }) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: "New user registered", time: "2 mins ago", read: false },
    {
      id: 2,
      title: "System update completed",
      time: "5 hours ago",
      read: true,
    },
    { id: 3, title: "You have a new message", time: "1 day ago", read: false },
    { id: 4, title: "Payment received", time: "3 days ago", read: false },
  ]);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [popoverPosition, setPopoverPosition] = useState({ top: 0, right: 0 });
  const bellButtonRef = useRef(null);
  const optionsRef = useRef(null);

  const togglePopover = () => {
    if (bellButtonRef.current) {
      const bellRect = bellButtonRef.current.getBoundingClientRect();

      setPopoverPosition({
        top: bellRect.bottom,
        // right: window.innerWidth - bellRect.right - bellRect.width / 2,
        right:
          document.documentElement.clientWidth -
          bellRect.right -
          bellRect.width / 2,
      });
    }
    setIsPopoverOpen(!isPopoverOpen);
    setIsOptionsOpen(false);
  };

  const toggleOptions = () => {
    setIsOptionsOpen((prev) => !prev);
  };

  const markAllAsRead = (e) => {
    e.stopPropagation();
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
    setIsOptionsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        optionsRef.current &&
        !optionsRef.current.contains(event.target) &&
        !event.target.closest(".mark-all-read-button")
      ) {
        setIsOptionsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 bg-white px-4 md:px-6 justify-between">
      <button
        onClick={toggleMobileNav}
        className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground md:hidden"
        aria-label="Toggle mobile navigation"
      >
        <Menu className="h-5 w-5" />
      </button>

      <button
        onClick={() => setOpenNav(!openNav)}
        className="hidden md:inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
        aria-label="Toggle sidebar"
      >
        {openNav ? (
          <ChevronLeft className="h-5 w-5" />
        ) : (
          <ChevronRight className="h-5 w-5" />
        )}
      </button>

      <div className="flex items-center gap-4 relative">
        <button
          ref={bellButtonRef}
          onClick={togglePopover}
          className="dropdown-toggle inline-flex items-center justify-center rounded-md p-2 hover:bg-accent hover:text-accent-foreground relative cursor-pointer"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
        </button>

        <Popover
          isOpen={isPopoverOpen}
          onClose={() => setIsPopoverOpen(false)}
          className="w-90"
          style={{
            top: popoverPosition.top,
            right: popoverPosition.right,
          }}
        >
          <div className="p-4 flex justify-between items-center border-b border-gray-200">
            <h3 className="text-sm font-semibold">Notifications</h3>
            <button
              ref={optionsRef}
              onClick={toggleOptions}
              className="p-1 rounded-md hover:bg-gray-100 cursor-pointer"
            >
              <MoreVertical className="h-5 w-5" />
            </button>
            {isOptionsOpen && (
              <div className="absolute right-5 top-12 w-36 bg-white border border-gray-200 rounded-lg shadow-md p-1">
                <button
                  className="mark-all-read-button w-full text-left px-4 py-2 hover:bg-gray-100 text-sm rounded-md"
                  onClick={markAllAsRead}
                >
                  Mark all as read
                </button>
              </div>
            )}
          </div>
          <div className="max-h-80 overflow-auto p-1">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 mb-1 rounded-md ${
                  notification.read ? "bg-white" : "bg-gray-50"
                } hover:bg-gray-100 transition-colors duration-200`}
              >
                <p className="text-sm font-medium">{notification.title}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {notification.time}
                </p>
              </div>
            ))}
          </div>
        </Popover>

        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <div className="text-sm font-medium">Jennifer</div>
            <div className="text-xs text-muted-foreground">Admin</div>
          </div>
        </div>
      </div>
    </header>
  );
}

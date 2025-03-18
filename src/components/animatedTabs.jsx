import { useState } from "react";
import { motion } from "framer-motion";
import { Home, User, Settings, Phone, Palette } from "lucide-react";

const tabs = [
  { id: 1, label: "Home", icon: <Home size={20} /> },
  { id: 2, label: "Profile", icon: <User size={20} /> },
  { id: 3, label: "Settings", icon: <Settings size={20} /> },
  { id: 4, label: "Contact", icon: <Phone size={20} /> },
  { id: 5, label: "Theme", icon: <Palette size={20} /> },
];

export default function AnimatedTabs() {
  const [selected, setSelected] = useState(1);
  const [enableStiffness, setEnableStiffness] = useState(true);

  return (
    <div className="flex flex-row items-center justify-center min-h-screen bg-white p-6 space-x-12">
      <div className="text-left max-w-md">
        <h2 className="text-lg font-semibold">Animated Tabs</h2>
        <p className="text-gray-500">
          Smooth sliding highlight effect when items are clicked,
          making selections stand out!
        </p>
        <div className="mt-3 flex space-x-2">
          <span className="bg-gray-100 px-2 py-1 rounded text-sm text-gray-500">
            react
          </span>
          <span className="bg-gray-100 px-2 py-1 rounded text-sm text-gray-500">
            tailwindcss
          </span>
          <span className="bg-gray-100 px-2 py-1 rounded text-sm text-gray-500">
            typescript
          </span>
          <span className="bg-gray-100 px-2 py-1 rounded text-sm text-gray-500">
            framer-motion
          </span>
        </div>
        <div className="mt-4 flex items-start space-x-2">
          <span className="text-sm text-gray-500">Stiffness</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={enableStiffness}
              onChange={() => setEnableStiffness(!enableStiffness)}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-gray-300 peer-focus:outline-none peer-focus:ring-0 rounded-full peer dark:bg-gray-500 peer-checked:after:translate-x-4 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-gray-500"></div>
          </label>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center bg-gray-100 p-6 rounded-xl h-[300px]">
        <div className="flex space-x-4 bg-white p-2 rounded-xl shadow-sm w-fit relative">
          {tabs.map((tab) => (
            <div key={tab.id} className="relative">
              <button
                className={`p-3 rounded-xl transition-all relative z-10 ${
                  selected === tab.id ? "text-black" : "text-gray-500"
                }`}
                onClick={() => setSelected(tab.id)}
              >
                {tab.icon}
              </button>
              {selected === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gray-100 rounded-xl"
                  transition={
                    enableStiffness
                      ? { type: "spring", stiffness: 300, damping: 25 }
                      : { duration: 0.2, ease: "easeInOut" }
                  }
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

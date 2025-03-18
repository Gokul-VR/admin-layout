import React from "react";

import {
  CreditCard,
  DollarSign,
  Package,
  ShoppingCart,
  TrendingDown,
  TrendingUp,
  User2,
  Users,
} from "lucide-react";
import UserTable from "./userTable";

function Dashboard() {
  const cards = [
    {
      title: "Total Users",
      value: "12,345",
      icon: <User2 />,
      bg: "bg-blue-400",
    },
    {
      title: "Revenue",
      value: "$98,765",
      icon: <DollarSign />,
      bg: "bg-green-400",
    },
    {
      title: "Orders",
      value: "3,210",
      icon: <ShoppingCart />,
      bg: "bg-yellow-400",
    },
    {
      title: "Growth",
      value: "+12.5%",
      icon: <TrendingUp />,
      bg: "bg-red-400",
    },
  ];
  function StatCard({ title, value, change, trend, icon }) {
    return (
      // <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xs border border-gray-100 dark:border-gray-700 p-6">
      <div className="bg-white rounded-xl shadow-xs border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {title}
          </h3>
          <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
            {icon}
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-2xl font-bold text-gray-800 dark:text-white">
            {value}
          </span>
          <div className="flex items-center mt-3">
            {trend === "up" ? (
              <TrendingUp className="h-4 w-4 text-emerald-500 mr-1" />
            ) : (
              <TrendingDown className="h-4 w-4 text-rose-500 mr-1" />
            )}
            <span
              className={`text-sm font-medium ${
                trend === "up" ? "text-emerald-500" : "text-rose-500"
              }`}
            >
              {change}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
              from last month
            </span>
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="flex flex-col">
        <div className="flex items-center justify-start p-4">
          <h1 className="text-[32px] font-bold" style={{ color: "#202224" }}>
            Dashboard
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-4 p-2">
          <StatCard
            title="Total Revenue"
            value="$45,231.89"
            change="+20.1%"
            trend="up"
            icon={<DollarSign className="h-5 w-5 text-emerald-600" />}
          />
          <StatCard
            title="New Customers"
            value="2,350"
            change="+10.1%"
            trend="up"
            icon={<Users className="h-5 w-5 text-blue-600" />}
          />
          <StatCard
            title="Active Orders"
            value="1,293"
            change="-3.2%"
            trend="down"
            icon={<Package className="h-5 w-5 text-purple-600" />}
          />
          <StatCard
            title="Avg. Order Value"
            value="$59.62"
            change="+8.3%"
            trend="up"
            icon={<CreditCard className="h-5 w-5 text-amber-600" />}
          />
        </div>
        {/* <div className="p-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-2">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`p-6 rounded-2xl text-white flex items-center gap-4 transform transition-all ${card.bg}`}
            >
              <div className="text-4xl">{card.icon}</div>
              <div>
                <p className="text-sm font-light">{card.title}</p>
                <h2 className="text-2xl font-bold">{card.value}</h2>
              </div>
            </div>
          ))}
        </div> */}
        <div className="p-2">
          <UserTable />
        </div>
      </div>
    </>
  );
}

export default Dashboard;

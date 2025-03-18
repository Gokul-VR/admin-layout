import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  CircleX,
  CircleCheckBig,
} from "lucide-react";
import Checkbox from "../../customComponents/checkbox";

const usersData = [
  {
    id: 1,
    name: "Adam Trantow",
    company: "Mohr, Langworth and Hills",
    role: "UI Designer",
    verified: true,
    status: "Active",
    avatar: "https://i.pravatar.cc/40?img=1",
  },
  {
    id: 2,
    name: "Angel Rolfson-Kulas",
    company: "Koch and Sons",
    role: "UI Designer",
    verified: true,
    status: "Active",
    avatar: "https://i.pravatar.cc/40?img=2",
  },
  {
    id: 3,
    name: "Billy Braun",
    company: "White, Cassin and Goldner",
    role: "UI Designer",
    verified: false,
    status: "Banned",
    avatar: "https://i.pravatar.cc/40?img=3",
  },
  {
    id: 4,
    name: "Betty Hammes",
    company: "Waelchi – VonRueden",
    role: "UI Designer",
    verified: true,
    status: "Active",
    avatar: "https://i.pravatar.cc/40?img=4",
  },
  {
    id: 5,
    name: "Billy Stoltenberg",
    company: "Medhurst, Moore and Franey",
    role: "Leader",
    verified: true,
    status: "Banned",
    avatar: "https://i.pravatar.cc/40?img=5",
  },
];

const ITEMS_PER_PAGE = 5;

const UserTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedUsers = usersData.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handleCheckboxChange = (userId) => {
    setSelectedUsers((prevSelected) =>
      prevSelected.includes(userId)
        ? prevSelected.filter((id) => id !== userId)
        : [...prevSelected, userId]
    );
  };

  return (
    <div className="mx-auto bg-white p-1 rounded-xl border border-gray-100 shadow-xs">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="text-gray-700 ">
            <tr>
              <th className="px-4 py-3 text-center w-10">
                {/* <input
                  type="checkbox"
                  className="w-4 h-4 xl "
                  onChange={(e) => {
                    setSelectedUsers(
                      e.target.checked
                        ? paginatedUsers.map((user) => user.id)
                        : []
                    );
                  }}
                  checked={
                    paginatedUsers.length > 0 &&
                    paginatedUsers.every((user) =>
                      selectedUsers.includes(user.id)
                    )
                  }
                /> */}
                <Checkbox
                  checked={
                    paginatedUsers.length > 0 &&
                    paginatedUsers.every((user) =>
                      selectedUsers.includes(user.id)
                    )
                  }
                  onChange={(checked) => {
                    setSelectedUsers(
                      checked ? paginatedUsers.map((user) => user.id) : []
                    );
                  }}
                />
              </th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Company</th>
              <th className="px-4 py-3 text-center">Role</th>
              <th className="px-4 py-3 text-center">Verified</th>
              <th className="px-4 py-3 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 ">
            {paginatedUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-center w-10">
                  {/* <input
                    type="checkbox"
                    className="w-4 h-4"
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => handleCheckboxChange(user.id)}
                  /> */}
                  <Checkbox
                    checked={selectedUsers.includes(user.id)}
                    onChange={(checked) => {
                      handleCheckboxChange(user.id);
                    }}
                  />
                </td>
                <td className="px-4 py-3 flex items-center gap-3 min-w-[250px] md:min-w-0">
                  <img
                    src={user.avatar}
                    className="rounded-full w-10 h-10 shadow"
                    alt="User"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.role}</p>
                  </div>
                </td>
                <td className="px-4 py-3 min-w-[250px] md:min-w-0">
                  {user.company}
                </td>
                <td className="px-4 py-3 text-center min-w-[150px] md:min-w-0">
                  {user.role}
                </td>
                <td className="px-4 py-3 text-center min-w-[150px] md:min-w-0">
                  <div className="flex justify-center">
                    {user.verified ? (
                      <CircleCheckBig className="h-5 w-5 text-green-500" />
                    ) : (
                      <CircleX className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                </td>
                <td className="px-4 py-3 text-center min-w-[150px] md:min-w-0">
                  <span
                    className={`px-3 py-1 text-sm font-semibold rounded-full ${
                      user.status === "Active"
                        ? "text-green-700 bg-green-100"
                        : "text-red-700 bg-red-100"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-5 pl-5 pr-2 pb-2">
        <p className="text-gray-500 text-sm">
          Showing {startIndex + 1}-
          {Math.min(startIndex + ITEMS_PER_PAGE, usersData.length)} of{" "}
          {usersData.length}
        </p>
        <div className="flex gap-2">
          <button
            className={`px-3 py-1 rounded-md ${
              currentPage === 1
                ? "text-gray-400"
                : "text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft size={20} />
          </button>
          {Array.from({
            length: Math.ceil(usersData.length / ITEMS_PER_PAGE),
          }).map((_, index) => (
            <button
              key={index}
              className={`px-3 py-1 rounded-md text-sm ${
                currentPage === index + 1
                  ? "bg-[#333335] text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            className={`px-3 py-1 rounded-md ${
              currentPage === Math.ceil(usersData.length / ITEMS_PER_PAGE)
                ? "text-gray-400"
                : "text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() =>
              setCurrentPage((prev) =>
                Math.min(prev + 1, Math.ceil(usersData.length / ITEMS_PER_PAGE))
              )
            }
            disabled={
              currentPage === Math.ceil(usersData.length / ITEMS_PER_PAGE)
            }
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserTable;

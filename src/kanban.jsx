import React, { useEffect, useRef, useState } from "react";
import { FiPlus, FiSettings, FiTrash } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import Modal from "./components/modal";
import Button from "./components/button";
import { Text, LogOut, EllipsisVertical } from "lucide-react";

export const Kanban = () => {
  const [columns, setColumns] = useState(DEFAULT_COLUMNS);
  const [showAddModal, setShowAddModal] = useState(false);
  const [columnName, setColumnName] = useState("");
  const [color, setColor] = useState("#ffffff");
  const [showColorModal, setShowColorModal] = useState(false);
  const [customColors, setCustomColors] = useState({
    backgroundColor: "#171717",
    cardColor: "#262626",
    textPrimaryColor: "#f5f5f5",
    textSecondaryColor: "#a1a1a1",
    border: "#404040",
  });
  const [tempColors, setTempColors] = useState(customColors);
  const handleAddColumn = () => {
    if (!columnName.trim().length) return;

    const newColumn = {
      column: columnName,
      id: `column-${Date.now()}`,
      title: columnName,
      color: color,
      cards: [],
    };

    setColumns([...columns, newColumn]);
    setColumnName("");
    setColor("#ffffff");
    setShowAddModal(false);
  };
  const handleSaveColors = () => {
    setCustomColors(tempColors);
    setShowColorModal(false);
  };
  return (
    <>
      <Modal
        showModal={showColorModal}
        setShowModal={setShowColorModal}
        customColors={customColors}
      >
        <div className="flex justify-start">
          {/* <div className="flex items-start gap-3 text-neutral-400"> */}
          <div
            className="flex items-start gap-3 "
            style={{ color: customColors.textSecondaryColor }}
          >
            Customize Colors
          </div>
        </div>

        <div className="mt-8">
          <div className="mb-4 mt-3">
            <label
              className="block text-sm font-medium  mb-2"
              style={{ color: customColors.textSecondaryColor }}
            >
              Pick a background color
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={tempColors.backgroundColor}
                onChange={(e) =>
                  setTempColors({
                    ...tempColors,
                    backgroundColor: e.target.value,
                  })
                }
                className="w-10 h-10 border-none cursor-pointer"
              />
              <input
                value={tempColors.backgroundColor}
                onChange={(e) =>
                  setTempColors({
                    ...tempColors,
                    backgroundColor: e.target.value,
                  })
                }
                // className="w-full p-3 rounded border border-neutral-700 bg-neutral-800 text-white"

                className="w-full p-3 rounded border"
                style={{
                  color: customColors.textPrimaryColor,
                  borderColor: customColors.border,
                  backgroundColor: customColors.cardColor,
                }}
              />
            </div>
          </div>
          <div className="mb-4 mt-3">
            <label
              className="block text-sm font-medium  mb-2"
              style={{ color: customColors.textSecondaryColor }}
            >
              Pick card color
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={tempColors.cardColor}
                onChange={(e) =>
                  setTempColors({
                    ...tempColors,
                    cardColor: e.target.value,
                  })
                }
                className="w-10 h-10 border-none cursor-pointer"
              />
              <input
                value={tempColors.cardColor}
                onChange={(e) =>
                  setTempColors({
                    ...tempColors,
                    cardColor: e.target.value,
                  })
                }
                className="w-full p-3 rounded border"
                style={{
                  color: customColors.textPrimaryColor,
                  borderColor: customColors.border,
                  backgroundColor: customColors.cardColor,
                }}
              />
            </div>
          </div>
          <div className="mb-4 mt-3">
            <label
              className="block text-sm font-medium  mb-2"
              style={{ color: customColors.textSecondaryColor }}
            >
              Pick border color
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={tempColors.border}
                onChange={(e) =>
                  setTempColors({
                    ...tempColors,
                    border: e.target.value,
                  })
                }
                className="w-10 h-10 border-none cursor-pointer "
              />
              <input
                value={tempColors.border}
                onChange={(e) =>
                  setTempColors({
                    ...tempColors,
                    border: e.target.value,
                  })
                }
                className="w-full p-3 rounded border"
                style={{
                  color: customColors.textPrimaryColor,
                  borderColor: customColors.border,
                  backgroundColor: customColors.cardColor,
                }}
              />
            </div>
          </div>
          <div className="mb-4 mt-3">
            <label
              className="block text-sm font-medium  mb-2"
              style={{ color: customColors.textSecondaryColor }}
            >
              Pick text primary color
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={tempColors.textPrimaryColor}
                onChange={(e) =>
                  setTempColors({
                    ...tempColors,
                    textPrimaryColor: e.target.value,
                  })
                }
                className="w-10 h-10 border-none cursor-pointer "
              />
              <input
                value={tempColors.textPrimaryColor}
                onChange={(e) =>
                  setTempColors({
                    ...tempColors,
                    textPrimaryColor: e.target.value,
                  })
                }
                className="w-full p-3 rounded border"
                style={{
                  color: customColors.textPrimaryColor,
                  borderColor: customColors.border,
                  backgroundColor: customColors.cardColor,
                }}
              />
            </div>
          </div>
          <div className="mb-4 mt-3">
            <label
              className="block text-sm font-medium  mb-2"
              style={{ color: customColors.textSecondaryColor }}
            >
              Pick secondary primary color
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={tempColors.textSecondaryColor}
                onChange={(e) =>
                  setTempColors({
                    ...tempColors,
                    textSecondaryColor: e.target.value,
                  })
                }
                className="w-10 h-10 border-none cursor-pointer text-blue-300"
              />
              <input
                value={tempColors.textSecondaryColor}
                onChange={(e) =>
                  setTempColors({
                    ...tempColors,
                    textSecondaryColor: e.target.value,
                  })
                }
                className="w-full p-3 rounded border"
                style={{
                  color: customColors.textPrimaryColor,
                  borderColor: customColors.border,
                  backgroundColor: customColors.cardColor,
                }}
              />
            </div>
          </div>

          <div className="flex justify-between w-full gap-3 mt-2">
            <Button
              fullWidth={true}
              variant="clear_dark"
              label="Cancel"
              onClick={() => setShowColorModal(false)}
              customColors={customColors}
            />
            <Button
              fullWidth={true}
              variant="clear"
              label="Save"
              onClick={() => handleSaveColors(customColors)}
              customColors={customColors}
            />
          </div>
        </div>
      </Modal>

      <Modal
        showModal={showAddModal}
        setShowModal={setShowAddModal}
        customColors={customColors}
      >
        <div className="flex justify-start">
          <div className="flex items-start gap-3 text-neutral-400">
            Add Column
          </div>
        </div>

        <div className="mt-8">
          <input
            value={columnName || ""}
            onChange={(e) => setColumnName(e.target.value)}
            className="w-full p-3 rounded border border-neutral-700 bg-neutral-800 text-white"
          />
          <div className="mb-4 mt-3">
            <label className="block text-sm font-medium text-neutral-400 mb-2">
              Pick a color for the column
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-10 h-10 border-none cursor-pointer text-blue-300"
              />
              <input
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-full p-3 rounded border border-neutral-700 bg-neutral-800 text-white"
              />
            </div>
          </div>

          <div className="flex justify-between w-full gap-3 mt-2">
            <Button
              fullWidth={true}
              variant="clear_dark"
              customColors={customColors}
              label="Cancel"
              onClick={() => {
                setColumnName("");
                setColor("#ff0000");
                setShowAddModal(false);
              }}
            />
            <Button
              fullWidth={true}
              variant="clear"
              label="Save"
              customColors={customColors}
              onClick={handleAddColumn}
            />
          </div>
        </div>
      </Modal>
      <div
        className="h-screen w-full  text-neutral-50 flex flex-col"
        style={{ backgroundColor: customColors.backgroundColor }}
      >
        <div
          className="fixed top-0 left-0 right-0 p-2 z-10 max-h-[75px]"
          style={{ backgroundColor: customColors.backgroundColor }}
        >
          <div className="flex justify-between items-center p-4  pr-9">
            <h1
              className="text-2xl font-bold pl-6"
              style={{ color: customColors.textPrimaryColor }}
            >
              DropBoard
            </h1>
            <div className="flex gap-2">
              <Button
                variant="clear"
                label="Add Column"
                onClick={() => {
                  setShowAddModal(true);
                }}
                customColors={customColors}
              />
              {/* <Button
                variant="clear"
                icon={<FiSettings />}
                onClick={() => setShowColorModal(true)}
                customColors={customColors}
                
              /> */}
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto mt-14 mb-2">
          <Board
            columns={columns}
            setColumns={setColumns}
            customColors={customColors}
          />
        </div>
      </div>
    </>
  );
};

const Board = ({ columns, setColumns, customColors }) => {
  const [editingCard, setEditingCard] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownOpen]);
  // const handleSelectEmployee = (employee) => {
  //   if (employee) {
  //     setEditingCard((prev) => ({
  //       ...prev,
  //       employee: {
  //         id: employee.id,
  //         name: employee.name,
  //         image: employee.image,
  //       },
  //     }));
  //   } else {
  //     setEditingCard((prev) => ({
  //       ...prev,
  //       employee: null,
  //     }));
  //   }

  //   setIsDropdownOpen(false);
  // };
  const handleSelectEmployee = (employee) => {
    if (employee) {
      setEditingCard((prev) => ({
        ...prev,
        employees: prev.employees?.some((emp) => emp.id === employee.id)
          ? prev.employees?.filter((emp) => emp.id !== employee.id)
          : [...prev.employees, employee],
      }));
    } else {
      setEditingCard((prev) => ({
        ...prev,
        employees: [],
      }));
    }
    setIsDropdownOpen(false);
  };
  const handleEditCard = (card) => {
    setEditingCard(card);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setEditingCard(null);
    setShowModal(false);
  };

  const handleSaveCard = (updatedCard) => {
    setColumns((prevColumns) =>
      prevColumns.map((column) => ({
        ...column,
        cards: column.cards.map((card) =>
          card.id === updatedCard.id ? updatedCard : card
        ),
      }))
    );
    handleCloseModal();
  };

  const handleDeleteCard = (cardId) => {
    setColumns((prevColumns) =>
      prevColumns.map((column) => ({
        ...column,
        cards: column.cards.filter((c) => c.id !== cardId),
      }))
    );
    setShowModal(false);
  };

  return (
    <>
      <div className="flex h-full w-full gap-3 p-10">
        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          customColors={customColors}
        >
          <div className="flex justify-between">
            <div
              className={`flex items-start gap-3 ${editingCard?.headingColor}`}
            >
              {editingCard?.columnTitle}
            </div>
            <div
              className="flex justify-end text-[18px] text-neutral-500 hover:text-[#f05555] cursor-pointer duration-300"
              onClick={() => handleDeleteCard(editingCard?.id)}
            >
              <FiTrash />
            </div>
          </div>

          <div className="mt-8">
            <div className="flex gap-3 mb-3">
              <Text size={18} className="mt-1" />
              <span className="text-base font-semibold md:font-medium">
                Card Title
              </span>
            </div>
            <input
              value={editingCard?.title || ""}
              onChange={(e) =>
                setEditingCard({ ...editingCard, title: e.target.value })
              }
              className="w-full p-3 rounded border border-neutral-700 bg-neutral-800"
            />
            <div className="mt-4 mb-4">
              <label className="block text-sm font-medium text-neutral-400 mb-2">
                Description (Optional)
              </label>
              <textarea
                value={editingCard?.description || ""}
                onChange={(e) =>
                  setEditingCard({
                    ...editingCard,
                    description: e.target.value,
                  })
                }
                className="w-full p-3 rounded border border-neutral-700 bg-neutral-800"
              />
            </div>
            <div className="mt-4 mb-4">
              <label className="block text-sm font-medium text-neutral-400 mb-2">
                Assign Employee (Optional)
              </label>
              <div className="relative" ref={dropdownRef}>
                <motion.div
                  className="w-full p-3 rounded border border-neutral-700 bg-neutral-800 cursor-pointer text-ellipsis whitespace-nowrap overflow-hidden"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* {editingCard?.employee?.name || "Select an employee"} */}
                  {editingCard?.employees?.length > 0
                    ? editingCard.employees.map((emp) => emp.name).join(", ")
                    : "Select employees"}
                </motion.div>
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.ul
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute z-10 w-full mt-1 rounded border border-neutral-700 bg-neutral-800 max-h-58 overflow-y-auto p-2"
                    >
                      <motion.li
                        className="p-3 mb-1 hover:bg-neutral-700 cursor-pointer rounded-md"
                        onClick={() => handleSelectEmployee(null)}
                      >
                        Select an employee
                      </motion.li>
                      {EMPLOYEES.map((employee) => (
                        <motion.li
                          key={employee.id}
                          className={`p-3 mb-1 hover:bg-neutral-700 cursor-pointer rounded-md ${
                            // editingCard?.employee?.id === employee.id
                            //   ? "bg-neutral-700 "
                            //   : ""
                            editingCard?.employees?.some(
                              (emp) => emp.id === employee.id
                            )
                              ? "bg-neutral-700 "
                              : ""
                          }`}
                          onClick={() => handleSelectEmployee(employee)}
                        >
                          {employee.name}
                        </motion.li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            </div>
            <div className="mt-4 mb-4">
              <label className="block text-sm font-medium text-neutral-400 mb-2">
                Upload Image (Optional)
              </label>

              <AnimatePresence mode="wait">
                {editingCard?.image ? (
                  <motion.div
                    key="image"
                    // initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                    className="relative mb-2"
                  >
                    <img
                      src={editingCard.image}
                      alt="Card Image"
                      className="w-full h-[150px] rounded mb-2 object-cover"
                    />
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() =>
                        setEditingCard({ ...editingCard, image: null })
                      }
                      className="absolute top-2 right-2 p-1 bg-neutral-800 rounded-full hover:bg-neutral-700"
                    >
                      <FiTrash className="text-red-500" />
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.input
                    key="input"
                    type="file"
                    accept="image/*"
                    // initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setEditingCard({
                            ...editingCard,
                            image: reader.result,
                          });
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="w-full p-2 rounded border border-neutral-700 bg-neutral-800"
                  />
                )}
              </AnimatePresence>
            </div>

            <div className="flex justify-between w-full gap-3 mt-2">
              <Button
                fullWidth={true}
                variant="clear_dark"
                label="Cancel"
                onClick={() => setShowModal(false)}
                customColors={customColors}
              />
              <Button
                fullWidth={true}
                variant="clear"
                label="Save"
                onClick={() => handleSaveCard(editingCard)}
                customColors={customColors}
              />
            </div>
          </div>
        </Modal>
        {columns.map((column) => (
          <Column
            key={column.id}
            title={column.title}
            column={column.column}
            headingColor={column.color}
            cards={column.cards}
            setColumns={setColumns}
            handleEditCard={handleEditCard}
            columns={columns}
            customColors={customColors}
          />
        ))}
      </div>
    </>
  );
};
const Column = ({
  title,
  headingColor,
  cards,
  column,
  setColumns,
  handleEditCard,
  columns,
  customColors,
}) => {
  const [active, setActive] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [columnName, setColumnName] = useState(title);
  const [color, setColor] = useState(headingColor);
  const popoverRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setIsPopoverOpen(false);
      }
    };

    if (isPopoverOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isPopoverOpen]);
  const handleDragStart = (e, card) => {
    e.dataTransfer.setData("cardId", card.id);
    e.dataTransfer.setData("columnId", column);
  };
  const handleDragEnd = (e) => {
    const cardId = e.dataTransfer.getData("cardId");
    const sourceColumnId = e.dataTransfer.getData("columnId");
    setActive(false);
    clearHighlights();

    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators);

    const before = element.dataset.before || "-1";
    if (before !== cardId) {
      let copy = [...columns];

      const sourceColumn = copy.find((col) => col.column === sourceColumnId);
      const targetColumn = copy.find((col) => col.column === column);

      if (!sourceColumn || !targetColumn) return;

      const cardToTransfer = sourceColumn.cards.find((c) => c.id === cardId);
      if (!cardToTransfer) return;

      sourceColumn.cards = sourceColumn.cards.filter((c) => c.id !== cardId);

      if (before === "-1") {
        // If before is "-1", add the card to the start of the target column
        targetColumn.cards.unshift(cardToTransfer); // Use unshift to add to the beginning
      } else {
        // Find the index of the card with the "before" ID
        const insertAtIndex = targetColumn.cards.findIndex(
          (el) => el.id === before
        );
        if (insertAtIndex === -1) return;

        // Insert the card after the "before" card
        targetColumn.cards.splice(insertAtIndex + 1, 0, cardToTransfer);
      }

      setColumns(copy);
    }
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    highlightIndicator(e);
    setActive(true);
  };

  const clearHighlights = (els) => {
    const indicators = els || getIndicators();
    indicators.forEach((i) => {
      i.style.opacity = "0";
    });
  };

  const highlightIndicator = (e) => {
    const indicators = getIndicators();
    clearHighlights(indicators);

    const el = getNearestIndicator(e, indicators);
    el.element.style.opacity = "1";
  };

  const getNearestIndicator = (e, indicators) => {
    const DISTANCE_OFFSET = 50;

    const el = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = e.clientY - (box.top + DISTANCE_OFFSET);

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      }
    );

    return el;
  };

  const getIndicators = () => {
    return Array.from(document.querySelectorAll(`[data-column="${column}"]`));
  };

  const handleDragLeave = () => {
    clearHighlights();
    setActive(false);
  };
  const handleDeleteColumn = () => {
    setColumns((prevColumns) =>
      prevColumns.filter((col) => col.column !== column)
    );
    setIsPopoverOpen(false);
  };
  const handleSave = () => {
    const updatedColumns = columns.map((col) => {
      if (col.column === column) {
        return {
          ...col,
          title: columnName,
          color: color,
        };
      }
      return col;
    });

    setColumns(updatedColumns);

    setShowAddModal(false);
  };
  return (
    <>
      <Modal
        showModal={showAddModal}
        setShowModal={setShowAddModal}
        customColors={customColors}
      >
        <div className="flex justify-start">
          <div className="flex items-start gap-3 text-neutral-400">
            Edit Column
          </div>
        </div>

        <div className="mt-8">
          <input
            value={columnName || ""}
            onChange={(e) => setColumnName(e.target.value)}
            className="w-full p-3 rounded border border-neutral-700 bg-neutral-800 text-white"
          />
          <div className="mb-4 mt-3">
            <label className="block text-sm font-medium text-neutral-400 mb-2">
              Pick a color for the column
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-10 h-10 border-none cursor-pointer"
              />
              <input
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-full p-3 rounded border border-neutral-700 bg-neutral-800 text-white"
              />
            </div>
          </div>

          <div className="flex justify-between w-full gap-3 mt-2">
            <Button
              fullWidth={true}
              variant="clear_dark"
              label="Cancel"
              onClick={() => {
                setShowAddModal(false);
              }}
              customColors={customColors}
            />
            <Button
              fullWidth={true}
              variant="clear"
              label="Save"
              customColors={customColors}
              onClick={() => handleSave()}
            />
          </div>
        </div>
      </Modal>
      <motion.div
        layout
        animate={{
          width: collapsed ? 50 : 354,
          transition: { type: "spring", damping: 20, stiffness: 200 },
        }}
        className={`shrink-0 relative flex flex-col ${
          collapsed ? "items-center " : ""
        }  p-2 rounded-md `}
        style={{ backgroundColor: collapsed && customColors.cardColor }}
      >
        <div
          className={`flex items-center justify-between ${
            collapsed ? "flex-col h-full" : "flex-row "
          } w-full `}
        >
          <motion.button
            onClick={() => setCollapsed(!collapsed)}
            // className="text-neutral-400 hover:text-neutral-200 cursor-pointer"
            className="cursor-pointer"
            style={{
              color: customColors.textSecondaryColor,
              borderColor: customColors.border,
            }}
            whileHover={{
              color: customColors.textPrimaryColor,
              borderColor: customColors.textSecondaryColor,
            }}
          >
            {collapsed ? (
              <LogOut size={16} />
            ) : (
              <LogOut size={16} className="transform rotate-180" />
            )}
          </motion.button>
          <h3
            className={`font-medium ${headingColor} ${
              collapsed ? "rotate-90 whitespace-nowrap" : ""
            }`}
            style={{ color: headingColor }}
          >
            {title} <span>({cards.length})</span>
          </h3>
          <div
            className={`relative ${collapsed ? "opacity-0" : "opacity-100"}`}
            ref={popoverRef}
          >
            <button
              onClick={() => setIsPopoverOpen(!isPopoverOpen)}
              disabled={collapsed}
              className={`text-neutral-400 hover:text-neutral-200 ${
                !collapsed && "cursor-pointer"
              } `}
            >
              <EllipsisVertical size={16} />
            </button>

            <AnimatePresence>
              {isPopoverOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute z-10 p-1 right-0 mt-2 w-32 rounded-md border border-neutral-700 bg-neutral-800 overflow-hidden"
                >
                  <button
                    onClick={() => {
                      setShowAddModal(true);
                    }}
                    className="w-full flex items-center justify-center gap-2 p-2 text-sm text-neutral-200 hover:bg-neutral-700 rounded-md cursor-pointer duration-250"
                  >
                    Edit
                  </button>
                  <button
                    onClick={handleDeleteColumn}
                    className="w-full flex items-center justify-center gap-2 p-2 text-sm text-neutral-200 hover:bg-neutral-700 hover:text-[#f05555] rounded-md cursor-pointer duration-250"
                  >
                    <FiTrash />
                    Delete
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        {!collapsed && (
          <motion.div
            onDrop={handleDragEnd}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, height: 0 }}
            className={`h-full w-full transition-colors mt-2`}
          >
            {/* <div
            className="flex flex-col mt-2 min-h-[75vh] overflow-y-auto mb-2 overflow-x-hidden "
            style={{ maxHeight: "75vh" }}
          > */}
            <DropIndicator beforeId="-1" column={column} />
            {cards.map((c) => (
              <React.Fragment key={c.id}>
                <Card
                  {...c}
                  handleDragStart={handleDragStart}
                  handleEditCard={handleEditCard}
                  columnTitle={title}
                  headingColor={headingColor}
                  collapsed={collapsed}
                  customColors={customColors}
                />
                <DropIndicator beforeId={c.id} column={column} />
              </React.Fragment>
            ))}
            {/* </div> */}

            <AddCard
              column={column}
              setColumns={setColumns}
              headingColor={headingColor}
              title={title}
              customColors={customColors}
            />
          </motion.div>
        )}
      </motion.div>
    </>
  );
};

// const Card = ({
//   title,
//   id,
//   column,
//   handleDragStart,
//   handleEditCard,
//   columnTitle,
//   headingColor,
//   collapsed,
//   image,
//   employee,
//   customColors,
// }) => {
//   return (
//     <motion.div
//       layoutId={id}
//       layout
//       draggable="true"
//       onDragStart={(e) => handleDragStart(e, { title, id, column })}
//       initial={{ opacity: 0, scale: 0.9 }}
//       animate={{
//         opacity: 1,
//         // width: collapsed ? "100%" : "100%",
//         scale: 1,
//       }}
//       exit={{ opacity: 0, scale: 0.9 }}
//       transition={{ duration: 0.4, ease: "easeInOut" }}
//       onClick={() =>
//         handleEditCard({
//           title,
//           id,
//           column,
//           columnTitle,
//           headingColor,
//           image,
//           employee,
//         })
//       }
//       className="cursor-grab rounded border border-neutral-700  p-3 active:cursor-grabbing flex flex-col"
//       style={{ backgroundColor: customColors.cardColor }}
//     >
//       <AnimatePresence mode="wait">
//         {/* {image && (
//           <motion.div
//             key="card-image"
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.9 }}
//             className="overflow-hidden"
//           >
//             <img
//               src={image}
//               alt="Card Image"
//               className="w-full rounded mb-2 object-cover max-h-[150px]"
//             />
//           </motion.div>
//         )} */}
//         {image && (
//           <motion.div
//             key="card-image-wrapper"
//             // initial={{ opacity: 0 }}
//             // animate={{ opacity: 1 }}
//             // exit={{ opacity: 0 }}
//             initial={{ opacity: 0, y: -10, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1, y: 0 }}
//             exit={{ opacity: 0, y: -10, scale: 0.9 }}
//             transition={{ duration: 0.3, ease: "easeIn" }}
//             className="w-full overflow-hidden"
//           >
//             <motion.img
//               src={image}
//               alt="Card Image"
//               className="w-full rounded mb-2 object-cover max-h-[150px]"
//             />
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <motion.p className="text-sm text-neutral-100 p-1">{title}</motion.p>
//       <AnimatePresence mode="wait">
//         {employee && (
//           <motion.div
//             key="employee-image-wrapper"
//             // initial={{ opacity: 0 }}
//             // animate={{ opacity: 1 }}
//             // exit={{ opacity: 0 }}
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -10 }}
//             transition={{ duration: 0.3, ease: "easeIn" }}
//             className="mt-2 flex items-center gap-2 overflow-hidden"
//           >
//             <motion.img
//               src={employee.image}
//               alt={employee.name}
//               className="w-6 h-6 rounded-full object-cover border border-neutral-600 max-h-[50px]"
//             />
//             <span className="text-xs text-neutral-400">{employee.name}</span>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </motion.div>
//   );
// };
// const Card = ({
//   title,
//   id,
//   column,
//   handleDragStart,
//   handleEditCard,
//   columnTitle,
//   headingColor,
//   collapsed,
//   image,
//   employees,
//   description,
//   customColors,
// }) => {
//   return (
//     <motion.div
//       layout
//       draggable="true"
//       onDragStart={(e) => handleDragStart(e, { title, id, column })}
//       initial={{ opacity: 0, scale: 0.9 }}
//       animate={{
//         opacity: 1,
//         scale: 1,
//       }}
//       exit={{ opacity: 0, scale: 0.9 }}
//       transition={{ duration: 0.4, ease: "easeInOut" }}
//       onClick={() =>
//         handleEditCard({
//           title,
//           id,
//           column,
//           columnTitle,
//           headingColor,
//           image,
//           employees,
//           description,
//         })
//       }
//       className="cursor-grab rounded border border-neutral-700  p-3 active:cursor-grabbing flex flex-col"
//       style={{ backgroundColor: customColors.cardColor }}
//     >
//       <AnimatePresence mode="wait">
//         {image && (
//           <motion.div
//             key="card-image-wrapper"
//             initial={{ opacity: 0, y: -10, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1, y: 0 }}
//             exit={{ opacity: 0, y: -10, scale: 0.9 }}
//             transition={{ duration: 0.3, ease: "easeIn" }}
//             className="w-full overflow-hidden"
//           >
//             <motion.img
//               src={image}
//               alt="Card Image"
//               className="w-full rounded mb-2 object-cover max-h-[150px]"
//             />
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <motion.p className="text-sm text-neutral-100 p-1">{title}</motion.p>

//       {description && (
//         <motion.p
//           className="text-xs text-neutral-400 p-1"

//         >
//           {description}
//         </motion.p>
//       )}
//       <AnimatePresence mode="wait">
//         {employees && employees.length > 0 && (
//           <motion.div
//             key="employee-image-wrapper"
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -10 }}
//             transition={{ duration: 0.3, ease: "easeIn" }}
//             className="mt-2 flex items-center gap-2 overflow-hidden"
//           >
//             {employees.map((employee, index) => (
//               <motion.img
//                 key={employee.id}
//                 src={employee.image}
//                 alt={employee.name}
//                 className="w-6 h-6 rounded-full object-cover border border-neutral-600"
//                 style={{ marginLeft: index > 0 ? "-12px" : "0" }}
//               />
//             ))}
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </motion.div>
//   );
// };
const Card = ({
  title,
  id,
  column,
  handleDragStart,
  handleEditCard,
  columnTitle,
  headingColor,
  collapsed,
  image,
  employees,
  description,
  customColors,
}) => {
  return (
    <motion.div
      layout
      draggable="true"
      onDragStart={(e) => handleDragStart(e, { title, id, column })}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      whileHover={{ borderColor: customColors.textPrimaryColor }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      onClick={() =>
        handleEditCard({
          title,
          id,
          column,
          columnTitle,
          headingColor,
          image,
          employees,
          description,
        })
      }
      className="cursor-grab rounded border border-neutral-700 p-3 active:cursor-grabbing flex flex-col justify-between" // Added justify-between
      style={{
        backgroundColor: customColors.cardColor,
        borderColor: customColors.border,
      }}
    >
      <div>
        <AnimatePresence mode="wait">
          {image && (
            <motion.div
              key="card-image-wrapper"
              initial={{ opacity: 0, y: -10, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, y: -10, scale: 0.9 }}
              transition={{ duration: 0.3, ease: "easeIn" }}
              className="w-full overflow-hidden"
            >
              <motion.img
                src={image}
                alt="Card Image"
                className="w-full rounded mb-2 object-cover max-h-[150px]"
              />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.p
          className="text-sm p-1"
          style={{ color: customColors.textPrimaryColor }}
        >
          {title}
        </motion.p>

        {description && (
          <motion.p
            className="text-xs text-neutral-400 p-1"
            style={{ color: customColors.textSecondaryColor }}
          >
            {description}
          </motion.p>
        )}
      </div>

      <AnimatePresence mode="wait">
        {employees && employees.length > 0 && (
          <motion.div
            key="employee-image-wrapper"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeIn" }}
            className="mt-2 flex justify-end items-end gap-2 overflow-hidden"
          >
            {/* {employees.map((employee, index) => (
              <motion.img
                key={employee.id}
                src={employee.image}
                alt={employee.name}
                className="w-7 h-7 rounded-full object-cover border border-neutral-600"
                style={{ marginLeft: index > 0 ? "-15px" : "0" }}
              />
            ))} */}
            {employees.slice(0, 3).map((employee, index) => (
              <motion.img
                key={employee.id}
                src={employee.image}
                alt={employee.name}
                className="w-8 h-8 rounded-full object-cover border-2  shadow-md"
                style={{
                  marginLeft: index > 0 ? "-15px" : "0",
                  backgroundColor: customColors.cardColor,
                  borderColor: customColors.border,
                }}
              />
            ))}
            {employees.length > 3 && (
              <div
                className="w-8 h-8 flex items-center justify-center rounded-full text-xs font-semibold border-2  shadow-md"
                style={{
                  marginLeft: "-15px",
                  backgroundColor: customColors.cardColor,
                  borderColor: customColors.border,
                }}
              >
                +{employees.length - 3}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
const DropIndicator = ({ beforeId, column }) => {
  return (
    <div
      data-before={beforeId || "-1"}
      data-column={column}
      className="my-0.5 h-0.5 w-full bg-violet-400 opacity-0 "
    />
  );
};

const AddCard = ({ column, setColumns, headingColor, title, customColors }) => {
  const [text, setText] = useState("");
  const [adding, setAdding] = useState(false);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownOpen]);
  // const handleSelectEmployee = (employee) => {
  //   if (employee) {
  //     setSelectedEmployee(employee);
  //   } else {
  //     setSelectedEmployee(null);
  //   }
  //   setIsDropdownOpen(false);
  // };
  const handleSelectEmployee = (employee) => {
    if (employee) {
      setSelectedEmployees((prev) =>
        prev.some((emp) => emp.id === employee.id)
          ? prev.filter((emp) => emp.id !== employee.id)
          : [...prev, employee]
      );
    } else {
      setSelectedEmployees([]);
    }
    setIsDropdownOpen(false);
  };
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = () => {
    if (!text.trim().length) return;

    const newCard = {
      id: Math.random().toString(),
      title: text.trim(),
      column,
      image,
      // employee: selectedEmployee,
      employees: selectedEmployees,
    };

    setColumns((prevColumns) =>
      prevColumns.map((col) =>
        col.column === column ? { ...col, cards: [...col.cards, newCard] } : col
      )
    );
    setText("");
    setImage(null);
    setAdding(false);
    setSelectedEmployee(null);
    setSelectedEmployees([]);
  };
  return (
    <>
      <Modal
        showModal={adding}
        setShowModal={setAdding}
        customColors={customColors}
      >
        <div className="flex justify-start">
          <div className={`flex items-start gap-3 ${headingColor}`}>
            {title}
          </div>
        </div>

        <div className="mt-8">
          <div className="flex gap-3 mb-3">
            <Text size={18} className="mt-1" />
            <span className="text-base font-semibold md:font-medium">
              Card Title
            </span>
          </div>
          <input
            value={text || ""}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-3 rounded border border-neutral-700 bg-neutral-800"
          />
          <div className="mt-4 mb-4">
            <label className="block text-sm font-medium text-neutral-400 mb-2">
              Description (Optional)
            </label>
            <textarea
              value={description || ""}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 rounded border border-neutral-700 bg-neutral-800"
            />
          </div>
          <div className="mt-4 mb-4">
            <label className="block text-sm font-medium text-neutral-400 mb-2">
              Assign Employee (Optional)
            </label>
            <div className="relative" ref={dropdownRef}>
              <motion.div
                className="w-full p-3 rounded border border-neutral-700 bg-neutral-800 cursor-pointer"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                whileTap={{ scale: 0.98 }}
                style={{
                  whiteSpace: "nowrap", // Prevent text from wrapping to the next line
                  overflow: "hidden", // Hide overflow text
                  textOverflow: "ellipsis", // Add ellipsis for overflow text
                }}
              >
                {selectedEmployees.length > 0
                  ? selectedEmployees.map((emp) => emp.name).join(", ")
                  : "Select employees"}
              </motion.div>
              {/* <motion.div
                className="w-full p-3 rounded border border-neutral-700 bg-neutral-800 cursor-pointer"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                whileTap={{ scale: 0.98 }}
              >
              
                {selectedEmployee?.name || "Select an employee"}
              </motion.div> */}
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.ul
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute z-10 w-full mt-1 rounded border border-neutral-700 bg-neutral-800 max-h-58 overflow-y-auto p-2"
                  >
                    <motion.li
                      className="p-3 mb-1 hover:bg-neutral-700 cursor-pointer rounded-md"
                      onClick={() => handleSelectEmployee(null)}
                    >
                      Select an employee
                    </motion.li>
                    {EMPLOYEES.map((employee) => (
                      <motion.li
                        key={employee.id}
                        className={`p-3 mb-1 hover:bg-neutral-700 cursor-pointer rounded-md ${
                          // selectedEmployee?.id === employee.id
                          selectedEmployees.some(
                            (emp) => emp.id === employee.id
                          )
                            ? "bg-neutral-700 "
                            : ""
                        }`}
                        onClick={() => handleSelectEmployee(employee)}
                      >
                        {employee.name}
                      </motion.li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          </div>
          <div className="mt-4 mb-4">
            <label className="block text-sm font-medium text-neutral-400 mb-2">
              Upload Image (Optional)
            </label>

            <AnimatePresence mode="wait">
              {image ? (
                <motion.div
                  key="image"
                  // initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  className="relative mb-2"
                >
                  <img
                    src={image}
                    alt="Card Image"
                    className="w-full h-[150px] rounded mb-2 object-cover"
                  />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setImage(null)}
                    className="absolute top-2 right-2 p-1 bg-neutral-800 rounded-full hover:bg-neutral-700"
                  >
                    <FiTrash className="text-red-500" />
                  </motion.button>
                </motion.div>
              ) : (
                <motion.input
                  key="input"
                  type="file"
                  accept="image/*"
                  // initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  onChange={handleImageUpload}
                  className="w-full p-2 rounded border border-neutral-700 bg-neutral-800"
                />
              )}
            </AnimatePresence>
          </div>
          <div className="flex justify-between w-full gap-3 mt-2">
            <Button
              fullWidth={true}
              variant="clear_dark"
              label="Cancel"
              customColors={customColors}
              onClick={() => {
                setAdding(false);
                setText("");
                setSelectedEmployee(null);
              }}
            />
            <Button
              fullWidth={true}
              variant="clear"
              label="Save"
              onClick={() => handleSubmit()}
              customColors={customColors}
            />
          </div>
        </div>
      </Modal>
      {/* <motion.button
        layout
        onClick={() => setAdding(true)}
        className=" mb-3 flex w-full justify-center items-center gap-1.5 p-3 text-xs text-neutral-400 transition-colors rounded hover:text-neutral-50 border border-neutral-700 hover:border-neutral-50 cursor-pointer"
      >
        <span>Add card</span>
        <FiPlus />
      </motion.button> */}
      <motion.button
        layout
        onClick={() => setAdding(true)}
        className="mb-3 flex w-full justify-center items-center gap-1.5 p-3 text-xs  border rounded cursor-pointer"
        style={{
          color: customColors.textSecondaryColor,
          borderColor: customColors.border,
        }}
        whileHover={{
          color: customColors.textPrimaryColor,
          borderColor: customColors.textSecondaryColor,
        }}
        transition={{ duration: 0.2, ease: "easeIn" }}
      >
        <span>Add card</span>
        <FiPlus />
      </motion.button>
    </>
  );
};

// const DEFAULT_COLUMNS = [
//   {
//     column: "backlog",
//     id: "backlog",
//     title: "Backlog",
//     color: "#737373",
//     cards: [
//       {
//         id: "1",
//         title: "Add support for third-party authentication",
//         employees: [],
//         description: "",
//       },
//       {
//         id: "2",
//         title: "Implement a notification system for users",
//         employees: [],
//         description: "",
//       },
//     ],
//   },

//   {
//     column: "todo",
//     id: "todo",
//     title: "TO DO",
//     color: "#fff085",
//     cards: [
//       {
//         id: "5",
//         title: "Research and finalize the tech stack.",
//         image: "https://www.patterns.dev/img/reactjs/react-logo@3x.svg",
//         description:
//           "Expertise in modern UI/UX development using Tailwind CSS for utility-first styling and Framer Motion for smooth animations and transitions",

//         employees: [
//           {
//             id: "emp3",
//             name: "Jordan Lee",
//             image: "https://i.pravatar.cc/150?img=3",
//           },
//         ],
//       },
//       {
//         id: "6",
//         title: "Set up the development environment.",
//         employees: [],
//         description: "",
//       },
//       {
//         id: "7",
//         title: "Write user stories for the first sprint.",
//         employees: [],
//         description: "",
//       },
//     ],
//   },
//   {
//     column: "doing",
//     id: "doing",
//     title: "In Development",
//     color: "#8ec5ff",
//     cards: [
//       {
//         id: "8",
//         title: "Develop the user authentication",
//         employees: [],
//         description: "",
//       },
//       {
//         id: "9",
//         title: "Integrate the frontend with the backend APIs",
//         employees: [
//           {
//             id: "emp3",
//             name: "Jordan Lee",
//             image: "https://i.pravatar.cc/150?img=3",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     column: "done",
//     id: "done",
//     title: "Complete",
//     color: "#05df72",
//     cards: [
//       {
//         id: "10",
//         title: "Project kickoff meeting held",
//         employees: [],
//         description: "",
//       },
//       {
//         id: "11",
//         title: "Initial project requirements gathered",
//         employees: [],
//         description: "",
//       },
//     ],
//   },
// ];
const DEFAULT_COLUMNS = [
  {
    column: "backlog",
    id: "backlog",
    title: "Backlog",
    color: "#737373",
    cards: [
      {
        id: "1",
        title: "Set up project repository",
        description:
          "Initialize a new React.js project using Create React App or Vite. Set up Git repository and push to GitHub.",
        employees: [
          {
            id: "emp1",
            name: "Alex Johnson",
            image: "https://i.pravatar.cc/150?img=1",
          },
          {
            id: "emp81",
            name: "John Doe",
            image: "https://randomuser.me/api/portraits/men/1.jpg",
          },
          {
            id: "emp2",
            name: "Sam Taylor",
            image: "https://i.pravatar.cc/150?img=2",
          },
          {
            id: "emp4",
            name: "Casey Morgan",
            image: "https://i.pravatar.cc/150?img=4",
          },
        ],
      },
      {
        id: "2",
        title: "Research UI libraries",
        description:
          "Evaluate UI libraries like Material-UI, Tailwind CSS, or Chakra UI for the project. Document pros and cons.",
        employees: [
          {
            id: "emp2",
            name: "Sam Taylor",
            image: "https://i.pravatar.cc/150?img=2",
          },
        ],
      },
      {
        id: "3",
        title: "Plan project structure",
        description: "",
        employees: [],
      },
    ],
  },
  {
    column: "todo",
    id: "todo",
    title: "TO DO",
    color: "#fff085",
    cards: [
      {
        id: "4",
        title: "Design homepage layout",
        description:
          "Create a wireframe for the homepage using Figma. Include a hero section, features, and a call-to-action.",
        employees: [
          {
            id: "emp3",
            name: "Jordan Lee",
            image: "https://i.pravatar.cc/150?img=3",
          },
          {
            id: "emp4",
            name: "Casey Morgan",
            image: "https://i.pravatar.cc/150?img=4",
          },
        ],
      },
      {
        id: "5",
        title: "Set up routing",
        description:
          "Implement React Router for navigation between pages. Define routes for Home, About, and Contact pages.",
        employees: [
          {
            id: "emp4",
            name: "Casey Morgan",
            image: "https://i.pravatar.cc/150?img=4",
          },
        ],
      },
      {
        id: "6",
        title: "Integrate state management",
        description:
          "Decide between Context API, Redux, or Zustand for state management. Implement a basic store.",
        employees: [],
      },
    ],
  },
  {
    column: "doing",
    id: "doing",
    title: "In Development",
    color: "#8ec5ff",
    cards: [
      {
        id: "8",
        title: "Build reusable components",
        image:
          "https://th.bing.com/th/id/OIP.J9BI5lKDKUl71AE7iiSUswHaFj?rs=1&pid=ImgDetMain",
        description:
          "Create reusable components like buttons, modals, and cards. Ensure they are responsive and customizable.",
        employees: [
          {
            id: "emp02",
            name: "Jane Smith",
            image: "https://randomuser.me/api/portraits/women/2.jpg",
          },
        ],
      },
      {
        id: "9",
        title: "Integrate API endpoints",
        description:
          "Connect the frontend to a backend API using Axios or Fetch. Handle loading and error states.",
        employees: [
          {
            id: "emp3",
            name: "Jordan Lee",
            image: "https://i.pravatar.cc/150?img=3",
          },
        ],
      },
    ],
  },
  {
    column: "done",
    id: "done",
    title: "Complete",
    color: "#05df72",
    cards: [
      {
        id: "10",
        title: "Project kickoff meeting",
        description:
          "Conducted the initial project kickoff meeting. Discussed goals, timelines, and team roles.",
        employees: [
          {
            id: "emp4",
            name: "Casey Morgan",
            image: "https://i.pravatar.cc/150?img=4",
          },
        ],
      },
      {
        id: "11",
        title: "Set up CI/CD pipeline",
        description:
          "Configured GitHub Actions for continuous integration and deployment. Automated testing and deployment processes.",
        employees: [
          {
            id: "emp1",
            name: "Alex Johnson",
            image: "https://i.pravatar.cc/150?img=1",
          },
        ],
      },
      {
        id: "12",
        title: "Write initial documentation",
        description:
          "Documented the project setup, folder structure, and coding standards. Shared with the team for review.",
        employees: [
          {
            id: "emp2",
            name: "Sam Taylor",
            image: "https://i.pravatar.cc/150?img=2",
          },
        ],
      },
    ],
  },
];
const EMPLOYEES = [
  {
    id: "emp81",
    name: "John Doe",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: "emp02",
    name: "Jane Smith",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    id: "emp43",
    name: "Alice Johnson",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
  },
  {
    id: "emp1",
    name: "Alex Johnson",
    image: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: "emp2",
    name: "Sam Taylor",
    image: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: "emp3",
    name: "Jordan Lee",
    image: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: "emp4",
    name: "Casey Morgan",
    image: "https://i.pravatar.cc/150?img=4",
  },
];

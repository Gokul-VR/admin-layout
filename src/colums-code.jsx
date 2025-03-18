import React, { useEffect, useRef, useState } from "react";
import { FiPlus, FiTrash } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import { FaFire } from "react-icons/fa";
import Modal from "./components/modal";
import Button from "./components/button";
import { Text, LogOut, EllipsisVertical } from "lucide-react";

export const Kanban = () => {
  const [columns, setColumns] = useState(DEFAULT_COLUMNS);
  const [showAddModal, setShowAddModal] = useState(false);
  const [columnName, setColumnName] = useState("");
  const [color, setColor] = useState("#ffffff");
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
  return (
    <>
      {/* <div className="h-screen w-full bg-neutral-900 text-neutral-50">
        <Board />
      </div> */}
      <Modal showModal={showAddModal} setShowModal={setShowAddModal}>
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
              onClick={handleAddColumn}
            />
          </div>
        </div>
      </Modal>
      <div className="h-screen w-full bg-neutral-900 text-neutral-50 flex flex-col">
        <div className="fixed top-0 left-0 right-0 bg-neutral-900 p-2">
          <div className="flex justify-between items-center p-4  pr-9">
            <h1 className="text-2xl font-bold pl-6">DropBoard</h1>

            <Button
              variant="clear"
              label="Add Column"
              onClick={() => {
                setShowAddModal(true);
              }}
            />
          </div>
        </div>

        <div className="flex-1 overflow-auto mt-10">
          <Board columns={columns} setColumns={setColumns} />
        </div>
      </div>
    </>
  );
};

const Board = ({ columns, setColumns }) => {
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
  const handleSelectEmployee = (employee) => {
    if (employee) {
      setEditingCard((prev) => ({
        ...prev,
        employee: {
          id: employee.id,
          name: employee.name,
          image: employee.image,
        },
      }));
    } else {
      setEditingCard((prev) => ({
        ...prev,
        employee: null,
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
        <Modal showModal={showModal} setShowModal={setShowModal}>
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
            <textarea
              value={editingCard?.title || ""}
              onChange={(e) =>
                setEditingCard({ ...editingCard, title: e.target.value })
              }
              className="w-full p-3 rounded border border-neutral-700 bg-neutral-800"
            />
            <div className="mt-4 mb-4">
              <label className="block text-sm font-medium text-neutral-400 mb-2">
                Assign Employee (Optional)
              </label>
              <div className="relative" ref={dropdownRef}>
                <motion.div
                  className="w-full p-3 rounded border border-neutral-700 bg-neutral-800 cursor-pointer"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  whileTap={{ scale: 0.98 }}
                >
                  {editingCard?.employee?.name || "Select an employee"}
                </motion.div>
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.ul
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute z-10 w-full mt-1 rounded border border-neutral-700 bg-neutral-800 max-h-65 overflow-y-auto p-2"
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
                            editingCard?.employee?.id === employee.id
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
              />
              <Button
                fullWidth={true}
                variant="clear"
                label="Save"
                onClick={() => handleSaveCard(editingCard)}
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
          />
        ))}
      </div>
      {/* <div className="flex flex-col w-full h-full p-10">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Kanban Board</h1>
          <Button variant="clear" label="View Employees" />
        </div>
        <div className="flex h-full w-full gap-3 ">
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
            />
          ))}
        </div>
      </div> */}
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
      <Modal showModal={showAddModal} setShowModal={setShowAddModal}>
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
            />
            <Button
              fullWidth={true}
              variant="clear"
              label="Save"
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
          collapsed ? "items-center bg-neutral-800" : ""
        }  p-2 rounded-md `}
      >
        <div
          className={`flex items-center justify-between ${
            collapsed ? "flex-col h-full" : "flex-row "
          } w-full `}
        >
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-neutral-400 hover:text-neutral-200 cursor-pointer"
          >
            {collapsed ? (
              <LogOut size={16} />
            ) : (
              <LogOut size={16} className="transform rotate-180" />
            )}
          </button>
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
            />
          </motion.div>
        )}
      </motion.div>
    </>
  );
};

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
  employee,
}) => {
  return (
    <motion.div
      layoutId={id}
      layout
      draggable="true"
      onDragStart={(e) => handleDragStart(e, { title, id, column })}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{
        opacity: 1,
        // width: collapsed ? "100%" : "100%",
        scale: 1,
      }}
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
          employee,
        })
      }
      className="cursor-grab rounded border border-neutral-700 bg-neutral-800 p-3 active:cursor-grabbing flex flex-col"
    >
      <AnimatePresence mode="wait">
        {/* {image && (
          <motion.div
            key="card-image"
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="overflow-hidden"
          >
            <img
              src={image}
              alt="Card Image"
              className="w-full rounded mb-2 object-cover max-h-[150px]"
            />
          </motion.div>
        )} */}
        {image && (
          <motion.div
            key="card-image-wrapper"
            // initial={{ opacity: 0 }}
            // animate={{ opacity: 1 }}
            // exit={{ opacity: 0 }}
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

      <motion.p className="text-sm text-neutral-100 p-1">{title}</motion.p>
      <AnimatePresence mode="wait">
        {employee && (
          <motion.div
            key="employee-image-wrapper"
            // initial={{ opacity: 0 }}
            // animate={{ opacity: 1 }}
            // exit={{ opacity: 0 }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeIn" }}
            className="mt-2 flex items-center gap-2 overflow-hidden"
          >
            <motion.img
              src={employee.image}
              alt={employee.name}
              className="w-6 h-6 rounded-full object-cover border border-neutral-600 max-h-[50px]"
            />
            <span className="text-xs text-neutral-400">{employee.name}</span>
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

const AddCard = ({ column, setColumns, headingColor, title }) => {
  const [text, setText] = useState("");
  const [adding, setAdding] = useState(false);
  const [image, setImage] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
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
  const handleSelectEmployee = (employee) => {
    if (employee) {
      setSelectedEmployee(employee);
    } else {
      setSelectedEmployee(null);
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
      employee: selectedEmployee,
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
  };

  return (
    <>
      <Modal showModal={adding} setShowModal={setAdding}>
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
          <textarea
            value={text || ""}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-3 rounded border border-neutral-700 bg-neutral-800"
          />
          {/* <div className="mt-4 mb-4">
            <label className="block text-sm font-medium text-neutral-400 mb-2">
              Assign Employee (Optional)
            </label>
            <select
              value={selectedEmployee?.id || ""}
              onChange={(e) => {
                const employeeId = e.target.value;
                const employee = EMPLOYEES.find((emp) => emp.id === employeeId);
                setSelectedEmployee(employee || null);
              }}
              className="w-full p-2 rounded border border-neutral-700 bg-neutral-800"
            >
              <option value="">Select an employee</option>
              {EMPLOYEES.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.name}
                </option>
              ))}
            </select>
          </div> */}
          <div className="mt-4 mb-4">
            <label className="block text-sm font-medium text-neutral-400 mb-2">
              Assign Employee (Optional)
            </label>
            <div className="relative" ref={dropdownRef}>
              <motion.div
                className="w-full p-3 rounded border border-neutral-700 bg-neutral-800 cursor-pointer"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                whileTap={{ scale: 0.98 }}
              >
                {selectedEmployee?.name || "Select an employee"}
              </motion.div>
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.ul
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute z-10 w-full mt-1 rounded border border-neutral-700 bg-neutral-800 max-h-65 overflow-y-auto p-2"
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
                          selectedEmployee?.id === employee.id
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
            />
          </div>
        </div>
      </Modal>
      <motion.button
        layout
        onClick={() => setAdding(true)}
        className=" mb-3 flex w-full justify-center items-center gap-1.5 p-3 text-xs text-neutral-400 transition-colors rounded hover:text-neutral-50 border border-neutral-700 hover:border-neutral-50 cursor-pointer"
      >
        <span>Add card</span>
        <FiPlus />
      </motion.button>
    </>
  );
};

const DEFAULT_COLUMNS = [
  {
    column: "backlog",
    id: "backlog",
    title: "Backlog",
    color: "#737373",
    cards: [
      {
        id: "1",
        title: "Add support for third-party authentication",
      },
      { id: "2", title: "Implement a notification system for users" },
    ],
  },

  {
    column: "todo",
    id: "todo",
    title: "TO DO",
    color: "#fff085",
    cards: [
      {
        id: "5",
        title: "Research and finalize the tech stack.",
        image: "https://www.patterns.dev/img/reactjs/react-logo@3x.svg",
        employee: {
          id: "1",
          name: "John Doe",
          image: "https://randomuser.me/api/portraits/men/1.jpg",
        },
      },
      {
        id: "6",
        title: "Set up the development environment.",
      },
      { id: "7", title: "Write user stories for the first sprint." },
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
        title: "Develop the user authentication",
      },
      {
        id: "9",
        title: "Integrate the frontend with the backend APIs",
        employee: {
          id: "emp3",
          name: "Jordan Lee",
          image: "https://i.pravatar.cc/150?img=3",
        },
      },
    ],
  },
  {
    column: "done",
    id: "done",
    title: "Complete",
    color: "#05df72",
    cards: [
      { id: "10", title: "Project kickoff meeting held" },
      { id: "11", title: "Initial project requirements gathered" },
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

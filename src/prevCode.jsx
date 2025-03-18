import React, { useState } from "react";
import { FiPlus, FiTrash } from "react-icons/fi";
import { motion } from "framer-motion";
import { FaFire } from "react-icons/fa";
import Modal from "./components/modal";
import Button from "./components/button";
import { Layout, Text, Trash2 } from "lucide-react";

// Main Kanban Component
export const Kanban = () => {
  return (
    <div className="h-screen w-full bg-neutral-900 text-neutral-50">
      <Board />
    </div>
  );
};

const Board = () => {
  const [cards, setCards] = useState(DEFAULT_CARDS);
  const [columns, setColumns] = useState(DEFAULT_COLUMNS);
  const [editingCard, setEditingCard] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleEditCard = (card) => {
    setEditingCard(card);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setEditingCard(null);
    setShowModal(false);
  };

  const handleSaveCard = (updatedCard) => {
    setCards((prevCards) =>
      prevCards.map((card) => (card.id === updatedCard.id ? updatedCard : card))
    );
    handleCloseModal();
  };
  console.log(editingCard);
  const handleDeleteCard = (cardId) => {
    setCards((pv) => pv.filter((c) => c.id !== cardId));
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
              className="flex justify-end text-[18px] text-neutral-500 hover:text-red-900 cursor-pointer duration-300"
              onClick={() => {
                handleDeleteCard(editingCard?.id);
              }}
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
            <div className="flex justify-between w-full gap-3 mt-2">
              <Button
                fullWidth={true}
                variant="cleardark"
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
        {/* {columns.map((column) => {
                        return (
                            <Column
                                title={column.title}
                                column={column.column}
                                headingColor={column.color}
                                cards={cards}
                                setCards={setCards}
                                handleEditCard={handleEditCard}
                            />
                        )
                    })} */}
        <Column
          title="Backlog"
          column="backlog"
          headingColor="text-neutral-500"
          cards={cards}
          setCards={setCards}
          handleEditCard={handleEditCard}
        />
        <Column
          title="TODO"
          column="todo"
          headingColor="text-yellow-200"
          cards={cards}
          setCards={setCards}
          handleEditCard={handleEditCard}
        />
        <Column
          title="QA"
          column="qa"
          headingColor="text-yellow-200"
          cards={cards}
          setCards={setCards}
          handleEditCard={handleEditCard}
        />
        <Column
          title="QA"
          column="qa-complete"
          headingColor="text-yellow-200"
          cards={cards}
          setCards={setCards}
          handleEditCard={handleEditCard}
        />
        <Column
          title="In progress"
          column="doing"
          headingColor="text-blue-200"
          cards={cards}
          setCards={setCards}
          handleEditCard={handleEditCard}
        />
        <Column
          title="Complete"
          column="done"
          headingColor="text-emerald-200"
          cards={cards}
          setCards={setCards}
          handleEditCard={handleEditCard}
        />
        <BurnBarrel setCards={setCards} />
      </div>
    </>
  );
};

// Column Component
const Column = ({
  title,
  headingColor,
  cards,
  column,
  setCards,
  handleEditCard,
}) => {
  const [active, setActive] = useState(false);

  const handleDragStart = (e, card) => {
    e.dataTransfer.setData("cardId", card.id);
  };

  const handleDragEnd = (e) => {
    const cardId = e.dataTransfer.getData("cardId");
    setActive(false);
    clearHighlights();

    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators);

    const before = element.dataset.before || "-1";

    if (before !== cardId) {
      let copy = [...cards];

      let cardToTransfer = copy.find((c) => c.id === cardId);
      if (!cardToTransfer) return;
      cardToTransfer = { ...cardToTransfer, column };

      copy = copy.filter((c) => c.id !== cardId);

      const moveToBack = before === "-1";

      if (moveToBack) {
        copy.push(cardToTransfer);
      } else {
        const insertAtIndex = copy.findIndex((el) => el.id === before);
        if (insertAtIndex === undefined) return;

        copy.splice(insertAtIndex, 0, cardToTransfer);
      }

      setCards(copy);
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
        console.log(box, "box");

        const offset = e.clientY - (box.top + DISTANCE_OFFSET);
        console.log(offset, "offset", closest.offset);

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

  const filteredCards = cards.filter((c) => c.column === column);

  return (
    <div className="w-74 shrink-0 p-1">
      <div className="mb-3 flex items-center justify-between">
        <h3 className={`font-medium ${headingColor}`}>{title}</h3>
        <span className="rounded text-sm text-neutral-400">
          {filteredCards.length}
        </span>
      </div>
      <div
        onDrop={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`h-full w-full transition-colors ${
          active ? "bg-neutral-800/50" : "bg-neutral-800/0"
        }`}
      >
        {filteredCards.map((c) => {
          return (
            <Card
              key={c.id}
              {...c}
              handleDragStart={handleDragStart}
              handleEditCard={handleEditCard}
              columnTitle={title}
              headingColor={headingColor}
            />
          );
        })}
        <DropIndicator beforeId={null} column={column} />
        <AddCard column={column} setCards={setCards} />
      </div>
    </div>
  );
};

// Card Component
const Card = ({
  title,
  id,
  column,
  handleDragStart,
  handleEditCard,
  columnTitle,
  headingColor,
}) => {
  return (
    <>
      <DropIndicator beforeId={id} column={column} />
      <motion.div
        layout
        layoutId={id}
        draggable="true"
        onDragStart={(e) => handleDragStart(e, { title, id, column })}
        onClick={() =>
          handleEditCard({ title, id, column, columnTitle, headingColor })
        }
        className="cursor-grab rounded border border-neutral-700 bg-neutral-800 p-3 active:cursor-grabbing"
      >
        <p className="text-sm text-neutral-100">{title}</p>
      </motion.div>
    </>
  );
};

// Drop Indicator
const DropIndicator = ({ beforeId, column }) => {
  return (
    <div
      data-before={beforeId || "-1"}
      data-column={column}
      className="my-0.5 h-0.5 w-full bg-violet-400 opacity-0"
    />
  );
};

// Burn Barrel Component
const BurnBarrel = ({ setCards }) => {
  const [active, setActive] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setActive(true);
  };

  const handleDragLeave = () => {
    setActive(false);
  };

  const handleDragEnd = (e) => {
    const cardId = e.dataTransfer.getData("cardId");
    setCards((pv) => pv.filter((c) => c.id !== cardId));
    setActive(false);
  };

  return (
    <div
      onDrop={handleDragEnd}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`mt-10 grid h-56 w-56 shrink-0 place-content-center rounded border text-3xl ${
        active
          ? "border-red-800 bg-red-800/20 text-red-500"
          : "border-neutral-500 bg-neutral-500/20 text-neutral-500"
      }`}
    >
      {active ? <FaFire className="animate-bounce" /> : <FiTrash />}
    </div>
  );
};

// Add Card Component (Full-width button and modal)
const AddCard = ({ column, setCards }) => {
  const [text, setText] = useState("");
  const [adding, setAdding] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text.trim().length) return;

    const newCard = {
      column,
      title: text.trim(),
      id: Math.random().toString(),
    };

    setCards((pv) => [...pv, newCard]);
    setAdding(false);
  };

  return (
    <>
      {adding ? (
        <motion.form layout onSubmit={handleSubmit}>
          <textarea
            onChange={(e) => setText(e.target.value)}
            autoFocus
            placeholder="Add new task..."
            className="w-full rounded border border-violet-400 bg-violet-400/20 p-3 text-sm text-neutral-50 placeholder-violet-300 focus:outline-0"
          />
          <div className="mt-1.5 flex items-center justify-end gap-1.5">
            <button
              onClick={() => setAdding(false)}
              className="px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
            >
              Close
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-colors hover:bg-neutral-300"
            >
              <span>Add</span>
              <FiPlus />
            </button>
          </div>
        </motion.form>
      ) : (
        <motion.button
          layout
          onClick={() => setAdding(true)}
          className="flex w-full items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
        >
          <span>Add card</span>
          <FiPlus />
        </motion.button>
      )}
    </>
  );
};

const DEFAULT_CARDS = [
  { title: "Look into render bug in dashboard", id: "1", column: "backlog" },
  { title: "SOX compliance checklist", id: "2", column: "backlog" },
  { title: "[SPIKE] Migrate to Azure", id: "3", column: "backlog" },
  { title: "Document Notifications service", id: "4", column: "backlog" },
  {
    title: "Research DB options for new microservice",
    id: "5",
    column: "todo",
  },
  { title: "Postmortem for outage", id: "6", column: "todo" },
  { title: "Sync with product on Q3 roadmap", id: "7", column: "todo" },
  {
    title: "Refactor context providers to use Zustand",
    id: "8",
    column: "doing",
  },
  { title: "Add logging to daily CRON", id: "9", column: "doing" },
  {
    title: "Set up DD dashboards for Lambda listener",
    id: "10",
    column: "done",
  },
];

const DEFAULT_COLUMNS = [
  {
    column: "backlog",
    id: "backlog",
    title: "Backlog",
    cards: [
      { id: "card-1", title: "Look into render bug in dashboard" },
      { id: "card-2", title: "SOX compliance checklist" },
      { id: "card-3", title: "[SPIKE] Migrate to Azure" },
      { id: "card-4", title: "Document Notifications service" },
    ],
  },
  {
    column: "qa",
    id: "qa",
    title: "QA",
    cards: [
      { id: "card-132", title: "Look into render bug in dashboard" },
      { id: "card-2546", title: "SOX compliance checklist" },
      { id: "card-3567", title: "[SPIKE] Migrate to Azure" },
      { id: "card-48789", title: "Document Notifications service" },
    ],
  },
  {
    column: "qa-complete",
    id: "qa-complete",
    title: "QA-Complete",
    cards: [
      { id: "card-13a2", title: "Look into render bug in dashboard" },
      { id: "card-254asf6", title: "SOX compliance checklist" },
      { id: "card-356sd7", title: "[SPIKE] Migrate to Azure" },
      { id: "card-487gfd89", title: "Document Notifications service" },
    ],
  },
  {
    column: "todo",
    id: "todo",
    title: "TODO",
    color: "text-yellow-300",
    cards: [
      { id: "card-5", title: "Research DB options for new microservice" },
      { id: "card-6", title: "Postmortem for outage" },
      { id: "card-7", title: "Sync with product on Q3 roadmap" },
      { id: "card-8", title: "Add logging to daily CRON" },
    ],
  },
  {
    column: "doing",
    id: "in-progress",
    title: "In progress",
    color: "text-blue-300",
    cards: [
      { id: "card-9", title: "Set up DD dashboards for Lambda listener" },
      { id: "card-10", title: "Refactor context providers to use Zustand" },
    ],
  },
  {
    column: "done",
    id: "complete",
    title: "Complete",
    color: "text-green-400",
    cards: [],
  },
];

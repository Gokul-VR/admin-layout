import { useCallback, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import FocusTrap from "focus-trap-react";
import clsx from "clsx";
import React from "react";

export default function Modal({
  children,
  showModal,
  setShowModal,
  customColors,
}) {
  const desktopModalRef = useRef(null);
  const onKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") {
        setShowModal(false);
      }
    },
    [setShowModal]
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  return (
    <AnimatePresence>
      {showModal && (
        <>
          <motion.div
            key="desktop-backdrop"
            className="fixed inset-0 z-30 bg-black/5 backdrop-blur-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
          />

          <motion.div
            ref={desktopModalRef}
            key="desktop-modal"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onMouseDown={(e) => {
              if (desktopModalRef.current === e.target) {
                setShowModal(false);
              }
            }}
            className="fixed inset-0 z-40 flex items-center justify-center p-6"
          >
            <div
              className="relative w-full max-w-lg rounded-lg border bg-opacity-40 p-6 shadow-xl"
              style={{
                backgroundColor: customColors.backgroundColor,
                borderColor: customColors.border,
              }}
            >
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

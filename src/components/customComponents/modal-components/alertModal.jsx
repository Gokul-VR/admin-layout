import { X } from "lucide-react";
import Modal from "./modal";
import Button from "../button-components/button";

export default function AlertModal({
  isOpen,
  onClose,
  icon,
  title,
  content,
  buttonText,
  buttonColor,
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} centered>
      <div className="relative p-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-orange-50 mb-4">
            {icon}
          </div>

          <h3 className="text-2xl font-bold mb-2">{title}</h3>

          <p className="text-gray-600 mb-8">{content}</p>
          <Button
            size="large"
            onClick={onClose}
            className={`${buttonColor} text-white `}
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

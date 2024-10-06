import { ReactNode } from "react";
import Button from "../Button";

const Modal = ({
  children,
  isOpen,
  setIsOpen,
  className,
  triggerClass,
  text,
}: {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  className?: string;
  triggerClass?: string;
  text: string;
}) => {
  return (
    <>
      <Button onClick={() => setIsOpen(true)} className={triggerClass}>
        {text}
      </Button>
      <dialog open={isOpen}>
        <div
          className="fixed left-0 top-0 z-20 h-full w-full bg-[rgba(0,0,0,0.5)]"
          onClick={() => setIsOpen(false)}
        />
        <div
          className={`fixed left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 ${className}`}
        >
          <Button
            className="absolute left-4 top-4 h-5 w-5 rounded text-gray-300 transition duration-100 hover:text-gray-800 hover:ring-1 hover:ring-gray-600"
            onClick={() => setIsOpen(false)}
          >
            X
          </Button>
          {children}
        </div>
      </dialog>
    </>
  );
};

export default Modal;

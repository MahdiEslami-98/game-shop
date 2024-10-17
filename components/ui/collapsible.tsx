import { useEffect, useState } from "react";
import Button from "../Button";
import { ChevronLeft } from "lucide-react";

const Collapsible = ({
  children,
  trigger,
  triggerClass,
  containerClass,
  open,
}: {
  children: React.ReactNode;
  trigger: string;
  triggerClass?: string;
  containerClass?: string;
  open?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (open) {
      setIsOpen(true);
    }
  }, []);

  return (
    <>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className={`flex w-full items-center justify-between font-medium ${triggerClass}`}
      >
        {trigger}
        <ChevronLeft
          className={`${isOpen ? "-rotate-90" : "rotate-0"} transition-transform duration-300`}
        />
      </Button>
      <div
        className={`edit-scroll scroll-smooth transition-all duration-300 ${isOpen ? "max-h-80 overflow-y-auto py-2" : "max-h-0 overflow-hidden"} ${containerClass}`}
      >
        {children}
      </div>
    </>
  );
};

export default Collapsible;

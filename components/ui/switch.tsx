"use client";
import { useState } from "react";
import Input from "../Input";

const Switch = ({
  onChange,
  id,
}: {
  onChange: (value: boolean) => void;
  id: string;
}) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked(!isChecked);
    onChange(!isChecked);
  };

  return (
    <div className="relative h-6 w-10">
      <Input
        type="checkbox"
        id={`${id}`}
        checked={isChecked}
        onChange={handleToggle}
        className="peer hidden checked:bg-secondary-100"
      />
      <label
        htmlFor={`${id}`}
        className="duration-[400ms] before:duration-[400ms] absolute bottom-0 left-0 right-0 top-0 cursor-pointer rounded-3xl bg-[#ccc] transition-all before:absolute before:bottom-1 before:left-1 before:h-4 before:w-4 before:rounded-full before:bg-white before:shadow-[inset_0_0_0_1px_rgba(50,50,50,0.35)] before:transition-all before:content-[''] peer-checked:bg-secondary-100 peer-checked:before:translate-x-4"
      />
    </div>
  );
};

export default Switch;

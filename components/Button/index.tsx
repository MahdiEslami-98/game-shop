import { ButtonHTMLAttributes, forwardRef, LegacyRef } from "react";

const Button = (
  props: ButtonHTMLAttributes<HTMLButtonElement>,
  ref: LegacyRef<HTMLButtonElement>,
) => {
  const { className, children, ...rest } = props;
  return (
    <button className={` ${className}`} {...rest} ref={ref}>
      {children}
    </button>
  );
};

export default forwardRef(Button);

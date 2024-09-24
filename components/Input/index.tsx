import React, { forwardRef, InputHTMLAttributes, LegacyRef } from "react";

const Input = (
  props: InputHTMLAttributes<HTMLInputElement>,
  ref: LegacyRef<HTMLInputElement>,
) => {
  const { className, ...rest } = props;
  return <input type="text" ref={ref} {...rest} className={` ${className}`} />;
};

export default forwardRef(Input);

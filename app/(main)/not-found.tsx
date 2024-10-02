import Image from "next/image";
import React from "react";

const NotFound = () => {
  return (
    <>
      <Image src={"/404.png"} alt="404" width={500} height={500} className="" />
    </>
  );
};

export default NotFound;

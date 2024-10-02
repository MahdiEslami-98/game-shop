import Image from "next/image";
import React from "react";
import LandingLayout from "./(main)/layout";

const NotFound = () => {
  return (
    <LandingLayout>
      <div className="flex items-center justify-center">
        <Image
          src={"/404.png"}
          alt="404"
          width={800}
          height={700}
          className=""
        />
      </div>
    </LandingLayout>
  );
};

export default NotFound;

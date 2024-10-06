"use client";

import getUserById from "@/api/userApi/getUserById";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

const UserOrder = ({ id }: { id: string }) => {
  const { data, isSuccess } = useQuery({
    queryKey: ["userById", id],
    queryFn: () => getUserById(id),
  });
  return (
    <>
      {isSuccess && data && (
        <span>{`${data?.data?.data?.user?.firstname} ${data?.data?.data?.user?.lastname}`}</span>
      )}
    </>
  );
};

export default UserOrder;

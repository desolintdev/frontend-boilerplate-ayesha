"use client";

import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { NodeChildrenProps } from "@/shared/interfaces/common";
import { setSocket } from "@/shared/redux/slices/socket";
import { getCurrentUser } from "@/shared/redux/slices/users";
import { AppDispatch } from "@/shared/redux/store";

export default function SocketWrapper({ children }: NodeChildrenProps) {
  const dispatch = useDispatch<AppDispatch>();

  const currentUser = useSelector(getCurrentUser);
  const isLoggedIn = Boolean(currentUser?._id);

  useEffect(() => {
    if (isLoggedIn) dispatch(setSocket());
  }, [isLoggedIn, dispatch]);

  return children;
}

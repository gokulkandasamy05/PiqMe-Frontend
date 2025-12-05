"use server";

import { redirect } from "next/navigation";
import { persistor } from "./appStore";

export const logout = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/logout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  const data = await res.json();

  if (data?.status) {
    persistor.purge();
    redirect("/login");
  }

  return data.status;
};

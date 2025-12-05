"use server";

import { redirect } from "next/navigation";
import { persistor } from "./appStore";

export const logout = async () => {
  const res = await fetch(`${'https://piqme.live/api'}/logout`, {
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

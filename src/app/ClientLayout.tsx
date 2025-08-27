"use client";
import { StoreProvider } from "@/store/Provider";
import React from "react";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return <StoreProvider>{children}</StoreProvider>;
}

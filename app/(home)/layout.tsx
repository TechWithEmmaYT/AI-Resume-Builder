import React from "react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import Header from "./_components/common/Header";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAuthenticated } = getKindeServerSession();
  const isUserAuthenticated = await isAuthenticated();

  if (!isUserAuthenticated) {
    return redirect("/");
  }

  //return redirect("/api/auth/login?post_login_redirect_url=/dashboard");

  return (
    <div className="w-full h-auto min-h-screen !bg-[#f8f8f8] dark:!bg-background">
      <Header />
      <div>{children}</div>
    </div>
  );
}

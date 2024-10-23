"use client";

import { Button } from "@/components/ui/button";
import { Frown } from "lucide-react";
import Link from "next/link";
import React from "react";

const Error = () => {
  return (
    <div
      className="h-full flex flex-col items-center 
      space-y-4 justify-center"
    >
      <Frown size="80px" />
      <h2 className="text-xl font-semibold">Something went wrong!</h2>

      <Button asChild>
        <Link href="/dashboard">Go back</Link>
      </Button>
    </div>
  );
};

export default Error;

"use client";
import React, { Fragment } from "react";
import {
  ChevronDown,
  ExternalLink,
  Loader,
  MoonIcon,
  Settings,
  SunIcon,
} from "lucide-react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Header = () => {
  const { setTheme } = useTheme();
  const { user, isAuthenticated, isLoading, error } = useKindeBrowserClient();
  return (
    <div className="shadow-sm w-full sticky top-0  bg-white dark:bg-gray-900 z-[9999]">
      {/* <div className="w-full flex items-center justify-center h-auto bg-black">
        <div className="max-w-6xl mx-auto py-2">
          <p className="text-white text-sm">
            Subcribe to Techwithemma? Boost your skill with CVbuild.ai Resume
            Course out{" "}
            <a className="inline-flex items-center gap-1 font-bold text-green-500">
              CVbuild.ai Course
              <ExternalLink size="14px" />
            </a>
          </p>
        </div>
      </div> */}

      <div className="w-full mx-auto max-w-7xl py-2 px-5 flex items-center justify-between ">
        <div className="flex items-center flex-1 gap-9">
          <div>
            <Link
              href="/dashboard"
              className="font-black text-[20px] text-primary"
            >
              CVbuild.ai
            </Link>
          </div>
          {isAuthenticated && user ? (
            <div className="flex items-center gap-2">
              <span className="font-normal text-black/50 dark:text-primary-foreground">
                Hi,
              </span>
              <h5 className="font-bold text-black dark:text-primary-foreground">
                {user?.given_name} {user?.family_name}
              </h5>
            </div>
          ) : null}
        </div>
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="!bg-transparent">
                <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="my-3">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="outline"
            size="icon"
            className="!bg-transparent shrink-0"
          >
            <Settings className="h-[1.2rem] w-[1.2rem]" />
          </Button>

          {isLoading || error ? (
            <Loader className="animate-spin !size-6 text-black dark:text-white" />
          ) : (
            <Fragment>
              {isAuthenticated && user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger role="button">
                    <div className="flex items-center gap-1">
                      <Avatar role="button" className="!cursor-pointer">
                        <AvatarImage src={user?.picture || ""} />
                        <AvatarFallback className="!cursor-pointer">
                          {user?.given_name?.[0]}
                          {user?.family_name?.[0]}
                        </AvatarFallback>
                      </Avatar>
                      <ChevronDown size="17px" />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="my-3">
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="!text-red-500 font-medium !cursor-pointer">
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : null}
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;

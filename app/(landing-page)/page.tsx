import { Button } from "@/components/ui/button";
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { ChevronRight, Video } from "lucide-react";

export default function Home() {
  return (
    <div className="w-full">
      <div className="hero-section w-full min-h-screen">
        <div className="w-full flex flex-col items-center justify-center py-10 max-w-4xl mx-auto">
          <div className="rounded-full flex items-center gap-1 text-xs h-auto p-2 bg-muted max-w-60">
            <div className="p-2 h-5 shrink-0 flex items-center text-xs justify-center text-white bg-primary rounded-full">
              New
            </div>
            Subscribe to Teachwithemma
            <ChevronRight className="w-4 h-4" />
          </div>

          <div className="flex flex-col mt-5 items-center text-center">
            <h1 className="text-6xl font-black">
              <p>Get dream jobs with our</p>
              <p>
                <span className="bg-gradient-to-r from-primary via-purple-300 to-primary bg-clip-text text-transparent animate-sparkle">
                  AI Powered
                </span>
                {"  "}
                resume builder
              </p>
            </h1>
            <p className=" block text-xl mt-3 font-medium text-black/70">
              Build a professional,resume with our free builder, and share it
              with, shareable link.
            </p>
            <br />
            <div className="flex items-center gap-2">
              <Button className="h-12 text-base font-medium min-w-32" asChild>
                <RegisterLink>Get Started</RegisterLink>
              </Button>
              <Button
                variant="outline"
                className="h-12  border-primary text-primary text-base font-medium min-w-32"
                asChild
              >
                <a className="flex items-center gap-1">
                  <Video size="17px" />
                  Watch video
                </a>
              </Button>
            </div>
          </div>

          <div className="w-full pt-16">
            <div className="w-full h-[400px] rounded-md shadow-lg bg-[#eee]"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import AddResume from "../_components/AddResume";
import ResumeList from "../_components/ResumeList";
//import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  return (
    <div className="w-full">
      <div className="w-full mx-auto max-w-7xl  py-5 px-5">
        <div className="flex items-start justify-between ">
          <div>
            <h1 className="text-2xl font-bold dark:text-inherit">
              Resume Builder
            </h1>
            <p className="text-base dark:text-inherit">
              Create your own custom resume with AI & Subscribe to the channel
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <Button
              className="text-[15px] gap-[2px] items-center"
              variant="outline"
            >
              <Trash2 size="15px" />
              <span>All Trash</span>
            </Button>
          </div>
        </div>

        <div className="w-full pt-11">
          <h5 className="text-xl font-semibold dark:text-inherit mb-3">
            All Resume
          </h5>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-2 ">
            <AddResume />
            <ResumeList />
          </div>
        </div>

        {/* <div className="w-full pt-11">
          <h5 className="text-xl font-semibold dark:text-inherit mb-3">
            My Resume
          </h5>
          <div>
            <Tabs defaultValue="private" className="w-full">
              <TabsList className="border-b w-full items-start justify-start !bg-transparent rounded-none">
                <TabsTrigger
                  value="private"
                  className="!shadow-none gap-1 !pl-0 !border-x-0 !border-t-0 !bg-transparent !text-[15px] !font-semibold"
                >
                  <Lock size="15px" />
                  Private (2)
                </TabsTrigger>
                <TabsTrigger
                  value="public"
                  className="!shadow-none gap-1 !border-0 !bg-transparent !text-[15px] !font-semibold"
                >
                  <Globe size="15px" />
                  Public (3)
                </TabsTrigger>
              </TabsList>
              <TabsContent value="private">
                Make changes to your account here.
              </TabsContent>
              <TabsContent value="public">
                Change your password here.
              </TabsContent>
            </Tabs>
          </div>
        </div> */}
      </div>
    </div>
  );
}

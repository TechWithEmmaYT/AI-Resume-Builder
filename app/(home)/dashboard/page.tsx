import AddResume from "../_components/AddResume";
import ResumeList from "../_components/ResumeList";

export default function Home() {
  return (
    <div className="w-full">
      <div className="w-full mx-auto max-w-7xl  py-5 px-5">
        <div className="flex items-center justify-between ">
          <div>
            <h1 className="text-2xl font-bold dark:text-inherit">All Resume</h1>
            <p className="text-base dark:text-inherit">
              Create your own custom resume with AI
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-2 pt-3">
          <AddResume />
          <ResumeList />
        </div>
      </div>
    </div>
  );
}

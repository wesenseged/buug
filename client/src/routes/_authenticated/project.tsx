// Tanstack router, query
import {  useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
// Import Stores
import useProjectStore from "@/store/projectStore";
import useMainStore from "@/store/mainStore";
// Add Project
import AddProject from "@/components/project/AddProject";
// View options
import View from "@/components/project/View";
// Import Icons
import { FileStack, Table } from "lucide-react";
import { List } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
// Error page
import { ErrorPage } from "@/lib/error";
import { api } from "@/lib/api";

export default function Projects() {
  const proStore = useProjectStore();
  const mainStore = useMainStore();
const {data,error,isLoading} = useQuery({
  queryKey: ["get-project"],
  queryFn: async () => {
    const res = await api.project.$get();
    const data = await res.json();
    return data;
  },
});

  if (error) return <ErrorPage />;

  const project = {
    nav1: {
      eng: "Table",
      amh: "ሰንጠረዥ እይታ",
    },
    nav2: {
      eng: "List",
      amh: "የዝርዝር እይታ",
    },

    nav3: {
      eng: "Board",
      amh: "የቦርድ እይታ",
    },
    title: {
      eng: "Active Projects",
      amh: "ፕሮጀክቶች",
    },
    desc: {
      eng: "You can easily drag and drop project in each separated section",
      amh: "በእያንዳንዱ የተለያየ ክፍል ውስጥ ፕሮጀክቱን በቀላሉ መጎተት እና መጣል ትችላለህ",
    },
    desc2: {
      eng: "This is overview section you can not drag and drop here",
      amh: "ይህ ጎትተው ወደዚህ መጣል የማይችሉት የአጠቃላይ እይታ ክፍል ነው።",
    },
  };

  return (
    <section className="overflow-scroll overflow-x-hidden max-h-full   flex flex-col">
      <div className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 justify-between items-center">
        <div className="flex rounded-lg space-x-6  border-2 border-white bg-zinc-200 dark:bg-zinc-900 py-2 px-2 dark:border-black">
          <button
            type="button"
            onClick={() => {
              proStore.handleView("table");
            }}
            className={
              proStore.viewType == "table"
                ? mainStore.forgColor +
                  " flex space-x-1 rounded-sm items-center text-white text-sm px-2 py-1 gap-3"
                : " flex items-center rounded-sm space-x-1 text-sm px-2 py-1 gap-3"
            }
          >
            <Table className="w-4 h-4" />
            {mainStore.toggleLanguage ? project.nav1.eng : project.nav1.amh}
          </button>
          <button
            type="button"
            onClick={() => {
              proStore.handleView("list");
            }}
            className={
              proStore.viewType == "list"
                ? mainStore.forgColor +
                  " flex space-x-1 rounded-sm items-center text-white text-sm px-2 py-1 gap-3"
                : " flex items-center rounded-sm space-x-1 text-sm px-2 py-1 gap-3"
            }
          >
            <List className="w-4 h-4" />
            {mainStore.toggleLanguage ? project.nav2.eng : project.nav2.amh}
          </button>
          <button
            type="button"
            onClick={() => {
              proStore.handleView("board");
            }}
            className={
              proStore.viewType == "board"
                ? mainStore.forgColor +
                  " flex items-center rounded-sm space-x-1 text-white text-sm px-2 py-1 gap-3"
                : "flex items-center rounded-sm text-sm px-2 py-1 gap-3 space-x-1"
            }
          >
            <FileStack className="w-4 h-4" />
            {mainStore.toggleLanguage ? project.nav3.eng : project.nav3.amh}
          </button>
        </div>
      </div>
      <div className="mt-8 items-center flex flex-col space-y-3 md:space-y-0 md:flex-row justify-between ">
        <div>
          <h1 className="text-lg md:text-3xl font-bold text-center md:text-left">
            {mainStore.toggleLanguage ? project.title.eng : project.title.amh}
          </h1>
          {proStore.viewType == "table" ? (
            <p className="text-gray-400 text-center text-sm md:text-md lg:text-lg">
              {mainStore.toggleLanguage ? project.desc2.eng : project.desc2.amh}
            </p>
          ) : (
            <p className="text-gray-400 text-center text-sm md:text-md lg:text-lg">
              {mainStore.toggleLanguage ? project.desc.eng : project.desc.amh}
            </p>
          )}
        </div>
        <AddProject />
      </div>
      {isLoading && (
        <div>
        {
          proStore.viewType == "list" &&
            <div className="flex flex-col mt-32 space-y-8">
<Skeleton className="w-full h-16 rounded-xl shadow bg-zinc-200"/>
<Skeleton className="w-full h-16 rounded-xl shadow bg-zinc-200"/>
<Skeleton className="w-full h-16 rounded-xl shadow bg-zinc-200"/>
            </div>
        }
        {
          proStore.viewType == "table" &&
            <div className="flex flex-col space-y-8 mt-20">
          <div>
          <Skeleton className="w-96 h-56 rounded-md shadow bg-zinc-300" />
          </div>
          <div>
<Skeleton className="w-full h-64 rounded-xl shadow bg-zinc-200"/>
          </div>

            </div>
        }
        {
          proStore.viewType == "board" &&
            <div className="flex justify-between mt-32">
<Skeleton className="w-96 h-64 rounded-xl shadow bg-zinc-200"/>
<Skeleton className="w-96 h-64 rounded-xl shadow bg-zinc-200"/>
<Skeleton className="w-96 h-64 rounded-xl shadow bg-zinc-200"/>
            </div>
        }
          
        </div>
      )}


      {data && <View data={data} />}
    </section>
  );
}

export const Route = createFileRoute("/_authenticated/project")({
  component: Projects,
});

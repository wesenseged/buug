// Ui components
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Toaster } from "@/components/ui/toaster";
import { DataTable } from "@/components/task/dataTable";
import { columns } from "@/components/task/columns";
// Tanstack router, query
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
// Add Task
import AddTask from "@/components/task/addTask";
// api
import { taskQueryOption } from "@/lib/api";
// icons
import { Activity, CircleAlert } from "lucide-react";
// Error page
import { ErrorPage } from "@/lib/error";


// Define the main Tasks component
export function Tasks() {
  // Queries
  const { data, isLoading, error } = useQuery(taskQueryOption);
  const date = new Date()


 const active =    data && data.task.filter(task => {
      const newDueDate = new Date(task.dueAt!);
      const timeDiff = newDueDate.getTime() - date.getTime();
      const hours = Math.floor(timeDiff / (1000 * 60 * 60));
      const active = hours>=0

      return active
 })

 const inactive =  data && data.task.filter(task => {
      const newDueDate = new Date(task.dueAt!);
      const timeDiff = newDueDate.getTime() - date.getTime();
      const hours = Math.floor(timeDiff / (1000 * 60 * 60));
      const inactive = hours<0

      return inactive
 })


  if (error) return <ErrorPage />;




  return (
    <section className="mt-8 rounded-lg overflow-scroll bg-background min-h-screen w-full lg:w-11/12 mx-auto flex flex-col">
      <div className="flex flex-row mt-16 w-full mx-auto mb-10 justify-between ">
        <div className="flex flex-col items-start justify-start space-y-3">
          <h1 className="text-2xl">Welcome back!</h1>
          <p className="text-zinc-600 text-xl">
            Create a task for your project
          </p>
        </div>
        <AddTask />
      </div>
      {isLoading && (
        <div className="w-11/12 flex flex-col  mt-10 space-y-8">
        <div className="flex space-x-5">
          <Skeleton className="w-96 h-56 rounded-md shadow bg-zinc-200" />
          <Skeleton className="w-96 h-56 rounded-md shadow bg-zinc-200" />
        </div>
        <div>
          <Skeleton className="w-full h-96  bg-zinc-200" />
          
        </div>
        </div>
      )}
      {data && (
        <div className="flex flex-col space-y-20">
          <div className="flex space-x-6">
            <Card className="w-96 my-5">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardDescription className="text-xl">
                  Active Now
                </CardDescription>
                <div>
                  <Activity color="gray" size={18} />
                </div>
              </CardHeader>
              <CardFooter className="flex flex-col items-start">
                <h1 className="text-4xl font-bold">{active?.length}</h1>
                <p className="text-sm text-zinc-500">Today</p>
              </CardFooter>
            </Card>

            <Card className="w-96 my-5 bg-red-900">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardDescription className="text-xl text-white">
                  Incompleted
                </CardDescription>
                <div>
                  <CircleAlert color="white" size={18} />
                </div>
              </CardHeader>
              <CardFooter className="flex flex-col items-start">
                <h1 className="text-4xl font-bold text-white">{inactive?.length}</h1>
                <p className="text-sm text-zinc-400">Today</p>
              </CardFooter>
            </Card>
          </div>
          {data && <DataTable columns={columns} data={data.task} />}
        </div>
      )}
      <Toaster />
    </section>
  );
}

export const Route = createFileRoute("/_authenticated/task")({
  component: Tasks,
});

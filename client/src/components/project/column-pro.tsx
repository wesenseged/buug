import { InsertProject } from "@/types/project";
import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  Calendar,
  CalendarX2,
  Circle,
  CircleCheck,
  Clock2Icon,
} from "lucide-react";
import { Button } from "../ui/button";
import { DrawerDemo } from "./OverView";

export const columns: ColumnDef<InsertProject>[] = [
  {
    id:"action" ,
    cell: ({row}) => {
   return (
     <DrawerDemo item={row.original}/>
   )
    }

  },
  {
    accessorKey: "id",
    header: "Id",

    cell: ({ row }) => {
      const index: number = row.index + 1;
      return <h1 className=" font-medium">{index}</h1>;
    },
  },

  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status: string = row.getValue("status");

      if (status == "TODO") {
        return (
          <div className="flex space-x-2 items-center">
            <Circle size={16} />
            <span>{status}</span>
          </div>
        );
      }

      if (status == "IN WORK") {
        return (
          <div className="flex space-x-2 items-center">
            <Clock2Icon size={16} color="yellow" />
            <span>{status}</span>
          </div>
        );
      } else {
        return (
          <div className="flex space-x-2 items-center">
            <CircleCheck size={16} color="green" /> <span>{status}</span>
          </div>
        );
      }
    },
  },
  {
    accessorKey: "priority",
    header: "Priority",
  },
  {
    accessorKey: "tasks",
    header: "Tasks",
    cell: ({ row }) => {
      const task: { title: string; desc: string }[] = row.getValue("tasks");
      return task ? (
        <div>
          <h1 className=" font-medium">- {task[0].title}</h1>
          <h1 className=" text-sm text-zinc-500">{task[0].desc}</h1>
        </div>
      ) : (
        <div>...</div>
      );
    },
  },

  {
    accessorKey: "createdAt",
    header: () => (
      <div className="flex items-center space-x-2">
        <Calendar /> <span>Due At</span>
      </div>
    ),
  },
  {
    accessorKey: "dueAt",
    header: () => (
      <div className="flex items-center space-x-2">
        <CalendarX2 />
        <span>Due At</span>
      </div>
    ),
  },
];

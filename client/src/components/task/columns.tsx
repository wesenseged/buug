import React from "react";
import { InsertTask } from "@/types/task";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useNoteStore from "@/store/noteStore";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/lib/api";
import { ToastAction } from "../ui/toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";

const date = new Date();

// eslint-disable-next-line react-refresh/only-export-components
const DropDown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Ellipsis size={14} color="gray" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
const DeleteTaskCheckbox: React.FC<{ id: number,hours:number }> = ({ id,hours }) => {
  const queryClient = useQueryClient();
  const noteStore = useNoteStore();
  const { toast } = useToast();

  

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const date = noteStore.currentDate();
      let completed = 1 
      let uncompleted = 0
      if(hours >=0) {
       completed = 1 
       uncompleted = 0
      }
      else {
       completed = 0 
       uncompleted = 1

      }
     await api.chart.add.$post({
        json: {
          date: date,
          completed: completed,
          uncompleted: uncompleted,
        },
      });

      const task = await api.task.delete[":id"].$delete({
        param: { id },
      });

      return task;
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Failed to delete task",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-tasks"] });
      toast({
        title: "Task Deleted",
      });
    },
  });

  return (
    <Checkbox
      onClick={() => {
        deleteMutation.mutate(id.toString());
      }}
    />
  );
};

export const columns: ColumnDef<InsertTask>[] = [
  {
    id: "Tasks",
    cell: ({ row }) => {
      const id: number = row.getValue("id");
      const dueAt: string = row.getValue("dueAt");
      const newDueDate = new Date(dueAt);
      const timeDiff = newDueDate.getTime() - date.getTime();
      const hours = Math.floor(timeDiff / (1000 * 60 * 60));

      return <DeleteTaskCheckbox id={id} hours={hours} />;
    },
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
    header: "Title",
  },
  {
    accessorKey: "desc",
    header: "Description",
  },
  {
    accessorKey: "type",
    header: "Tag",
  },

  {
    accessorKey: "dueAt",
    header: () => <div className="text-right ">Due At</div>,
    cell: ({ row }) => {
      const dueAt: string = row.getValue("dueAt");
      const newDueDate = new Date(dueAt);
      const timeDiff = newDueDate.getTime() - date.getTime();
      const hours = Math.floor(timeDiff / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const remainingTime = `${hours}h ${minutes}m`;
      return (
        <div
          className={
            hours >= 0
              ? "text-right font-medium"
              : "text-right text-red-600 font-medium"
          }
        >
          {remainingTime}
        </div>
      );
    },
  },

  {
    id: "dropdown",
    cell: () => {
      return <div className="text-right font-medium">{<DropDown />}</div>;
    },
  },
];

import useProjectStore from "@/store/projectStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertProject } from "@server/db/schema/project";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { DndContext } from "@dnd-kit/core";
import DropBoard from "./DropBoard";
import DropList from "./DropList";
import TableView from "./TableView";
import { DragEndEvent } from '@dnd-kit/core';

export default function View(props: { data: insertProject[] }) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const proStore = useProjectStore();
  // Group items by status
  const groupedItems = {
    todo: props.data.filter((item) => item.status === "TODO"),
    inWork: props.data.filter((item) => item.status === "IN WORK"),
    completed: props.data.filter((item) => item.status === "COMPLETED"),
  };

  const updateProjectMutation = useMutation({
    mutationFn: async ({
      newId,
      newStatus,
    }: {
      newId: number;
      newStatus: string;
    }) => {
      const data = props.data.find((dt) => dt.id === Number(newId));
      if (!data) throw new Error("Project not found");

      const res = await api.project.updatePro[":id"].$put({
        param: { id: newId.toString() },
        json: {
          id: newId,
          title: data.title,
          status: newStatus,
          priority: data.priority,
          dueAt: data.dueAt,
          createdAt: data.createdAt,
          description: data.description,
        },
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-project"] });

      toast({
        title: "Update",
        description: "is now updated",
      });
    },
  });

  // Handle item drop
  const handleDragEnd = (event:DragEndEvent) => {
    const { active, over } = event;
    if (over && active) {
      const itemId = active.id;
      const newStatus = over.id;

      // Trigger mutation to update status
      updateProjectMutation.mutate({ newId: itemId as number, newStatus: newStatus as string });
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {proStore.viewType == "table" && (
        <div className="flex flex-col justify-between ">
          <TableView items={props.data} />
        </div>
      )}
      {proStore.viewType == "board" && (
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between w-10/12  mt-10">
          <DropBoard
            zoneId="TODO"
            items={groupedItems.todo}
            amh="ለማድረግ"
            color="border-b-green-400"
            value={0}
          />
          <DropBoard
            zoneId="IN WORK"
            items={groupedItems.inWork}
            amh="በስራ ላይ"
            color="border-b-orange-400"
            value={50}
          />
          <DropBoard
            zoneId="COMPLETED"
            items={groupedItems.completed}
            amh="የተጠናቀቀ"
            color="border-b-blue-400"
            value={99}
          />
        </div>
      )}
      {proStore.viewType == "list" && (
        <div className="flex flex-col justify-between w-11/12 md:w-9/12 lg:w-8/12 ml-8 mt-10">
          <DropList
            zoneId="TODO"
            items={groupedItems.todo}
            amh="ለማድረግ"
            color="border-b-green-400"
            value={0}
          />
          <DropList
            zoneId="IN WORK"
            items={groupedItems.inWork}
            amh="በስራ ላይ"
            color="border-b-orange-400"
            value={50}
          />
          <DropList
            zoneId="COMPLETED"
            items={groupedItems.completed}
            amh="የተጠናቀቀ"
            color="border-b-blue-400"
            value={99}
          />
        </div>
      )}

      <Toaster />
    </DndContext>
  );
}

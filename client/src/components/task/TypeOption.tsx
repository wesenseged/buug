import * as React from "react";
// Tanstack router
import { useQuery } from "@tanstack/react-query";
// Ui components
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
// api
import { projectQueryOption } from "@/lib/api";
import { Project } from "@server/db/schema/project";
// Task store
import useTaskStore from "@/store/taskStore";

export default function TypeOption() {
  const { data, isLoading } = useQuery(projectQueryOption);
  const [open, setOpen] = React.useState(false);
  const [selectedTask, setSelectedTask] = React.useState<Project | null>(null);
  const taskStore = useTaskStore();

  if (isLoading) return <>loading</>;

  return (
    <div className="flex bg-zinc-200 dark:bg-zinc-800 dark:text-white text-black rounded-sm items-center space-x-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[150px] justify-start">
            {selectedTask ? <>{selectedTask.title}</> : <>+ Set status</>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="right" align="start">
          <Command>
            <CommandInput placeholder="Change status..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {data && data.map((type: Project) => (
                  <CommandItem
                    key={type.id}
                    value={type.title}
                    onSelect={(value) => {
                      setSelectedTask(
                        data!.find((type: Project) => type.title === value) ||
                          null,
                      );
                      taskStore.handleType(type.title);
                      setOpen(false);
                    }}
                  >
                    {type.title}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

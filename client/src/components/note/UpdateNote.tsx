import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useNoteStore from "@/store/noteStore";
import { useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";

export default function UpdateTitle() {
  const store = useNoteStore();
  const [open, setOpen] = useState(false);
  const [updateTitle, setUpdateTitle] = useState(store.notes!.title);

  const queryClinet = useQueryClient();

  const updateNoteTitle = useMutation({
    mutationKey: ["update-note"],
    mutationFn: async (value: {
      id: number;
      title: string;
      createdAt: string;
    }) => {
       api.note.updateTitle[":id"].$put({
        param: { id: value.id.toString() },
        json: {
          title: value.title,
          createdAt: value.createdAt,
        },
      });
    },
    onSuccess: () => {
      queryClinet.invalidateQueries({ queryKey: ["get-notes"] });
      setOpen(false);
    },
  });

  useEffect(() => {
    setOpen(false);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="bg-zinc-800 p-2 hover:scale-105 hover:bg-black items-center flex justify-start w-fit font-thin text-zinc-200"
        >
          <Pencil size={16} />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white text-gray-700 dark:bg-black dark:text-gray-100 border-gray-100 dark:border-gray-700">
        <DialogHeader>
          <DialogTitle> TASK</DialogTitle>
          <DialogDescription>
            Update title in here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              name="title"
              value={updateTitle}
              onChange={(e) => setUpdateTitle(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            onClick={() => {
              // store.updateTitle(props.id, updateTitle);
              updateNoteTitle.mutate({
                id: store.notes!.id!,
                title: updateTitle,
                createdAt: store.notes!.createdAt,
              });
            }}
            className="bg-black text-gray-200 dark:bg-white dark:text-gray-700 hover:text-white hover:bg-purple-800 dark:hover:text-black dark:hover:bg-purple-400"
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

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
import { useToast } from "@/hooks/use-toast";
import { api } from "@/lib/api";
import useNoteStore from "@/store/noteStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { useForm } from "@tanstack/react-form";
import { insertNoteSchema } from "@server/types/note";
import { Toaster } from "../ui/toaster";

export default function AddNote() {
  const store = useNoteStore();
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  useEffect(() => {
    setOpen(false);
  }, []);

  const addNoteMutation = useMutation({
    mutationKey: ["create-notes"],
    mutationFn: async function addNote(title: string) {
      const res = await api.note.newNote.$post({
        json: {
          title: title,
          createdAt: store.currentDate(),
        },
      });
      const dt = res.json();
      return dt;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-notes"] });
      toast({
        title: "Note has successfully Created",
        description: store.currentDate(),
      });

      setOpen(false);
    },
  });

  const form = useForm({
    validatorAdapter: zodValidator(),
    defaultValues: {
      title: "",
    },
    onSubmit: async ({ value }) => {
      addNoteMutation.mutate(value.title);
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="hover:scale-105 mt-1 ml-1 items-center flex justify-center">
          <Plus size={20} /> <span className="ml-3">Add Note</span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white text-gray-700 dark:bg-black dark:text-gray-100 border-gray-100 dark:border-gray-700">
        <DialogHeader>
          <DialogTitle> NOTE</DialogTitle>
          <DialogDescription>
            Add title in here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <form.Field
                name="title"
                validatorAdapter={zodValidator()}
                validators={{
                  onChange: insertNoteSchema.shape.title,
                }}
                children={(field) => {
                  // Avoid hasty abstractions. Render props are great!
                  return (
                    <>
                      <Label htmlFor={field.name}>Title</Label>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                    </>
                  );
                }}
              />
            </div>
          </div>
          <DialogFooter>
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <Button type="submit" disabled={!canSubmit}>
                  {isSubmitting ? "..." : "Submit"}
                </Button>
              )}
            />
          </DialogFooter>
        </form>
      </DialogContent>
      <Toaster />
    </Dialog>
  );
}

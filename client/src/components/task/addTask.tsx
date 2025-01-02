import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
// Ui components
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Plus } from "lucide-react";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
// Task store
import useTaskStore from "@/store/taskStore";
import TypeOption from "./TypeOption";
// api
import { api } from "@/lib/api";
import { insertTaskSchema } from "@/types/task";

interface NewTask {
  title: string;
  desc: string;
  type: string;
  createdAt: string;
  dueAt: string;
}
export default function App() {
  const taskStore = useTaskStore();
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const createTask = async (value: NewTask) => {
    const res = await api.task.create.$post({ json: value });
    const data = await res.json();
    if (!res.ok) {
      return Error;
    } else return data;
  };

  const postTask = useMutation({
    mutationFn: (value: NewTask) => {
      return createTask(value);
    },
    onError: () => {
      toast({
        title: "Scheduled: Catch up ",
        description: "Friday, February 10, 2023 at 5:57 PM",
        action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-tasks"] });
      taskStore.handleType("");

      toast({
        title: "Task Created",
        description: "Friday, February 10, 2023 at 5:57 PM",
        action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
      });
      setOpen(false);
    },
  });

  const form = useForm({
    validatorAdapter: zodValidator(),
    defaultValues: {
      title: "",
      desc: "",
      type: "",
      createdAt: taskStore.currentDate().toString(),
      dueAt: taskStore.tomorrow().toString(),
    } as NewTask,
    onSubmit: async ({ value }) => {
      postTask.mutate({
        title: value.title,
        desc: value.desc,
        type: taskStore.type,
        createdAt: value.createdAt,
        dueAt: value.dueAt,
      });
      form.reset();
    },
  });

  useEffect(() => {
    setOpen(false);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="flex items-center space-x-2 hover:scale-105">
        <Plus size={20} /> <span>Add Task</span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] h-[500px] bg-white dark:bg-black dark:text-gray-200 text-gray-700 border border-gray-100">
        <DialogHeader>
          <DialogTitle className="text-xl">Task</DialogTitle>
          <DialogDescription className=" font-thin">
            Task in here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <div className="mb-10">
            <form.Field
              name="title"
              validatorAdapter={zodValidator()}
              validators={{
                onChange: insertTaskSchema.shape.title,
              }}
              children={(field) => {
                return (
                  <div className="flex flex-col items-start space-y-2">
                    <Label htmlFor={field.name}>Title</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />

                    <h1 className=" text-red-500 font-sans h-4">
                      {field.state.meta.isTouched &&
                      field.state.meta.errors.length ? (
                        <em>{field.state.meta.errors.join(",")}</em>
                      ) : null}
                      {field.state.meta.isValidating ? "Validating..." : null}
                    </h1>
                  </div>
                );
              }}
            />
          </div>
          <div className="mb-10">
            <form.Field
              name="desc"
              validatorAdapter={zodValidator()}
              validators={{
                onChange: insertTaskSchema.shape.desc,
              }}
              children={(field) => (
                <div className="flex flex-col items-start space-y-2">
                  <Label htmlFor={field.name}>Description</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <h1 className=" text-red-500 font-sans h-4">
                    {field.state.meta.isTouched &&
                    field.state.meta.errors.length ? (
                      <em>{field.state.meta.errors.join(",")}</em>
                    ) : null}
                    {field.state.meta.isValidating ? "Validating..." : null}
                  </h1>
                </div>
              )}
            />
          </div>

          <div className="flex items-center space-x-3">
            <Label htmlFor="username" className="text-right">
              type
            </Label>
            <TypeOption />
          </div>
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <Button
                type="submit"
                disabled={!canSubmit}
                className="bg-black mt-5 text-gray-200 dark:bg-white dark:text-gray-700 hover:text-white hover:bg-purple-800 dark:hover:text-black dark:hover:bg-purple-400"
              >
                {isSubmitting ? "..." : "Submit"}
              </Button>
            )}
          />
        </form>
      </DialogContent>
    </Dialog>
  );
}

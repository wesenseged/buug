import { useState } from "react";
// Tanstack query, form, zod-form-adapter
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
// Ui components
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Combobox from "../Combobox";
import DatePicker from "../DatePicker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// project and main Store
import useProjectStore from "@/store/projectStore";
import useMainStore from "@/store/mainStore";
// api
import { api } from "@/lib/api";
import { insertProjectSchema } from "@/types/project";
import { Plus } from "lucide-react";

interface NewProject {
  title: string;
  description: string;
  status: string;
  priority: string;
  createdAt: string;
  dueAt: string;
}

export default function AddProject() {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const proStore = useProjectStore();
  const mainStore = useMainStore();
  const button = {
    eng: "Create Project",
    amh: "ፕሮጀክት ይፍጠሩ",
  };

  const projectCreateMutation = useMutation({
    mutationKey: ["project"],
    mutationFn: async (value: NewProject) => {
      const res = await api.project.createPro.$post({
        json: value,
      });
      const data = await res.json();
      return data;
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["get-project"] });
      // toast("Task created");
      setOpen(false);
    },
  });

  const form = useForm({
    validatorAdapter: zodValidator(),
    defaultValues: {
      title: "",
      description: "",
      status: "",
      createdAt: proStore.currentDate(),
      dueAt: proStore.date?.toDateString(),
      priority: "",
    },
    onSubmit: async ({ value }) => {
      // Do something with form data
      projectCreateMutation.mutate({
        title: value.title,
        description: value.description,
        status: proStore.status,
        priority: value.priority,
        createdAt: value.createdAt,
        dueAt: proStore.date!.toDateString(),
      });
      form.reset();
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="flex items-center space-x-2 mr-3 hover:scale-105">
        <Plus size={20} />
        <span>{mainStore.toggleLanguage ? button.eng : button.amh}</span>
      </DialogTrigger>
      <DialogContent className=" h-[600px] bg-white dark:bg-black border border-white dark:border-zinc-500 text-black dark:text-white">
        <DialogHeader>
          <DialogTitle>Add project</DialogTitle>
          <DialogDescription className="dark:text-zinc-200 text-zinc-800">
            You can create new project and add to your project list.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <div className="flex flex-col space-y-3 justify-center items-start">
            {/* A type-safe field component*/}
            <form.Field
              name="title"
              validatorAdapter={zodValidator()}
              validators={{
                onChange: insertProjectSchema.shape.title,
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
                    <h1 className=" text-red-500 font-sans h-4">
                      {field.state.meta.isTouched &&
                      field.state.meta.errors.length ? (
                        <em>{field.state.meta.errors.join(", ")}</em>
                      ) : null}
                      {field.state.meta.isValidating ? "Validating..." : null}
                    </h1>
                  </>
                );
              }}
            />
            {/* A type-safe field component*/}
            <form.Field
              name="description"
              validatorAdapter={zodValidator()}
              validators={{
                onChange: insertProjectSchema.shape.title,
              }}
              children={(field) => {
                // Avoid hasty abstractions. Render props are great!
                return (
                  <>
                    <Label htmlFor={field.name}>Desc</Label>
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
                        <em>{field.state.meta.errors.join(", ")}</em>
                      ) : null}
                      {field.state.meta.isValidating ? "Validating..." : null}
                    </h1>
                  </>
                );
              }}
            />

            <div className="flex items-center space-x-3">
              <Label htmlFor="username" className="text-right">
                Status
              </Label>
              <Combobox />
            </div>
            <div className="flex items-center space-x-3">
              {/* A type-safe field component*/}
              <form.Field
                name="priority"
                validators={{
                  onChange: ({ value }) =>
                    !value
                      ? "A first name is required"
                      : value.length < 3
                        ? "First name must be at least 3 characters"
                        : undefined,
                  onChangeAsyncDebounceMs: 500,
                  onChangeAsync: async ({ value }) => {
                    await new Promise((resolve) => setTimeout(resolve, 1000));
                    return (
                      value.includes("error") &&
                      'No "error" allowed in first name'
                    );
                  },
                }}
                children={(field) => {
                  // Avoid hasty abstractions. Render props are great!
                  return (
                    <>
                      <Label htmlFor={field.name}>Priority</Label>
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
            <div className="flex items-center space-x-3">
              <Label htmlFor="username" className="text-right">
                Duedate
              </Label>
              <DatePicker />
            </div>
          </div>
          <DialogFooter>
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <Button type="submit" disabled={!canSubmit} className="mt-5">
                  {isSubmitting ? "..." : "Save changes"}
                </Button>
              )}
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

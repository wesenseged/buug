import { SidebarFooter, SidebarHeader } from "@/components/ui/sidebar";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import {
  Copy,
  Download,
  Clipboard,
  // Pencil,
  Pin,
  Maximize,
  Minimize,
  RefreshCw,
  Settings,
  Trash,
} from "lucide-react";
import { Button } from "./button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useNoteStore from "@/store/noteStore";
import { Label } from "./label";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/lib/api";
import UpdateTitle from "../note/UpdateNote";

export function NoteSidebar(props: { id: number }) {
  const noteStore = useNoteStore();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // deleteNote
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const note = await api.note.deleteNote[":id"].$delete({
        param: { id: id.toString() },
      });
      return note;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-notes"] });
      noteStore.setWrite("");
      toast({
        title: "Note has successfully deleted",
        description: noteStore.currentDate(),
      });
    },
  });

  // Update NoteBody
  const updateMutation = useMutation({
    mutationFn: async (id: number) => {
      const note = await api.note.updateNote[":id"].$put({
        param: { id: id.toString() },
        json: {
          data: noteStore.writeNote,
        },
      });
      return note;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-notes"] });
      toast({
        title: "Note Saved!",
      });
    },
  });

  const optionButton = [
    {
      title: "Sync",
      icon: <RefreshCw />,
    },
    {
      title: "pin",
      icon: <Pin />,
    },
    {
      title: "Copy",
      icon: <Copy />,
    },
    {
      title: "Paste",
      icon: <Clipboard />,
    },

    {
      title: "Delete",
      icon: <Trash />,
    },
    {
      title: "Maximize",
      icon: (
        <Maximize
          size={24}
          onClick={() => {
            noteStore.handleNoteFullScreen(true);
          }}
        />
      ),
    },
    {
      title: "Minimize",
      icon: (
        <Minimize
          size={24}
          onClick={() => {
            noteStore.handleNoteFullScreen(false);
          }}
        />
      ),
    },
    {
      title: "Download",
      icon: <Download size={24} />,
    },
  ];

  const hello = (name: string) => {
    if (name == "Delete") {
      deleteMutation.mutate(props.id);
    }
    if (name == "Sync") {
      updateMutation.mutate(Number(props.id));
    }
    if (name == "Copy") {
      navigator.clipboard.writeText(noteStore.writeNote);
      toast({ title: "Text copied to clipboard!" });
    }
    if (name == "Download") {
      noteStore.handleDownload();
    }
    if (name == "Minimize") {
      noteStore.handleNoteFullScreen(false);
    }
    if (name == "Maximize") {
      noteStore.handleNoteFullScreen(true);
    }
  };

  return (
    <Sidebar side="right" variant="inset" collapsible="icon">
      <SidebarHeader className="bg-secondary">
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex mb-10 items-center justify-start ml-4 space-x-3">
              <Button className=" p-2 dark:bg-gray-800  hover:dark:bg-zinc-600 rounded-full bg-gray-300 ">
                <Settings color="white" />
              </Button>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="">
              {optionButton.map((item) => (
                <SidebarMenuItem
                  key={item.title}
                  onClick={() => {
                    hello(item.title);
                  }}
                >
                  <SidebarMenuButton asChild>
                    <Button
                      type="button"
                      className="bg-zinc-700 hover:scale-105 hover:bg-white hover:dark:bg-black dark:bg-zinc-800 items-center flex justify-start w-fit font-thin text-zinc-200"
                    >
                      {item.icon}
                      <span className="text-sm">{item.title}</span>
                    </Button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              <UpdateTitle />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="bg-black rounded">
        <SidebarMenu>
          <SidebarMenuItem>
            <Label>Tag</Label>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

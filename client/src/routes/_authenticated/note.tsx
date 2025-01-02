import { useState } from "react";
// Tanstack router, query
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
// Icon
import { StickyNote } from "lucide-react";
// Store and markdown gfm
import useNoteStore from "@/store/noteStore";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
// api
import { api } from "@/lib/api";
// Add Note
import AddNote from "@/components/note/AddNote";
// note type safty
import { SelectNote } from "@/types/note";
// Ui components
import { NoteSidebar } from "@/components/ui/noteSidebar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Toaster } from "sonner";
// Error page
import { ErrorPage } from "@/lib/error";

export default function Notes() {
  const noteStore = useNoteStore();

  const handleNote = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const note = e.target.value;
    noteStore.setWrite(note);
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["get-notes"],
    queryFn: async () => {
      const res = await api.note.$get();
      const data :{ notes?: SelectNote[]; message?: string }  = await res.json();
      return data;
    },
  });

  const [selectedTitle, setSelectedTitle] = useState("");
  const handleSelectedTitle = (title: string) => {
    setSelectedTitle(title);
    const noteData = data?.notes?.find((note: SelectNote) => note.title == title);
    noteStore.setWrite(noteData?.data || "");
  };

  if (isLoading) return (<div>
    <Skeleton className="w-40 h-8 mt-4" />
    <Skeleton className="w-40 h-8 mt-4" />
    <Skeleton className="w-40 h-8 mt-4" />
  </div>)
  if (error) return <ErrorPage />;

  return (
    <section className={"  overflow-scroll space-x-6 flex flex-row "}>
      <div className="space-y-5 items-start flex flex-col  p-3 rounded-xl shadow">
        <h1 className="text-2xl font-bold">Notes</h1>
        {data &&
          data!.notes!.map((note: SelectNote, index: number) => {
            return (
              <div key={index}>
                <Button
                  className={
                    selectedTitle == note.title
                      ? "bg-secondary text-primary hover:bg-secondary w-40 px-3 py-2 space-x-1 justify-start"
                      : "bg-background text-primary hover:bg-secondary items-center justify-start space-x-1 w-40 px-3 py-2"
                  }
                  onClick={() => {
                    handleSelectedTitle(note.title);
                    noteStore.setNote(note);
                  }}
                >
                  <StickyNote />
                  <p className="">{note.title}</p>
                </Button>
              </div>
            );
          })}
        <div className="flex flex-col space-y-4 w-full">
          <div className="border-t border-t-zinc-500 w-full " />

          <h1 className="text-2xl font-bold">Action</h1>
          <AddNote />
        </div>
        {selectedTitle && <NoteSidebar id={Number(noteStore.notes!.id)} />}
      </div>
      <div className="border-r-zinc-500 border-r" />

      {selectedTitle != "" && (
        <div className="grid grid-cols-2">
          <div className="flex">
            <Textarea
              value={noteStore.writeNote}
              name="note"
              cols={90}
              rows={48}
              onChange={(e) => handleNote(e)}
              placeholder="Write your note here..."
              className={
                noteStore.noteFullScreen
                  ? "resize-none text-[17px] outline-none border-none "
                  : "resize-none text-lg outline-none border-none  "
              }
            />
          </div>
          <div className="w-full border-l border-l-zinc-600 p-3 prose text-black dark:text-white">
            <Markdown remarkPlugins={[remarkGfm]}>
              {noteStore.writeNote}
            </Markdown>
          </div>
        </div>
      )}

      <Toaster />
    </section>
  );
}

export const Route = createFileRoute("/_authenticated/note")({
  component: Notes,
});

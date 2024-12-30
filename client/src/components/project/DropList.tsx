import useProjectStore from "@/store/projectStore";
import List from "./List";
import { useDroppable } from "@dnd-kit/core";
import { InsertProject } from "@server/types/project";
import useMainStore from "@/store/mainStore";

export default function DropList(props: {
  zoneId: string;
  amh: string;
  color: string;
  value: number;
  items: InsertProject[];
}) {
  const store = useProjectStore();
  const mainStore = useMainStore();
  const { setNodeRef, isOver } = useDroppable({
    id: props.zoneId,
  });
  return (
    <div
      ref={setNodeRef}
      className={isOver ? "border p-5 bg-zinc-900 rounded-xl" : "p-5"}
    >
      <h1 className="font-medium text-xl">
        {mainStore.toggleLanguage ? props.zoneId : props.amh}
      </h1>
      <div className={"w-11/12 mt-2 mb-10 border h-0 " + props.color} />
      {props.items
        .filter((item) =>
          item.title.toLowerCase().includes(store.search.toLowerCase()),
        )
        .map((project: InsertProject, index: number) => {
          return (
            <List
              key={project.id}
              value={props.value}
              index={index}
              project={project}
            />
          );
        })}
    </div>
  );
}

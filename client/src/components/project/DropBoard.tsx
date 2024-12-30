import useProjectStore from "@/store/projectStore";
import Board from "./Board";
import { useDroppable } from "@dnd-kit/core";
import { insertProject } from "@server/db/schema/project";
import useMainStore from "@/store/mainStore";

export default function DropBoard(props: {
  zoneId: string;
  amh: string;
  color: string;
  value: number;
  items: insertProject[];
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
      <div className={"w-72 mt-2 mb-10 border h-0 " + props.color} />
      {props.items
        .filter((item) =>
          item.title.toLowerCase().includes(store.search.toLowerCase()),
        )
        .map((project: insertProject, index: number) => {
          return (
            <Board
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

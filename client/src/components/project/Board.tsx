import { Progress } from "@/components/ui/progress";
import { useDraggable } from "@dnd-kit/core";
import { insertProject } from "@server/db/schema/project";

export default function Board(props: {
  index: number;
  value: number;
  project: insertProject;
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.project.id!,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      draggable={true}
      style={style}
      className="rounded-2xl w-fit pl-2 pt-2 bg-gray-100 dark:bg-zinc-900 "
    >
      <div className="flex flex-row cursor-grab relative bg-white dark:bg-black shadow-lg  dark:shadow-black border border-zinc-200 dark:border-zinc-700 justify-between w-72 h-52 p-5 mb-10 rounded-2xl rounded-br-none">
        <div>
          <h1 className="text-lg font-medium">{props.project.title}</h1>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
            {props.project.description}
          </p>
          <p className="text-sm bg-orange-200 text-gray-700 rounded-md mt-6 min-w-0 w-fit px-2 py-1">
            {props.project.priority}
          </p>
          <Progress value={props.value} className="w-36 mt-4 mb-10 h-1" />
        </div>
        <div>
          <h1 className="absolute bottom-3 right-3 text-zinc-500 text-sm">
            {props.project.dueAt}
          </h1>
        </div>
      </div>
    </div>
  );
}

import { Progress } from "@/components/ui/progress";
import { InsertProject } from "@server/types/project";
import { useDraggable } from "@dnd-kit/core";

export default function List(props: {
  index: number;
  value: number;
  project: InsertProject;
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
      {...listeners}
      {...attributes}
      draggable={true}
      style={style}
      className="rounded-2xl pr-2 pt-2 bg-gray-100 dark:bg-zinc-900 "
    >
      <div className="flex flex-col cursor-grab relative bg-white dark:bg-black dark:shadow-black border border-zinc-200 dark:border-zinc-700 shadow-lg justify-between min-w-full md:w-11/12 h-20 p-5 mb-10 rounded-2xl rounded-bl-none">
        <div className="flex justify-between">
          <h1 className="text-sm md:text-lg font-medium">
            {props.project.title}
          </h1>
          <p className="text-sm bg-orange-200 text-gray-700 rounded-md  min-w-0 w-fit px-2 py-1">
            {props.project.priority}
          </p>
        </div>

        <div className="flex justify-between">
          <h1 className="text-sm text-zinc-500">{props.project.dueAt}</h1>

          <Progress value={props.value} className="w-20  md:w-36 mt-4 h-1" />
        </div>
      </div>
    </div>
  );
}

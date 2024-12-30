import { Dot, Expand } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { InsertProject } from "@server/types/project";
import { Label } from "../ui/label";

export function DrawerDemo(props: { item: InsertProject }) {

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">
          <Expand />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="w-full">
        <div className="mx-auto w-screen max-w-sm ">
          <DrawerHeader>
            <DrawerTitle className="text-6xl">{props.item.title}</DrawerTitle>
            <DrawerDescription className="text-xl">
              {props.item.description}
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0 space-y-4">
            <div className="space-x-2 flex text-xl">
              <Dot />
              <Label className="text-zinc-500 text-2xl">
                {props.item.status}
              </Label>
            </div>
            <div className="space-x-2 flex text-xl">
              <Dot />
              <Label className="text-zinc-500 text-2xl">
                {props.item.priority && props.item.priority.toUpperCase()}
              </Label>
            </div>
            <div className="flex flex-col ">
              <Label className="text-2xl text-zinc-500">TASKS </Label>
              <div className="flex flex-col">
                {props.item.tasks?.map((task, index) => {
                  return (
                    <ul key={index} className="my-2 ml-5">
                      <li>{task.title}</li>
                      <li className="text-zinc-500">{task.desc}</li>
                    </ul>
                  );
                })}
              </div>
            </div>
          </div>
          <DrawerFooter>
            <div>
              <Label className="right-0 p-1 absolute">
                {props.item.createdAt && props.item.createdAt.slice(0, 15)}
              </Label>
            </div>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

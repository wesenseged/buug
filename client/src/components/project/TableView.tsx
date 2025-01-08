import { SelectProject } from "@/types/project";
import { DataTable } from "../task/dataTable";
import { columns } from "./column-pro";
import { Card, CardDescription, CardFooter, CardHeader } from "../ui/card";
import { Folder } from "lucide-react";

const TableView = (props: { items: SelectProject[] }) => {
  return (
    <div className="w-full">

            <Card className="w-96 my-10">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardDescription className="text-xl">
{props.items.length > 1 ? "Active Projects": "Active Project"}
                </CardDescription>
                <div>
                  <Folder color="gray" size={18} />
                </div>
              </CardHeader>
              <CardFooter className="flex flex-col items-start">
                <h1 className="text-4xl font-bold">{props.items.length}</h1>
              </CardFooter>
            </Card>

      <DataTable columns={columns} data={props.items} />
    </div>
  );
};

export default TableView;

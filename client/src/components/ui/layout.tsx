import {
  SidebarFooter,
  SidebarGroupLabel,
  SidebarHeader,
} from "@/components/ui/sidebar";
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
  ListTodo,
  Settings,
  Folder,
  Pencil,
  LifeBuoy,
  User2,
  ChevronUp,
  ChevronDown,
  LogOut,
  Bell,
  ChartPie,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import { useSidebar } from "@/components/ui/sidebar";
import useMainStore from "@/store/mainStore";
import { Button } from "./button";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { userQueryOption } from "@/lib/api";

const items = [
  {
    id: 1,
    url: "/task",
    title: "Todo",
    amh: "ስራ",
    icon: <ListTodo size={40} className="w-32 h-10" />,
  },
  {
    id: 2,
    url: "/project",
    title: "Projects",
    amh: "ፕሮጀክቶች",
    icon: <Folder size={64} />,
  },
  {
    id: 3,
    url: "/note",
    title: "Notes",
    amh: "ማስታወሻዎች",
    icon: <Pencil />,
  },
  {
    id: 4,
    url: "/progress",
    title: "Progress",
    amh: "እድገት",
    icon: <ChartPie />,
  },
];

const helpItems = [
  {
    id: 1,
    url: "/setting",
    title: "Settings",
    amh: "ምርጫዎች",
    icon: Settings,
  },
  {
    id: 2,
    url: "/support",
    title: "Support",
    amh: "ድጋፍ",
    icon: LifeBuoy,
  },
];

export function AppSidebar() {
  const store = useMainStore();
  const { data } = useQuery(userQueryOption);
  const { state, toggleSidebar } = useSidebar();
  return (
    <Sidebar side="left" variant="floating" collapsible="icon">
      <SidebarHeader className={store.forgColor + "bg-white dark:bg-black"}>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex mb-10 items-center justify-start ml-4 space-x-3">
              <Button
                onClick={toggleSidebar}
                className=" p-2 dark:bg-gray-800  hover:dark:bg-zinc-600 rounded-full bg-gray-300 "
              >
                <img src="sheep.png" alt="" className="w-10" />
              </Button>
              <h1
                className={
                  state == "expanded"
                    ? "text-2xl font-semibold  text-zinc-500"
                    : "text-2xl font-semibold hidden text-zinc-500"
                }
              >
                Buug
              </h1>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className={store.forgColor + " "}>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      to={item.url}
                      className="[&.active]:bg-neutral-800 text-lg  text-zinc-200"
                    >
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <Collapsible defaultOpen className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="text-zinc-200 ">
                Help
                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent className="mt-4">
              {helpItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      to={item.url}
                      className="[&.active]:bg-neutral-800 mt-1 text-lg text-zinc-200"
                    >
                      <item.icon size={20} />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              <SidebarGroupContent />
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 size={80} /> {data && data.user.name}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="right"
                className="w-56 rounded-lg border border-zinc-600 shadow-xl flex text-sm flex-col items-start justify-center bg-zinc-50 dark:bg-zinc-950 py-1  space-y-2"
              >
                <Button className="flex space-x-2 items-center justify-start w-full bg-zinc-50 dark:bg-zinc-950 hover:bg-zinc-200 hover:dark:bg-zinc-800 text-black dark:text-white">
                  <User2 size={40} />
                  <div className="flex flex-col justify-start items-start">
                    <span className="">{data && data.user.name}</span>
                    <span>{data && data.user.email}</span>
                  </div>
                </Button>
                <Button className="flex w-full  items-center justify-start bg-zinc-50 dark:bg-zinc-950 hover:bg-zinc-200 hover:dark:bg-zinc-800 text-black dark:text-white">
                  <Bell size={16} />
                  <span>Notification</span>
                </Button>
                <Button onClick={() => {
                navigate({ to: "/logout" });
                }} className="flex w-full items-center justify-start bg-zinc-50 dark:bg-zinc-950 hover:bg-zinc-200 hover:dark:bg-zinc-800 text-black dark:text-white">
                  <LogOut size={16} />
                  <span>Sign out</span>
                </Button>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

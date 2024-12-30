import * as React from "react";
import { Button } from "@/components/ui/button";
import { ArrowDownNarrowWide } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useMainStore from "@/store/mainStore";

const statuses = ["English", "Amharic"];

export default function LanguagePicker() {
  const store = useMainStore();
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex text-black items-center space-x-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[150px] text-primary justify-start mt-3">
            {store.toggleLanguage ? "English" : "Amharic"}
            <ArrowDownNarrowWide className="ml-14" color="gray" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="right" align="start">
          <Command>
            <CommandInput placeholder="Change status..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {statuses.map((status) => (
                  <CommandItem
                    key={status}
                    value={status}
                    onSelect={() => {
                      store.handleLanguage(status);
                      localStorage.setItem("language", status);
                      setOpen(false);
                    }}
                  >
                    {status}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

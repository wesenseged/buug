import { useState } from "react";
import { Checkbox } from "../ui/checkbox";
import useMainStore from "@/store/mainStore";

export default function Display() {
  const store = useMainStore();
  const [showNote, setShowNote] = useState(true);
  const [showProgress, setShowProgress] = useState(true);

  const account = {
    title: {
      eng: "Display",
      amh: "ማሳያ",
    },
    desc: {
      eng: "Turn items on or off to control what's displayed in the app.",
      amh: "በመተግበሪያው ውስጥ የሚታዩትን ነገሮች ለመቆጣጠር እቃዎችን ይክፈቱ ወይም አጥፉ።",
    },
    s1: {
      eng: "Sidebar",
      amh: "ሳይድባር",
    },

    d1: {
      eng: "Sidebar",
      amh: "በጎን ባር ውስጥ ማሳየት የምትፈልጋቸውን ነገሮች ምረጥ።",
    },
    c1: {
      eng: "TODO",
      amh: "ስራ",
    },
    c2: {
      eng: "Projects",
      amh: "ፕሮጀክቶች",
    },
    c3: {
      eng: "Notes",
      amh: "ማስታወሻ",
    },
    c4: {
      eng: "Progress",
      amh: "እድገት",
    },
  };

  const toggle = (show: string) => {
    if (show == "note") {
      setShowNote(!showNote);
    } else {
      setShowProgress(!showProgress);
    }
  };
  return (
    <section>
      <h1 className="text-xl font-mono">
        {store.toggleLanguage ? account.title.eng : account.title.amh}
      </h1>
      <p className="text-sm text-gray-400 mt-2">
        {store.toggleLanguage ? account.desc.eng : account.desc.amh}
      </p>
      <div className="border border-b-gray-200 dark:border-b-gray-900 my-4 flex flex-col" />
      <h1 className="text-xl font-mono">
        {store.toggleLanguage ? account.s1.eng : account.s1.amh}
      </h1>
      <p className="text-sm text-gray-400 mt-2">
        {store.toggleLanguage ? account.d1.eng : account.d1.amh}
      </p>
      <div className="flex items-center space-x-1 mt-5">
        <Checkbox disabled checked />
        <label
          htmlFor="terms2"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {store.toggleLanguage ? account.c1.eng : account.c1.amh}
        </label>
      </div>
      <div className="flex items-center space-x-1 mt-5">
        <Checkbox disabled checked />
        <label
          htmlFor="terms2"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {store.toggleLanguage ? account.c2.eng : account.c2.amh}
        </label>
      </div>
      <div className="flex items-center space-x-1 mt-5">
        <Checkbox
          checked={showNote && true}
          onClick={() => {
            toggle("note");
          }}
        />
        <label
          htmlFor="terms2"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {store.toggleLanguage ? account.c3.eng : account.c3.amh}
        </label>
      </div>
      <div className="flex items-center space-x-1 mt-5">
        <Checkbox
          checked={showProgress && true}
          onClick={() => {
            toggle("progress");
          }}
        />
        <label
          htmlFor="terms2"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {store.toggleLanguage ? account.c4.eng : account.c4.amh}
        </label>
      </div>
    </section>
  );
}

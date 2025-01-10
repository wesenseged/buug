import { Input } from "../ui/input";
import useMainStore from "@/store/mainStore";
import { useQuery } from "@tanstack/react-query";
import { userQueryOption } from "@/lib/api";
import { Label } from "../ui/label";
import { LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "@tanstack/react-router";

export default function Profile() {
  const mainStore = useMainStore();
  const navigate = useNavigate();

  const { data, isPending } = useQuery(userQueryOption);
  if (isPending) return <>Loading</>;


  const account = {
    title: {
      eng: "Profile",
      amh: "አካውንት",
    },
    desc: {
      eng: "This is how others see you on the site.",
      amh: "ሌሎች በድረ ገጹ ላይ እንዲህ ያዩሃል ።",
    },
    s1: {
      eng: "Username",
      amh: "የተጠቃሚ ስም",
    },
    d1: {
      eng: "This is your public display name. It can be your real name or a pseudonym. You can only change this once every 30 days.",
      amh: "ይህ የሕዝብ ማሳያ ስምህ ነው ። እውነተኛ ስምህ ወይም ስምህ ሊሆን ይችላል ። ይህን መለወጥ የምትችለው በየ30 ቀናት አንድ ጊዜ ብቻ ነው ። ኢሜይል",
    },
    s2: {
      eng: "Email",
      amh: "ኢሜይል",
    },
    d2: {
      eng: "You can manage verified email addresses in your email settings.",
      amh: "በእርስዎ ኢሜይል አቀማመጦች ውስጥ የተረጋገጡ የኢሜይል አድራሻዎችን መቆጣጠር ይችላሉ.",
    },
  };

  return (
    <section>
      {data && (
        <div>
          <h1 className="text-xl">
            {mainStore.toggleLanguage ? account.title.eng : account.title.amh}
          </h1>
          <p className="text-sm text-gray-400 mt-2">
            {mainStore.toggleLanguage ? account.desc.eng : account.desc.amh}
          </p>
          <div className="border border-b-gray-200 dark:border-b-gray-900 my-4 flex flex-col" />
          <div className="space-y-2">
            <Label className="text-lg">
              {mainStore.toggleLanguage ? account.s1.eng : account.s1.amh}
            </Label>
            <Input
              name="userName"
              value={data.user! && data.user.name.toUpperCase()}
              disabled
              type="text"
              className="text-lg"
            />
            <p className="text-sm text-gray-400 dark:text-gray-500">
              {mainStore.toggleLanguage ? account.d1.eng : account.d1.amh}
            </p>
          </div>
          <div className="space-y-6 mt-4">
            <Button
              onClick={() => {
                navigate({ to: "/logout" });
              }}
              className="rounded-sm flex w-28 space-x-2 text-white bg-zinc-800 hover:bg-zinc-900 px-3 py-2 mt-3"
            >
              <LogOut /> <span>Logout</span>
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}

import { useState } from "react";
// Tanstack router
import { createFileRoute } from "@tanstack/react-router";
// Setting components
import Appearance from "@/components/setting/Appearance";
import Profile from "@/components/setting/Profile";
import Display from "@/components/setting/Display";
import Account from "@/components/setting/Account";
// Main store
import useMainStore from "@/store/mainStore";

export default function Settings() {
  const store = useMainStore();
  const [selectTab, setSelectTab] = useState("Profile");
  const tabs = [
    { eng: "Profile", amh: "ፕሮፌይል" },
    { eng: "Account", amh: "አካውንት" },
    { eng: "Appearance", amh: "መልክ" },
    { eng: "Notifications", amh: "ማሳወቂያ" },
    { eng: "Display", amh: "አሳይ" },
  ];
  const title = { eng: "Settings", amh: "ምርጫዎች" };
  const desc = {
    eng: "Manage your account settings and set e-mail preferences.",
    amh: "የአካውንት አቀማመዶችዎን ያስተዳድሩ እና የኢ-ሜይል ምርጫዎች ያስቀምጡ.",
  };

  return (
    <section className="lg:w-10/12 w-full">
      <div className="space-y-8  rounded-xl mt-10 ">
        <section className="border border-zinc-300 shadow dark:shadow-zinc-700 dark:border-zinc-900 p-5 rounded-lg h-[90vh] mt-10">
          <h1 className="text-3xl font-semibold">
            {store.toggleLanguage ? title.eng : title.amh}
          </h1>
          <p className="text-zinc-400 mt-3">
            {store.toggleLanguage ? desc.eng : desc.amh}
          </p>

          <div className="border border-b-zinc-200 dark:border-b-zinc-600 my-8" />
          <div className="flex flex-row space-x-10">
            <div className="flex flex-col text-start space-y-4 justify-start font-medium items-start w-48">
              {tabs.map((tab, index) => {
                return (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectTab(tab.eng);
                    }}
                    type="button"
                    className={
                      selectTab == tab.eng
                        ? `${store.forgColor} w-full text-start px-3 py-1 text-white items-start rounded-sm`
                        : "hover:underline  w-full text-start px-3 py-1 items-start rounded-sm"
                    }
                  >
                    {store.toggleLanguage ? tab.eng : tab.amh}
                  </button>
                );
              })}
            </div>
            {selectTab == "Profile" && <Profile />}
            {selectTab == "Appearance" && <Appearance />}
            {selectTab == "Display" && <Display />}
            {selectTab == "Account" && <Account />}
          </div>
        </section>
      </div>
    </section>
  );
}

export const Route = createFileRoute("/_authenticated/setting")({
  component: Settings,
});

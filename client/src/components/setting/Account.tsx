import useMainStore from "@/store/mainStore";
import { Input } from "../ui/input";
import LanguagePicker from "./LanguagePicker";

export default function Account() {
  const store = useMainStore();
  const account = [
    {
      title: {
        eng: "Account",
        amh: "አካውንት",
      },
      desc: {
        eng: "Update your account settings. Set your preferred language and timezone.",
        amh: "የአካውንት አቀማመዶችህን አሻሽል። የምትመርጠውን ቋንቋና የጊዜ ክልል አስቀምጥ።",
      },
      s1: {
        eng: "Name",
        amh: "ስም",
      },
      d1: {
        eng: "This is the name that will be displayed on your profile and in emails.",
        amh: "ይህ ስም ነው በፕሮፋይልዎ እና ውስጥ የሚታየው ኢሜይል።",
      },
      s3: {
        eng: "Language",
        amh: "ቋንቋ",
      },
      d3: {
        eng: "This is the language that will be used in the dashboard.",
        amh: "ይህ በዳሽ ቦርዱ ውስጥ የሚጠቀመው ቋንቋ ነው።",
      },
    },
  ];
  return (
    <section className="">
      {account.map((acc, index) => {
        return (
          <div key={index}>
            <h1 className="text-xl font-mono">
              {store.toggleLanguage ? acc.title.eng : acc.title.amh}
            </h1>
            <p className="text-sm text-gray-400 mt-2">
              {store.toggleLanguage ? acc.desc.eng : acc.desc.amh}
            </p>

            <div className="border border-b-gray-200 dark:border-b-gray-900 my-4 flex flex-col" />
            <div className="space-y-3">
              <h1>{store.toggleLanguage ? acc.s1.eng : acc.s1.amh}</h1>
              <Input name="userName" type="text" placeholder="John Fox" />
              <p className="text-sm text-gray-400 dark:text-gray-500">
                {store.toggleLanguage ? acc.d1.eng : acc.d1.amh}
              </p>
            </div>
            <div className="space-y-3 mt-5">
              <h1>{store.toggleLanguage ? acc.s3.eng : acc.s3.amh}</h1>
              <div className="grid grid-cols-4 items-center gap-4">
                <LanguagePicker />
              </div>
              <p className="text-sm text-gray-400 dark:text-gray-500">
                {store.toggleLanguage ? acc.d3.eng : acc.d3.amh}
              </p>
            </div>
          </div>
        );
      })}
    </section>
  );
}

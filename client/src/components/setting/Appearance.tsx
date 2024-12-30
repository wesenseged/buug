import FontPicker from "./FontPicker";
import useMainStore from "@/store/mainStore";

export default function Appearance() {
  const store = useMainStore();

  const account = {
    title: {
      eng: "Appearance",
      amh: "መልክ",
    },
    desc: {
      eng: "Customize the appearance of the app. Automatically switch between day and night themes.",
      amh: "የአፕሊኬሽኑን መልክ አስቀምጥ። በቀንና በሌሊት ጭብጡን ወዲያውኑ ይቀይሩ።",
    },
    s1: {
      eng: "Font",
      amh: "የፊደል ቅርጽ",
    },

    d1: {
      eng: "Select a font",
      amh: "የፊደል ቅርጽ ይምረጡ",
    },
    s2: {
      eng: "Themes",
      amh: "ዲዛይን",
    },
    d2: {
      eng: "Select the theme for the dashboard",
      amh: "የዳሽቦርዱን ዲዛይን ይምረጡ ",
    },
    s3: {
      eng: "Color",
      amh: "ቀለም",
    },
    d3: {
      eng: "Choose a color for the menubar.",
      amh: "ለሜኑባር ቀለም ይምረጡ።",
    },
    op1: {
      eng: "Light",
      amh: "ብርሃን",
    },
    op2: {
      eng: "Dark",
      amh: "ጨለማ",
    },
  };
  const colors = [
    "bg-[#5a189a]",
    "bg-[#e76f51]",
    "bg-[#588157]",
    "bg-[#815839]",
    "bg-black border border-gray-700",
  ];
  // const fonts = ["font-Roboto", "font-sans", "font-mono", "font-Inter"];

  return (
    <div>
      <h1 className="text-xl font-mono">
        {store.toggleLanguage ? account.title.eng : account.title.amh}
      </h1>
      <p className="text-sm text-gray-400 mt-2">
        {store.toggleLanguage ? account.desc.eng : account.desc.amh}
      </p>

      <div className="border border-b-gray-200 dark:border-b-gray-900 my-4 flex flex-col" />
      <h1>{store.toggleLanguage ? account.s1.eng : account.s1.amh}</h1>
      <p className="text-sm text-gray-400 dark:text-gray-500">
        {store.toggleLanguage ? account.d1.eng : account.d1.amh}
      </p>
      <div className="grid grid-cols-4 items-center gap-4">
        <FontPicker />
      </div>

      <div className="my-8" />

      <h1>{store.toggleLanguage ? account.s2.eng : account.s2.amh}</h1>
      <p className="text-sm text-gray-400 dark:text-gray-500">
        {store.toggleLanguage ? account.d2.eng : account.d2.amh}
      </p>
      <section className="flex mt-3 justify-start space-x-10">
        <div>
          <div
            className={
              store.toggleDark
                ? "p-2 hover:outline hover:outline-gray-600 outline-black dark:outline-white rounded"
                : "p-2 outline outline-black dark:outline-white rounded"
            }
          >
            <button
              type="button"
              onClick={() => {
                store.handleDark(false);
                localStorage.setItem("theme", "false");
              }}
              className="shadow bg-gray-100 rounded-md p-4 max-w-sm w-44 "
            >
              <div className=" flex space-x-4">
                <div
                  className={`rounded-full ${store.forgColor} h-24 w-10`}
                ></div>
                <div className="flex-1 space-y-6 py-1">
                  <div className="h-4 bg-slate-200 rounded"></div>
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="h-4 bg-slate-200 rounded col-span-2"></div>
                      <div className="h-4 bg-slate-200 rounded col-span-1"></div>
                    </div>
                    <div className="h-4 bg-slate-300 rounded"></div>
                  </div>
                </div>
              </div>
            </button>
          </div>
          <h1 className="text-sm text-center mt-2 font-thin text-gray-900 dark:text-gray-300">
            {store.toggleLanguage ? account.op1.eng : account.op1.amh}
          </h1>
        </div>
        <div>
          <div
            className={
              store.toggleDark
                ? "p-2 outline outline-black dark:outline-white rounded"
                : "p-2 hover:outline hover:outline-gray-600 dark:outline-white rounded"
            }
          >
            <button
              type="button"
              onClick={() => {
                store.handleDark(true);
                localStorage.setItem("theme", "true");
              }}
              className=" shadow bg-gray-900 rounded-md p-4 max-w-sm w-44 "
            >
              <div className=" flex space-x-4">
                <div
                  className={`rounded-full ${store.forgColor} h-24 w-10`}
                ></div>

                <div className="flex-1 space-y-6 py-1">
                  <div className="h-4 bg-slate-700 rounded"></div>
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="h-4 bg-slate-700 rounded col-span-2"></div>
                      <div className="h-4 bg-slate-700 rounded col-span-1"></div>
                    </div>
                    <div className="h-4 bg-slate-700 rounded"></div>
                  </div>
                </div>
              </div>
            </button>
          </div>
          <h1 className="text-sm text-center mt-2 font-thin text-gray-900 dark:text-gray-300">
            {store.toggleLanguage ? account.op2.eng : account.op2.amh}
          </h1>
        </div>
      </section>
      <h1 className="mt-8">
        {store.toggleLanguage ? account.s3.eng : account.s3.amh}
      </h1>
      <p className="text-gray-500 text-sm">
        {store.toggleLanguage ? account.d3.eng : account.d3.amh}
      </p>
      <section className="mt-5 flex flex-row space-x-8">
        {colors.map((color, index) => {
          return (
            <button
              key={index}
              type="button"
              onClick={() => {
                store.handleColor(color);
                localStorage.setItem("forgColor", color);
              }}
              className={
                store.forgColor == color
                  ? `w-6 h-6 rounded-full ${color} outline`
                  : `w-6 h-6 rounded-full ${color} hover:outline`
              }
            />
          );
        })}
      </section>
    </div>
  );
}

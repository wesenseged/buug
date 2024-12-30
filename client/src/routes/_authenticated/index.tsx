// React
import { useEffect, useRef, useState } from "react";

// Tanstack router, query
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";

// Gsap
import gsap from "gsap";

// hand icon
import { Hand } from "lucide-react";

// api
import { userQueryOption } from "@/lib/api";

export default function Home() {
  // const mainStore = useMainStore();
  const [greeting, setGreeting] = useState("");
  const container = useRef(null);
  const tab1 = useRef(null);
  const tab2 = useRef(null);
  const tab3 = useRef(null);

  const { data } = useQuery(userQueryOption);

  const navigate = useNavigate();
  // Count down animation using gsap
  useEffect(() => {
    const tl = gsap.timeline();
    tl.to(tab1.current, {
      opacity: 1,
      duration: 1,
      ease: "power3.out",
      delay: 1,
    })
      .to(tab2.current, {
        opacity: 1,
        duration: 1,
        ease: "power3.out",
      })
      .to(tab3.current, {
        opacity: 1,
        duration: 1,
        ease: "power3.out",
      });
  }, []);

  useEffect(() => {
    const getGreeting = () => {
      const hour = new Date().getHours(); // Get the current hour (0-23)
      if (hour < 12) {
        return "Good Morning ";
      } else if (hour < 18) {
        return "Good Afternoon ";
      } else {
        return "Good Evening ";
      }
    };

    setGreeting(getGreeting());
    const timer = setTimeout(() => {
      navigate({ to: "/task" });
    }, 4000); // 10000ms = 10 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      ref={container}
      className="h-screen w-[80vw]  overflow-y-hidden pl-32 dark:text-white items-center flex flex-col"
    >
      <div className="flex mt-20 items-center">
        <div className="bg-gray-100 rounded-full inline-flex ">
          <img src="sheep.png" alt="" className="w-20" />
        </div>
        <div className="lg:flex hidden flex-col ml-3 justify-start">
          <h1 className="font-semibold text-3xl text-left">buug</h1>
          <p className="text-xl font-normal text-gray-400">
            All in one Productivity app
          </p>
        </div>
      </div>
      <div className="flex z-10 h-96 space-x-3 mt-10">
        <h1 className="text-6xl font-bold">
          {data && greeting + data.user.name.toUpperCase()}
        </h1>
        <Hand color="gray" size={64} />
      </div>
      <div className="grid grid-cols-3 w-64 py-1 relative justify-center items-center bg-gray-100 dark:bg-gray-800 rounded-xl">
        <div
          ref={tab1}
          className="bg-black dark:bg-white py-1 rounded-l-lg opacity-0"
        />
        <div ref={tab2} className="bg-black dark:bg-white py-1 opacity-0" />
        <div
          ref={tab3}
          className="bg-black dark:bg-white py-1 rounded-r-lg opacity-0"
        />
      </div>
      <footer>
        <h1 className="text-zinc-600 dark:text-zinc-400">
          All in one Produticity app
        </h1>
      </footer>
    </section>
  );
}
export const Route = createFileRoute("/_authenticated/")({
  component: Home,
});

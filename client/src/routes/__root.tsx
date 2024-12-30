import * as React from "react";
// Tanstack router and query
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { QueryClient, useQuery } from "@tanstack/react-query";
// Ui components
import { AppSidebar } from "@/components/ui/layout";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
// Main Store
import useMainStore from "@/store/mainStore";
// Api for user
import { userQueryOption } from "@/lib/api";
// Error page
import { ErrorPage } from "@/lib/error";

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: Layout,
});

export default function Layout() {
  const store = useMainStore();
  const { data, isPending, error } = useQuery(userQueryOption);

  React.useEffect(() => {
    // Retrieve values from localStorage
    const storedTheme = localStorage.getItem("theme");
    const storedColor = localStorage.getItem("forgColor");
    const storedFontValue = localStorage.getItem("fontValue");
    const storedFontLabel = localStorage.getItem("fontLabel");
    const storedLanguage = localStorage.getItem("language");
    const storedTab = localStorage.getItem("Tab");

    // Handle theme (convert string to boolean)
    if (storedTheme) {
      const isDarkMode = storedTheme === "true";
      store.handleDark(isDarkMode);
    }

    // Handle color
    if (storedColor) {
      store.handleColor(storedColor);
    }

    // Handle font (only proceed if both value and label are available)
    if (storedFontValue && storedFontLabel) {
      store.handleFont(storedFontValue, storedFontLabel);
    }

    // Handle language
    if (storedLanguage) {
      store.handleLanguage(storedLanguage);
    }

    // Handle selected tab
    if (storedTab) {
      store.handleTab(storedTab);
    }
  }, []);

  React.useEffect(() => {
    if (store.toggleDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [store.toggleDark]);
  if (isPending)
    return <Skeleton className="h-[97vh] mt-4 ml-3  w-64"></Skeleton>;

  if (error) return <ErrorPage />;

  return (
    <SidebarProvider className={store.toggleDark + " "}>
      {data!.user !== null && <AppSidebar />}
      <main className="w-full p-5 bg-background">
        <Outlet />
      </main>
    </SidebarProvider>
  );
}

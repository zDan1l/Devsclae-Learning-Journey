import { Dashboard } from "@/components/dahboard";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/sidebar";
import { createFileRoute } from "@tanstack/react-router";
import { useHydrateAtoms } from "jotai/utils";cd .
import { userAtom } from "@/atoms/userAtom";

 
export const Route = createFileRoute("/")({
  component: RouteComponent,
  loader : (() => {
    return {
      username : "danil"
    }

  })
});

function RouteComponent() {
  const data = Route.useLoaderData()
  useHydrateAtoms([[userAtom, {username : data.username}]])
  return (
      <div className="font-sans h-screen">
        <Header />
        <div className="flex h-full">
          <Sidebar />
          <Dashboard />
        </div>
      </div>
  );
}

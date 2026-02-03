import { MockTodo } from "@/modules/components/MockTodos";
import { Profile } from "@/modules/profile/components/profile";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <div>
      <section className="p-6 flex justify-between items-center bg-amber-100 border border-gray-400">
        <h3>Todos</h3>
        <div>
          <Profile />
        </div>
      </section>
      <div className="grid grid-cols-2">
        <MockTodo />
      </div>
    </div>
  );
}

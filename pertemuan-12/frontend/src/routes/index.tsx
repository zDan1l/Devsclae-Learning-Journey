import { MockTodos } from '@/modules/components/mockTodos'
import { MockTodosFeature } from '@/modules/components/mockTodosFeatured';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App
})

function App() {
  return (
    <div>
      Todos :
      <div className="grid grid-cols-2">
        <MockTodos />
        <MockTodosFeature />
      </div>
    </div>
  );
}

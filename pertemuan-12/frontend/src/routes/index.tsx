import { MockTodos } from '@/modules/components/mockTodos'
import { MockTodosFeature } from '@/modules/components/mockTodosFeatured';
import { Profile } from '@/modules/profile/components/profile';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App
})

function App() {
  return (
    <div>
      <section className='p-6 flex justify-between items-center bg-amber-100 border border-gray-400'>
        <h3>Todos</h3>
        <div>
          <Profile />
        </div>
      </section>
      <div className="grid grid-cols-2">
        <MockTodos />
        <MockTodosFeature />
      </div>
    </div>
  );
}

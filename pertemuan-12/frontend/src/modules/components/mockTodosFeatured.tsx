
import { useMockTodos } from "../hooks/useMockTodo";

export const MockTodosFeature = () => {
    const {data, isLoading} = useMockTodos()

    if(isLoading){
        return <div className="bg-zinc-50 text-3xl p-4 animate-pulse">Loading data todos...</div>
    }

    return (
        <div>
            {data?.slice(0,3).map((todo) => {
                return (
                <div key={todo.id}>{todo.title}</div>
                )
            })}
        </div>
    )
}
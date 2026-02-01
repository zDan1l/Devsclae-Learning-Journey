
import { useMockTodos } from "../hooks/useMockTodo";

export const MockTodos = () => {
    const {data, isLoading} = useMockTodos()

    if(isLoading){
        return <div className="bg-zinc-50 text-3xl p-4 animate-pulse">Loading data todos...</div>
    }

    return (
        <div>
            {data?.map((todo) => {
                return (
                <div key={todo.id}>{todo.title}</div>
                )
            })}
        </div>
    )
}
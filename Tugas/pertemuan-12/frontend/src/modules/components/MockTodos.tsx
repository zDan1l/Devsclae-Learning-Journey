import { useMockTodo } from "../hooks/useMocktodos"

export const MockTodo = () => {
    
    const {data, isLoading} = useMockTodo();

    if(isLoading){
        return (
          <div className="bg-zinc-50 text-3xl p-4 animate-pulse">
            Loading data todos...
          </div>
        );
    }
    console.log(data);

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

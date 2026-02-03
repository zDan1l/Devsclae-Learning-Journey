import { useQuery } from "@tanstack/react-query"
import type { MockTodo } from "../types";

export const useMockTodo = () => {
    return useQuery<MockTodo[]>({
        queryKey : ["mock-todos"],
        queryFn : async() => {
            const res = await fetch("http://localhost:8000/mock-todos");
            const data = await res.json();
            return data;
        }
    })
}

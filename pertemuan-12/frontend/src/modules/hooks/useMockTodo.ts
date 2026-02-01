import { useQuery } from "@tanstack/react-query";
import type { MockTodo } from "../types";

export function useMockTodos(){
    return useQuery<MockTodo[]>({
      queryKey: [],
      queryFn: async () => {
        const res = await fetch(
          "http://localhost:8000/mock-todos?throttle=true",
        );
        const data = await res.json();
        return data;
      },
    });
} 
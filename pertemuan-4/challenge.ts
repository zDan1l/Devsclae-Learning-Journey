// challenge 1 type
type Todo = {
    id: number;
    name: string;
    completed: string;
}

let todos: Todo[] = [];

function addTodo(title: string, completed: string) : void {
    const newTodo: Todo = {
        id: todos.length + 1,
        name: title,
        completed: completed 
    }
    todos.push(newTodo);
}

addTodo("Learn TypeScript", "active");
addTodo("Build a project", "active");
addTodo("Review code", "completed");

function listTodos() : void {
    todos.forEach((todo) => {
        console.log("Id:", todo.id, "Name:", todo.name, "Completed:", todo.completed);
    })
}
// listTodos();


// challenge 2 union, literal, narrowing
type status = "all" | "active" | "completed";

function filterTodos(todos: Todo[], status: status) : Todo[] {
    switch (status) {
        case "completed":
            return todos.filter(todo => todo.completed == "completed");
            break;
        case "active":
            return todos.filter(todo => todo.completed == "active");
        default:
            return todos;
            break;
    }
}

console.log("filtered todos completed : ", filterTodos(todos, "completed"));
console.log("filtered todos active : ", filterTodos(todos, "active"));
console.log("filtered todos all : ", filterTodos(todos, "all"));
// console.log("filtered todos done : ", filterTodos(todos, "done"));


// challenge 3 interface vs type alias
type Todo2 = {
    title: string;
    content : string;
}

interface TodoApiResponse{
    username: string;
    title: string;
    content: string;
}

function mapApiResponse(apiResponse : TodoApiResponse) : Todo2{
    return {
        title: apiResponse.title,
        content: apiResponse.content
    }
}

async function getDataFromApi() {
    try {
        const response = await fetch("https://v1.appbackend.io/v1/rows/mgVIYOMkqtFO");
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Error fetching data from API", error);
    }
}

async function proccessData(){
    const response = await getDataFromApi();
    console.log("API Response : ", response);
}

proccessData();





























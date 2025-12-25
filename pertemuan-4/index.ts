// array
const data : string[] = ["apple", "banana", "cherry"];


//tupple
const data2 : [number, string, boolean] = [1, "hello", true];

// literal
const gender : "male" | "female" = "male";

// union
const number: string | number = "23";

// discriminated union
type getData = {
    status : "success",
    data : string[]
} | {
    status : "error",
    error : string
}

//  

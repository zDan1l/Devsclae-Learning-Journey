import { Mars, Venus } from "lucide-react"

interface NameCardProps {
    name : string,
    age : number,
    gender : "male" | "female"
}

export const NameCard = ({name, age, gender} : NameCardProps) => {
    return  (
        <div className={`p-4 my-4 mx-10 rounded-2xl w-fit text-white ${gender == "female" ? "bg-pink-500" : "bg-blue-500"}`}>
            {gender == "male" ? <Mars /> : <Venus /> }
            <div>Name : {name}</div>
            <div>Age : {age}</div>
            <div>Gender : {gender}</div>
        </div>
    )
}
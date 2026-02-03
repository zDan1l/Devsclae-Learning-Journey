import ky from "ky";
export const api = ky.create({
    prefixUrl : process.env.VITE_API_URL || "http://localhost:8000"
})

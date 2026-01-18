import bcrypt from "bcrypt"

export function hashedPw(password : string) {
    const saltRound = 10;
    return bcrypt.hash(password, saltRound)
}

export function comparePw(password : string, hashed : string){
    return bcrypt.compare(password, hashed)
}
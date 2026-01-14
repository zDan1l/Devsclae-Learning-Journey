import bcrypt from "bcrypt"

export function hashedPassword(password : string){
    const saltround = 10;
    const newpw = bcrypt.hash(password, saltround)

    return newpw;
}

export function comparePassword(password : string, hashedPassword : string){
    return bcrypt.compare(password, hashedPassword)
}
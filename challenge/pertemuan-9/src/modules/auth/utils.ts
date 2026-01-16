import bcrypt from "bcrypt"

export function hashedPassword(password : string){
    const saltround = 10;
    return bcrypt.hash(password, saltround)
}

export function comparePassword(password : string, hashedpassowrd : string){
    const saltround = 10;
    return bcrypt.compare(password, hashedpassowrd)
}
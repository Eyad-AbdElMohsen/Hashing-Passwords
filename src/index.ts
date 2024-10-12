import express , {Express , Request , Response}from "express" 
import crypto from 'crypto';

const port = 8000;
const app : Express = express();

app.get("/",(req : Request ,res : Response) =>{
    res.send("Hello from ts express");
})

app.set('view engine', 'ejs');
app.set('views' , 'views')

function generateSalt(length: number): string{
    return crypto.randomBytes(length).toString('hex')
}
function hash(pass: string, salt: string): string{
    const hashing = crypto.createHash('sha256')
    hashing.update(salt + pass)
    return `${salt}:${hashing.digest('hex')}`
}
function compare(pass: string, hashed: string): boolean{
    let [salt] = hashed.split(':')
    let hashedPass = hash(pass, salt)
    return hashedPass === hashed
}

const salt: string = generateSalt(10);
const password: string = 'my_secure_password';
const hashedPassword: string = hash(password, salt);

console.log(`Salt: ${salt}`);
console.log(`Hashed Password: ${hashedPassword}`);
console.log(`Does the password match? ${compare(password, hashedPassword)}`);

const newPassword: string = "my_new_secure_password"
console.log(`Does the new password match? ${compare(newPassword, hashedPassword)}`);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const crypto_1 = __importDefault(require("crypto"));
const port = 8000;
const app = (0, express_1.default)();
app.get("/", (req, res) => {
    res.send("Hello from ts express");
});
app.set('view engine', 'ejs');
app.set('views', 'views');
function generateSalt(length) {
    return crypto_1.default.randomBytes(length).toString('hex');
}
function hash(pass, salt) {
    const hashing = crypto_1.default.createHash('sha256');
    hashing.update(salt + pass);
    return `${salt}:${hashing.digest('hex')}`;
}
function compare(pass, hashed) {
    let [salt] = hashed.split(':');
    let hashedPass = hash(pass, salt);
    return hashedPass === hashed;
}
const salt = generateSalt(10);
const password = 'my_secure_password';
const hashedPassword = hash(password, salt);
console.log(`Salt: ${salt}`);
console.log(`Hashed Password: ${hashedPassword}`);
console.log(`Does the password match? ${compare(password, hashedPassword)}`);
const newPassword = "my_new_secure_password";
console.log(`Does the new password match? ${compare(newPassword, hashedPassword)}`);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

const geneartorUsername = require("./libs/username-generator");
const generatePassword = require("./libs/password-generator");

const generateUsername = geneartorUsername();
const generatorPassword = generatePassword();


// console.log("=== Generated Username and Password ===");
// console.log("Username:", username);
// console.log("Password:", generatorPassword.password);
// console.log("Password Strength:", generatorPassword.strength.crack_times_display.online_no_throttling_10_per_second);

const usernameElement = document.getElementById("username");
const passwordElement = document.getElementById("password");
const strengthElement = document.getElementById("strength");

usernameElement.textContent = generateUsername;
passwordElement.textContent = generatorPassword.password;
strengthElement.textContent = generatorPassword.strength.crack_times_display.online_no_throttling_10_per_second;
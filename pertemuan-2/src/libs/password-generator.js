const passwordGenerator = require("silly-password-generator");

function generatePassword(){
    const password = passwordGenerator.generateSillyPassword();
    const strength = passwordGenerator.analyzePassword(password);
    return {
        password, strength
    }
}


module.exports = generatePassword;
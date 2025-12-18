const genetorUsername = require("sillyname");

function generateUseraname(){
    const username = genetorUsername();
    const result = username.replace(" ", "_").toLowerCase();
    return result;
}

module.exports = generateUseraname;
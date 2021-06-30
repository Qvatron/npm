var crypto = require("crypto");
var algorithm = "aes-192-cbc"; //algorithm to use
var password = "Hello darkness";
const key = crypto.scryptSync(password, 'salt', 24); //create key
var text= "this is the text to be encrypted"; //text to be encrypted

function RandomPassword(){
    var StringPassword = "",
             StringSymbols = "1234567890qwertyuiopasdfghjklzxcvbnm",
        CountRandom = 10 ;
    for (var i = 0; i<CountRandom; i++) {
             Random = Math.round(Math.random()*StringSymbols.length);
        var RandomUpper = Math.round(Math.random()*10);
             if (RandomUpper>=5) {StringPassword += StringSymbols[Random];}
            if (RandomUpper<5) {StringPassword += StringSymbols[Random];}      
    }
    return(StringPassword);
  }

  
const t = RandomPassword();
const iv = crypto.randomBytes(16); // generate different ciphertext everytime
const cipher = crypto.createCipheriv(algorithm, key, iv);
var encrypted = cipher.update(t, 'utf8', 'hex') + cipher.final('hex'); // encrypted text
console.log(encrypted);



const decipher = crypto.createDecipheriv(algorithm, key, iv);
var decrypted = decipher.update(encrypted, 'hex', 'utf8') + decipher.final('utf8'); //deciphered text
console.log(decrypted);
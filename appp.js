const mysql = require("mysql2");
const express = require('express');
passport = require('passport'),
  localStrategy = require('passport-local').Strategy,
  flash = require('connect-flash')
  var crypto = require("crypto");
var algorithm = "aes-192-cbc"; //алгоритм шифрования
var text = "Hello darkness";
const key = crypto.scryptSync(text, 'salt', 24); //создание ключа

var app = express();
  

//создание парсера
const bodyParser = require("body-parser");
const { response } = require("express");
const urlencodedParser = bodyParser.urlencoded({extended: false});
const jsonParser = express.json(); 

//парсирование
app.get("/register", urlencodedParser, function (request, response) {
  response.sendFile(__dirname + "/views/register.html");
});
app.post("/register", urlencodedParser, function (request, response) {
  if(!request.body) return response.sendStatus(400);
  var data = request.body;
  var arr = JSON.parse(JSON.stringify(data));
  
  
  //создание подключения
  const connection = mysql.createConnection({
    host: "127.0.0.2",
    user: "root",
    database: "mydbNP",
    password: "zxzxzx1234zx"
  });
 
  // тестирование подключения
   connection.connect(function(err){
      if (err) {
        return console.error("Ошибка: " + err.message);
      }
      else{
        console.log("Подключение к серверу MySQL успешно установлено");
      }
   });
  
  
  
   const sqlCreate = `create table if not exists usersnp4(
    id int primary key auto_increment,
    userLogin varchar(300),
    userSurname varchar(300),
    userName varchar(300),
    userPatron varchar(300) ,
    userPassSer int,
    userPassNum int,
    password varchar(300) unique,
    iv text
  )`;


   




 //создание таблицы
 connection.query(sqlCreate, function(err, results) {
  if(err) console.log(err);
  else console.log("Таблица создана");
});
//создание и шифрование пароля
const subpassword = RandomPassword();
const iv = crypto.randomBytes(16); // генератор рандомных чипертекстов
const cipher = crypto.createCipheriv(algorithm, key, iv);
var encrypted = cipher.update(subpassword, 'utf8', 'hex') + cipher.final('hex'); // зашифрованный пароль
const password = encrypted;
console.log(subpassword);
console.log(password);
//расшифровка
// const decipher = crypto.createDecipheriv(algorithm, key, iv);
// var decrypted = decipher.update(encrypted, 'hex', 'utf8') + decipher.final('utf8'); //расшифрованный пароль
// console.log(decrypted);

const user = [arr.userLogin, arr.userSurname, arr.userName, arr.userPatron, arr.userPassSer, arr.userPassNum, password, iv];



 const sql1 = "INSERT INTO usersnp4(userLogin, userSurname, userName, UserPatron, userPassSer, userPassNum, password, iv) VALUES(?, ?, ?, ?, ?, ?, ?, ?)";
 connection.query(sql1, user, function(err, result) {
    if(err) console.log(err);
    else console.log("Данные добавлены");
});


// const sql2 = "select * from mydbnp";
// connection.query(sql2, function (err, responce){
//   console.log(userLogin);
//   if(response){
//     console.log(response[1].userLogin);
//   }
// })

 // закрытие подключения
 connection.end(function(err) {
  if (err) {
    return console.log("Ошибка: " + err.message);
  }
  console.log("Подключение закрыто");
});
});
app.listen(3000);






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
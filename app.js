var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const http = require("http");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
var multer  = require('multer')
var upload = multer()

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
app.listen(3000);
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

//создание коннекта с дб
// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   database: "usersdb",
//   password: "zxzxzx1234ZX"
// });
//  connection.connect(function(err){
//     if (err) {
//       return console.error("Ошибка: " + err.message);
//     }
//     else{
//       console.log("Подключение к серверу MySQL успешно установлено");
//     }
//  });

 const sqlCreate = `create table if not exists users(
  id int primary key auto_increment,
  userLogin varchar(300),
  userSurname varchar(300),
  userName varchar(300),
  userPatron varchar(300) ,
  userPassSer int,
  userPassNum int
)`;




//  connection.query("SELECT * FROM users")
//           .then(result =>{
//             console.log(result[0]);
//           })
//           .catch(err =>{
//             console.log(err);
//           });



//  // создаем парсер для данных в формате json
// const jsonParser = express.json();

// let userPassword = RandomPassword();
  
// app.post("/user", jsonParser, function (request, response) {
  
  

//     console.log(request.body +' '+ userPassword);
    
//     if(!request.body) return response.sendStatus(400);
     
//     response.json(request.body); // отправляем пришедший ответ обратно
// });
  
// app.get("/", function(request, response){
      
//     response.sendFile(__dirname + "/views/register.html");
// });

//обработка пути /  с аутентификацией
app.get("/", function(request, responce){
  responce.sendFile(__dirname + "/views/auth.html")
});


const sqlInsert = "INSERT INTO users(Login, Surname, Name, Patron, PassSer, PassNum) VALUES(?,?,?,?,?,?)";



//создание парсера
const urlencodedParser = bodyParser.urlencoded({extended: false});
const jsonParser = express.json(); 


//обработка /register через json


app.get("/register", urlencodedParser, function (request, response) {
  response.sendFile(__dirname + "/views/register.html");
});
app.post("/register", urlencodedParser, function (request, response) {
  if(!request.body) return response.sendStatus(400);
  console.log(request.body);
  var data = request.body;
  console.log(data.userLogin);

  // (function() {
  //   var d = document,
  //     inp = d.getElementsByClassName('field'),
  //     mas = [];
  
  //   function save() {
  //     for (var i = 0; i < inp.length; i++) {
  //       mas[i] = inp[i].value;
  //       console.log(mas[i]);
  //     }
  //     console.log(mas);
  //   }
  //   save();
  // })();

  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "usersdb",
    password: "zxzxzx1234ZX"
  });


  connection.query(sqlCreate, function(err, results) {
        if(err) console.log(err);
        else console.log("Таблица создана");
    });
    
    const sql1 = "INSERT INTO users(userLogin, userSurname) VALUES(?, ?)";
    const sql2 = "INSERT INTO users(userSurname) VALUES(?)";
    const sql3 = "INSERT INTO users(userName) VALUES(?)";
    const sql4 = "INSERT INTO users(userPatron) VALUES(?)";
    const sql5 = "INSERT INTO users(userPassSer) VALUES(?)";
    const sql6 = "INSERT INTO users(userPassNum) VALUES(?)";
 connection.query(sql1, data.userLogin, data.userSurname,  function(err, results) {
    if(err) console.log(err);
    else console.log("Данные добавлены");
});
// connection.query(sql2, data.userSurname, function(err, results) {
//   if(err) console.log(err);
//   else console.log("Данные добавлены");
// });
// connection.query(sql3, data.userName, function(err, results) {
//   if(err) console.log(err);
//   else console.log("Данные добавлены");
// });
// connection.query(sql4, data.userPatron, function(err, results) {
//   if(err) console.log(err);
//   else console.log("Данные добавлены");
// });
// connection.query(sql5, data.userPassSer, function(err, results) {
//   if(err) console.log(err);
//   else console.log("Данные добавлены");
// });
// connection.query(sql6, data.userPassNum, function(err, results) {
//   if(err) console.log(err);
//   else console.log("Данные добавлены");
// });
  //   connection.query(sql1, request.body.userLogin, function(err, results) {
  //     if(err) console.log(err);
  //     else console.log("Данные добавлены");
  // });

      //  connection.query(sqlInsert, request.body)
      //         .then(result =>{
      //           console.log(result[0]);
      //           console.log("Данные добавлены");
      //         })
      //         .catch(err =>{
      //           console.log(err);
      //         });
    
              connection.end(function(err) {
                if (err) {
                  return console.log("Ошибка: " + err.message);
                }
                console.log("Подключение закрыто");
              });
});

app.get("/", function(request, response){
  response.send("Главная страница");

 
});


// app.post('/register', upload.array(), function (request, response, next) {
//   // req.body будет содержать текстовые поля
//   const connection = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     database: "usersdb",
//     password: "zxzxzx1234ZX"
//   }).promise();

//   console.log(request.body);

//   //  connection.connect(function(err){
//   //     if (err) {
//   //       return console.error("Ошибка: " + err.message);
//   //     }
//   //     else{
//   //       console.log("Подключение к серверу MySQL успешно установлено");
//   //     }
//   //  });

//   connection.query(sqlCreate, function(err, results) {
//     if(err) console.log(err);
//     else console.log("Таблица создана");
// });

//    connection.query(sqlInsert, request.body)
//           .then(result =>{
//             console.log(result[0]);
//             console.log("Данные добавлены");
//           })
//           .catch(err =>{
//             console.log(err);
//           });

//           connection.end(function(err) {
//             if (err) {
//               return console.log("Ошибка: " + err.message);
//             }
//             console.log("Подключение закрыто");
//           });
// })


// app.post("/user", jsonParser, function (request, response) {
//   console.log(request.body);
//   if(!request.body) return response.sendStatus(400);
   
//   response.json(request.body); // отправляем пришедший ответ обратно


//   const connection = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     database: "usersdb",
//     password: "zxzxzx1234ZX"
//   }).promise();

//    connection.connect(function(err){
//       if (err) {
//         return console.error("Ошибка: " + err.message);
//       }
//       else{
//         console.log("Подключение к серверу MySQL успешно установлено");
//       }
//    });
//    connection.query(sqlInsert, request.body)
//           .then(result =>{
//             console.log(result[0]);
//             console.log("Данные добавлены");
//           })
//           .catch(err =>{
//             console.log(err);
//           });
// //   connection.query(sqlInsert, request.body, function(err, results) {
// //     if(err) console.log(err);
// //     else console.log("Данные добавлены");
// // });
// });


app.get("/register", function(request, response){
      
  response.sendFile(__dirname + "/views/register.html");
  // response.redirect("/")
});




// //обработка пути /register
// app.get("/register", urlencodedParser, function (request, response) {
//     response.sendFile(__dirname + "/views/register.html");
// });
// app.post("/register", urlencodedParser, function (request, response) {
//     if(!request.body) return response.sendStatus(400);
//     console.log(request.body.userPassNum);
//     response.send(`${request.body.userPassNum} - ${request.body.userAge}`);
// });
  



  // закрытие подключения
  // connection.end(function(err) {
  //   if (err) {
  //     return console.log("Ошибка: " + err.message);
  //   }
  //   console.log("Подключение закрыто");
  // });


   



// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// module.exports = app;


// function RandomPassword(){
//   var StringPassword = "",
//            StringSymbols = "1234567890qwertyuiopasdfghjklzxcvbnm",
//       CountRandom = 10 ;
//   for (var i = 0; i<CountRandom; i++) {
//            Random = Math.round(Math.random()*StringSymbols.length);
//       var RandomUpper = Math.round(Math.random()*10);
//            if (RandomUpper>=5) {StringPassword += StringSymbols[Random].toUpperCase()}
//           if (RandomUpper<5) {StringPassword += StringSymbols[Random].toLowerCase()}      
//   }
//   return StringPassword;
//   }

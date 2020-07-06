var express = require('express');
var app = express();

app.use(express.static('views'));
app.use(express.urlencoded({extended: false}));

var passport = require('passport')
app.use(passport.initialize()) //Expressを使用している場合はInitializeが必要

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

var session = require('express-session');
app.use(session({secret:'ss'}));
app.use(passport.session());

passport.serializeUser((username, done) => {
  done(null, username)
});

passport.deserializeUser((username, done) => {
  User.findById(username, (err, user) => {
    done(err, user);
  })
});

var flash = require('connect-flash');
app.use(flash());

var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(function(username, password, done){
    // ここで username と password を確認して結果を返す
    if(username == 'root' && password == 'pass'){
          console.log(username);
          return done(null, username);
      //↓にはPasswordチェック処理を実装してください。
    } else {
          console.log(password)
          return done(null, false, { message: 'ユーザーIDまたはパスワードが間違っています。' })
      }
    }));

function checkAuthentication(req, res, next){
    if (req.session.username!=undefined) {  // 認証済
        return next();
    }
    else {  // 認証されていない
      console.log('falld')
        res.redirect('/login');  // ログイン画面に遷移
    }
}

//ここからルータとしての処理
app.get('/', checkAuthentication,(req, res) => {
  console.log('OK!')
  res.render('temp.ejs');
});

app.get('/temp', (req, res) => {
  res.render('temp.ejs');
});

app.get('/login', (req, res) => {
  const errorMessage = req.flash('error');
  res.render('login.ejs', {
    errorMessage: errorMessage
  });
});


app.post('/logon', passport.authenticate('local',
{failureRedirect: '/login',failureFlash: true,
    badRequestMessage: '「ユーザID」と「パスワード」は必須入力です。'}),function(req, res){
        // 認証成功するとここが実行される
        req.session.username = req.user;
        res.redirect('/');
    });

app.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/login');
});

app.listen(4000);

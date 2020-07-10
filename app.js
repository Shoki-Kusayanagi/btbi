//BTBIメインモジュール（ここには定義とユーザ認証とルーティングのみ設定
//その他のスクリプトは切り離す

//expressの定義
var express = require('express');
var app = express();
app.use(express.static('views'));
app.use(express.urlencoded({extended: false}));

//model定義
var md_index = require('./views/model/mdl_index.js');
var md_Aggregate_Day1 = require('./views/model/mdl_Aggregate_Day1.js');


//passportの定義（認証関係
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

//認証処理
passport.use(new LocalStrategy(function(username, password, done){
    // ここで username と password を確認して結果を返す
    if(username == 'root' && password == 'pass'){
          return done(null, username);
      //↓にはPasswordチェック処理を実装してください。
    } else {
          return done(null, false, { message: 'ユーザーIDまたはパスワードが間違っています。' })
      }
    }));

function checkAuthentication(req, res, next){
    if (req.session.username!=undefined) {  // 認証済
        return next();
    }
    else {  // 認証されていない
      res.redirect('/login');  // ログイン画面に遷移
    }
}

//ここからルータとしての処理
//ログイン・ログアウト画面以外は認証チェックを挟むこと
//メイン
app.get('/', checkAuthentication,(req, res) => {
  md_index.getDashboard((dash) => {res.render('index.ejs',{dash:dash})}) ;
});

//日別路線系統別
app.get('/Aggregate_Day1', checkAuthentication,(req, res) => {
  md_Aggregate_Day1.initData((Initdata) =>{res.render('Aggregate_Day1.ejs',{Initdata:Initdata})}) ;
});

//ログイン画面
app.get('/login', (req, res) => {
  const errorMessage = req.flash('error');
  res.render('login.ejs', {
    errorMessage: errorMessage
  });
});

//ログイン処理
app.post('/logon', passport.authenticate('local',
{failureRedirect: '/login',failureFlash: true,
    badRequestMessage: '「ユーザID」と「パスワード」は必須入力です。'}),function(req, res){
        // 認証成功するとここが実行される
        req.session.username = req.user;
        res.redirect('/');
    });

//ログアウト処理
app.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/login');
});

app.listen(4000);

const express = require('express');
const nunjucks = require('nunjucks');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')


// Session 설정
const flash = require('connect-flash')

// passport 설정
const passport = require('passport')
const session = require('express-session')


// db 관련
const db = require('./models');


class App {

    constructor() {
        this.app = express();

        // db 접속
        this.dbConnection();

        // 뷰엔진 셋팅
        this.setViewEngine();

        // 세선 설정
        this.setSession()

        // 미들웨어 셋팅
        this.setMiddleWare();

        // 정적 디렉토리 추가
        this.setStatic();

        // 로컬 변수
        this.setLocals();

        // 라우팅
        this.getRouting();

        // 404 페이지를 찾을수가 없음
        this.status404();

        // 에러처리
        this.errorHandler();
    }

    dbConnection() {
        // DB authentication
        db.sequelize.authenticate()
            .then(() => {
                console.log('Connection has been established successfully.');
                // return db.sequelize.sync();
            })
            .then(() => {
                console.log('DB Sync complete.');
            })
            .catch(err => {
                console.error('Unable to connect to the database:', err);
            });
    }

    setSession() {
        const SequelizeStore = require('connect-session-sequelize')(session.Store)

        this.app.sessionMiddleWare = session({
            secret: 'jeats',
            resave: false,
            saveUninitialized: true,
            cookie: {
                masAge: 2000 * 60 * 60
            },
            store: new SequelizeStore({
                db: db.sequelize
            })
            // 현재는 메모리 세션
            // DB 세션이나 , 파일 세션 하려면 하단에
            // store 설정
        })


        this.app.use(this.app.sessionMiddleWare)
        this.app.use(passport.initialize())
        this.app.use(passport.session())

        this.app.use(flash())
    }


    setMiddleWare() {

        // 미들웨어 셋팅
        this.app.use(logger('dev'));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: false}));
        this.app.use(cookieParser())
    }

    setViewEngine() {

        nunjucks.configure('template', {
            autoescape: true,
            express: this.app
        });

    }


    setStatic() {
        this.app.use('/uploads', express.static('uploads'));
        this.app.use('/static', express.static('static'))
    }

    setLocals() {

        // 템플릿 변수
        this.app.use((req, res, next) => {
            this.app.locals.isLogin = req.isAuthenticated()
            this.app.locals.currentUser = req.user
            this.app.locals.req_path = req.path;
            next();
        });

    }

    getRouting() {
        this.app.use(require('./controllers'))
    }

    status404() {
        this.app.use((req, res, _) => {
            res.status(404).render('common/404.html')
        });
    }

    errorHandler() {

        // this.app.use( (err, req, res,  _ ) => {
        //     res.status(500).render('common/500.html')
        // });

    }


}

module.exports = new App().app;



const express = require("express");
const app = express();
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const routesProducts = require("./src/models/routes/routesProductos")
const routesCarritos=require("./src/models/routes/routesCarrito")
const routes=require("./src/models/routes/routesAutenticacion")
const {validatePass} = require('./src/utils/passValidator');
const {createHash} = require('./src/utils/createHash')
const handlebars = require('express-handlebars');
const UserModel = require('./src/models/usuarios');

const multer= require('multer')
const PORT = process.env.PORT || 8080;

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now());  
    }
})

let upload = multer({storage: storage});



app.use(express.json()) 
app.use(express.urlencoded({ extended: true }))
app.use('/api/products', routesProducts)
app.use('/api/carritos', routesCarritos)


app.engine(
    "hbs", 
    handlebars.engine({
        extname: ".hbs",
        defaultLayout: 'index.hbs',
        layoutsDir: __dirname + "/src/views/layouts",
        partialsDir: __dirname + "/src/views/partials/",
        runtimeOptions: {
            allowProtoPropertiesByDefault: true,
            allowProtoMethodsByDefault: true,
        }
    })
);

app.set('view engine', 'hbs');
app.set('views', './src/views');
app.use(express.static(__dirname + "/public"));


app.use(session({
    secret: 'coderhouse',
    cookie: {
        httpOnly: false,
        secure: false,
        maxAge: parseInt(3000)
    },
    rolling: true,
    resave: true,
    saveUninitialized: true
}))



app.use(passport.initialize())
app.use(passport.session())



app.post('/uploadfile', upload.single('myFile'), (req, res, next) => {
    const file = req.file;

    if(!file) {
        const error = new Error('please upload a file');
        error.httpStatusCode = 400;
        return next(error);
    }

    res.send(file);
})

app.post('/uploadmultiple', upload.array('myFiles'), (req, res, next) => {
    const files = req.files;

    if(!files) {
        const error = new Error('please choose files');
        error.httpStatusCode = 400;
        return next(error);
    }

    res.send(files);
})



passport.use('login', new LocalStrategy(
    (username, password, callback) => {
        UserModel.findOne({ username: username }, (err, user) => {
            if (err) {
                return callback(err)
            }

            if (!user) {
                console.log('No se encontro usuario');
                return callback(null, false)
            }

            if(!validatePass(user, password)) {
                console.log('Invalid Password');
                return callback(null, false)
            }

            return callback(null, user)
        })
    }
))


passport.use('signup', new LocalStrategy(
    {passReqToCallback: true}, (req, username, password, callback) => {
        UserModel.findOne({ username: username }, (err, user) => {
            if (err) {
                console.log('Hay un error al registrarse');
                return callback(err)
            }

            if (user) {
                console.log('El usuario ya existe');
                return callback(null, false)
            }

            console.log(req.body);

            const newUser = {
                firstName: req.body.firstname,
                
                lastName: req.body.lastname,
                direccion: req.body.direccion,
                edad: req.body.edad,
                celular: req.body.celular,
                email: req.body.email,
                fotoUrl: req.body.fotoUrl,
                username: username,
                password: createHash(password)
            }

            console.log(newUser);


            UserModel.create(newUser, (err, userWithId) => {
                if (err) {
                    console.log('Hay un error al registrarse');
                    return callback(err)
                }

                console.log(userWithId);
                console.log('Registro de usuario satisfactoria');

                return callback(null, userWithId)
            })
        })
    }
))

passport.serializeUser((user, callback) => {
    callback(null, user._id)
})

passport.deserializeUser((id, callback) => {
    UserModel.findById(id, callback)
})

app.get('/', routes.getRoot);

//  LOGIN
app.get('/login', routes.getLogin);
app.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin' }), routes.postLogin);
app.get('/faillogin', routes.getFaillogin);

//  SIGNUP
app.get('/signup', routes.getSignup);
app.post('/signup', passport.authenticate('signup', { failureRedirect: '/failsignup' }), routes.postSignup);
app.get('/failsignup', routes.getFailsignup);

//  LOGOUT
app.get('/logout', routes.getLogout);


// PROFILE
app.get('/profile', routes.getProfile);

app.get('/ruta-protegida', routes.checkAuthentication, (req, res) => {
    res.render('protected')
});

//  FAIL ROUTE
app.get('*', routes.failRoute);



const server=app.listen(PORT, ()=>{
    console.log("escuchando puerto 8080")
})
server.on("error", error=> console.log(`Error en servidor ${error}`))

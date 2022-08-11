


const express = require("express");
const app = express();
const { SERVER, route } = require("./routes/productRoute");
const multer= require('multer')
const PORT = process.env.PORT || 8080;
const handlebars = require("express-handlebars");
const dotenv = require("dotenv").config();
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








const server=app.listen(PORT, ()=>{
    console.log("escuchando puerto 8080")
})
server.on("error", error=> console.log(`Error en servidor ${error}`))

require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const session       = require('express-session');
const passport      = require('passport');
const cors          = require('cors');

require('./configs/passport');


mongoose.Promise = Promise;
mongoose
  .connect(process.env.MONGODB_URI, {useNewUrlParser: true, useFindAndModify:false})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });
  // mongoose.set('useFindAndModify',false)

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());

// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

app.use(session({
  secret:"some secret goes here",
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';


app.use(cors({
  credentials: true,
  origin: ['http://localhost:3000', 'https://acquainted-app.herokuapp.com']
}));


const index = require('./routes/index');
app.use('/', index);

const userRoutes = require('./routes/userRoutes');
app.use('/api/user', userRoutes);

const eventsRoutes = require('./routes/eventsRoutes')
app.use('/api/events',eventsRoutes)
const placesRoutes = require('./routes/placesRoutes');
app.use('/api/places', placesRoutes);

app.use((req,res,next)=>{
  res.sendFile(_dirname + "/public/index.html")
})
module.exports = app;

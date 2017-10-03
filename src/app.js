import express from 'express';
const app = express();
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser'
import path from 'path'

//routes
import profiles from './routes/profiles'
import home from './routes/home'

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));



app.use(home);
app.use(profiles);

module.exports = app;

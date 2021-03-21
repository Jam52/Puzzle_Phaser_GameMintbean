const express = require("express");
const exphbs = require ("express-handlebars");
const bodyParser = require("body-parser");

const app = express();

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({extended: false}))

// access static file
app.use(express.static('public'));

app.get('/', (req, res)=>{
    res.render('index');
  });

// listening route
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Server is running at ${PORT}`);
})
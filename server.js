const express = require("express");
const exp_hbs = require ("express-handlebars");
const bodyParser = require("body-parser");

const app = express();

app.engine("handlebars", exp_hbs());
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({extended: false}))

// access static file
app.use(express.static('public'));

app.get('/', (req, res)=>{
    res.render('index', {
      title: "Find the path"
    });
  });

app.get('index2/', (req, res)=>{
  res.render('index2', {
    title: "Find the path"
  });
});

app.get('/play_game/', (req, res)=>{
  res.render('playGame', {
    title: "play find path game"
  });
});

// listening route
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Server is running at ${PORT}`);
})
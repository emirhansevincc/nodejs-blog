const express = require("express")
const ejs = require("ejs")

const app = express()

//Template Engine
app.set("view engine", "ejs");

// Middlewares
app.use(express.static('public')) // We keep static files in the public folder



app.get("/",(req, res) => {
    res.render("index.ejs")
})

app.get("/about",(req, res) => {
    res.render("about.ejs")
})

app.get("/add",(req, res) => {
    res.render("add.ejs")
})



const port = 3000

app.listen(port, () => {
    console.log('Server is up');
})
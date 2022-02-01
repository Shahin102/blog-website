const express = require('express');

const path = require('path');
const fileUpload = require('express-fileUpload');

let initial__path = path.join(__dirname, "public");

const app = express();
const port = process.env.PORT || 3000;
app.use(express.static(initial__path));
app.use(fileUpload());

app.get('/', (req, res) => {
    res.sendFile(path.join(initial__path, "home.html"));
})

app.get('/editor', (req, res) => {
    res.sendFile(path.join(initial__path, "editor.html"));
})

app.get("/admin", (req, res) => {
    res.sendFile(path.join(initial__path, "dashboard.html"));
})

app.get("/:blog", (req, res) => {
    res.sendFile(path.join(initial__path, "blog.html"));
})

app.get("/:blog/editor", (req, res) => {
    res.sendFile(path.join(initial__path, "editor.html"));
})

app.use((req, res) => {
    res.json("404");
})

app.listen(port, () => {
    console.log('listening......');
})
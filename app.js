const express = require('express')
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const todoListPath = path.join(__dirname + '/todo.json');

const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname + '/public')));
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.get('/', (req, res) => res.sendFile(path.join(__dirname + '/public/todo.html')))
app.get('/todos', (req, res) => res.json(require(todoListPath)) )


app.post('/todos', (req, res) => {

    let { id, day } = req.body;

    console.log(todoListPath)

    fs.readFile(todoListPath, 'utf8', (err, todos) => {
        if (err) {
            console.log("File read failed:", err)
            return
        }
        let todoArr = JSON.parse(todos)
        let i = JSON.parse(todos).findIndex( todo => todo.id === +id )
        if (i > -1){
            todoArr[i].day = day;
        }
        fs.writeFile(todoListPath, JSON.stringify(todoArr), (err) => {
            if (err) console.log('Error writing file:', err)
        })
    })
    res.json({err: null, msg: "Success"})
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
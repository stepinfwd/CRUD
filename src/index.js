var express = require("express");
var app = express();
const courses=require("./routes/courses")
const Joi = require('@hapi/joi');

app.use(express.json())
app.use('/api/courses', courses);


app.get("/", (req, res) => {
    res.send("my name is stepinfwd")
});


const PORT = process.env.port || 5000;
app.listen(PORT, () => { console.log(`listening on port ${PORT}`) }); //the server object listens on port 8080

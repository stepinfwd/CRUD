const express = require('express');
const router = express.Router();


const courses = [
    {
        id: 1,
        name: "course1"
    },
    {

        id: 2,
        name: "course2"
    },
    {
        id: 3,
        name: "course3" 

    }
]

router.get('/', (req, res) => {
    res.send(courses)
});
router.get("/:id", (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send("course with given id not find");
        return;
    } 
    res.send(course);
});
router.post('/', (req, res) => {
    const schema = Joi.object({
        name: Joi.string()
            .min(3)
            .max(20)
            .required(),
    })    
    const result = schema.validate(req.body);
    if (result.error) {
        res.status(404).send(result.error.details[0].message);
        return
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});


router.put("/:id", (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send("course with given id not find");
        return;
    }
    const schema = Joi.object({
        name: Joi.string()
            .min(3)
            .max(20)
            .required(),
    });
    const result = schema.validate(req.body);
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return
    }
    course.name = req.body.name;
    res.send(course)

    
});


router.delete("/:id", (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send("course with given id not find");
        return;
    }
    const index = courses.indexOf(course);
    courses.splice(index, 1);
    res.send(course);
});
module.exports = router;
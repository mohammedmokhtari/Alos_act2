const express = require('express');
const app = express();
const travelings = require('./dataFile/traveling.json');

const port = process.env.PORT || 8080;
app.use(express.json());

const { body, validationResult } = require('express-validator');


const checkMiddleware = (req, res, next) => {
    const username = req.body.name;
    const password = req.body.password;

    if (username != "admine" && password!="admine") {
        res.json({ error: " username or password incorect" });
    } else {
        next();
    }
};

app.get('/', (req, res) => {
    res.json({
        message: "Listing"
    })
});

// get all services for traveling
app.get('/travelings', (req, res) => {
    res.status(200).json(travelings);
});

// get with middelwar
app.post('/', checkMiddleware, (req, res) => {
    res.send("You logged in!!");
});

// get service travling with id
app.get('/travelings/:id', (req, res) => {
    const id = req.params.id
    const traveling = travelings.find(traveling => traveling.id === id)
    res.status(200).json(traveling);
});




// Post and test with packeg express-validator
app.post('/travelings', body('email').isEmail(),
    // password must be at least 5 chars long
    body('username').isLength({ min: 5 }), (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        travelings.push(req.body)
        res.status(200).json(travelings)
    });

app.put('/travelings/:id', body('email').isEmail(),
    // password must be at least 5 chars long
    body('username').isLength({ min: 5 }), (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const id = parseInt(req.params.id)
        let traveling = travelings.find(traveling => traveling.id === id)
        traveling.profile.name = req.body.name,
            traveling.username = req.body.username,
            traveling.email = req.body.email,
            res.status(200).json(traveling)
    });


// Delete account 
app.delete('/travelings/:id', checkMiddleware, (req, res) => {
    const id = parseInt(req.params.id)
    let traveling = travelings.find(traveling => traveling.id === id)
    travelings.splice(travelings.indexOf(traveling), 1)
    res.status(200).json(travelings)
})

const server = app.listen(port, () => {
    console.log('Server is Listening }')
})
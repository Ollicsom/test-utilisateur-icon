const express = require('express')
var cors = require ('cors');
const app = express();
const db = require('./models');
const path = require('path');
const fs = require('fs');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded())


app.get('/getSteps', async (req ,res) => {
    const steps = await db.Step.findAll();
    res.status(200).json(steps)
})

app.post('/postInfo', async (req ,res) => {
    await db.Info.postInfo();
    console.log(req.body)
    res.status(200)
})

app.get('/getIcons', async (req ,res) => {
    fs.readdir(
        path.resolve(__dirname, 'icons'),
        (err, files) => {
          if (err) throw err;
          res.status(200).json({"files": files})
        }
    );
})

app.listen(8080, () => {
    console.log('Serveur running on port 8080')
})

import { fileURLToPath } from 'url';
import express from "express";
import cors from 'cors'
import path from 'path';
import fs from 'fs';
import { parse } from 'csv-parse';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded())
app.use('/icons', express.static(__dirname + '/icons'));



app.post('/writeCSV', async (req ,res) => {

    var dataToWrite = `${req.body.id},${req.body.age},${req.body.sex},${req.body.iconPath},${req.body.reactionTime},${req.body.userGuess}\n`;

    fs.appendFile('./data.csv', dataToWrite, 'utf8', function (err) {
    if (err) {
        res.status(404);
    } else{
        res.status(200);
    }
    });
})

app.get('/getId', async (req ,res) => {
     // TO DO : FormControls, + getId

     let id;
    randomNumber();
    function randomNumber() {
        id = Math.round(Math.random() * 99999);
        var parser = parse({columns: true}, function (err, records) {
            if(records.find(record => record.id = id)) {
                randomNumber();
            }
        });
        fs.createReadStream(__dirname + '/data.csv').pipe(parser);
    }

    res.status(200).json(id)
})

app.get('/getIcons', async (req ,res) => {
    fs.readdir(
        path.resolve(__dirname, 'icons'),
        (err, files) => {
          if (err) throw err;
          files = files.filter(file => file.split('.')[1] ? true : false)
          fs.readdir(
            path.resolve(__dirname, 'icons/training'),
            (err, trainingFiles) => {
              if (err) throw err;
              
              res.status(200).json({"files": files, "trainingFiles": trainingFiles})
            }
        );
        }
    );
})

app.listen(8080, () => {
    console.log('Serveur running on port 8080')
})
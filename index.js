const express = require('express');
const { MongoClient } = require('mongodb');
const upload = require('./utils/multer');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

console.log(process.env.DB_USER);

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mkcgo.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const resultsCollection = client.db(`${process.env.DB_NAME}`).collection("results");

    app.post('/addCalculation', upload.single('file'), async (req, res) => {
        try {
            console.log(req.file);
            res.send(req.file);
        } catch (err) {
            res.send(400);
        }
    });

});

app.get('/', (req, res) => {
    res.send('Server Running...');
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

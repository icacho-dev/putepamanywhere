import * as express from 'express'
import * as multer from 'multer'
import * as cors from 'cors'
import * as fs from 'fs'
import * as path from 'path'
import * as Loki from 'lokijs'
import {
    imageFilter, loadCollection
} from './utils';

// setup
const DB_NAME = 'db.json';
const COLLECTION_NAME = 'images';
const UPLOAD_PATH = 'uploads';
const upload = multer({ dest: `${UPLOAD_PATH}/`, fileFilter: imageFilter }); // multer configuration
const db = new Loki(`${UPLOAD_PATH}/${DB_NAME}`, { persistenceMethod: 'fs' });

// app
const app = express();
app.use(cors());

app.post('/pictures', upload.single('avatar'), async (req, res) => {
    try {
        const col = await loadCollection(COLLECTION_NAME, db);
        const data = col.insert(req.file);

        db.saveDatabase();
        res.send({ id: data.$loki, fileName: data.filename, originalName: data.originalname });
    } catch (err) {
        res.sendStatus(400);
    }
})

app.get('/pictures', async (req, res) => {
    try {
        const col = await loadCollection(COLLECTION_NAME, db);
        res.send(col.data);
    } catch (err) {
        res.sendStatus(400);
    }
})

app.get('/pictures/:id', async (req, res) => {
    try {
        const col = await loadCollection(COLLECTION_NAME, db);
        const result = col.get(Number(req.params.id));

        if (!result) {
            res.sendStatus(404);
            return;
        };

        res.setHeader('Content-Type', result.mimetype);
        fs.createReadStream(path.join(UPLOAD_PATH, result.filename)).pipe(res);
    } catch (err) {
        res.sendStatus(400);
    }
})

app.listen(3000, function () {
    console.log('listening on http://localhost:3000');
});

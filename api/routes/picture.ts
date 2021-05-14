import * as multer from 'multer';
import * as fs from 'fs';
import * as path from 'path';
import * as Loki from 'lokijs';
import { Router, Request, Response } from 'express';
import {
  imageFilter, loadCollection,
} from '../utils';

const DB_NAME = 'db.json';
const COLLECTION_NAME = 'images';
const UPLOAD_PATH = 'uploads';
const maxSize:number = 9437184; // 9MB
const upload = multer({
  dest: `${UPLOAD_PATH}/`,
  fileFilter: imageFilter,
  limits: {
    fieldNameSize: 255,
    fileSize: maxSize,
    files: 1,
    fields: 1,
  },
}); // multer configuration
const db = new Loki(`${UPLOAD_PATH}/${DB_NAME}`, { persistenceMethod: 'fs' });

const route = Router();

export default (app: Router) => {
  app.use('/pictures', route);
  route.post('/pictures', upload.single('avatar'), async (req, res) => {
    try {
      const col = await loadCollection(COLLECTION_NAME, db);
      const data = col.insert(req.file);

      db.saveDatabase();
      res.send({ id: data.$loki, fileName: data.filename, originalName: data.originalname });
    } catch (err) {
      res.sendStatus(400);
    }
  });
  route.get('/', async (req, res) => {
    try {
      const col = await loadCollection(COLLECTION_NAME, db);
      res.send(col.data);
    } catch (err) {
      res.sendStatus(400);
    }
  });
  /* route.get('/:id', (req: Request, res: Response) => res.json({ user: 1 }).status(200)); */
  route.get('/:id', async (req, res) => {
    try {
      const col = await loadCollection(COLLECTION_NAME, db);
      const result = col.get(Number(req.params.id));

      if (!result) {
        res.sendStatus(404);
        return;
      }

      res.setHeader('Content-Type', result.mimetype);
      fs.createReadStream(path.join(UPLOAD_PATH, result.filename)).pipe(res);
    } catch (err) {
      res.sendStatus(400);
    }
  });
};

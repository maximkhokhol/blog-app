const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const postRoute = require('./routes/posts');
const categoryRoute = require('./routes/categories');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, '/images')));
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, '/images')));

app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
    maxPoolSize: 100,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err));

if (process.env.NODE_ENV === 'development') {
  const logStream = fs.createWriteStream('mongoose-duration.log', {
    flags: 'a',
  });

  logStream.on('error', (err) => {
    console.error('Failed to write to log file:', err);
  });

  mongoose.set('debug', function (collectionName, method, query, doc, options) {
    const startTime = Date.now();

    // Выполняем основное логирование сразу
    const logMessage =
      `[${new Date().toISOString()}] ${collectionName}.${method} ` +
      `${JSON.stringify(query)} ${JSON.stringify(options)} | Start Time: ${startTime}\n`;
    logStream.write(logMessage);

    // Обновляем лог по завершении запроса
    process.nextTick(() => {
      const duration = Date.now() - startTime;
      const durationMessage =
        `[${new Date().toISOString()}] ${collectionName}.${method} ` +
        `${JSON.stringify(query)} ${JSON.stringify(options)} | Duration: ${duration}ms\n`;
      logStream.write(durationMessage);
    });
  });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    const filename = req.body.name || `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });
app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json('No file uploaded');
  }
  res.status(200).json({
    message: 'File has been uploaded',
    path: `/images/${req.file.filename}`,
  });
});

app.use('/api/auth', authRoute); // 1
app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);
app.use('/api/categories', categoryRoute);

module.exports = app;

app.listen(5000, () => {
  console.log('Backend is running.');
});

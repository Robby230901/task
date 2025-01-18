import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import authRotta from './rotte/auth.rotte.js';
import taskRotta from './rotte/task.rotte.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Connessione a MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Rotte API
app.use('/api/auth', authRotta);
app.use('/api/tasks', taskRotta);

// Servire i file statici dal frontend in produzione
if (process.env.NODE_ENV === 'production') {
    // Serve i file statici generati dalla build di React
    app.use(express.static(path.join(__dirname, 'frontend', 'build')));

    // Inoltra tutte le richieste al file index.html del frontend
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    });
}

// Avvio del server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

import express from 'express';
import connectDB from './lib/db.js';
import router from './routes/router.js';
import authRoutes from './routes/auth.js';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 9999;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.get('/', (req, res) => {
    res.send("<h1>Warm welcome!</h1>");
});

app.use("/kural", router);

app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`);
});

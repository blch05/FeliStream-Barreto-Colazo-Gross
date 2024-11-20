import express from 'express';
import connectDB from './FeliStreamDb.js';
import router from '../controllers/MagnetDbController.js';
import cors from 'cors';

const app = express();

app.use(cors());


connectDB();



app.use(express.json());


app.use('/api/magnets', router);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

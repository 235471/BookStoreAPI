import 'dotenv/config';
import app from './src/app.js';
import './src/config/dbConnect.js';

const PORT = 3000;

app.listen(PORT, () => {
  console.log('Server up and listening');
});

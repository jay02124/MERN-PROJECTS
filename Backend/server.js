import  express  from 'express';
import dotenv from 'dotenv';

import cookieParser from 'cookie-parser';
import authRoutes from './Routes/auth.routes.js';
import messageRoutes from './Routes/message.routes.js';
import connectToMongodb from './DB/connectToMongodb.js';

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

app.use(express.json());//to parse the incoming request from req.body with json payload

app.use(cookieParser());
app.use("/api/auth",authRoutes); 
app.use("/api/messages",messageRoutes); 





// app.get('/', (req, res) => {
// //root route http://localhost:5000/
// res.send("hello world!!");
// });




app.listen(PORT, () => 
{
    connectToMongodb(); //
    console.log(`listening on port ${PORT}`);
});
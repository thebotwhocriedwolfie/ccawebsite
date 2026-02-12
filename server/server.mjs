import express from "express";
import cors from "cors";
import records from "./routes/record.mjs";
import events from "./routes/event.mjs";
import router from "./routes/auth.mjs"; 
import member from "./routes/member.mjs";
import db from "./db/conn.mjs" ;



const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/record", records);
app.use("/events", events);
app.use(router);


// start the Express server
app.listen(PORT, () => {
    console.log(`Server is running on port: http://127.0.0.1:${PORT}`);
});
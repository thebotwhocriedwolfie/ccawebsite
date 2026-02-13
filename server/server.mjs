import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url'; // Needed for ES Modules
import records from "./routes/record.mjs";
import events from "./routes/event.mjs";
import router from "./routes/auth.mjs"; 
import member from "./routes/member.mjs";
import db from "./db/conn.mjs" ;

// Define __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

// 1. Your API Routes
app.use("/record", records);
app.use("/events", events);
app.use("/member", member); // Don't forget this one!
app.use(router);

// 2. Serve the React static files
// This tells Express where the 'dist' folder is relative to server.mjs
app.use(express.static(path.join(__dirname, '../client/dist')));

// 3. The "Catch-all" handler
// This MUST be the last route. It sends index.html for any non-API request.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

// start the Express server
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});

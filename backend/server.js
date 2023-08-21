import express from "express";
import User from "./models/user.js";
import {testDbConnection} from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import Tasks from "./models/tasks.js";
import taskRoutes from "./routes/taskRoutes.js";
import cors from "cors";

var corsOptions = {
  origin: "http://localhost:3000"
};

const app = express();
app.use(cors(corsOptions));
const PORT = 5432;

testDbConnection();

User.sync({alter:true}).then(() => {
  console.log("User Model synced");
});

Tasks.sync({alter:true}).then(() => {
  console.log("Task Model synced");
});

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});



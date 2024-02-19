require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
const db = require('./db');
db.connect();

app.use(cors());
app.use(express.json());

const taskRouter = require('./routers/task.router');
const employeeRouter = require('./routers/employee.router');
const workRouter = require('./routers/work.router');
const teamRouter = require('./routers/team.router');

app.use('/task', taskRouter);
app.use('/employee', employeeRouter);
app.use('/work', workRouter);
app.use('/team', teamRouter);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
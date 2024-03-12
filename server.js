const express = require('express');
const studentRoutes = require('./src/student/routes');

const app = express();
const port = 3000;


app.use(express.json()); // This will allow us to post and get json from endpoints.

 
app.get('/', (request , response) => {
    response.send('Hello World !');
})

app.use('/api/v1/students', studentRoutes);

app.listen(port , () =>{
    console.log(`App is listening on port ${port}`);
})
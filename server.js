
const express = require('express');
const mysql = require('mysql2');


const PORT = process.env.PORT || 3001;
const app = express();

// express middleware

app.use(express.urlencoded({ extended: false}));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
    { 
        host: 'localhost',
        //Your MySQL username,
        user: 'root',
        // Your MySQL password
        password: 'atakaan1',
        database: 'election'
},
console.log('Connected to the election database.')
);

// //test to see if the connection is working

// app.get('/', (req,res) => {
//     res.json({
//         message: 'Yello World!!!'
//     });
// });

db.query(`SELECT * FROM candidates`, (err, rows) => {
    console.log(rows);
});

//Default response for any other request(Not Found)
// Make sure this catchall route comes last in the routes order of appearance
app.use((req, res) => {
    res.status(404).end();
});





app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
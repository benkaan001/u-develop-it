const express = require('express');
const db = require('./db/connection');
const apiRoutes = require('./routes/apiRoutes');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Use apiRoutes
app.use('/api', apiRoutes);

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

// Start server after DB connection
db.connect(err => {
  if (err) throw err;
  console.log('Database connected.');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});





// const express = require('express');

// const inputCheck = require('./utils/inputCheck');

// const db = require('./db/connection');


// const PORT = process.env.PORT || 3001;
// const app = express();

// // express middleware

// app.use(express.urlencoded({ extended: false}));
// app.use(express.json());



// // //test to see if the connection is working

// // app.get('/', (req,res) => {
// //     res.json({
// //         message: 'Yello World!!!'
// //     });
// // });


// // // GET ALL candidates
// // db.query(`SELECT * FROM candidates`, (err, rows) => {
// //     console.log(rows);
// // });

// // GET all candidates

// app.get('/api/candidates', (req,res) => {
//     const sql = `SELECT * FROM candidates.*, parties.name
//                 AS party_name
//                 FROM candidates
//                 LEFT JOIN parties
//                 ON candidates.party_id = parties.id`;

//     db.query(sql, (err, rows) => {
//         if(err){
//             res.status(500).json({ error: err.message });
//             return;
//         }
//         res.json({
//             message: 'success',
//             data: rows
//         });
//     });
// });

// // // GET a single candidate

// // db.query(`SELECT * FROM candidates WHERE id = 1`, (err, row) => {
// //     if(err){
// //         console.log(err);
// //     }
// //     console.log(row);
// // });

// // GET a single candidate

// app.get('/api/candidate/:id', (req,res) => {
//     const sql = `SELECT * FROM candidates.*, parties.name
//                  AS party_name
//                  FROM candidates
//                  LEFT JOIN parties
//                  ON candidates.party_id = parties.id
//                 WHERE id = ?`;
//     const params = [req.params.id];

//     db.query(sql, params, (err, row) => {
//         if (err) {
//             res.status(400).json({ error: err.message});
//             return;
//         }
//         res.json({
//             message: 'success',
//             data: row
//         });
//     });
// });


// // get all parties
// app.get('/api/parties', (req,res)=> {
//   const sql = `SELECT * FROM parties`;
//   db.query(sql, (err, rows) => {
//     if(err){
//       res.status(500).json({ error: err.message});
//       return;
//     }
//     res.json({
//       message: 'success',
//       data: rows
//     });
//   });
// });


// // add a route that includes an id parameter for a single party

// app.get('/api/parties/:id', (req,res) => {
//   const sql = `SELECT* FROM parties WHERE id =?`;
//   const params = [req.params.id];
//   db.query(sql, params, (err, row) => {
//     if(err){
//       res.status(400).json({ error: err.message});
//       return;
//     }
//     res.json({
//       message: 'success',
//       data: row
//     });
//   });
// });

// // delete a party

// app.delete('/api/party/:id', (req,res) => {
//   const sql = `DELETE FROM parties WHERE id=?`;
//   const params = [req.params.id];
//   db.query(sql,params, (err, result) => {
//     if(err){
//       res.status(400).json({ error: res.message });
//       // checks if anything was deleted
//     } else if (!result.affectedRows) {
//       res.json({
//         message: 'Party not found!'
//       });
//     }else {
//       res.json({
//         message: 'deleted',
//         changes: result.affectedRows,
//         id: req.params.id
//       });
//     }
//   });
// });

// // update a candidate's party 

// app.put('/api/candidate/:id', (req,res) =>{
//   const errors = inputCheck(req.body, 'party_id');

//   if(errors){
//     res.status(400).json({ error: errors});
//     return;
//   }
//   const sql = `UPDATE candidates SET party_id =?
//               WHERE id = ?`;
              
//   const params = [req.body.party_id, req.params.id];
  
//   db.query(sql, params, (err, result) => {
//     if(err){
//       res.status(400).json({ error: err.message});
//       // check if a record was found
//     }else if(!result.affactedRows){
//       res.json({
//         message: 'Candidate not found!'
//       });
//     }else {
//       res.json({
//         message: 'success',
//         data: req.body,
//         changes: result.affectedRows
//       });
//     }
//   });
// });





// // // DELETE a candidate

// // db.query(` DELETE FROM candidates WHERE id = ?`, 1, (err, result) => {
// //     if(err){
// //         console.log(err);
// //     }
// //     console.log(result);
// // });

// // // CREATE a candidate
// // const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected)
// //             VALUES (?,?,?,?)`;
// // const params =[1, 'Ronald', 'Firbank', 1];

// // db.query(sql, params, (err, result) => {
// //     if(err){
// //         console.log(err);
// //     }
// //     console.log(result);
// // });

// // // Delete a candidate
// // app.delete('/api/candidate/:id', (req, res) => {
// //     const sql = `DELETE FROM candidates WHERE id = ?`;
// //     const params = [req.params.id];
  
// //     db.query(sql, params, (err, result) => {
// //       if (err) {
// //         res.statusMessage(400).json({ error: res.message });
// //       } else if (!result.affectedRows) {
// //         res.json({
// //           message: 'Candidate not found'
// //         });
// //       } else {
// //         res.json({
// //           message: 'deleted',
// //           changes: result.affectedRows,
// //           id: req.params.id
// //         });
// //       }
// //     });
// //   });

// //DELETE a candidate 
// app.delete('/api/candidate/:id', (req,res) => {
//   const sql = `DELETE FROM candidates WHERE id =?`;
//   const params = [req.params.id];
  
//   db.query(sql, params, (err, result) => {
//     if(err){
//     res.statusCode(400).json({ error: res.message});
//     } else if (!result.affactedRows){
//       res.json({
//         message: 'Candidate not found'
//       });
//     }else{
//       res.json({
//         message: 'deleted',
//         changes: result.affectedRows,
//         id: req.params.id
//       });
//     }
//   });
// });

// // Put back freshly-deleted candidate#1
// // Create a candidate
// app.post('/api/candidate', ({ body }, res) => {
//   const errors = inputCheck(
//     body,
//     'first_name',
//     'last_name',
//     'industry_connected'
//   );
//   if (errors) {
//     res.status(400).json({ error: errors });
//     return;
//   }

//   const sql = `INSERT INTO candidates (first_name, last_name, industry_connected)
//     VALUES (?,?,?)`;
//   const params = [body.first_name, body.last_name, body.industry_connected];

//   db.query(sql, params, (err, result) => {
//     if (err) {
//       res.status(400).json({ error: err.message });
//       return;
//     }
//     res.json({
//       message: 'success',
//       data: body
//     });
//   });
// });

// //Default response for any other request(Not Found)
// // Make sure this catchall route comes last in the routes order of appearance
// app.use((req, res) => {
//     res.status(404).end();
// });





// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });
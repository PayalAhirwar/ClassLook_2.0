const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path'); // Import the 'path' module
 const homeRouter = require('./routers/homeRouter')


// const Router = express.Router();
const port  = process.env.port || 8000;

const app  = express();

// db con

mongoose.connect('mongodb://127.0.0.1:27017/studentsdata',{useNewUrlParser:true})
const db = mongoose.connection;

db.on("error",()=>{console.log("error in conection");})
db.once('open',()=>{console.log("Connected");})

// app.set('views', viewsPath);
app.set('view engine','ejs')

app.get('/homeFaculty.ejs', (req, res) => {
    res.render('homeFaculty'); // This will look for home.ejs in the views folder
})

app.get('/homeStudent.ejs', (req, res) => {
    res.render('homeStudent'); // This will look for home.ejs in the views folder
})

 app.get('/hello.ejs', (req, res) => {
     res.render('hello'); // This will look for home.ejs in the views folder
 })

  app.get('/Tools/About.ejs', (req, res) => {
     res.render('Tools/About'); // This will look for home.ejs in the views folder//
      })
  
// app.get('/Tools/window.ejs', (req, res) => {
//     res.render('Tools/window'); // This will look for home.ejs in the views folder
// })
// app.get('/Tools/function.js', (req, res) => {
//     res.render('Tools/function'); // This will look for home.ejs in the views folder
// })

//  app.get('/Tools/Edit.ejs', (req, res) => {
//      res.render('Tools/Edit'); // This will look for home.ejs in the views folder
//  })

// app.get('/Tools/Faculty_CR/GS3.ejs', (req, res) => {
//     res.render('Tools/Faculty_CR/GS3'); // This will look for home.ejs in the views folder
// })
// app.get('/Tools/Faculty_CR/GS4.ejs', (req, res) => {
//     res.render('Tools/Faculty_CR/GS4'); // This will look for home.ejs in the views folder
// })
// app.get('/Tools/Faculty_CR/GS5.ejs', (req, res) => {
//     res.render('Tools/Faculty_CR/GS5'); // This will look for home.ejs in the views folder
// })
// app.get('/Tools/Faculty_CR/GS6.ejs', (req, res) => {
//     res.render('Tools/Faculty_CR/GS6'); // This will look for home.ejs in the views folder
// })
// app.get('/Tools/Faculty_CR/NLH1.ejs', (req, res) => {
//     res.render('Tools/Faculty_CR/NLH1'); // This will look for home.ejs in the views folder
// })
// app.get('/Tools/Faculty_CR/NLH2.ejs', (req, res) => {
//     res.render('Tools/Faculty_CR/NLH2'); // This will look for home.ejs in the views folder
// })

// app.get('/Tools/Student/GS3.ejs', (req, res) => {
//     res.render('Tools/Student/GS3'); // This will look for home.ejs in the views folder
// })
// app.get('/Tools/Student/GS4.ejs', (req, res) => {
//     res.render('Tools/Student/GS4')
// })

// app.get('/Tools/Student/GS5.ejs', (req, res) => {
//     res.render('Tools/Student/GS5'); // This will look for home.ejs in the views folder
// })
// app.get('/Tools/Student/GS6.ejs', (req, res) => {
//     res.render('Tools/Student/GS6'); // This will look for home.ejs in the views folder
// })
// app.get('/Tools/Student/NLH1.ejs', (req, res) => {
//     res.render('Tools/Student/NLH1'); // This will look for home.ejs in the views folder
// })
// app.get('/Tools/Student/NLH2.ejs', (req, res) => {
//     res.render('Tools/Student/NLH2'); // This will look for home.ejs in the views folder
// })

// // Handle the GET request for the edit page
// app.get('/Tools/Edit.ejs', (req, res) => {
//     // Fetch the schedule data from the database and pass it to the edit.ejs template
//     Schedule.find({}, (err, schedules) => {
//       if (err) {
//         console.error('Error fetching schedule data from the database:', err);
//         res.status(500).send('An error occurred. Please try again later.');
//       } else {
//         res.render('Tools/Edit', { schedules });
//       }
//     });
//   });
  
//   // Handle the POST request to save the edited schedule
//   app.post('/Tools/Edit.ejs', (req, res) => {
//     // Extract the schedule data from the request body
//     const { room, schedule } = req.body;
  
//     // Find the schedule entry in the database and update it
//     Schedule.findOneAndUpdate({ room }, { schedule }, { new: true, upsert: true }, (err, updatedSchedule) => {
//       if (err) {
//         console.error('Error updating schedule data in the database:', err);
//         res.status(500).send('An error occurred. Please try again later.');
//       } else {
//         // Redirect to the edit page to show the updated schedule
//         res.redirect('Tools/Edit');
//       }
//     });
//   });

app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: false }))

app.post('/Tools/AddSchedule', homeRouter)

// parse application/json
app.use(bodyParser.json())

app.use('/', homeRouter)

app.listen(port)
// module.exports = Router;
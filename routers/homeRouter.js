const express = require('express');
const Router = express.Router();
const mongoose = require('mongoose');
const homeSchema = require('../models/homeSchema');
// const Schedule = require('./routers/homeRouter');

// Render the registration page
Router.get('/', (req, res) => {
  res.render('register', { title: 'Fill Form', password: '', email: '', error: '' });
});

// Handle user registration
Router.post('/register', async (req, res) => {
  try {
    const { name, number, email, password, cpassword } = req.body;

    if (password === cpassword) {
      const user = await homeSchema.findOne({ email: email });

      if (user) {
        // User is already registered
        return res.render('register', { title: '', password: '', email: '', error: 'You are already registered' });
      }

      // User is not registered, save the data
      const userData = new homeSchema({
        name,
        number,
        email,
        password,
      });

      await userData.save();
      return res.render('register', { title: 'Registered successfully', password: '', email: '', error: '' });
    } else {
      // Passwords do not match
      return res.render('register', { title: '', password: 'Password not matching', email: '', error: '' });
    }
  } catch (error) {
    return res.render('register', { title: 'Error in Code', password: '', email: '', error: 'An error occurred. Please try again.' });
  }
});

// User login
Router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await homeSchema.findOne({ email: email });

    if (user) {
      if (password === user.password) {
        // Successful login
        return res.render('Mainpage', {});
      } else {
        // Invalid password
        return res.render('register', { title: '', password: '', email: '', error: 'Invalid password' });
      }
    } else {
      // User not found
      return res.render('register', { title: '', password: '', email: '', error: 'User not found. Please register.' });
    }
  } catch (error) {
    return res.render('register', { title: '', password: '', email: '', error: 'An error occurred. Please try again.' });
  }
});


const Schedule = mongoose.model('Schedule', {
     serialNo:String,
     section:String,
    room: String,
    // schedule: String,
    subject: String,
    time: String
});


  // Handle the GET request for rendering the edit page
Router.get('/Tools/Edit.ejs', async (req, res) => {
  try {
    // Fetch the schedule data from the database and pass it to the edit.ejs template
    const schedules = await Schedule.find({});
    res.render('Tools/Edit', { schedules });
    console.log(schedules);
  } catch (err) {
    console.error('Error fetching schedule data from the database:', err);
    res.status(500).send('An error occurred. Please try again later.');
  }
});

// Handle the POST request to update schedules
Router.post('/Tools/UpdateSchedule', express.json(), async (req, res) => {
  const { schedules } = req.body;

  try {
    // Clear existing schedules for each room
    const rooms = schedules.map((schedule) => schedule.room);
    await Schedule.deleteMany({ room: { $in: rooms } });

    // Insert the updated schedules for each room
    await Schedule.insertMany(schedules);

    // Respond with a success message
    res.json({ message: 'Schedule data updated successfully' });
  } catch (err) {
    console.error('Error updating schedule data in the database:', err);
    // Send an error response
    res.status(500).json({ error: 'An error occurred while saving the schedule. Please try again.' });
  }
});



// Handle the GET request for the student view of the schedule
Router.get('/Tools/StudentView.ejs', async (req, res) => {
  try {
    // Fetch the schedule data from the database and pass it to the StudentView.ejs template
    const schedules = await Schedule.find({});
    res.render('Tools/StudentView', { schedules });
  } catch (err) {
    console.error('Error fetching schedule data from the database:', err);
    res.status(500).send('An error occurred. Please try again later.');
  }
});

// Handle the POST request to add a new schedule
Router.post('/Tools/AddSchedule', express.json(), async (req, res) => {
  // Extract the new schedule data from the request body
  const { serialNo,section,room, subject, time } = req.body;

  try {
    // Create a new schedule document and save it to the database
    const newSchedule = new Schedule({ serialNo,section,room, subject, time });
    await newSchedule.save();

    // Respond with a success message
     // Respond with a success message
  //  res.redirect('/Tools/Edit.ejs'); // Redirect to a confirmation page after successful addition
    res.json({ message: 'New schedule added successfully' });
  } catch (err) {
    console.error('Error adding new schedule to the database:', err);
    // Send an error response
    res.status(500).json({ error: 'An error occurred while adding the schedule. Please try again.' });
  }
});

// Handle the DELETE request to delete a schedule
Router.delete('/Tools/DeleteSchedule/:id', async (req, res) => {
  const scheduleId = req.params.id;

  try {
    // Find the schedule in the database and delete it
    await Schedule.findByIdAndDelete(scheduleId);

    // Respond with a success message
    res.json({ message: 'Schedule deleted successfully' });
  } catch (err) {
    console.error('Error deleting schedule from the database:', err);
    // Send an error response
    res.status(500).json({ error: 'An error occurred while deleting the schedule. Please try again.' });
  }
});

module.exports =  Router ;

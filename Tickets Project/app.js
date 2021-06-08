const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const path = require('path');
const cors = require('cors');

const db = require('./database/db');
const event = require('./model/event');
const ticket = require('./model/ticket');
const auth = require('./model/auth');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "controller")));
app.use(express.static(path.join(__dirname, "view")));

db.initDatabase();

//get all of the products from database
app.get('/api/events', (req, res) => {
    event.listEvents(req, res);
});

app.get('/api/events/:id', (req, res) => {
    event.retrieveDetails(req, res);
});

//add product to the products database
app.post('/api/tickets', (req, res) => {
    ticket.purchaseTicket(req, res);
});

app.get('/api/tickets/:ticketNumber', (req, res) => {
    ticket.retrieveDetails(req, res);
});

//remove product from the products database
app.put('/api/tickets/:ticketNumber', (req, res) => {
    ticket.verifyTicket(req, res);
});

app.post('/api/auth', (req, res) => {
    auth.login(req, res);
});

app.get('/api/auth/loggedin', (req, res) => {
    auth.getLoginStatus(req, res);
});


//port
app.listen(8000, () => {
    console.log('Server listening on 8000...');
});

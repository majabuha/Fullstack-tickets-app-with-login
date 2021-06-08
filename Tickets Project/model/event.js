//listEvents
const conn = require('../database/db');

function listEvents(req, res) {
    const listOfEvents = conn.db.get('event').value();
    console.log(listOfEvents);
    if (listOfEvents.length === 0) {
        res.status(404).send('No events to display!');
    } else {
        res.json({
            status: 'success',
            data: { listOfEvents }
        });
    }
}

function retrieveDetails(req, res) {
    const event = conn.db.get('event').find({ id: parseInt(req.params.id) }).value();
    console.log(event);
    if (!event) {
        res.status(404).send('No events to display!');
    } else {
        res.json({
            status: 'success',
            data:  event
        });
    }
}

exports.listEvents = listEvents;
exports.retrieveDetails = retrieveDetails;

//purchaseTicket
//verifyTicket
const conn = require('../database/db');

function purchaseTicket(req, res) {
  const event = conn.db.get('event').find({ id: parseInt(req.body.eventId) }).value();
  if(event && event.quantity > 0){
    var ticket = {
      "eventId":event.id,
      "ticketNumber": event.prefix+""+Date.now(),
      "verified":false
    }
    const purchaseResult = conn.db.get('ticket').push(ticket).write();
    const updateResult = conn.db.get('event').find({ id: parseInt(req.body.eventId) }).assign({quantity:parseInt(event.quantity-1)}).write();
    res.json({
        status: 'success',
        message: 'Ticket purchased successfully',
        data: ticket
    });
  }else{
    if(event.quantity == 0){
      res.status(400).json({
          status: 'failure',
          message: "We have run out of tickets"
      });
    }else{
      res.status(400).json({
          status: 'failure',
          message: "Failed to purchase ticket"
      });
    }
  }
}

function retrieveDetails(req, res) {
    const ticket = conn.db.get('ticket').find({ ticketNumber: req.params.ticketNumber }).value();
    if (!ticket) {
        res.status(404).send('No tickets to display!');
    } else {
        const event = conn.db.get('event').find({ id: parseInt(ticket.eventId) }).value();
        const details = {
          eventName: event.name,
          eventDate: event.date,
          eventFrom: event.startTime,
          eventTo: event.endTime,
          eventVenue: event.venue,
          ticketNumber: ticket.ticketNumber
        }
        res.json({
            status: 'success',
            data:  details
        });
    }
}

function verifyTicket(req, res) {
    const ticket = conn.db.get('ticket').find({ ticketNumber: req.params.ticketNumber }).value();
    console.log(ticket);
    if(ticket){
      if(!ticket.verified){
        const updateResult = conn.db.get('ticket').find({ ticketNumber: req.params.ticketNumber }).assign({verified:true}).write();
        console.log(updateResult);
        res.json({
            status: 'success',
            message: "Ticket verified"
        });
      }else{
        res.status(400).json({
            status: 'failure',
            message: "Ticket already verified"
        });
      }
    }else{
      res.status(404).json({
          status: 'failure',
          message: "Ticket does not exist"
      });
    }

}

exports.purchaseTicket = purchaseTicket;
exports.verifyTicket = verifyTicket;
exports.retrieveDetails = retrieveDetails;

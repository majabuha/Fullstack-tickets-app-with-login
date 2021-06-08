
const eventList = document.getElementById('event-list');

const params = new URLSearchParams(window.location.search);

var ticketNumber="";
if(params.has('tnum')){
  ticketNumber = params.get('tnum');
}

async function getTicketDetails(ticketNumber) {
    const response = await fetch('http://localhost:8000/api/tickets/'+ticketNumber);
    const data = await response.json();


    document.getElementById('ticket-what').innerHTML = data.data.eventName;
    document.getElementById('ticket-where').innerHTML = data.data.eventVenue;
    document.getElementById('ticket-when').innerHTML = data.data.eventDate;
    document.getElementById('ticket-from').innerHTML = data.data.eventFrom;
    document.getElementById('ticket-to').innerHTML = data.data.eventTo;
    document.getElementById('ticket-number-value').innerHTML = ticketNumber;
}

getTicketDetails(ticketNumber);

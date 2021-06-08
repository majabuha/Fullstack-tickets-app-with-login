const orderBtn = document.getElementById('order-button');
const eventDetails = document.getElementById('eventDetails');

const params = new URLSearchParams(window.location.search);

var eventId="";
if(params.has('eventId')){
  eventId = params.get('eventId');
}

function orderTicket(eventId) {
    const requestBody = {eventId: eventId};
    const response =  fetch('http://localhost:8000/api/tickets',{
      method: 'POST',
      headers:{"Content-Type": "application/json"},
      body: JSON.stringify(requestBody)
    }).then(function(response) {
      return response.json();
    }).then(function(data) {
      if(data.status == "failure"){
        alert(data.message);
      }else{
        window.location.href = "ticket.html?tnum="+data.data.ticketNumber;
      }
    });
}

async function listEventDetails(eventId) {
    const response = await fetch('http://localhost:8000/api/events/'+eventId);
    const data = await response.json();
    
    document.getElementById('event-map').innerHTML = data.data.name;
    document.getElementById('event-title').innerHTML = data.data.name;
    document.getElementById('event-date-time').innerHTML = data.data.date+" kl "+data.data.startTime+" - "+data.data.endTime;
    document.getElementById('event-venue').innerHTML = "@ "+data.data.venue;
    document.getElementById('event-price').innerHTML = data.data.price+" sek";
    document.getElementById('tickets-left').innerHTML = data.data.quantity+" tickets left.";
    if(data.data.quantity == 0) {
      document.getElementById('order-button').disabled = true;
      document.getElementById('order-button').setAttribute("style", "background-color: #ccc");
    }else{ document.getElementById('order-button').addEventListener('click', function() {
      orderTicket(eventId);      
    })};
}

listEventDetails(eventId);

window.addEventListener( "pageshow", function ( event ) {
  var historyTraversal = event.persisted || 
                         ( typeof window.performance != "undefined" && 
                              window.performance.navigation.type === 2 );
  if ( historyTraversal ) {
    // Handle page restore.
    window.location.reload();
  }
});
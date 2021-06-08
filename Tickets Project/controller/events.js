
const eventList = document.getElementById('event-list');


async function getEventList() {
    const response = await fetch('http://localhost:8000/api/events');
    const data = await response.json();
    let html = '';

    const events = data.data.listOfEvents;
    events.forEach((event) => {
        html += `<div class="grid-container">
                  <div class="datebox"><div class="date">${event.date}</div></div>
                  <div class="event-right">
                    <div class="name"><a href="buy.html?eventId=${event.id}">${event.name}</a></div>
                    <div class="venue">${event.venue}</div>
                    <div class="time">${event.startTime} - ${event.endTime}</div>
                    <div class="price-container"><div class="price">${event.price} sek</div></div>
                  </div>
                </div>
          `;
    });
    eventList.innerHTML = html;
}

getEventList();

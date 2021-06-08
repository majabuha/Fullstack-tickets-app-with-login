const ticketField = document.getElementById('ticket-number');
const verifyButton = document.getElementById('verifyButton');
const logoutButton = document.getElementById('logoutButton');

function getToken() {
  return sessionStorage.getItem('auth');
}

async function isLoggedIn() {
  const token = getToken();
  if(token){
    const response = await fetch('http://localhost:8000/api/auth/loggedin', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await response.json();
    if (!data.loggedIn) {
      location.href = 'http://localhost:8000/stafflogin.html';
    }
  }else {
    location.href = 'http://localhost:8000/stafflogin.html';
  }
}

verifyButton.addEventListener('click', async () => {
  const ticketNumber = ticketField.value;

  const response =  fetch('http://localhost:8000/api/tickets/'+ticketNumber,{
    method: 'PUT'
  }).then(function(response) {
    return response.json();
  }).then(function(data) {
    if(data.status == "success")
      alert("Ticket number "+ticketNumber+" is successfully verified");
    else
      alert("Error: "+data.message);
  });
});

logoutButton.addEventListener('click', async () => {
  sessionStorage.removeItem('auth');
  location.href = 'http://localhost:8000/stafflogin.html';
});

isLoggedIn();

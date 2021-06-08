const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginButton = document.getElementById('loginButton');


async function login(user, pass) {
  const obj = {
    username: user,
    password: pass
  }

  const response = await fetch('http://localhost:8000/api/auth/', {
    method: 'POST',
    body: JSON.stringify(obj),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await response.json();
  return await data;
}

function saveToken(token) {
  return new Promise((resolve, reject) => {
    sessionStorage.setItem('auth', token);
    resolve('Done');
  });
}

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
    if (data.loggedIn) {
      location.href = 'http://localhost:8000/verifyticket.html';
    }
  }
}

loginButton.addEventListener('click', async () => {
  const username = usernameInput.value;
  const password = passwordInput.value;

  const loggedIn = await login(username, password);

  if (loggedIn.success) {
    await saveToken(loggedIn.token);
    location.href = 'http://localhost:8000/verifyticket.html';
  }else{
    alert("Invalid credentials");
  }
});

isLoggedIn();

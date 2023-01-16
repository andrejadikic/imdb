const token = localStorage.getItem('token');
const rootPath = 'http://localhost:4000';



const login = async () => {
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value
    const body = JSON.stringify({ username, password });
 
    const response = await fetch(`http://localhost:2000/auth/login`, {
        method: 'POST',
        body: body,
        headers: {
            'Content-Type': 'application/json'
          }
     });
     const vrednostTokena = await response.json();
     if(response.ok){
        location.href = "http://localhost:8000/admin";
        localStorage.setItem("token", vrednostTokena);
     }
}

const register = async () => {
    const email = document.getElementById("email").value
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value
    const body = JSON.stringify({ email, username, password });
 
    const response = await fetch(`http://localhost:2000/auth/register`, {
        method: 'POST',
        body: body,
        headers: {
            'Content-Type': 'application/json'
          }
     });
     const vrednostTokena = await response.json();
     if(response.ok){
        location.href = "http://localhost:8000/admin";
        localStorage.setItem("token", vrednostTokena);
     }
}



const token = localStorage.getItem('token');
const rootPath = 'http://localhost:4000';


window.addEventListener("load", async () => {
    if(!localStorage.getItem('token')){
        document.getElementById('userContainer').innerHTML =  '<h1>Nema pristupa</h1>'
        return;
    }

    const response = await fetch(`${rootPath}/users/get`, {
        method: 'GET', 
        headers: {
            'Authorization': token
        }
    });
    if(response.ok){
        const userArray = await response.json();
        document.getElementById('userContainer').innerHTML = userArray.map(user => 
            `<table class="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Type</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody id="users">
                    <tr>
                        <td><input type="text" id="username_${user.id}" value="${user.username}"></td>
                        <td><input type="text" id="email_${user.id}" value="${user.email}"></td>
                        <td><input type="text" id="password_${user.id}" value="${user.password}"></td>
                        <td><input type="text" id="type_${user.id}" value="${user.type}"></td>
                        <td>
                            <button class="btn btn-danger btn-sm btn_obrisi" onclick="deleteUser('${user.username}')" >Delete</button>
                            <button class="btn btn-primary btn-sm btn_opis" onclick="updateUser('${user.id}')">Edit</button>
                        </td>
                    </tr>
                </tbody>
            </table>`
            
        ).join('');
    }
})



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
     if(response.ok){
        location.reload();
    }
}

const deleteUser = async (username) => {
    const response = await fetch(`${rootPath}/users/delete`, {
        method: 'DELETE', 
        body: JSON.stringify({username}),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    });
    if(response.ok){
        location.reload();
    }
    
}

const updateUser = async(id) => {
    const editedUsername = document.getElementById(`username_${id}`).value;
    const editedEmail = document.getElementById(`email_${id}`).value;
    const editedType = document.getElementById(`type_${id}`).value;
    const editedPassword = document.getElementById(`password_${id}`).value;
    localStorage.setItem("lastUpdatedId", id);

    const body = JSON.stringify({ email: editedEmail, username:editedUsername, password:editedPassword, type:editedType , id:id});
 
    const response = await fetch(`${rootPath}/users/update`, {
        method: 'PUT',
        body: body,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
     });
     if(response.ok){
        location.reload();
    }

    //fetch(); na odgovorajacu rutu 
    // body: JSON.stringify(body)
    // kad idemo ka rest apiju onda mora string 
}


// `<div>
            //     <div>
            //      <label for="username_${user.id}">Username:</label>
            //      <input type="text" id="username_${user.id}" value="${user.username}">
            //     </div>
            //     <div>Email: ${user.email} </div>
            //     <button onclick="deleteUser('${user.username}')">Delete</button>
            //     <button onclick="updateUser(${user.id})">Edit</button>
            //     <br />
            //  </div>`
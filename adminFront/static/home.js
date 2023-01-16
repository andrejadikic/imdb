const token = localStorage.getItem('token');



const rootPath = 'http://localhost:4000';
    window.addEventListener("load", async () => {
        // if(!localStorage.getItem('token')){
        //     document.getElementById('userContainer').innerHTML =  '<h1>Nema pristupa</h1>'
        //     return;
        // }
        const response = await fetch(`${rootPath}/users/get`, {method: 'GET'});
        const userArray = await response.json();
        document.getElementById('userContainer').innerHTML = userArray.map(user => 
            `<div>
                <div>
                 <label for="username_${user.id}">Username:</label>
                 <input type="text" id="username_${user.id}" value="${user.username}">
                </div>
                <div>Email: ${user.email} </div>
                <button onclick="deleteUser('${user.username}')">Delete</button>
                <button onclick="updateUser(${user.id})">Edit</button>
                <br />
             </div>`
        ).join('');
    })



const createUser = async() => {
    const textField = document.getElementById('fusername');
    
    username = textField.value;
    const response = await fetch(`${rootPath}/users/create`, {
        method: 'POST', 
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



const updateUser = (id) => {
    const editedUsername = document.getElementById(`username_${id}`).value;
    
    console.log(`edited username: ${editedUsername}`)
    //fetch(); na odgovorajacu rutu 
    // body: JSON.stringify(body)
    // kad idemo ka rest apiju onda mora string 
}


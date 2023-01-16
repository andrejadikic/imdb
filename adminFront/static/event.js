const token = localStorage.getItem('token');
const rootPath = 'http://localhost:4000';


window.addEventListener("load", async () => {
    if(!localStorage.getItem('token')){
        document.getElementById('userContainer').innerHTML =  '<h1>Nema pristupa</h1>'
        return;
    }

    const response = await fetch(`${rootPath}/events/get`, {
        method: 'GET', 
        headers: {
            'Authorization': token
        }
    });
    if(response.ok){
        const userArray = await response.json();
        document.getElementById('events').innerHTML = userArray.map(user => 
            `<tr>
                <td><input type="text" id="name${user.id}" value="${user.name}"></td>
                <td><input type="text" id="location${user.id}" value="${user.location}"></td>
                <td><input type="text" id="year${user.id}" value="${user.year}"></td>
                <td>
                    <button class="btn btn-danger btn-sm btn_obrisi" onclick="deleteO('${user.id}')" >Delete</button>
                    <button class="btn btn-primary btn-sm btn_opis" onclick="updateO('${user.id}')">Edit</button>
                </td>
            </tr>`
            
        ).join('');
    }
})

const register = async () => {
    const name = document.getElementById("name").value
    const location = document.getElementById("location").value
    const year = document.getElementById("year").value
    const body = JSON.stringify({ name, location, year });
 
    const response = await fetch(`${rootPath}/events/create`, {
        method: 'POST',
        body: body,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
          }
     });
     if(response.ok){
        location.reload();
    }
}

const deleteO = async (id) => {
    const response = await fetch(`${rootPath}/events/delete`, {
        method: 'DELETE', 
        body: JSON.stringify({id}),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    });
    if(response.ok){
        location.reload();
    }
    
}

const updateO = async(id) => {
    const name = document.getElementById(`name${id}`).value;
    const location = document.getElementById(`location${id}`).value;
    const year = document.getElementById(`year${id}`).value;
    const body = JSON.stringify({ id,name,location,year});
 
    const response = await fetch(`${rootPath}/events/update`, {
        method: 'PUT',
        body: body,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
     });
     
}
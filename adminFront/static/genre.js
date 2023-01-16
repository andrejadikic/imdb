const token = localStorage.getItem('token');
const rootPath = 'http://localhost:4000';


window.addEventListener("load", async () => {
    if(!localStorage.getItem('token')){
        document.getElementById('userContainer').innerHTML =  '<h1>Nema pristupa</h1>'
        return;
    }

    const response = await fetch(`${rootPath}/genres/get`, {
        method: 'GET', 
        headers: {
            'Authorization': token
        }
    });
    if(response.ok){
        const userArray = await response.json();
        document.getElementById('userContainer').innerHTML = userArray.map(resObject => 
            `<table class="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody id="users">
                    <tr>
                        <td><input type="text" id="name${resObject.id}" value="${resObject.name}"></td>
                        <td><input type="text" id="description${resObject.id}" value="${resObject.description}"></td>
                        <td>
                            <button class="btn btn-danger btn-sm btn_obrisi" onclick="deleteO('${resObject.id}')" >Delete</button>
                            <button class="btn btn-primary btn-sm btn_opis" onclick="updateO('${resObject.id}')">Edit</button>
                        </td>
                    </tr>
                </tbody>
            </table>`
            
        ).join('');
    }
})


const register = async () => {
    const name = document.getElementById("name").value
    const description = document.getElementById("description").value
    const body = JSON.stringify({ name,description });
 
    const response = await fetch(`${rootPath}/genres/create`, {
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
    const response = await fetch(`${rootPath}/genres/delete`, {
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
    const description = document.getElementById(`description${id}`).value;

    const body = JSON.stringify({ id,name,description});
 
    const response = await fetch(`${rootPath}/genres/update`, {
        method: 'PUT',
        body: body,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    });
}
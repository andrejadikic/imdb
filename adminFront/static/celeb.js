const token = localStorage.getItem('token');
const rootPath = 'http://localhost:4000';


window.addEventListener("load", async () => {
    if(!localStorage.getItem('token')){
        document.getElementById('userContainer').innerHTML =  '<h1>Nema pristupa</h1>'
        return;
    }

    const response = await fetch(`${rootPath}/celebrities/get`, {
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
                        <th>Name</th>
                        <th>Education</th>
                        <th>Profession</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody id="users">
                    <tr>
                        <td><input type="text" id="name${user.id}" value="${user.name}"></td>
                        <td><input type="text" id="education${user.id}" value="${user.education}"></td>
                        <td><input type="text" id="profession${user.id}" value="${user.profession.name}"></td>
                        <td>
                            <button class="btn btn-danger btn-sm btn_obrisi" onclick="deleteO('${user.id}')" >Delete</button>
                            <button class="btn btn-primary btn-sm btn_opis" onclick="updateO('${user.id}')">Edit</button>
                        </td>
                    </tr>
                </tbody>
            </table>`
            
        ).join('');
    }
})

const register = async () => {
    const name = document.getElementById("name").value
    const education = document.getElementById("education").value
    const professionName = document.getElementById("profession").value
    const body = JSON.stringify({ name, education, professionName });
 
    const response = await fetch(`${rootPath}/celebrities/create`, {
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
    const response = await fetch(`${rootPath}/celebrities/delete`, {
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
    const education = document.getElementById(`education${id}`).value;
    const professionName = document.getElementById(`profession${id}`).value;
    const body = JSON.stringify({ id,name,education,professionName});
 
    const response = await fetch(`${rootPath}/celebrities/update`, {
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
}
const token = localStorage.getItem('token');
const rootPath = 'http://localhost:4000';


window.addEventListener("load", async () => {
    if(!localStorage.getItem('token')){
        document.getElementById('userContainer').innerHTML =  '<h1>Nema pristupa</h1>'
        return;
    }

    const response = await fetch(`${rootPath}/roles/get`, {
        method: 'GET', 
        headers: {
            'Authorization': token
        }
    });
    if(response.ok){
        const userArray = await response.json();
        document.getElementById('roles').innerHTML = userArray.map(user => 
            `<tr>
                <td><input type="text" id="movie${user.id}" value="${user.movie.title}"></td>
                <td><input type="text" id="celeb${user.id}" value="${user.celebrity.name}"></td>
                <td><input type="text" id="role${user.id}" value="${user.role}"></td>
                <td>
                    <button class="btn btn-danger btn-sm btn_obrisi" onclick="deleteO('${user.id}')" >Delete</button>
                    <button class="btn btn-primary btn-sm btn_opis" onclick="updateO('${user.id}')">Edit</button>
                </td>
            </tr>`
            
        ).join('');
    }
})

const register = async () => {
    const movie = document.getElementById("movie").value
    const celeb = document.getElementById("celeb").value
    const role = document.getElementById("role").value
    const body = JSON.stringify({ movie, celeb, role });
 
    const response = await fetch(`${rootPath}/roles/create`, {
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
    const response = await fetch(`${rootPath}/roles/delete`, {
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
    const movie = document.getElementById(`movie${id}`).value;
    const celeb = document.getElementById(`celeb${id}`).value;
    const role = document.getElementById(`role${id}`).value;
    const body = JSON.stringify({ id,movie,celeb,role});
 
    const response = await fetch(`${rootPath}/roles/update`, {
        method: 'PUT',
        body: body,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
     });
     
}
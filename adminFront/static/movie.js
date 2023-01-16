const token = localStorage.getItem('token');
const rootPath = 'http://localhost:4000';


window.addEventListener("load", async () => {
    if(!localStorage.getItem('token')){
        document.getElementById('userContainer').innerHTML =  '<h1>Nema pristupa</h1>'
        return;
    }

    const response = await fetch(`${rootPath}/movies/get`, {
        method: 'GET', 
        headers: {
            'Authorization': token
        }
    });
    if(response.ok){
        const userArray = await response.json();
        document.getElementById('movies').innerHTML = userArray.map(user => 
            `<tr>
                <td><input type="text" id="title${user.id}" value="${user.title}"></td>
                <td><input type="text" id="genre${user.id}" value="${user.genre.name}"></td>
                <td><input type="text" id="description${user.id}" value="${user.description}"></td>
                <td><input type="text" id="rating${user.id}" value="${user.rating}"></td>
                <td><input type="text" id="image${user.id}" value="${user.imageUrl}"></td>
                <td>
                    <button class="btn btn-danger btn-sm btn_obrisi" onclick="deleteO('${user.id}')" >Delete</button>
                    <button class="btn btn-primary btn-sm btn_opis" onclick="updateO('${user.id}')">Edit</button>
                </td>
            </tr>`
            
        ).join('');
    }
})

const register = async () => {
    const title = document.getElementById("title").value
    const description = document.getElementById("description").value
    const genreName = document.getElementById("genre").value
    const rating = document.getElementById("rating").value
    const imageUrl = document.getElementById("image").value
    const body = JSON.stringify({ title, description, genreName , rating, imageUrl});
 
    const response = await fetch(`${rootPath}/movies/create`, {
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
    const response = await fetch(`${rootPath}/movies/delete`, {
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
    const title = document.getElementById(`title${id}`).value;
    const description = document.getElementById(`description${id}`).value;
    const rating = document.getElementById(`rating${id}`).value;
    const genreName = document.getElementById(`genre${id}`).value;
    const imageUrl = document.getElementById(`image${id}`).value;


    const body = JSON.stringify({ id,title, description, genreName , rating, imageUrl});
 
    const response = await fetch(`${rootPath}/movies/update`, {
        method: 'PUT',
        body: body,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
     });
     
}
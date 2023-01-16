const token = localStorage.getItem('token');
const rootPath = 'http://localhost:4000';


window.addEventListener("load", async () => {
    if(!localStorage.getItem('token')){
        document.getElementById('userContainer').innerHTML =  '<h1>Nema pristupa</h1>'
        return;
    }

    const response = await fetch(`${rootPath}/reviews/get`, {
        method: 'GET', 
        headers: {
            'Authorization': token
        }
    });
    if(response.ok){
        const userArray = await response.json();
        document.getElementById('reviews').innerHTML = userArray.map(user => 
            `<tr>
                <td><input type="text" id="user${user.id}" value="${user.username}"></td>
                <td><input type="text" id="movie${user.id}" value="${user.movie.title}"></td>
                <td><input type="text" id="comment${user.id}" value="${user.comment}"></td>
                <td><input type="text" id="rating${user.id}" value="${user.rating}"></td>
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
    const comment = document.getElementById("comment").value
    const rating = document.getElementById("rating").value
    const cb = document.querySelector('#visible');
    if(cb.checked){
        anonimous = true;
    }else
        anonimous = false;
    const body = JSON.stringify({ movie, anonimous, comment,rating });
 
    const response = await fetch(`${rootPath}/reviews/create`, {
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
    const response = await fetch(`${rootPath}/reviews/delete`, {
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
    const username = document.getElementById(`user${id}`).value;
    const rating = document.getElementById(`rating${id}`).value;
    const comment = document.getElementById(`comment${id}`).value;
    const body = JSON.stringify({ id,movie,username,comment,rating});
 
    const response = await fetch(`${rootPath}/reviews/update`, {
        method: 'PUT',
        body: body,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
     });
     
}
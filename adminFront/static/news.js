const token = localStorage.getItem('token');
const rootPath = 'http://localhost:4000';


window.addEventListener("load", async () => {
    if(!localStorage.getItem('token')){
        document.getElementById('userContainer').innerHTML =  '<h1>Nema pristupa</h1>'
        return;
    }

    const response = await fetch(`${rootPath}/news/get`, {
        method: 'GET', 
        headers: {
            'Authorization': token
        }
    });
    if(response.ok){
        const userArray = await response.json();
        document.getElementById('news').innerHTML = userArray.map(user => 
            `<tr>
                <td><input type="text" id="title${user.id}" value="${user.title}"></td>
                <td><input type="text" id="text${user.id}" value="${user.text}"></td>
                <td><input type="text" id="author${user.id}" value="${user.author}"></td>
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
    const text = document.getElementById("text").value
    const author = document.getElementById("author").value
    const body = JSON.stringify({ title,  text, author });
 
    const response = await fetch(`${rootPath}/news/create`, {
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
    const response = await fetch(`${rootPath}/news/delete`, {
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
    const text = document.getElementById(`text${id}`).value;
    const author = document.getElementById(`author${id}`).value;
    const body = JSON.stringify({ id,title,text,author});
 
    const response = await fetch(`${rootPath}/news/update`, {
        method: 'PUT',
        body: body,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
     });
     
}
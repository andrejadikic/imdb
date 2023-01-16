const token = localStorage.getItem('token');
const rootPath = 'http://localhost:4000';


window.addEventListener("load", async () => {
    if(!localStorage.getItem('token')){
        document.getElementById('userContainer').innerHTML =  '<h1>Nema pristupa</h1>'
        return;
    }

    const response = await fetch(`${rootPath}/winners/get`, {
        method: 'GET', 
        headers: {
            'Authorization': token
        }
    });
    if(response.ok){
        const userArray = await response.json();
        document.getElementById('winners').innerHTML = userArray.map(user => 
            `<tr>
                <td><input type="text" id="award${user.id}" value="${user.award.name}"></td>
                <td><input type="text" id="celeb${user.id}" value="${user.celebrity.name}"></td>
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
    const award = document.getElementById("award").value
    const celeb = document.getElementById("celeb").value
    const year = document.getElementById("year").value
    const body = JSON.stringify({ award, celeb, year });
 
    const response = await fetch(`${rootPath}/winners/create`, {
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
    const response = await fetch(`${rootPath}/winners/delete`, {
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
    const award = document.getElementById(`award${id}`).value;
    const celeb = document.getElementById(`celeb${id}`).value;
    const year = document.getElementById(`year${id}`).value;
    const body = JSON.stringify({ id,award,celeb,year});
 
    const response = await fetch(`${rootPath}/winners/update`, {
        method: 'PUT',
        body: body,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
     });
     
}
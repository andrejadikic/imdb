const rootPath = 'http://localhost:4000';

const button = document.getElementById('usrbtn');
console.log(button)

// const fetchUsersButton = document.getElementById('userButton')

// fetchUsersButton.addEventListener("click", () => {
//     console.log('funkcija')
//     fetch(`${rootPath}/users/get`, {method: 'GET'})
//     .then(response => {console.log(response)})
//     .catch(error => { console.log(error)});
// })

 button.addEventListener("click", function() {
    console.log('on click')
    fetch(`${rootPath}/users/get`, {method: 'GET'})
    .then(response => {console.log(response)})
    .catch(error => { console.log(error)});
})
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const username = urlParams.get("username");

let submit = document.getElementById("submit")

submit.addEventListener("submit",(e) =>{
    e.preventDefault()
    let date = document.getElementById("date-input").value

    fetch(`http://localhost:4000/api/user/availability/${username}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            date: date,    
        }),
    })
        .then(response => response.json())
        .then(data => {
            if (data.success === true) {
                alert('Success!!!' + data.message)
            } else {
                alert('Error!!!' + data.message)
            }
        })
        .catch((error) => {
            alert('Error!!!' + error);
        });
})
    // URL submit form;

const urlSubmitForm = "http://localhost:5678/api/users/login";


// FUNCTIONS

async function postCredentials(email, password){
    try{
        const response = await fetch(urlSubmitForm,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'email': email, 
                'password': password
            })
        });

        if (response.ok) {
            const data = await response.json(); // QUESTION : pourquoi await ici ? 
            const token = data.token;

            console.log('Authentification réussie ', token);
            window.location.href = "index.html"; // redirection

            document.cookie = `jwt=${token}`;
        }
        else{
            alert('Nom d\'utilisateur ou mot de passe incorrect');
        }
    }
    catch (error) {
        console.error('Erreur lors de la connexion à l\'API:', error);
        alert('Erreur lors de la connexion à l\'API');
    }
}

// WORKFLOWS

const submitElement = document.getElementById("login__form");


submitElement.addEventListener('submit', (event) => { 

    event.preventDefault(); //empêche comportement naturel du submit form : get + recharge page

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    postCredentials(email, password);
});




// pour valider le login 


const loginElementInput1 = document.getElementById('email');
const loginElementInput2 = document.getElementById('password');

const loginSubmitButton = document.getElementById('submitLogin');

function toggleButtonStateLogin(){
    if(loginElementInput1.value.trim() ==='' || loginElementInput1.value.trim() ===''){
        loginSubmitButton.classList.remove('unlocked');
    }
    else{
        loginSubmitButton.classList.add('unlocked');
    }
};

toggleButtonStateLogin(); // on page load
loginElementInput1.addEventListener('input', toggleButtonStateLogin);
loginElementInput2.addEventListener('input', toggleButtonStateLogin);



// Return to "projects"


const indexButtons = document.getElementsByClassName('trigger-login-to-index');

for (var i = 0; i < indexButtons.length; i++) {
    indexButtons[i].addEventListener('click', (event) => {
        event.preventDefault();
        window.location.href = "index.html"; 
    })
}
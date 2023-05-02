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

//  sophie.bluel@test.tld
//  S0phie


// WORKFLOWS

const submitElement = document.getElementById("submitLogin");

console.log("dans le fichier");
console.log(submitElement);

submitElement.addEventListener('submit', (e) => {
    console.log('appui sur le bouton');
});


submitElement.onsubmit = (event) => {
    console.log('appui sur le bouton V2');
};


/*
submitElement.addEventListener('submit', (event) => { // QUESTION ne se déclenche pas 

    
    event.preventDefault();

    console.log("dans la fonction");
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    postCredentials(email, password);
});*/
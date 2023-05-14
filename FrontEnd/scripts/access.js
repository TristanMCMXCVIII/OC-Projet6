// elements à modifier selon la connexion

const banner = document.getElementById('editBanner');


function getCookie(name) {
    const cookieValue = document.cookie.match(`(^|;) ?${name}=([^;]*)(;|$)`);
    return cookieValue ? cookieValue[2] : null;
  }
  
  const jwt = getCookie('jwt');

  console.log(jwt);
  
  if (jwt != null) { 
      banner.style.display = 'flex';
  } else {
      banner.style.display = 'none';
  }



// POURQUOI CA NE MARCHE PAS ???
/*
document.getElementsByClassName('trigger-index-to-login').forEach(element => {
    console.log('element : ', element);
    element.addEventListener('click', (event) => {
        event.preventdefault();
        window.location.href = "index2.html"; // redirection
    })
    
});*/

const loginButtons = document.getElementsByClassName('trigger-index-to-login');

for (var i = 0; i < loginButtons.length; i++) {
    loginButtons[i].addEventListener('click', (event) => {
        event.preventDefault();
        window.location.href = "index2.html"; 
    })
}
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

      Array.from(document.getElementsByClassName('trigger-logout')).forEach(trigger => {
        trigger.classList.add('active');
      });
      Array.from(document.getElementsByClassName('trigger-index-to-login')).forEach(trigger => {
          trigger.classList.remove('active');
      });
  } else {
      banner.style.display = 'none';

      Array.from(document.getElementsByClassName('trigger-logout')).forEach(trigger => {
        trigger.classList.remove('active');
      });
      Array.from(document.getElementsByClassName('trigger-index-to-login')).forEach(trigger => {
          trigger.classList.add('active');
      });
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


const logoutButtons = document.getElementsByClassName('trigger-logout');


function retirerCookie(nomCookie) {
    var cookies = document.cookie.split(";");
  
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i];
      while (cookie.charAt(0) === " ") {
        cookie = cookie.substring(1);
      }
  
      if (cookie.indexOf(nomCookie + "=") === 0) {
        var expirationDate = new Date();
        expirationDate.setFullYear(expirationDate.getFullYear() - 1);
        document.cookie = nomCookie + "=; expires=" + expirationDate.toUTCString() + ";"/*+ "; path=/;"*/;
        break;
      }
    }
  }

  
for (var i = 0; i < logoutButtons.length; i++) {
    logoutButtons[i].addEventListener('click', (event) => {
        event.preventDefault();
        document.cookie = `jwt=${null}`;
        document.cookie = 'jwt' + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        retirerCookie('jwt');
        console.log('cookie retiré');
        location.reload();
    })
}
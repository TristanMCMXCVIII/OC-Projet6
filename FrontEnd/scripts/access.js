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


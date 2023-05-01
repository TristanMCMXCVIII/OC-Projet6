// URLs : access web service's APIs

const urlWorks = "http://localhost:5678/api/works";
const urlCategories = "http://localhost:5678/api/categories";


// FUNCTIONS 

async function getData(url) {
    try {
      const response = await fetch(url);
      if (!response.ok){
        throw new Error(response.statusText);
      }
      const data = await response.json();
      return data;
    } 
    catch (error) {
      console.error(error);
    };
};


function removeWorks(){
    const gallery = document.querySelector('#portfolio .gallery');

    const figures = gallery.querySelectorAll('figure');

    figures.forEach(figure => {
        gallery.removeChild(figure);
    });
};


function displayFilterButtons(allCategories, allWorks){
    const filtersElement = document.getElementById('filter');

    // filter : all
    const filterAll = document.createElement('button');
    filterAll.classList.add('filter__button');
    filterAll.textContent = 'Tous';

    filterAll.addEventListener('click', function() {
        removeWorks();
        displayWorks(allWorks);
    });

    filtersElement.appendChild(filterAll); // add in HTML document

    //filters : by categories
    for (let category of allCategories){
        const filterCategory = document.createElement('button');
        filterCategory.classList.add('filter__button');
        filterCategory.textContent = category.name;

        filterCategory.addEventListener('click', function() {
            removeWorks();
            displayWorks(allWorks.filter(singleWork => singleWork.category.name === category.name));
        });

        filtersElement.appendChild(filterCategory);
    };
};


function displayWorks(allWorks){
    const worksElement = document.querySelector('#portfolio .gallery');
    console.log(allWorks);

    for (let work of allWorks){

        console.log(work);
        const workElement = document.createElement('figure');
        workElement.setAttribute('category', work.category.name);

        const workImage = document.createElement('img');
        workImage.setAttribute('src', work.imageUrl);
        workImage.setAttribute('alt', work.title);

        workElement.appendChild(workImage);

        const workDescription = document.createElement('figcaption');
        workDescription.textContent = work.title;

        workElement.appendChild(workDescription);

        worksElement.appendChild(workElement);
    };
};


Promise.all([getData(urlWorks), getData(urlCategories)])
    .then(([allWorks, allCategories]) => {
        //console.log("Nouveau fichier JS")
        //console.log(allWorks);
        //console.log(allCategories);

        
        displayWorks(allWorks);
        displayFilterButtons(allCategories, allWorks);

    })
    .catch( error => {
        console.error("erreur lors de la réception des données : ", error);
    });
// URLs : access web service's APIs

const urlWorks = "http://localhost:5678/api/works";
const urlCategories = "http://localhost:5678/api/categories";


/////////////////
/// FUNCTIONS ///
/////////////////

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



function buildWork(work) {
    const workElement = document.createElement('figure');
        workElement.setAttribute('category', work.category.name);
        workElement.setAttribute('id', `work-elt-${work.id}`);

        const workImage = document.createElement('img');
        workImage.setAttribute('src', work.imageUrl);
        workImage.setAttribute('alt', work.title);

        workElement.appendChild(workImage);

        const workDescription = document.createElement('figcaption');
        workDescription.textContent = work.title;

        workElement.appendChild(workDescription);

        return workElement;
}

function buildWork_withoutCategory(work) { //sinon, signifier une categorie avec sont id
    const workElement = document.createElement('figure');
        //workElement.setAttribute('category', work.category.name);
        workElement.setAttribute('id', `work-elt-${work.id}`);

        const workImage = document.createElement('img');
        workImage.setAttribute('src', work.imageUrl);
        workImage.setAttribute('alt', work.title);

        workElement.appendChild(workImage);

        const workDescription = document.createElement('figcaption');
        workDescription.textContent = work.title;

        workElement.appendChild(workDescription);

        return workElement;
}


function displayWorks(allWorks){
    const worksElement = document.querySelector('#portfolio .gallery');

    for (let work of allWorks){

        worksElement.appendChild(buildWork(work));
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



///////////////////
/// PAGE INDEXE ///
///////////////////

Promise.all([getData(urlWorks), getData(urlCategories)])
    .then(([allWorks, allCategories]) => {
        
        displayWorks(allWorks);
        displayFilterButtons(allCategories, allWorks);
    })
    .catch( error => {
        console.error("erreur lors de la réception des données : ", error);
    });


///////////////////////////
/// MODALE 2 : ADD WORK ///
///////////////////////////

getData(urlCategories)
    .then( (data) => {
        console.log('pour la modale 2');
        console.log(data);

        const selectorCategories = document.getElementById('selector-categories');
        console.log('select categories', selectorCategories);
        data.forEach((singleCategory) => {
            console.log('single categorie', singleCategory.name);
            const newOption = document.createElement('option');
            newOption.setAttribute('value', singleCategory.id);
            newOption.textContent = singleCategory.name;

            selectorCategories.appendChild(newOption);
        });
    });
    

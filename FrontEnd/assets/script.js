

fetch('http://localhost:5678/api/works')
    .then(function(res) {
        console.log(res);
        if (res.ok){
            return res.json();
        }
    })
    .then(function(value) {
        console.log(value);

        const gridContainer = document.querySelector('#portfolio .gallery');

        for (let i = 0; i < value.length; i++){

            const category = value[i].category.name;

            const gridItem = document.createElement('figure');
            gridItem.setAttribute('category', category);     

            const imageUrl = value[i].imageUrl;
            const title = value[i].title;
            

            const image = document.createElement('img');
            image.setAttribute('src', imageUrl);
            image.setAttribute('alt', title);
            

            const description = document.createElement('figcaption');
            description.textContent = title;

            
            gridItem.appendChild(image);
            gridItem.appendChild(description);


            gridContainer.appendChild(gridItem); 
        }
    });


fetch('http://localhost:5678/api/categories')

    //await le fetch précédent ? necessaire si on fait le filtre ici

    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function(value) {
        console.log(value);

        const filterList = document.getElementById('filter');//

        const allFilters = document.createElement('button');
        allFilters.classList.add('filter__button');
        allFilters.textContent = 'Tous';

        allFilters.addEventListener('click', function() {
            const figures = document.getElementsByTagName('figure');

            for( let figure of figures){
                const TODO = 0;
            }
        });

        filterList.appendChild(allFilters);

        for (let i = 0; i < value.length; i++){

            const filterElement = document.createElement('button');
            filterElement.classList.add('filter__button');
            filterElement.textContent = value[i].name;

            filterList.appendChild(filterElement);
        }
    })















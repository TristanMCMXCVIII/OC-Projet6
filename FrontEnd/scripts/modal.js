/*
const modalContainer = document.querySelector(".modal-container");
const modalTriggers = document.querySelectorAll(".modal-trigger");

modalTriggers.forEach(trigger => trigger.addEventListener("click", toggleModal))

function toggleModal() {
    modalContainer.classList.toggle("active"); //ajoute la classe si elle n'y est pas ou non
}
*/

// FUNCTIONS : look for active classes in other modals, remove them, active the the modal

function hideOverlay() {
    document.querySelector(".modal-container").classList.remove('active');
};

function showOverlay() {
    document.querySelector(".modal-container").classList.add('active');
};

// - - - - - - - - - - -

function hideModals() {
    document.querySelectorAll('.modal').forEach( modal => {
        if(modal.classList.contains('active')) {
            modal.style.display ='none';
            modal.classList.remove('active');
        }
    });
};

function showModal(modal) {
    modal.style.display = 'flex'; 
    modal.classList.add('active');
};


// EVENT LISTENER using theses functions

document.querySelectorAll('.trigger-modal-close').forEach( trigger => {
    trigger.addEventListener("click", () => {
        console.log('dans trigger -close-');
        hideOverlay();
        hideModals();
    });
});

document.querySelectorAll('.trigger-modal-gallery').forEach( trigger => {
    trigger.addEventListener("click", () => {
        console.log('dans trigger -gallery-');
        showOverlay();
        const modalGallery = document.querySelector('.modal-gallery');
        showModal(modalGallery);
    });
});

document.querySelectorAll('.trigger-modal-gallery-from-other').forEach( trigger => {
    trigger.addEventListener("click", () => {
        console.log('dans trigger -gallery- from other');
        hideModals();
        const modalGallery = document.querySelector('.modal-gallery');
        showModal(modalGallery);
    });
});


document.querySelectorAll('.trigger-modal-add-from-other').forEach( trigger => {
    trigger.addEventListener("click", () => {
        console.log('dans trigger -add- from other');
        hideModals();
        const modalAdd = document.querySelector('.modal-add');
        showModal(modalAdd);
    });
});



///////////////////////////////////////
//////////// MODAL GALLERY ////////////
///////////////////////////////////////



function displayWorksInModal(allWorks) {
    const gridContainerElement = document.querySelector('.modal-gallery .grid-container');

    allWorks.forEach( (work) => {
        console.log(work);
        const gridItemElement = document.createElement('div');
        gridItemElement.classList.add('grid-item');

            const figureActionElement = document.createElement('div');
            figureActionElement.classList.add('figure-action');

                const figureActionButtonMoveElement = document.createElement('button');
                figureActionButtonMoveElement.classList.add('figure-action__button');
                figureActionButtonMoveElement.innerHTML = `<i class="fa-solid fa-arrows-up-down-left-right fa-xs" style="color: #ffffff;"></i>`;
                figureActionElement.appendChild(figureActionButtonMoveElement);

                const figureActionButtonTrashElement = document.createElement('button');
                figureActionButtonTrashElement.classList.add('figure-action__button');
                figureActionButtonTrashElement.innerHTML = `<i class="fa-regular fa-trash-can fa-xs" style="color: #ffffff;"></i>`;
                figureActionElement.appendChild(figureActionButtonTrashElement);

            gridItemElement.appendChild(figureActionElement);

            const modalFigureElement = document.createElement('figure');
            modalFigureElement.classList.add('modal-figure');
            modalFigureElement.innerHTML = `
                <img src="${work.imageUrl}" alt="${work.title}">
				<button class="edit-work__button">éditer</button>`;
            gridItemElement.appendChild(modalFigureElement);
        
        gridContainerElement.appendChild(gridItemElement);

        // Buttons 

        figureActionButtonTrashElement.addEventListener('click', (event) => {
            event.preventDefault();
            console.log(work.id);
            console.log(getCookie('jwt')); //  ERR
            fetch(`http://localhost:5678/api/works/${work.id}`, { 
                method: 'DELETE',
                headers: {
                    Authorization: "Bearer " + getCookie('jwt') 
                }
            });
            //rappel /api/work pour les 2 grids
        });

    });
};

getData(urlWorks)
    .then( (allWorks) => {
        console.log('frabrication des éléments de la modale avec ', allWorks);
        displayWorksInModal(allWorks);
    });
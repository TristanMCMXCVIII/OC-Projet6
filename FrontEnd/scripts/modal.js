/////////////////////
/// MODAL ROUTERS ///
/////////////////////


// Functions

function showOverlay() {
    document.querySelector(".modal-container").classList.add('active');
};

function showModal(modal) {
    modal.classList.add('active');
};

function hideModals() {
    document.querySelectorAll('.modal').forEach( modal => {
        if(modal.classList.contains('active')) {
            modal.classList.remove('active');
        }
    });
};

function hideOverlay() {
    document.querySelector(".modal-container").classList.remove('active');
};


// Triggers open/close/change modal

document.querySelectorAll('.trigger-modal-close').forEach( trigger => {
    trigger.addEventListener("click", () => {
        console.log("modal -> site");
        hideOverlay();
        hideModals();
    });
});

document.querySelectorAll('.trigger-modal-gallery').forEach( trigger => {
    trigger.addEventListener("click", () => {
        console.log("site-> gallery");
        hideModals();
        showOverlay();
        const modalGallery = document.querySelector('#modal-gallery');
        showModal(modalGallery);
    });
});

document.querySelectorAll('.trigger-modal-gallery-from-other').forEach( trigger => {
    trigger.addEventListener("click", () => {
        console.log("ModalX -> gallery");
        hideModals();
        const modalGallery = document.querySelector('#modal-gallery');
        showModal(modalGallery);
    });
});


document.querySelectorAll('.trigger-modal-add-from-other').forEach( trigger => {
    trigger.addEventListener("click", () => {
        console.log("ModalX -> add work");
        hideModals();
        const modalAdd = document.querySelector('#modal-add');
        showModal(modalAdd);
    });
});



///////////////////////////////////////////
//////////// MODAL 1 : GALLERY ////////////
///////////////////////////////////////////



function displayWorksInModal(allWorks) {
    const gridContainerElement = document.querySelector('#modal-gallery .grid-container');

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
            console.log(getCookie('jwt')); 
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



////////////////////////////////////////////
//////////// MODAL 2 : ADD WORK ////////////
////////////////////////////////////////////

const buttonAddWork = document.getElementById('picture-uploader__button--add-work');
const inputAddWork = document.getElementById('picture-uploader__input--add-work');

const uploaderVisualisation = document.querySelector('#form-add-work .picture-uploader__visualisation');
const uploaderDropAnImage = document.querySelector('#form-add-work .picture-uploader__drop-an-image');


const formData = new FormData();


buttonAddWork.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();

    inputAddWork.click();
});


inputAddWork.addEventListener('change', (event) => {
    event.preventDefault();
    event.stopPropagation();

    const file = event.target.files[0];
    console.log(file);

    formData.append('image', file); // append formData

    var reader = new FileReader();
    reader.onload = (e) => {
        const imageUrl = e.target.result;

        const image = new Image();
        image.classList.add('uploaded-image');
        uploaderDropAnImage.classList.add('desactive');
        image.onload = () => {
            uploaderVisualisation.innerHTML = '';
            uploaderVisualisation.appendChild(image);
        };

        image.src = imageUrl;
    };

    reader.readAsDataURL(file);

    console.log('done');
});


// valider le formulaire :


document.getElementById('form-add-work').addEventListener('submit', (event) => {
    event.preventDefault(); //empeche get plus redirection d'un form

    formData.append('title', document.getElementById('input-title').value);
    formData.append('category', document.getElementById('selector-categories').value);

 
    for (const value of formData.values()) {
        console.log(value);
    };

    console.log(getCookie('jwt'));

    fetch(urlWorks,{
        method: 'POST',
        headers: {
            'Authorization': "Bearer " + getCookie('jwt')
        },
        body: formData
    })
        .then( response => {
            console.log('Nouveau projet envoyé avec succès', response);
        })
        .catch( error => {
            console.error('Une erreur s\'est produite lors de l\'envoi de l\'image', error);
        })
});


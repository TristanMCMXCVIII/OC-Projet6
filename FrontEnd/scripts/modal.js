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

async function deleteWork(id){
    fetch(`http://localhost:5678/api/works/${id}`, { 
            method: 'DELETE',
            headers: {
                Authorization: "Bearer " + getCookie('jwt') 
            }
        })
        .then( (response) => {
            console.log('reponse de delete', response);
            if(response.ok){
                const modalGalleryElementDeleted = document.getElementById(`modal-gallery-elt-${id}`);
                modalGalleryElementDeleted.remove();
            }
        })
        .catch( (error) => {
            console.error(error);
        });
};



function modalGalleryBuildElement(work){
    // Composition 
    const gridItemElement = document.createElement('div');
    gridItemElement.classList.add('grid-item');
    gridItemElement.setAttribute('id', `modal-gallery-elt-${work.id}`);// pour la suppression

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

    // Button
    figureActionButtonTrashElement.addEventListener('click', (event) => {
        event.preventDefault();
        deleteWork(work.id);
    });
    
    // Return 
    return gridItemElement;
}



function modalGalleryComposition(allWorks) {
    const gridContainerElement = document.querySelector('#modal-gallery .grid-container');

    allWorks.forEach( (work) => {

        const gridItemElementx = modalGalleryBuildElement(work);
        gridContainerElement.appendChild(gridItemElementx);
    });
};



getData(urlWorks)
    .then( (allWorks) => {
        console.log('frabrication des éléments de la modale avec ', allWorks);
        modalGalleryComposition(allWorks);
    });



////////////////////////////////////////////
//////////// MODAL 2 : ADD WORK ////////////
////////////////////////////////////////////

const buttonAddWork = document.getElementById('picture-uploader__button--add-work');
const inputAddWork = document.getElementById('picture-uploader__input--add-work');

const uploaderVisualisation = document.querySelector('#form-add-work .picture-uploader__visualisation');
const uploaderDropAnImage = document.querySelector('#form-add-work .picture-uploader__drop-an-image');

const deleteLoadedImageElement = document.getElementById('remove-uploaded-image');

const formData = new FormData();


buttonAddWork.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();

    inputAddWork.click();
});


const imageUploaded = document.getElementById('uploaded-image');

inputAddWork.addEventListener('change', (event) => {
    event.preventDefault();
    event.stopPropagation();

    const file = event.target.files[0];
    console.log(file);
/*
    formData.append('image', file); // append formData formData.append('image', inputAddWork.files[0]; 
*/
    var reader = new FileReader();
    reader.onload = (e) => {
        const imageUrl = e.target.result;

        //const image = new Image();//
       // image.classList.add('uploaded-image');//

        

        uploaderDropAnImage.classList.add('desactive');
        deleteLoadedImageElement.classList.add('active');
        /*imageUploaded.onload = () => {
            uploaderVisualisation.innerHTML = '';//vide avanr de remplir
            uploaderVisualisation.appendChild(imageUploaded);
        };*/

        imageUploaded.src = imageUrl;
        imageUploaded.alt = 'uploaded image override';
    };

    reader.readAsDataURL(file);

    console.log('done');
});



deleteLoadedImageElement.addEventListener('click', (event) => {
    event.preventDefault();
    imageUploaded.src = '';
    imageUploaded.alt = '';
    uploaderDropAnImage.classList.remove('desactive');
    deleteLoadedImageElement.classList.remove('active');
})


// valider le formulaire :


document.getElementById('form-add-work').addEventListener('submit', (event) => {
    event.preventDefault();

    formData.append('image', inputAddWork.files[0]); 
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


// Bouton pour valider le formulaire ACTIF ou innactif 

const addWorkElementImage = document.getElementById('uploaded-image');
const addWorkElementInput1 = document.getElementById('input-title');
const addWorkElementInput2 = document.getElementById('selector-categories');

const addWorkSubmitButton = document.getElementById('submit-new-work');

console.log('addWorkElementImage : ', !addWorkElementImage.src==='')

function toggleButtonStateAddWork(){
    if(addWorkElementInput1.value.trim() ==='' || addWorkElementInput1.value.trim() ==='' || addWorkElementImage.src===''){
        addWorkSubmitButton.classList.remove('unlocked');
        console.log('DISABLED', addWorkElementImage.src);
    }
    else{
        addWorkSubmitButton.classList.add('unlocked');
        console.log('UNLOCKED', addWorkElementImage.src);
    }
};

addWorkElementImage.addEventListener('change', toggleButtonStateAddWork);
addWorkElementInput1.addEventListener('input', toggleButtonStateAddWork);
addWorkElementInput2.addEventListener('input', toggleButtonStateAddWork);







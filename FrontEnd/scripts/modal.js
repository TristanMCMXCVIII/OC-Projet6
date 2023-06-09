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

                const workElementDeleted=document.getElementById(`work-elt-${id}`)
                workElementDeleted.remove();
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

////////////////////////////////////////////
//////////// MODAL 2 : ADD WORK ////////////
////////////////////////////////////////////

////////////////////////////////////////////


///////////////////////////////
// INITIALISATION des variables 
///////////////////////////////

const buttonAddWork = document.getElementById('picture-uploader__button--add-work');
const inputAddWork = document.getElementById('picture-uploader__input--add-work');

const uploaderVisualisation = document.querySelector('#form-add-work .picture-uploader__visualisation');
const uploaderDropAnImage = document.querySelector('#form-add-work .picture-uploader__drop-an-image');

const deleteLoadedImageElement = document.getElementById('remove-uploaded-image');

const formData = new FormData();


/////////////////////////////////////////////////////
// EVENTMENT : clique PHYSIQUE pour ajouter une image 
/////////////////////////////////////////////////////

buttonAddWork.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();

    inputAddWork.click();
});


/////////////////////////////////////////////////////
// EVENEMENT : clique VIRTUEL pour ajouter une image
/////////////////////////////////////////////////////

const imageUploaded = document.getElementById('uploaded-image');

inputAddWork.addEventListener('change', (event) => {
    event.preventDefault();
    event.stopPropagation();

    const file = event.target.files[0];

    var reader = new FileReader();
    reader.onload = (e) => { 
        const imageUrl = e.target.result; 

        uploaderDropAnImage.classList.add('desactive');
        deleteLoadedImageElement.classList.add('active');

        imageUploaded.src = imageUrl;
        imageUploaded.alt = 'uploaded image override';

        toggleButtonStateAddWork();
    };

    
    reader.readAsDataURL(file);    
});


//////////////////////////////////////////
// EVENEMENT : clique pour rejeter l'image
//////////////////////////////////////////

deleteLoadedImageElement.addEventListener('click', (event) => {
    event.preventDefault();
    imageUploaded.src = '';
    imageUploaded.alt = '';
    uploaderDropAnImage.classList.remove('desactive');
    deleteLoadedImageElement.classList.remove('active');

    toggleButtonStateAddWork();
})


///////////////////////////////////////
// EVENEMENT : soumission du formulaire
///////////////////////////////////////

document.getElementById('form-add-work').addEventListener('submit', (event) => {
    console.log('SUBMIT WORK BTN ENCLENCHÉ');
    event.preventDefault();

    formData.append('image', inputAddWork.files[0]); 
    formData.append('title', document.getElementById('input-title').value);
    formData.append('category', document.getElementById('selector-categories').value);
    for (const value of formData.values()) {
        console.log('envie du formumaire -> data : ', value);
    };

    fetch(urlWorks,{
        method: 'POST',
        headers: {
            'Authorization': "Bearer " + getCookie('jwt')
        },
        body: formData
    })
        .then( response => {
            return response.json();
        })
        .then( work => {

            hideModals();
            showModal(document.querySelector('#modal-gallery'));
           
            document.querySelector('#modal-gallery .grid-container').appendChild(modalGalleryBuildElement(work));
            document.querySelector('#portfolio .gallery').appendChild(buildWork_withoutCategory(work));  
            
            document.getElementById('alert-submit-work-success').classList.add('active');
            setTimeout( () => {
                document.getElementById('alert-submit-work-success').classList.remove('active');
            }, 2000)

            resetForm();
        })
        .catch( error => {
            console.error('Une erreur s\'est produite lors de l\'envoi de l\'image', error);
            triggerAlertAddWorkError(error) 
        })
});


///////////////////////////////////////////////////
// FONCTION : rendre le formulaire cliquable ou non
///////////////////////////////////////////////////

const addWorkElementImage = document.getElementById('uploaded-image');  // => inputAddWork
const addWorkElementInput1 = document.getElementById('input-title');
const addWorkElementInput2 = document.getElementById('selector-categories');

const addWorkSubmitButton = document.getElementById('submit-new-work');

function toggleButtonStateAddWork(){

    if(addWorkElementInput1.value.trim() ==='' || addWorkElementInput2.value.trim() ==='' || addWorkElementImage.alt===''){  
        addWorkSubmitButton.classList.remove('unlocked');
    }
    else{
        addWorkSubmitButton.classList.add('unlocked');
    }
};


////////////////////////////////////////////
// EVENEMENTs : les input changent de valeur
////////////////////////////////////////////

addWorkElementInput1.addEventListener('input', toggleButtonStateAddWork);
addWorkElementInput2.addEventListener('input', toggleButtonStateAddWork);


/////////////////////////////////
// FUNCTION : trigger alert error 
/////////////////////////////////

function triggerAlertAddWorkError(message) {
    var alertLoginError = document.getElementById('alert-submit-work-error');

    alertLoginError.textContent = message;

    alertLoginError.classList.add('active');

    setTimeout( () => {
        alertLoginError.classList.remove('active');
    }, 3000)
}


////////////////////////
// FUNCTION : reset form
////////////////////////

function resetForm() {
    document.getElementById("form-add-work").reset();

    imageUploaded.src = '';
    imageUploaded.alt = '';
    uploaderDropAnImage.classList.remove('desactive');
    deleteLoadedImageElement.classList.remove('active');

    formData.delete('image');
    formData.delete('title');
    formData.delete('category');

    toggleButtonStateAddWork();
  }






import * as lib from './modules/lib.js';
import * as lStorage from './modules/lStorage.js';

const cleLocalStorage = "argent";
let argentUtilisateurLocalStorage = lStorage.getItemFromLocalStorage(cleLocalStorage);
let btnAjouter = document.getElementById('ajouter-epargne');
let ajouterMontantEpargne = document.getElementById('ajouter-prix-epargne');

const modifyEpagneFromLocalStarage = (key) => {
    let items = lStorage.getItemFromLocalStorage(key);

    items.epargne = items.epargne + parseFloat(ajouterMontantEpargne.value);
    console.log('items : ', items);
    lStorage.setItemToLocalStorage(key, items);
};

// Ajouter un element dnas le local storage et refresh la page pour l'afficher dans le tableau des desirs
btnAjouter.addEventListener("click", function(e) {
    modifyEpagneFromLocalStarage(cleLocalStorage);
    window.location.reload();
});
/**Imports */
import * as lStorage from './modules/lStorage.js'
import * as htmlTag from './modules/class.js'
import * as lib from './modules/lib.js';

/**Enregistrement du tableau de dépenses du local storage */
let cleLocalStorage = 'desirs';
let depenseDesirsLocalStorage = lStorage.getItemFromLocalStorage(cleLocalStorage);

/**
 * Variables
 */
let element = new htmlTag.HtmlTag();
let valueAjouterTitre = document.getElementById("addTitre");
let valueAjouterPrix = document.getElementById("addPrice");


/** Ajout des elements pris dans le local storage */
for (const depense of depenseDesirsLocalStorage) {
    element.add(document.querySelector("#desirs >div.desirs_items"), depense.titre, depense.prix, depense.id);
};

/**Affichage du reste dans le tableau de dépenses */
let resteDesirs = document.getElementById('reste-desirs');
let totalDepensesDesirs = document.getElementById('total-depenses-desirs');
let total = lib.calculerReste(cleLocalStorage);
resteDesirs.textContent = `${ Number.parseFloat(total.reste).toFixed(2)} €`;
totalDepensesDesirs.textContent = `${ Number.parseFloat(total.depenses).toFixed(2) } €`;


/**Enregistrement des boutons modifier ajouter et supprimer */
let btnAjouter = document.getElementById("ajouter-desirs");
let btnSupprimer = document.querySelectorAll('.btn-supprimer');
let btnModifer = document.querySelectorAll('.btn-modifier');

// Ajouter un element dnas le local storage et refresh la page pour l'afficher dans le tableau des desirs
btnAjouter.addEventListener("click", function(e) {
    console.log('click');
    if (typeof valueAjouterTitre.value !== "string" && isNaN(parseInt(valueAjouterPrix.value))) {
        return
    } else {
        let id = Math.floor(Math.random() * 1000);
        lStorage.addItemTolocalStorage(cleLocalStorage, { 'id': id, 'prix': valueAjouterPrix.value, 'titre': valueAjouterTitre.value });
        window.location.reload();
    }
});

/**Modifier une dépense dans le tableau du local storage*/
btnModifer.forEach((element) => {
    element.addEventListener('click', e => {
        e.stopPropagation();
        let nodeParent = lib.findNodeParent(element);
        let id = nodeParent.dataset.id;
        lStorage.modifyItemFromLocalStorage(cleLocalStorage, nodeParent, id);
    });
});

/**Supprimer un element du tableau dépense */
btnSupprimer.forEach((element) => {
    element.addEventListener('click', e => {
        e.stopPropagation();
        let nodeParent = lib.findNodeParent(element);
        let id = nodeParent.dataset.id;
        lStorage.deleteItemFromLocaleStorage(cleLocalStorage, id);
    })
});
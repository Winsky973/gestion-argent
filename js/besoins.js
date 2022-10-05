/**Imports */
import * as lStorage from './modules/lStorage.js'
import * as htmlTag from './modules/class.js'
import * as lib from './modules/lib.js';

/**Enregistrement du tableau de dépenses du local storage */
let cleLocalStorage = 'besoins';
let depenseBesoinsLocalStorage = lStorage.getItemFromLocalStorage(cleLocalStorage);
/**
 * Variables et tag html
 */
let element = new htmlTag.HtmlTag();
let valeurAjouterTitre = document.getElementById("ajouter-titre-besoins");
let valeurAjouterPrix = document.getElementById("ajouter-prix-besoins");
let btnAjouter = document.getElementById("ajouter-besoins");

/** Ajout des elements pris dans le local storage */
for (const besoins of depenseBesoinsLocalStorage) {
    element.add(document.querySelector("#besoins >div.besoins-items"), besoins.titre, besoins.prix, besoins.id);
};


/**Affichage du reste dans le tableau de dépenses */
let resteBesoins = document.getElementById('reste-besoins');
let totalDepensesBesoins = document.getElementById('total-depenses-besoins');
let total = lib.calculerReste(cleLocalStorage);
resteBesoins.textContent = `${Number.parseFloat(total.reste).toFixed(2)} €`;
totalDepensesBesoins.textContent = `${ Number.parseFloat(total.depenses).toFixed(2) } €`;

/**Enregistrement des boutons modifier ajouter et supprimer */
let btnSupprimer = document.querySelectorAll('.btn-supprimer');
let btnModifer = document.querySelectorAll('.btn-modifier');

// Ajouter un element dans le local storage et refresh la page pour l'afficher dans le tableau des desirs
btnAjouter.addEventListener("click", function(e) {
    if (!lib.ifString(valeurAjouterTitre.value)) {
        alert('Ajouter un titre correct');
    } else if (!lib.ifNumber(valeurAjouterPrix.value)) {
        alert('Ajouter un prix correct');
    } else {
        let id = Math.floor(Math.random() * 1000);
        lStorage.addItemTolocalStorage(cleLocalStorage, { id, 'prix': valeurAjouterPrix.value, 'titre': valeurAjouterTitre.value });
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
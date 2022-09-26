import * as lib from './modules/lib.js';
import * as lStorage from './modules/lStorage.js';

const montant_besoin_nescessaire = document.getElementById('montant-besoins-nescessaire');
let montant_besoins_desirs = document.getElementById('montant-desirs');
let montant_besoins_epargnes = document.getElementById('montant-epargne');
let cleLocalStorage = 'argent';

const getArgentUtilisateur = document.getElementById('form-entrer-argent');

getArgentUtilisateur.addEventListener('submit', e => {
    const argentUtilisateur = getArgentUtilisateur[0].value;

    let besoins = lib.decoupage(argentUtilisateur, 0.5);
    let desirs = lib.decoupage(argentUtilisateur, 0.3);
    let epargne = lib.decoupage(argentUtilisateur, 0.2);

    lStorage.setItemToLocalStorage('argent', { besoins, desirs, epargne });
});

let argentUtilisateurLocalStorage = lStorage.getItemFromLocalStorage(cleLocalStorage);

montant_besoin_nescessaire.textContent = Number.parseFloat(argentUtilisateurLocalStorage.besoins).toFixed(2);
montant_besoins_desirs.textContent = Number.parseFloat(argentUtilisateurLocalStorage.desirs).toFixed(2);
montant_besoins_epargnes.textContent = Number.parseFloat(argentUtilisateurLocalStorage.epargne).toFixed(2);
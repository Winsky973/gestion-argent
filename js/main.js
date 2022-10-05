import * as lib from './modules/lib.js';
import * as lStorage from './modules/lStorage.js';

const montant_besoin_nescessaire = document.getElementById('montant-besoins-nescessaire');
let montant_besoins_desirs = document.getElementById('montant-desirs');
let montant_besoins_epargnes = document.getElementById('montant-epargne');
let cleLocalStorage = 'argent';

const getArgentUtilisateur = document.getElementById('form-entrer-argent');

getArgentUtilisateur.addEventListener('submit', e => {
    const argentUtilisateur = getArgentUtilisateur[0].value;

    if (!lib.ifNumber(argentUtilisateur)) {
        alert('Veuillez rentrer un nombre correct')
    } else {
        let besoins = lib.decoupage(argentUtilisateur, 0.5);
        let desirs = lib.decoupage(argentUtilisateur, 0.3);
        let epargne = lib.decoupage(argentUtilisateur, 0.2);

        lStorage.setItemToLocalStorage('argent', { "argent": argentUtilisateur, besoins, desirs, epargne });
    }
});

let argentUtilisateurLocalStorage = lStorage.getItemFromLocalStorage(cleLocalStorage);

let date = new Date();
let nbJrsDuMois = lib.numberOfdays(date.getFullYear(), date.getMonth()) + 1;
let argentJours = argentUtilisateurLocalStorage.argent / nbJrsDuMois;

document.getElementById('argent_mois').textContent = ` ${Number.parseFloat(argentUtilisateurLocalStorage.argent).toFixed(2)} €`;
document.getElementById('argent_jour').textContent = ` ${Number.parseFloat(argentJours).toFixed(2)} €`;
document.getElementById('argent_semaine').textContent = ` ${Number.parseFloat(argentJours * 7).toFixed(2)} €`;

montant_besoin_nescessaire.textContent = Number.parseFloat(argentUtilisateurLocalStorage.besoins).toFixed(2);
montant_besoins_desirs.textContent = Number.parseFloat(argentUtilisateurLocalStorage.desirs).toFixed(2);
montant_besoins_epargnes.textContent = Number.parseFloat(argentUtilisateurLocalStorage.epargne).toFixed(2);
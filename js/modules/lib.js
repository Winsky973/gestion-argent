/**
 * lib.js contient toutes les fonctions
 */
import * as lStorage from './lStorage.js';


/**
 * Cette fonction prend une somme et la découpe en fonction du pourcentage
 * @param {int} argent argent du mois 
 * @param {int} pourcentage pourcentage de découpe
 * @returns 
 */
export const decoupage = (argent, pourcentage) => {
    if (isNaN(argent) || isNaN(pourcentage)) {
        return `ce n'est pas un nombre`;
    }
    return argent * pourcentage;
}

/**
 * Cette fonction fait la soustraction de deux nombres
 * @param {int} a 
 * @param {int} b 
 * @returns 
 */
export const soustrationNombre = (a, b) => {
    return parseFloat(a - b);
}


/**
 * Cette fonction va trouver l'element racine qui n'est pas une div 
 * On cherche la balise article dans la colonne desirs pour avoir le data-id
 * @param {NodeList} child 
 * @returns noParent : le noeud parent
 */
export const findNodeParent = child => {
    let nodeParent = '';

    nodeParent = child.parentElement.closest(':not(div)');
    return nodeParent;
};


/**
 * Calcule le reste de la colonne desirs apres avoir soustrait les depenses
 * @returns int
 */
export const calculerReste = (key) => {
    let items = lStorage.getItemFromLocalStorage(key);
    let argent = lStorage.getItemFromLocalStorage('argent');
    let totalDepense = 0;
    let toggle = key;
    let reste = 0;
    // console.log('argent : ', argent)
    if (items !== null) {
        for (const item of items) {
            totalDepense = totalDepense + parseFloat(item.prix);

            toggle === 'besoins' ? (
                    reste = argent.besoins -= parseFloat(item.prix)) :
                (
                    reste = argent.desirs -= parseFloat(item.prix)
                );
        }
    } else {
        console.log(`le tableau '${key}' n'est pas iterable il doit etre vide`);
    }
    return { reste, 'depenses': totalDepense };
}

/**Retourne le nombre de jours du mois */
export const numberOfdays = (annee, mois) => {
    return new Date(annee, mois, 0).getDate();
}
/*****************
 * LOCAL STORAGE *
 ****************/
import * as htmlTag from './class.js';
import * as lib from './lib.js';


/**
 * cette fonction test si le local storage est pris en charge par le navigateur
 * @param {string} type localstorage
 * @return
 */
function storageAvailable(type) {
    try {
        var storage = window[type],
            x = "__storage_test__";
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    } catch (e) {
        return e instanceof DOMException && (
                // everything except Firefox
                e.code === 22 ||
                // Firefox
                e.code === 1014 ||
                // test name field too, because code might not be present
                // everything except Firefox
                e.name === 'QuotaExceededError' ||
                // Firefox
                e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already 
            storage.length !== 0;
    }
}

/**
 * Retourne un tableau d'objet provenant du local storage
 * @param {string} key 
 * @returns 
 */
export const getItemFromLocalStorage = (key = 'depenses') => {

    if (localStorage.getItem(key) === null) {
        setItemToLocalStorage(key, []);
        return JSON.parse(localStorage.getItem(key));
    } else {
        return JSON.parse(localStorage.getItem(key));
    }
}

/**
 * Cette fonction va rechercher l'index de l'element qui contient id
 * @param {string} key 
 * @param {int} id 
 * @returns 
 */
const findOneItemById = (key, id) => {
    const items = getItemFromLocalStorage(key);
    return items.findIndex((element) => element.id === parseInt(id));
};


/**
 * Fonction qui push un objet dans le local storage
 * @param {id, titre, prix} item 
 */
export const setItemToLocalStorage = (key, item) => {
    localStorage.setItem(key, JSON.stringify(item));
}


/**
 * addItemToLocalStarage va enregistrer un item dans le local storage
 * @param {*} value 
 */
export const addItemTolocalStorage = (key, value = {}) => {
    let items = getItemFromLocalStorage(key);

    if (items !== null) {
        let isItemsExist = findOneItemById(key, value.id);

        if (isItemsExist === -1) {
            items.push(value);
            setItemToLocalStorage(key, items);
        } else {
            setItemToLocalStorage(key, items);
        }
    }
};


/**
 * deleteItemFromLocaleStorage va supprimer un element dans le tableau d'item
 * @param {*} id 
 */
export const deleteItemFromLocaleStorage = (key = 'depenses', id) => {
    let items = getItemFromLocalStorage(key);
    let indexElementASupprimer = findOneItemById(key, id);
    console.log('items : ', items);

    if (indexElementASupprimer !== -1) {
        items.splice(indexElementASupprimer, 1);
        setItemToLocalStorage(key, items);
    } else {
        console.log(`l'item n'xiste pas ou n'esxiste plus`);
    }
    window.location.reload();
};


/**
 * modifyItemFromLocalStorage va modifier un item dans le tableau de l'element
 * Dans notre ca il va chercher dans le tableau de depenses l'index, modifier l'item et l'enregistrer a nouveau
 * @param {Object} nodeParent 
 * @param {int} id 
 */
export const modifyItemFromLocalStorage = (key = 'depenses', nodeParent, id) => {
    let items = getItemFromLocalStorage(key);
    let indexElementAModifier = findOneItemById(key, id);
    let element = new htmlTag.HtmlTag();

    let itemAModifier = items[indexElementAModifier];

    let form = document.getElementById('form-modification');
    if (form === null) {
        element.add(nodeParent, itemAModifier.titre, itemAModifier.prix, id, 'form');
        form = document.getElementById('form-modification');
    }

    form.addEventListener('submit', e => {
        e.preventDefault();
        if (!lib.ifString(form[0].value)) {
            alert('Ajouter un titre correct');
        } else if (!lib.ifNumber(form[1].value)) {
            alert('Ajouter un prix correct');
        } else {
            items[indexElementAModifier].titre = form[0].value;
            items[indexElementAModifier].prix = form[1].value;

            setItemToLocalStorage(key, items);
            window.location.reload();
        }
    })
}
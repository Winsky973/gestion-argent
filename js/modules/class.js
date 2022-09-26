/**
 * Declaration des classes
 */
export class HtmlTag {
    constructor() {}

    /**
     * Cette fontion sert a la construction d'un élément HTML complet
     * @param {string} tag sera le tag de l'élément HTML (div, h1, nav...)
     * @param {object} attr les attributs à ajouter
     * @param {string} addClass La/les classes a ajouter 
     * @param {sring} textContent Texte à ajouter à l'element
     * @returns une chaine HTML construite
     */
    create(tag = "", attr = "", addClass = '', textContent = "") {
        let element = document.createElement(tag);
        if (attr !== "undefined") {
            for (const key in attr) {
                element.setAttribute(key, attr[key]);
            }
        }

        // if (typeof addClass === "string" || addClass !== '') {
        element.className = addClass;
        // }

        if (textContent === "") {
            element.textContent = "";
        } else {
            element.textContent = textContent;
        }
        return element;
    }

    /**
     * Ajoute des noeuds jtml 
     * @param {stirng} parent tag html
     * @param {String} valueAjouterTitre titre de la depense 
     * @param {Int} valueAjouterPrix prix payer 
     * @param {int} id id a mettre comme data, data-id='565'
     * @param {string} toggle valeur afin de savoir quel objet creer
     */
    add(parent, valueAjouterTitre = '', valueAjouterPrix = '', id, toggle = 'item') {

        if (toggle !== 'item') {
            let form = this.create('form', { id: 'form-modification' }, 'form-modification');
            parent.appendChild(form);

            let inputTitre = this.create('input', { id: 'modify-titre', type: 'text', value: valueAjouterTitre });
            form.appendChild(inputTitre);

            let inputprix = this.create('input', { id: 'modify-prix', type: 'text', value: valueAjouterPrix });
            form.appendChild(inputprix);

            let btnSubmit = this.create('button', { type: 'submit' }, 'btn btn-submit', 'modifier');
            form.appendChild(btnSubmit);

            let btnAnnuler = this.create('button', {}, 'btn btn-annuler', 'annuler');
            form.appendChild(btnAnnuler);

        } else {
            let divCart = this.create('article', { 'data-id': id }, 'card card-depenses');
            parent.appendChild(divCart);

            let divContainerText = this.create('div', {}, 'divContainerText');
            divCart.appendChild(divContainerText);

            let p = this.create('p', {}, '', valueAjouterTitre);
            divContainerText.appendChild(p);

            let strong = this.create('strong', {}, {}, `${valueAjouterPrix} €`);
            divContainerText.appendChild(strong);

            let divContainerEdition = this.create('div', {}, 'containerBtnEdition');
            divCart.appendChild(divContainerEdition);

            let btnSupprimer = this.create('i', {}, 'btn btn-supprimer bi bi-trash');
            divContainerEdition.appendChild(btnSupprimer);

            let btnModifier = this.create('i', {}, 'btn btn-modifier bi bi-pencil-square');
            divContainerEdition.appendChild(btnModifier);
        }

    }

    /**
     * Supprime un 
     */
    delete() {

    }
}
// création de const et let qui serviront plus tard //
const $table = document.querySelector('.table');
let total = 0;
let contact = {
    firstName:'',
    lastName:'',
    address:'',
    city:'',
    email:'',
};
let productId = [];

/* API REQUEST  */
const fetchTeddies = async () => {
    let teddies = await fetch('http://localhost:3000/api/teddies')
     .then(res => res.json()); 
    for(let i = 0; i < teddies.length; i++) {   
         const teddy = teddies[i];  
    }
 };

fetchTeddies(); 
// appel au lancement de la page //

// création du panier en fonction des produits sauvegardé dans le localStorage //
const addProducts = () => {
        let products = JSON.parse(localStorage.getItem('products'));
        
        if(!products) { // création d'un bloc si le panier est vide //
            const $divEmpty = document.createElement('div');
            const $h2Empty = document.createElement('h2'); 
            $h2Empty.innerText = 'Votre panier est vide !';
            $table.appendChild($divEmpty);
            $divEmpty.appendChild($h2Empty);  
            $h2Empty.className  = 'empty__h2'
            $divEmpty.className  = 'empty'
            return
        }
        for(let i = 0; i < products.length; i++) {   // création d'une boucle équivalente aux nombres de produit sauvegardé dans le localStorage //
            const product = products[i];

            productId.push({_id : product._id});
// création du table avec les noms, images, quantité, prix total ainsi qu'un bouton information pour revenir à la page produit de l'ours en question //        
            const $tableTr = document.createElement('tr');
            const $tableTh = document.createElement('th');
            const $tableP = document.createElement('p');
            $tableP.innerText = product.name;
            $table.appendChild($tableTr);
            $tableTr.appendChild($tableTh);
            $tableTh.appendChild($tableP);
            $tableTh.className  = 'table__th'
            $tableP.className  = 'table__th__name'

            const $tableThImg = document.createElement('img');
            $tableThImg.src = product.image;
            $tableTh.appendChild($tableThImg);
            $tableThImg.className  = 'table__th__img'

            const $tableTd = document.createElement('td');
            const $tdOption = document.createElement('p');
            const $tdQte = document.createElement('p');
            $tdOption.innerText = 'Option : ' + product.couleur;
            $tdQte.innerText = 'Quantité : ' + product.quantite;
            $tableTr.appendChild($tableTd);
            $tableTd.appendChild($tdOption);
            $tableTd.appendChild($tdQte);
            $tableTd.className  = 'table__td__info'
            $tdOption.className  = 'table__td__option'
            $tdQte.className  = 'table__td__qte'

            const $tableTd2 = document.createElement('td');
            const $tdPrix = document.createElement('p');
            const $tdTotal = document.createElement('p');
            $tdPrix.innerText = 'Prix total';
            $tdTotal.innerText = product.total + ' €';
            $tableTr.appendChild($tableTd2);
            $tableTd2.appendChild($tdPrix);
            $tableTd2.appendChild($tdTotal);
            $tableTd2.className  = 'table__td__prix'
            $tdTotal.className  = 'table__td__total'
            $tdPrix.className  = 'table__td__montant'       
            total += product.total;    

            const $tableTd3 = document.createElement('td');
            const $btnProduct = document.createElement('div');
            $tableTr.appendChild($tableTd3);
            $tableTd3.appendChild($btnProduct);
            $btnProduct.innerHTML = `<i class="fas fa-info-circle"></i>`
            $tableTd3.className  = 'table__td__buttons'
            $btnProduct.className  = 'table__td__btnProduct'
            $btnProduct.addEventListener("click", function(){
                document.location.href = 'produit.html?id=' + product.productId;
            });     
            
    }    // indication du total du panier //
        const $divTotal = document.createElement('div');
        const $h2TotCmd = document.createElement('h2'); 
        $h2TotCmd.innerText = 'Total de votre commande : ' + total + ' €';
        $table.appendChild($divTotal);
        $divTotal.appendChild($h2TotCmd);  
        $h2TotCmd.className  = 'table__total__h2'
        $divTotal.className  = 'table__total'
}

addProducts(); // lancement de la création du panier (ou rajout du bloc empty) au chargement de la page //

const $clear = document.querySelector('#ordre__clear'); // bouton pour vider le panier si erreur de commande //
    $clear.addEventListener("click", function(){
    localStorage.clear();
    alert("Votre panier est maintenant vide !")
    document.location.href = 'panier.html'
});

// création du formulaire de renseignement avec nom, prénom, adresse, ville et email //
let formValid = document.getElementById('ordre__validation');
let nom = document.getElementById('nom');
let prenom = document.getElementById('prenom');
let email = document.getElementById('mail');
let ville = document.getElementById('ville');
let address = document.getElementById('address');
let missNom = document.getElementById('missNom');
let missPrenom = document.getElementById('missPrenom');
let missEmail = document.getElementById('missEmail');
let missVille = document.getElementById('missVille');
let missAddress = document.getElementById('missAddress');
let nomValid = /^[a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?$/; // création de regex pour vérifier la pertinence des données saisie //
let prenomValid = /^[a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?$/;
let emailValid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
let villeValid = /^[a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?$/;
let addressValid = /^\d+\s[A-z]+\s[A-z]+/;
            
formValid.addEventListener('click', validation); // validation si l'ensemble des données du formulaires sont ok //
            
function validation(event){
    //Si le champ nom est vide//
    if (nom.validity.valueMissing){
        missNom.textContent = 'Nom manquant';
        missNom.style.color = 'red';
    //Si le format de données est incorrect//
    }else if (nomValid.test(nom.value) == false){
        missNom.textContent = 'Format incorrect';
        missNom.style.color = 'orange'; 
    }else{
        missNom.innerHTML = `<i class="far fa-thumbs-up"></i>`;
            
    }
    //Si le champ prenom est vide//
    if (prenom.validity.valueMissing){
        missPrenom.textContent = 'Prénom manquant';
        missPrenom.style.color = 'red'; 
    //Si le format de données est incorrect//
    }else if (prenomValid.test(prenom.value) == false){
        missPrenom.textContent = 'Format incorrect';
        missPrenom.style.color = 'orange';  
    }else{
        missPrenom.innerHTML = `<i class="far fa-thumbs-up"></i>`
        
    }
    //Si le champ email est vide//
    if (email.validity.valueMissing){  
        missEmail.textContent = 'e-mail manquant';
        missEmail.style.color = 'red';   
    //Si le format de données est incorrect//
    }else if (emailValid.test(email.value) == false){
        missEmail.textContent = 'Format incorrect';
        missEmail.style.color = 'orange';  
    }else{
        missEmail.innerHTML = `<i class="far fa-thumbs-up"></i>`
        
    }
    //Si le champ ville est vide//
      if (ville.validity.valueMissing){
        missVille.textContent = 'Commune manquante';
        missVille.style.color = 'red';
    //Si le format de données est incorrect//
    }else if (villeValid.test(ville.value) == false){  
        missVille.textContent = 'Format incorrect';
        missVille.style.color = 'orange';   
    }else{
        missVille.innerHTML = `<i class="far fa-thumbs-up"></i>`
        
    }
    //Si le champ address est vide//
    if (address.validity.valueMissing){
        missAddress.textContent = 'Adresse manquante';
        missAddress.style.color = 'red';        
    //Si le format de données est incorrect//
    }else if (addressValid.test(address.value) == false){
        missAddress.textContent = 'Format incorrect';
        missAddress.style.color = 'orange';  
    }else{
        missAddress.innerHTML = `<i class="far fa-thumbs-up"></i>`
        
    } // si formulaire ok -> création de l'objet à envoyer au serveur pour création de la commande //
    if (nomValid.test(nom.value) == true && addressValid.test(address.value) == true && villeValid.test(ville.value) == true && emailValid.test(email.value) == true && prenomValid.test(prenom.value) == true) {
        contact.firstName = nom.value
        contact.lastName = prenom.value
        contact.email = email.value
        contact.city = ville.value
        contact.address = address.value

        let objAEnvoyer = {
            contact: contact,
            products: productId,   
        };
       /* ENVOI SERVEUR */
        fetch("http://localhost:3000/api/teddies/order", {
            method: 'POST',            
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(objAEnvoyer) /* conversion en JSON des données requis par le serveur */
          }).then(response => {
                console.log(response);
                response.json().then(function(json) {
                console.log(json);
                let orderId = json.orderId;
                console.log(orderId)
                document.location.href = 'validation.html?id=' + orderId;  
            });
          }).catch(error => { /* enregistrement si erreur lors de l'envoi de données */
                console.log(error);
          })   
    }
}
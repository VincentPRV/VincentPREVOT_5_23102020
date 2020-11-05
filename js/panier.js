const $wrapper = document.querySelector('#main_wrapper');
const $table = document.querySelector('.table');
const arrayTot = [];



const fetchTeddies = async () => {
    let teddies = await fetch('http://localhost:3000/api/teddies')
     .then(res => res.json()); 
    for(let i = 0; i < teddies.length; i++) {   
         const teddy = teddies[i];  
    }
 };

 fetchTeddies();

const addProducts = () => {
        let products = JSON.parse(localStorage.getItem('products'));
        for(let i = 0; i < products.length; i++) {   // création d'une boucle équivalente aux nombres de produit //
            const product = products[i];
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


            const $tableTd3 = document.createElement('td');
            const $btnClear = document.createElement('div');
            const $btnProduct = document.createElement('div');
            $tableTr.appendChild($tableTd3);
            $tableTd3.appendChild($btnClear);
            $tableTd3.appendChild($btnProduct);
            $btnClear.innerHTML = `<i class="far fa-times-circle"></i>`
            $btnProduct.innerHTML = `<i class="fas fa-info-circle"></i>`
            $tableTd3.className  = 'table__td__buttons'
            $btnClear.className  = 'table__td__btnClear'
            $btnProduct.className  = 'table__td__btnProduct'
            $btnProduct.addEventListener("click", function(){
                document.location.href = 'produit.html?id=' + product.productId;
            });      
    }    
}
addProducts();

const $clear = document.querySelector('#ordre__clear');
    $clear.addEventListener("click", function(){
    localStorage.clear();
    alert("Votre pannier est maintenant vide !")
    document.location.href = 'panier.html'
});


let formValid = document.getElementById('ordre__validation');
let nom = document.getElementById('nom');
let prenom = document.getElementById('prenom');
let email = document.getElementById('mail');
let ville = document.getElementById('ville');
let cp = document.getElementById('cp');
let missNom = document.getElementById('missNom');
let missPrenom = document.getElementById('missPrenom');
let missEmail = document.getElementById('missEmail');
let missVille = document.getElementById('missVille');
let missCp = document.getElementById('missCp');
let nomValid = /^[a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?$/;
let prenomValid = /^[a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?$/;
let emailValid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
let villeValid = /^[a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?$/;
let cpValid = /^(([0-8][0-9])|(9[0-5]))[0-9]{3}$/;
            
formValid.addEventListener('click', validation);
            
function validation(event){
    //Si le champ nom est vide
    if (nom.validity.valueMissing){
        event.preventDefault();
        missNom.textContent = 'Nom manquant';
        missNom.style.color = 'red';
    //Si le format de données est incorrect
    }else if (nomValid.test(nom.value) == false){
        event.preventDefault();
        missNom.textContent = 'Format incorrect';
        missNom.style.color = 'orange';
    }else{
        missNom.innerHTML = `<i class="far fa-thumbs-up"></i>`
    }
    //Si le champ prenom est vide
    if (prenom.validity.valueMissing){
        event.preventDefault();
        missPrenom.textContent = 'Prénom manquant';
        missPrenom.style.color = 'red';
    //Si le format de données est incorrect
    }else if (prenomValid.test(prenom.value) == false){
        event.preventDefault();
        missPrenom.textContent = 'Format incorrect';
        missPrenom.style.color = 'orange';
    }else{
        missPrenom.innerHTML = `<i class="far fa-thumbs-up"></i>`
    }

    //Si le champ email est vide
    if (email.validity.valueMissing){
        event.preventDefault();
        missEmail.textContent = 'e-mail manquant';
        missEmail.style.color = 'red';
    //Si le format de données est incorrect
    }else if (emailValid.test(email.value) == false){
        event.preventDefault();
        missEmail.textContent = 'Format incorrect';
        missEmail.style.color = 'orange';
    }else{
        missEmail.innerHTML = `<i class="far fa-thumbs-up"></i>`
    }
    //Si le champ ville est vide
      if (ville.validity.valueMissing){
        event.preventDefault();
        missVille.textContent = 'Commune manquante';
        missVille.style.color = 'red';
    //Si le format de données est incorrect
    }else if (villeValid.test(ville.value) == false){
        event.preventDefault();
        missVille.textContent = 'Format incorrect';
        missVille.style.color = 'orange';
    }else{
        missVille.innerHTML = `<i class="far fa-thumbs-up"></i>`
    }
    //Si le champ cp est vide
    if (cp.validity.valueMissing){
        event.preventDefault();
        missCp.textContent = 'Code postal manquant';
        missCp.style.color = 'red';
    //Si le format de données est incorrect
    }else if (cpValid.test(cp.value) == false){
        event.preventDefault();
        missCp.textContent = 'Format incorrect';
        missCp.style.color = 'orange';
    }else{
        missCp.innerHTML = `<i class="far fa-thumbs-up"></i>`
    }
    
    event.preventDefault()
    let data = [FormData, products];
    console.log(data)
    
        let response = fetch('http://localhost:3000/api/teddies')
   
}
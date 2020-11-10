const urlPage = window.location.href;
const productDetail = document.querySelector('.produit__detail');

let id; // récupération de l'ID de la commande par l'URL //

const params = new URLSearchParams(urlPage);

for (let param of params){
   id = param[1];
}

const createMessage = () => {
    const $message = document.querySelector('.validation__message'); // création d'un message de remerciement et confirmation de la commande //
    const $messageH2 = document.createElement('h2');
    const $messageParagraph = document.createElement('p');
    $messageH2.innerText = 'Merci pour votre commande !';
    $messageParagraph.innerText = 'Numéro de commande : ' + id; // affichage du numéro de commande pour le client //
    $message.appendChild($messageH2)
    $message.appendChild($messageParagraph)
}

createMessage(); // lancement au chargement de la page de la création du message //
const urlPage = window.location.href;
const productDetail = document.querySelector('.produit__detail');


let id;

const params = new URLSearchParams(urlPage);


for (let param of params){
   id = param[1];
}


const createMessage = () => {
    const $message = document.querySelector('.validation__message');
    const $messageH2 = document.createElement('h2');
    const $messageParagraph = document.createElement('p');
    $messageH2.innerText = 'Merci pour votre commande !';
    $messageParagraph.innerText = 'Numéro de commande : ' + id;
    $message.appendChild($messageH2)
    $message.appendChild($messageParagraph)
}


createMessage();

/* API REQUEST  */
const fetchTeddies = async () => {      // récupération des données serveur pour les teddies //
   let teddies = await fetch('http://localhost:3000/api/teddies')
    .then(res => res.json());

    for(let i = 0; i < teddies.length; i++) {   // création d'une boucle équivalente aux nombres de produit //
        const teddy = teddies[i];
        createTeddies(teddy)
    }
};
//  méthode de création des fiches produit teddy //
const createTeddies = (teddy) => {   
    //  création du header avec nom et prix de chaque fiche produit créé par la boucle //        
    const $product = document.createElement('div'); 
    const $header = document.createElement('div');
    const $productDetail = document.querySelector('.product__detail');
    const $h3 = document.createElement('h3');
    const $price = document.createElement('p');
    $product.appendChild($header);
    $header.appendChild($h3);
    $productDetail.appendChild($product);
    $header.appendChild($price);
    $price.innerText = teddy.price / 100 + '€';
    $h3.innerText = teddy.name;
    $header.className  = 'product__header'
    $product.className  = 'product'
    $h3.className  = 'product__header__name'
    $price.className  = 'product__header__price'
    //  création du bloc avec image et description de chaque fiche produit créé par la boucle //
    const $content = document.createElement('div');
    const $image = document.createElement('img');
    const $description = document.createElement('p');
    $content.appendChild($image);
    $product.appendChild($content);
    $content.appendChild($description);
    $image.src = teddy.imageUrl;
    $description.innerText = teddy.description;
    $content.className  = 'product__content'
    $image.className  = 'product__content__image'
    $description.className  = 'product__content__description'
 //  création du bloc avec le bouton commande de chaque fiche produit créé par la boucle //
    const $footer = document.createElement('div');
    const $btn = document.createElement('button');
    $product.appendChild($footer);
    $footer.appendChild($btn);
    $btn.innerText = 'Commandez-moi !';
    $footer.className = 'product__footer'
    $btn.className = 'product__footer__btn'
    $btn.addEventListener("click", function(){
        document.location.href = 'produit.html?id=' + teddy._id;
    });
}
// appel de la fonction au chargement de la page //
fetchTeddies(); 
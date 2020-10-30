const productDetail = document.querySelector('.product__detail');
const button = document.querySelector('.product__footer__btn');

/* API REQUEST  */

const fetchTeddies = async () => {      // récupération des données serveur pour les teddies //
   let teddies = await fetch('http://localhost:3000/api/teddies')
    .then(res => res.json());
    console.log(teddies);

    for(let i = 0; i < teddies.length; i++) {   // création d'une boucle équivalente aux nombres de produit //
        const teddy = teddies[i];
        createTeddies(teddy)
    }
};


const createTeddies = (teddy) => {   //  méthode de création des fiches produit teddy //
             
    const $product = document.createElement('div'); 
    const $header = document.createElement('div');
    const $h3 = document.createElement('h3');
    $h3.innerText = teddy.name;
    $product.appendChild($header);
    $header.appendChild($h3);
    $header.className  = 'product__header'
    $product.className  = 'product'
    $h3.className  = 'product__header__name'
    productDetail.appendChild($product);

    const $price = document.createElement('p');
    $price.innerText = teddy.price / 100 + '€';
    $header.appendChild($price);
    $price.className  = 'product__header__price'
    
    const $content = document.createElement('div');
    const $image = document.createElement('img');
    $content.className  = 'product__content'
    $image.className  = 'product__content__image'
    $image.src = teddy.imageUrl;
    $content.appendChild($image);
    $product.appendChild($content);
 
    const $description = document.createElement('p');
    $description.innerText = teddy.description;
    $content.appendChild($description);
    $description.className  = 'product__content__description'

    const $footer = document.createElement('div');
    const $btn = document.createElement('button');
    $btn.innerText = 'Commandez-moi !';
    $product.appendChild($footer);
    $footer.appendChild($btn);
    $footer.className = 'product__footer'
    $btn.className = 'product__footer__btn'
    $btn.addEventListener("click", function(){
        document.location.href = 'produit.html?id=' + teddy._id;
    });
}

fetchTeddies();

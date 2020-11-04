const urlPage = window.location.href;
const productDetail = document.querySelector('.produit__detail');
const $cmd = document.querySelector('.produit__cmd');



const params = new URLSearchParams(urlPage);
let id;

for (let param of params){
    id = param[1];
}

console.log(id)

const fetchTeddies = async () => {      // récupération des données serveur pour les teddies //
    let teddies = await fetch('http://localhost:3000/api/teddies')
     .then(res => res.json());
     console.log(teddies);
 
     for(let i = 0; i < teddies.length; i++) {   // création d'une boucle équivalente aux nombres de produit //
         const teddy = teddies[i];
         selectTeddy(teddy)
     }
 };

 fetchTeddies();

 const selectTeddy = (teddy) => {

    if (teddy._id === id) {
        const $product = document.createElement('div'); 
        const $header = document.createElement('div');
        const $h3 = document.createElement('h3');
        $h3.innerText = teddy.name;
        $product.appendChild($header);
        $header.appendChild($h3);
        $header.className  = 'produit__header'
        $product.className  = 'produit'
        $h3.className  = 'produit__header__name'
        productDetail.appendChild($product);
    
        const $price = document.createElement('p');
        $price.innerText = teddy.price / 100 + '€';
        $header.appendChild($price);
        $price.className  = 'produit__header__price'
        
        const $content = document.createElement('div');
        const $image = document.createElement('img');
        $content.className  = 'produit__content'
        $image.className  = 'produit__content__image'
        $image.src = teddy.imageUrl;
        $content.appendChild($image);
        $product.appendChild($content);
     
        const $description = document.createElement('p');
        $description.innerText = teddy.description;
        $content.appendChild($description);
        $description.className  = 'produit__content__description'

        
        const $select = document.createElement('select');
        const $footer = document.createElement('div');
        $product.appendChild($footer);
        $footer.appendChild($select);
       
        $footer.className = 'produit__footer'
        $select.className = 'produit__footer__select'
        for (var i = 0; i < teddy.colors.length; i++) {
            var $option = document.createElement("option");
            $option.value = teddy.colors[i];
            $option.text = teddy.colors[i];
            $select.appendChild($option);
        }

        const $choice = document.createElement('select');
        const $qte = document.createElement('div');
        const $textQte = document.createElement('p');
        $cmd.appendChild($qte);
        $qte.appendChild($textQte);
        $qte.appendChild($choice);        
        $qte.className = 'produit__cmd__qte'
        $textQte.innerText = 'Quantité souhaitée : ';
        for (var i = 0; i <= 10; i++) {
            var $number = document.createElement("option");
            $number.value = i;
            $number.text = i;
            $choice.appendChild($number);
        }
        
        const $total = document.createElement('p');
        const $divTotal = document.createElement('div');
        $divTotal.className = 'produit__cmd__total';
        $divTotal.appendChild($total),
        $cmd.appendChild($divTotal);
        $total.innerText = 'total de votre commande : 0 €';
        $choice.addEventListener('change', function() {
            const $montant = $choice.value * teddy.price / 100 + " €";
            $total.innerText = 'total de votre commande : ' + $montant;
           
            
        })
        
        
        const $btn = document.createElement('button');
        const $divBtn = document.createElement('div');
        $divBtn.appendChild($btn);
        $cmd.appendChild($divBtn);
        $divBtn.className = 'produit__cmd__btn'
        $btn.innerText = 'Ajouter à mon panier';     
        $btn.addEventListener("click", function (){
            let products = [];
            if($choice.value > 0){
                 if(localStorage.getItem('products')){
                products = JSON.parse(localStorage.getItem('products'));
                
            }
            products.push({productId : id, image : teddy.imageUrl, name : teddy.name, couleur : $select.value, total : $choice.value * teddy.price / 100, quantite : $choice.value});
            localStorage.setItem('products', JSON.stringify(products));
            localStorage.getItem('products');
            document.location.href = 'panier.html';
            }  else alert("Veuillez choisir la quantité pour passer commande");
        }
        );
    }
}



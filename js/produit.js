const urlPage = window.location.href;


const params = new URLSearchParams(urlPage);
let id;

for (let param of params){
    id = param[1];
}

console.log(id)
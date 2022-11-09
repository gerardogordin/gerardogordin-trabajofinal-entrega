// 1 - Armo la estructura de datos 
// carrito = [] => [{},{},{}]
// productos = (20) [{},{},{},{},{},{}]
window.onload = () => {
  leerCarrito();
} 


let carrito = localStorage.getItem('carrito') ? JSON.parse(localStorage.getItem('carrito')) : []
let botonCarrito;

fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(res => localStorage.setItem('productos', JSON.stringify(res)))
      .catch(err => console.log(err))


const productos = JSON.parse(localStorage.getItem('productos'))

// 2 - Mostramos todos los productos que trajimos de la api (onclick en button, value = id de cada producto)

let insertarContenidoDOM = document.querySelector ('#insertarContenidoDOM')
let listaCarrito = document.querySelector('#listaCarrito')
 
function printData ( object ) {
  object.forEach((producto) => {
    insertarContenidoDOM.innerHTML += `<div  id='seccionProductos' class="my-5">  
    <div class="col-md-4">
    <div class="card mb-4">
      <img src="${producto.image}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${producto.title}</h5>
        <p class="card-text">$${producto.price}</p>
      </div>
      <button value='${producto.id}' onClick="handleCart(value)" class="btn btn-info agregar-carrito">Agregar al carrito</button>
    </div></div>`
  });
}

printData( JSON.parse(localStorage.getItem('productos')) )

// 3 - Armo la función de agregar al carrito 

function handleCart(e) {
  // e = id del producto que clickeaste
  const producto = productos.find((producto) => producto.id == e) // aca busco el producto cuyo id sea igual al que clickee
  if (!carrito.includes(producto)) {
    carrito.push(producto)
    localStorage.setItem('carrito', JSON.stringify(carrito)) // actualizo el carrito en el localstorage
  } else {
    alert('este producto ya está en tu carrito')
  }
}


let botonVerItems = document.getElementById('VerItems').addEventListener('click', leerCarrito());

function leerCarrito() {
  let tablaView = document.getElementById('tablaCarrito');
  const carrito = JSON.parse(localStorage.getItem('carrito'));
  console.log(carrito);
  let tabla = '';
  tabla += `
  <div >
  <table class="table table table-striped">
    <tr class="table-light">
      <th scope="col">Imagen</th>
      <th scope="col">Titulo</th>
      <th scope="col">Precio</th>
      <th scope="col">Eliminar</th>
    </tr>
    <tbody>
    `;

    if(carrito.length != 0){
      carrito.forEach(item => {

        tabla += `
          <tr>
            <td scope="row"><img class="img-fluid col-2" src="${item.image}"/></td>
            <td>${item.title}</td>
            <td>${item.price}</td>
            <td><Button onclick="eliminarItem(${item.id})">Eliminar</Button></td>
          </tr>
        `
      });
    }else{
      tabla += ` <tr><div class="text-center">No hay elementos en el carrito</div> </tr>`
    }
  
  tabla += `
    </tbody>
  </table>
</div>
`
  
  tablaView.innerHTML = tabla;

}


function eliminarItem(itemId){
  let itemscarrito = JSON.parse(localStorage.getItem('carrito'));
  const resultado = itemscarrito.filter(item => item.id != itemId);
  localStorage.setItem('carrito', JSON.stringify(resultado))
  leerCarrito();
  console.log(resultado);
}




let buttonCard = document.querySelector('#insertarContenidoDOM .card a')
console.log('salida de a', buttonCard)
buttonCard.forEach((element)=>{
  element.addEventListener = ('Click',(event)=>{
    event.preventDefault();
    console.log(event.target.id)
  })
}
)

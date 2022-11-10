const menor = document.getElementById('menoridad')
const mayor = document.getElementById('flexRadioDefault1')
let mayoriaEdad;
let minoriaEdad;

mayor.onchange = () => mayoriaEdad = mayor.value
menor.onchange = () => mayoriaEdad = menor.value

console.log(menor, mayor)

function contacto () {

let consultas = [] // 1
console.log(mayoriaEdad)


const preguntas = localStorage.getItem('consultas') // 2 

if (preguntas) {   // 3
const consultasPrevias = JSON.parse(preguntas)
consultasPrevias.map((e) => consultas.push(e))
}

// 4

const nombre = document.getElementById('nombre').value
const celular = document.getElementById('celular').value
const mail = document.getElementById('mail').value
const consulta = document.getElementById('consulta').value

console.log(mayor, menor)

// 5 

const nuevaConsulta = {
nombre: nombre,
celular: celular,
mail: mail, 
consulta: consulta
}

//  6

if (nuevaConsulta.mail === '' || nuevaConsulta.consulta === '') {
  Swal.fire({
    icon: 'error',
    text: 'Debes completar todos los Campos',
  })} else if (mayoriaEdad === 'menor') {
Swal.fire({
  icon: 'error',
  text: 'Debes ser mayor de edad',
})
} 
else {
consultas.push(nuevaConsulta) // 7
localStorage.setItem('consultas', JSON.stringify(consultas))  // 8
Swal.fire({
  position: 'center',
  icon: 'success',
  title: `Consulta enviada. Nos pondremos en contacto. Tu consulta es la N° ${consultas.length}`,
  showConfirmButton: false,
  timer: 2000,


})

}

}

const consultas = JSON.parse(localStorage.getItem('consultas'))

let app = document.querySelector('#app');

 app.innerHTML = '<h2>Consultas: </h2>' + '</br>' + '<ul>' + consultas.reverse().map(function (consulta) {
return (
  '<li>' + 'nombre: ' +  consulta.nombre + '</br>' + 'celular: ' + consulta.celular + '</br>' + 'mail: ' + consulta.mail + '</br>' + 'consulta: ' + consulta.consulta + '</li>');
}).join('') + '</ul>';

app.style.overflow = 'scroll'
app.style.height = '200px'
app.style.border = '1px solid black'

let boton = document.querySelector('#botonEnviar')
boton.onclick = () => contacto()

  let cambioColor = document.querySelector ('#botonEnviar')
cambioColor.addEventListener('mouseover', function (e) {
 cambioColor.style.background = 'red' 
})

cambioColor.addEventListener('mouseout', function (e) {
  cambioColor.style.background = 'blue'} )

  
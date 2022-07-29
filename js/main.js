let carrito = [];
let productos = [];

if (JSON.parse(localStorage.getItem("carrito"))) {
  carrito = JSON.parse(localStorage.getItem("carrito"));
} else {
  localStorage.setItem("carrito", JSON.stringify([]));
  carrito = JSON.parse(localStorage.getItem("carrito"));
}

fetch('../json/local.json')
  .then(response => response.json())
  .then(data => {
    productos = data;
    desplegarProductos();
    const btnAgregar = document.getElementsByClassName("btnAgregar");

    for (let i = 0; i < btnAgregar.length; i++) {
      const element = btnAgregar[i];
      element.addEventListener("click", agregarAlCarrito);
    }
  })
  .catch(error => console.error(error))

function desplegarProductos() {
  
  for (let i = 0; i < productos.length; i++) {
    const element = productos[i];
    const { id, nombre, precio, img } = element;
    const card = `
        <div class='card'>
            <p>${nombre}</p>
            <div>
                <img class='imgProducto' src=${img} alt=''/>
            </div>
            <div>
                <p>$${precio.toLocaleString()}</p>
            </div>
            <div class="btn-container">
                <button id=${id} class='btnAgregar'>AGREGAR AL CARRITO</button>
                
            </div>
        </div>
        `;
    const container = document.getElementById("container");
    container.innerHTML += card;
  }
}



function agregarAlCarrito(e) {
  
  const btn = e.target;
  const idBoton = btn.getAttribute("id");
  const prodEncontrado = productos.find((prod) => prod.id == idBoton);
  const enCarrito = carrito.find((prod) => prod.id == prodEncontrado.id);
  if (!enCarrito) {
    carrito.push({ ...prodEncontrado, cantidad: 1 });
  } else {
    let carritoFiltrado = carrito.filter((prod) => prod.id != enCarrito.id);
    carrito = [
      ...carritoFiltrado,
      { ...enCarrito, cantidad: enCarrito.cantidad + 1 },
    ];
  }
  console.log(carrito);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarCarrito();
}

function actualizarCarrito() {
  const contador = document.getElementById("cartCounter");
  contador.innerHTML = carrito.length;
}

actualizarCarrito();

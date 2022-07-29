let carrito;
if (JSON.parse(localStorage.getItem("carrito"))) {
  carrito = JSON.parse(localStorage.getItem("carrito"));
} else {
  localStorage.setItem("carrito", JSON.stringify([]));
  carrito = JSON.parse(localStorage.getItem("carrito"));
}

function eliminar(id) {
  {
    let texto
    texto='Eliminaste un producto'

   Swal.fire({  title: texto
})
}

  const item = document.getElementById(id);
  item.remove();
  carrito = carrito.filter((prod) => prod.id != id);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  refrescarProductos(carrito);
}

const totalCarrito = () => {
  return carrito.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0);
};

function realizarCompra() 
         {
          Swal.fire({
            title: '¡Gracias por tu compra!',
            text: 'En instantes nos estaremos comunicando con vos.',
            imageUrl: '../assets/vendedor.png',
            imageWidth: 300,
            imageHeight: 300,
            imageAlt: 'Custom image',
          })
}

function BorrarCompra() {
  {
    {   

      Swal.fire({
        title: 'Vaciaste el carrito',
        text: '¡Tu carrito ya está vacío!',
        imageUrl: '../assets/caja.png',
        imageWidth: 300,
        imageHeight: 300,
        imageAlt: 'Custom image',
                  })

}
}
  carrito = [];
  localStorage.setItem("carrito", JSON.stringify(carrito));
  refrescarProductos(carrito);
}

function refrescarProductos(nuevoCarrito) {
  const body = document.getElementById("carrito");
  if (nuevoCarrito.length == 0) {
    const texto = `
    <div class='cartContainer'>
    <h1 class='txtCarrito'>No hay productos en el carrito</h1>
    <a class='btnVolver' href='../html/productos.html'>
    <button>VOLVER</button>
    </a>
    </div>`;
    body.innerHTML = texto;
    const EfectuarCompra = document.getElementById("botones");
    EfectuarCompra.remove();
  } else {
    const titulo = `
    <div class='cartContainer'>
    
        <h1 class='txtCarrito'>C A R R I T O</h1>
    </div>`;
    body.innerHTML = titulo;
    const table = `
    <div class='tableContainer'>
        <table>
            <thead>
                <tr>
                    <th></th>
                    <th class='txtTabla'>Productos</th>
                    <th class='txtTabla'>Unidades</th>
                    <th class='txtTabla'>Precio</th>
                </tr>
            </thead>
            <tbody id='tbody'>
            </tbody>
            <tfoot>
                <tr>
                    <th></th>
                    <th></th>
                    <th class='txtTotal'>Total:</th>
                    <th id='total'>$${totalCarrito().toLocaleString()}</th>
                </tr>
            </tfoot>
        </table>
        </div>
       `;

    body.innerHTML += table;
    const tbody = document.getElementById("tbody");
    tbody.innerHTML = "";
    for (let i = 0; i < nuevoCarrito.length; i++) {
      const element = nuevoCarrito[i];
      const { id, nombre, img, precio, cantidad } = element;
      const cart = `
              <tr id=${id}>
              <th class ="borrarArticulo" onClick='eliminar(${id})'><img class='trash' src='../assets/eliminar.png' alt='foto borrar'></th>
              <th class='detallesTabla'> <img class='imgProdCart'  src=${img} alt='foto producto'><span class='nombreProd'>${nombre}</span></th>
                  <th>${cantidad}</th>
                  <th>$${(cantidad * precio).toLocaleString()}</th>
              </tr>`;
      tbody.innerHTML += cart;
    }
  }
}
const EfectuarCompra = document.getElementById("botones");
const Confir = document.createElement("button");
const Content = `
                                        <button  type=button class=divBotones >
                                            Confirmar Compra
                                        </button>
                                     `;
Confir.innerHTML = Content;

Confir.addEventListener("click", () => {
  realizarCompra();
});

EfectuarCompra.appendChild(Confir);

const vaciarCarrito = document.createElement("button");
const Content2 = `
                                        <button  type=button  class=divBotones >
                                            Vaciar Carrito
                                        </button>
                                     `;
vaciarCarrito.innerHTML = Content2;

vaciarCarrito.addEventListener("click", () => {
  BorrarCompra();
});

EfectuarCompra.appendChild(vaciarCarrito);

refrescarProductos(carrito);

// Menu lateral
const openMenu = document.getElementById("menuIcon");
const closeMenu = document.getElementById("closeMenu");
const menu = document.getElementById("menuSide");

openMenu.addEventListener("click", () => {
    menu.classList.toggle("open");
});

closeMenu.addEventListener("click", () => {
    menu.classList.toggle("open");
});






// Carrito
const openCart = document.getElementById("cartMenu");

const closeCart = document.getElementById("closeCart");
const cart = document.getElementById("cart");

const counter = document.getElementById("contador");








// Ocultar contador inicialmente
counter.classList.add('hidden');

openCart.addEventListener("click", () => {
    cart.classList.toggle("show");
});

closeCart.addEventListener("click", () => {
    cart.classList.toggle("show");
});









//carrito mejorado
let carrito = [];
const contador = document.getElementById("contador");


function actualizarCarrito() {
    const listaCarrito = document.getElementById("cartList");
    listaCarrito.innerHTML = '';
    
    carrito.forEach(producto => {
        const li = document.createElement('li');
        li.className = 'cart__item';
        li.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <div class="item-info">
                <span>${producto.nombre}</span>
                <div class="cantidad-controles">
                    <button class="decrementar">-</button>
                    <span class="cantidad">${producto.cantidad}</span>
                    <button class="incrementar">+</button>
                </div>
                <span>${producto.precio} c/u</span>
            </div>
            <button class="remove"><img src="img/trash.svg" alt="Eliminar"  ></button>`;

        li.querySelector('.incrementar').addEventListener('click', () => modificarCantidad(producto.id, 1));
        li.querySelector('.decrementar').addEventListener('click', () => modificarCantidad(producto.id, -1));
        li.querySelector('.remove').addEventListener('click', () => eliminarProducto(producto.id));

        listaCarrito.appendChild(li);
    });

   


    const totalItems = carrito.reduce((total, producto) => total + producto.cantidad, 0);
    contador.textContent = totalItems;
    contador.classList.toggle('hidden', totalItems === 0);
}

// cantidades
function modificarCantidad(id, cambio) {
    const producto = carrito.find(item => item.id === id);
    
    if (producto) {
        producto.cantidad += cambio;
        
        if (producto.cantidad < 1) {
            carrito = carrito.filter(item => item.id !== id);
        }
        
        actualizarCarrito();
    }
}

// eliminar producto
function eliminarProducto(id) {
    carrito = carrito.filter(item => item.id !== id);
    actualizarCarrito();
}

// agregar producto
document.querySelectorAll('.addCart').forEach(button => {
    button.addEventListener('click', () => {
        const product = button.closest('.product');
        const productId = product.dataset.id;
        const productoExistente = carrito.find(item => item.id === productId);

        if (productoExistente) {
            productoExistente.cantidad += 1;
        } else {
            carrito.push({
                id: productId,
                nombre: product.dataset.name || product.querySelector('.product__title').textContent,
                precio: product.querySelector('.product__price').textContent,
                imagen: product.querySelector('img').src,
                cantidad: 1
            });
        }

        actualizarCarrito();
    });
});







// Efecto parallax
window.onscroll = function() {
    const posicion = window.pageYOffset || document.documentElement.scrollTop;
    const tennis1 = document.getElementById("tenns1Paralax");
    
    const tennis2 = document.getElementById("tenns2Paralax");


    tennis1.style.bottom = posicion * 0.1 + "px";

    tennis2.style.top = posicion * 0.1 + "px";
};
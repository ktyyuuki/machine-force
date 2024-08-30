const productos = [];

class Producto {
    constructor(objeto) {
        this.id = this.generarId();
        this.nombre = objeto.nombre;
        this.categoria = objeto.categoria;
        this.menuId = objeto.menuId;
        this.rutaImgs = objeto.rutaImgs;
        this.imgppal = objeto.imgppal;
        this.imgs = objeto.imgs;
        this.descripcion = objeto.descripcion;
        this.precio = objeto.precio;
        productos.push(this);
    }
    generarId(){
        return productos.length + 1;
    }
}

// Leer JSON
async function consumirJSON() {
    if(productos.length === 0){
        const response = await fetch("./json/productos.json");
        const data = await response.json(); // Array de los productos
        data.forEach(item => {
            new Producto(item);
        });
        return productos;
    }
}
// console.log(consumirJSON());

// Cargar productos
async function renderProductos(){
    await consumirJSON();
    let contProductos = document.getElementById("productos");
    contProductos.innerHTML = "";

    // Separador
    let separadorHTML = `<div class="separador">
        <img src="./img/icono.png" class="img-fluid" width="70" alt="separador icono">
    </div>`;

    // Template Productos
    const templateHTML = (item) => {
        let template = `<section class="my-5" id="${item.menuId}">
        <p class="top-titulo text-center mb-1">${item.categoria}</p>
        <h2 class="titulo text-center text-uppercase">${item.nombre}</h2>
        <div class="row producto mt-5 gx-lg-5">
            <div class="col-md-6 col-lg-5 ${item.id % 2 == 0 ? "order-last" : ""}">
                <ul id="lightgallery${item.id}" class="lightgallery list-unstyled row mx-auto">
                    <li class="col-12" data-responsive="./${item.rutaImgs}/${item.imgppal}" data-src="./${item.rutaImgs}/${item.imgppal}">
                        <a class="col-12" href="">
                            <img class="img-fluid" src="./${item.rutaImgs}/${item.imgppal}">
                        </a>
                    </li>`

                    if (item.imgs) {
                        item.imgs.forEach(img => {
                            template += `<li class="col-6 col-md-4" data-responsive="./${item.rutaImgs}/${img}" data-src="./${item.rutaImgs}/${img}">
                                <a class="col-12" href="">
                                    <img class="img-fluid" src="./${item.rutaImgs}/${img}">
                                </a>
                            </li>`
                        });
                    }
                    
                template += `</ul>
            </div>

            <div class="col-md-6 col-lg-7">
                <p class="fw-semibold text-uppercase mb-3">Descripción:</p>
                <p>${item.descripcion}</p>
                <div class="precios mt-4">
                    <p class="precio oferta">
                        Precio oferta:
                        <span>$${item.precio}</span>
                    </p>
                    <div class="vr mx-4"></div>
                    <p class="precio original">
                        Precio normal:
                        <span>$7.990.000</span>
                    </p>
                </div>
                <a href="#contacto" class="btn btn-amarillo mt-3"><i class="bi bi-envelope"></i>Cotizar producto</a>
                <hr>

                <!-- Nav tabs -->
                <ul class="nav nav-pills" id="producto${item.id}" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button class="nav-link active" id="ficha-tab${item.id}" data-bs-toggle="tab" data-bs-target="#ficha${item.id}" type="button" role="tab" aria-controls="ficha${item.id}" aria-selected="true">Información técnica</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="info-tab${item.id}" data-bs-toggle="tab" data-bs-target="#info${item.id}" type="button" role="tab" aria-controls="info${item.id}" aria-selected="false">Información adicional</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="videos-tab${item.id}" data-bs-toggle="tab" data-bs-target="#videos${item.id}" type="button" role="tab" aria-controls="videos${item.id}" aria-selected="false">Videos</button>
                    </li>
                </ul>
  
                <!-- Tab panes -->
                <div class="tab-content">
                    <!-- Ficha -->
                    <div class="tab-pane active" id="ficha${item.id}" role="tabpanel" aria-labelledby="ficha-tab${item.id}" tabindex="0">
                        <div class="bg-light rounded-3 p-2 mt-2">
                            <div class="accordion accordion-flush" id="datosTecnicos${item.id}">
                                <div class="accordion-item">
                                    <div class="accordion-header">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#fichaTecnica${item.id}" aria-expanded="true" aria-controls="fichaTecnica${item.id}">
                                            Ficha técnica
                                        </button>
                                    </div>
                                    <div id="fichaTecnica${item.id}" class="accordion-collapse collapse show" data-bs-parent="#datosTecnicos${item.id}">
                                        <div class="accordion-body">
                                            <table class="table table-striped mb-0">
                                                <tbody>
                                                    <tr>
                                                        <th>Nombre</th>
                                                        <td>Lorem ipsum dolor sit amet.</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Modelo</th>
                                                        <td>XX-XXX</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <div class="accordion-header">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#caracteristicas${item.id}" aria-expanded="false" aria-controls="caracteristicas${item.id}">
                                            Características
                                        </button>
                                    </div>
                                    <div id="caracteristicas${item.id}" class="accordion-collapse collapse" data-bs-parent="#datosTecnicos${item.id}">
                                        <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the second item's accordion body. Let's imagine this being filled with some actual content.</div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <div class="accordion-header">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#otrainfo${item.id}" aria-expanded="false" aria-controls="otrainfo${item.id}">
                                            Información
                                        </button>
                                    </div>
                                    <div id="otrainfo${item.id}" class="accordion-collapse collapse" data-bs-parent="#datosTecnicos${item.id}">
                                        <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the third item's accordion body. Nothing more exciting happening here in terms of content, but just filling up the space to make it look, at least at first glance, a bit more representative of how this would look in a real-world application.</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Info -->
                    <div class="tab-pane" id="info${item.id}" role="tabpanel" aria-labelledby="info-tab${item.id}" tabindex="0">

                    </div>
                    <!-- Videos -->
                    <div class="tab-pane" id="videos${item.id}" role="tabpanel" aria-labelledby="videos-tab${item.id}" tabindex="0">

                    </div>
                </div>
            </div>
        </div>
        </section>`
        return template;
    } 

    // Mostrar productos
    let productoHTML = "";
    productos.forEach(producto => {
        productoHTML += separadorHTML + templateHTML(producto);
    });
    contProductos.innerHTML = productoHTML;

    // Inicializar lightGallery para cada producto
    productos.forEach(producto => {
        lightGallery(document.getElementById(`lightgallery${producto.id}`), {
            showCloseIcon: true,
            plugins: [lgZoom, lgFullscreen, lgShare],
            download: false,
            mobileSettings: {
                showCloseIcon: true,
            },
        });
    });
}

renderProductos();













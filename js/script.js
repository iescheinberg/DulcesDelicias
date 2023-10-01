document.addEventListener('DOMContentLoaded', function(){
    const productListContainer = document.getElementById('product-list');
    const productDetailContainer = document.getElementById('product-detail');

    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(product =>{
                const productElement = document.createElement('div');
                productElement.classList.add('product');
                productElement.innerHTML = `
                    <div class="product-card">
                    <img src="${product.imagen}" alt="${product.nombre}">
                    <h2 class="product-title">${product.nombre}</h2>
                    <p>${product.descripcion}</p>
                    <button class="detail-button" data-id="${product.id}">Ver detalle</button>
                    </div>
                    
                    `;
                productListContainer.appendChild(productElement);
            });

            const detailButtons = document.querySelectorAll('.detail-button');
            detailButtons.forEach(button =>{
                button.addEventListener('click', function(){
                    const productId = this.dataset.id;
                    const selectedProduct = data.find(product => product.id == productId);

                    productDetailContainer.innerHTML = `
                    <h2>${selectedProduct.nombre}</h2>
                    <p>${selectedProduct.detalle}</p>
                    <img src="${selectedProduct.imagen}" alt="${selectedProduct.nombre}">
                    <p>Precio: $${selectedProduct.precio}</p>
                    <button id="back-button">Volver</button>
                    `;

                    productListContainer.style.display = 'none';
                    productDetailContainer.style.display = 'block';

                    const backButton = document.getElementById('back-button');
                    backButton.addEventListener('click', function(){
                        productDetailContainer.style.display = 'none';
                        productListContainer.style.display = 'block'
                    })
                })
            })
        })
})
document.addEventListener('DOMContentLoaded', () => {
    console.log('Simulador de Rentabilidad cargado');

    const registrationForm = document.getElementById('registration-form');
    const dataEntryForm = document.getElementById('data-entry-form');
    const welcomeSection = document.getElementById('welcome');
    const dataEntrySection = document.getElementById('data-entry');
    const productList = document.getElementById('product-list');
    const fixedCostsList = document.getElementById('fixed-costs-list');
    const toProductsButton = document.getElementById('to-products');
    const toFixedCostsButton = document.getElementById('to-fixed-costs');
    const toResultsButton = document.getElementById('to-results');

    // Mostrar tabla resumen de productos
    function actualizarResumenProductos(productos) {
        const resumenContainer = document.getElementById('product-summary-container');
        const resumenTabla = document.querySelector('#product-summary tbody');

        // Limpiar tabla
        resumenTabla.innerHTML = '';

        // Agregar filas
        productos.forEach((producto) => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${producto.nombre}</td>
                <td>${producto.precio}</td>
                <td>${producto.costoVariable}</td>
                <td>${producto.unidades}</td>
            `;
            resumenTabla.appendChild(fila);
        });

        // Mostrar contenedor si hay productos
        resumenContainer.style.display = productos.length > 0 ? 'block' : 'none';
    }

    // Obtener productos actuales
    function obtenerProductos() {
        const productos = [];
        document.querySelectorAll('.product-item').forEach((item) => {
            const nombre = item.querySelector('.product-name').value;
            const precio = parseFloat(item.querySelector('.product-price').value);
            const unidades = parseFloat(item.querySelector('.product-units').value);
            const costoVariable = parseFloat(item.querySelector('.product-variable-cost').value);

            if (nombre && !isNaN(precio) && !isNaN(unidades) && !isNaN(costoVariable)) {
                productos.push({ nombre, precio, unidades, costoVariable });
            }
        });
        return productos;
    }

    // Obtener gastos fijos actuales
    function obtenerGastosFijos() {
        const gastosFijos = [];
        document.querySelectorAll('.fixed-cost-item').forEach((item) => {
            const nombre = item.querySelector('.fixed-cost-name').value;
            const monto = parseFloat(item.querySelector('.fixed-cost-amount').value);

            if (nombre && !isNaN(monto)) {
                gastosFijos.push({ nombre, monto });
            }
        });
        return gastosFijos;
    }

    // Mostrar sección de productos
    function mostrarSeccionProductos() {
        welcomeSection.style.display = 'none';
        dataEntrySection.style.display = 'block';
        toProductsButton.style.display = 'none';
        toFixedCostsButton.style.display = 'block';
        toResultsButton.style.display = 'none';
    }

    // Mostrar sección de gastos fijos
    function mostrarSeccionGastosFijos() {
        dataEntrySection.style.display = 'block';
        toProductsButton.style.display = 'none';
        toFixedCostsButton.style.display = 'none';
        toResultsButton.style.display = 'block';
    }

    // Mostrar sección de resultados
    function mostrarSeccionResultados() {
        dataEntrySection.style.display = 'none';
        document.getElementById('results').style.display = 'block';
        toProductsButton.style.display = 'none';
        toFixedCostsButton.style.display = 'none';
        toResultsButton.style.display = 'none';
    }

    // Corregir navegación para avanzar después de ingresar productos y gastos
    function manejarAvanceSeccion() {
        const productos = obtenerProductos();
        const gastosFijos = obtenerGastosFijos();

        if (productos.length === 0) {
            alert('Por favor, agrega al menos un producto o servicio.');
            return;
        }

        if (gastosFijos.length === 0) {
            alert('Por favor, agrega al menos un gasto fijo.');
            return;
        }

        mostrarSeccionResultados();
    }

    // Manejar el envío del formulario de registro
    registrationForm.addEventListener('submit', (event) => {
        event.preventDefault();
        console.log('Formulario de registro enviado');
        mostrarSeccionProductos();
    });

    // Manejar la tabla de productos
    const productTableBody = document.querySelector('#product-table tbody');
    const addProductButton = document.getElementById('add-product');

    addProductButton.addEventListener('click', () => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><input type="text" class="product-name" placeholder="Nombre" required></td>
            <td><input type="number" class="product-price" placeholder="Precio" required></td>
            <td><input type="number" class="product-units" placeholder="Unidades" required></td>
            <td><input type="number" class="product-variable-cost" placeholder="Costo Variable" required></td>
            <td>
                <button type="button" class="edit-product">Editar</button>
                <button type="button" class="delete-product">Eliminar</button>
            </td>
        `;

        row.querySelector('.delete-product').addEventListener('click', () => {
            row.remove();
        });

        productTableBody.appendChild(row);
    });

    // Manejar la tabla de gastos fijos
    const fixedCostsTableBody = document.querySelector('#fixed-costs-table tbody');
    const addFixedCostButton = document.getElementById('add-fixed-cost');

    addFixedCostButton.addEventListener('click', () => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><input type="text" class="fixed-cost-name" placeholder="Nombre" required></td>
            <td><input type="number" class="fixed-cost-amount" placeholder="Monto" required></td>
            <td>
                <button type="button" class="edit-fixed-cost">Editar</button>
                <button type="button" class="delete-fixed-cost">Eliminar</button>
            </td>
        `;

        row.querySelector('.delete-fixed-cost').addEventListener('click', () => {
            row.remove();
        });

        fixedCostsTableBody.appendChild(row);
    });

    // Actualizar resumen al enviar formulario
    dataEntryForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const productos = obtenerProductos();
        const gastosFijos = obtenerGastosFijos();

        actualizarResumenProductos(productos);
        console.log('Productos recopilados:', productos);
        console.log('Gastos fijos recopilados:', gastosFijos);

        // Aquí puedes realizar cálculos adicionales con los datos recopilados
    });

    // Cambiar el nombre del botón y corregir su funcionalidad
    toFixedCostsButton.textContent = 'Siguiente Paso';

    // Corregir el evento del botón "Ir a Gastos Fijos"
    toFixedCostsButton.addEventListener('click', () => {
        mostrarSeccionGastosFijos();
        console.log('Navegando a la sección de Gastos Fijos');
    });

    toResultsButton.addEventListener('click', manejarAvanceSeccion);

    // Eventos de los botones
    toProductsButton.addEventListener('click', mostrarSeccionProductos);

    // Agregar explicaciones detalladas en la pantalla de Variables Económicas
    const economicVariablesSection = document.getElementById('step4');

    if (economicVariablesSection) {
        const explanations = {
            inflation: 'La inflación anual representa el aumento general de precios en la economía. Un valor sugerido entre 2% y 5% refleja una economía estable.',
            growthRate: 'El crecimiento anual del negocio es la tasa a la que esperas que crezcan tus ventas. Un valor entre 5% y 10% es realista para negocios en expansión.',
            desiredProfit: 'La rentabilidad deseada es el porcentaje de ganancia que esperas obtener sobre tu inversión. Un valor entre 15% y 25% es ideal para la mayoría de los sectores.',
            discountRate: 'La tasa de descuento se utiliza para calcular el valor presente de los flujos futuros. Un valor entre 8% y 12% es común en análisis financieros.'
        };

        Object.keys(explanations).forEach(key => {
            const input = document.getElementById(key);
            if (input) {
                const explanation = document.createElement('p');
                explanation.className = 'text-sm text-gray-500 mt-1';
                explanation.textContent = explanations[key];
                input.parentElement.appendChild(explanation);
            }
        });
    }

    // Mejorar explicaciones en la pantalla de resultados
    const resultsSection = document.getElementById('step5');

    if (resultsSection) {
        const explanations = {
            profitMargin: 'El margen de ganancia indica qué porcentaje de tus ingresos se convierte en ganancia. Un margen superior al 20% es considerado saludable para la mayoría de los negocios.',
            roi: 'El retorno sobre inversión (ROI) mide la eficiencia de tu inversión. Un ROI superior al 25% indica que tu negocio está generando un buen retorno.',
            breakeven: 'El punto de equilibrio en unidades representa la cantidad mínima de productos o servicios que debes vender para cubrir todos tus costos. Es crucial para entender cuántas ventas necesitas para no tener pérdidas.',
            npv: 'El Valor Presente Neto (VPN) indica la viabilidad financiera de tu proyecto. Un VPN positivo significa que el proyecto generará valor en el tiempo.'
        };

        const recommendations = {
            profitMargin: 'Si tu margen de ganancia es bajo, considera reducir costos o aumentar precios estratégicamente.',
            roi: 'Si tu ROI es bajo, evalúa si tus inversiones están generando el retorno esperado y ajusta tus estrategias.',
            breakeven: 'Si tu punto de equilibrio es alto, busca formas de reducir costos fijos o aumentar la eficiencia operativa.',
            npv: 'Si el VPN es negativo, reconsidera la viabilidad del proyecto o ajusta tus proyecciones.'
        };

        const recommendationsList = document.getElementById('recommendations-list');
        if (recommendationsList) {
            Object.keys(explanations).forEach(key => {
                const li = document.createElement('li');
                li.className = 'text-sm text-gray-600';
                li.innerHTML = `<strong>${key}:</strong> ${explanations[key]} <br><em>Recomendación:</em> ${recommendations[key]}`;
                recommendationsList.appendChild(li);
            });
        }

        // Agregar Punto de Equilibrio en Unidades
        const breakevenUnitsCard = document.createElement('div');
        breakevenUnitsCard.className = 'result-card bg-white rounded-lg shadow-md p-6 border-t-4 border-blue-500';
        breakevenUnitsCard.innerHTML = `
            <h3 class="text-lg font-semibold mb-2">Punto de Equilibrio en Unidades</h3>
            <div class="flex items-end">
                <span id="breakeven-units-value" class="text-3xl font-bold">0</span>
            </div>
            <p id="breakeven-units-description" class="mt-2 text-gray-600 text-sm">Cantidad mínima de unidades que debes vender para cubrir tus costos.</p>
        `;
        resultsSection.querySelector('.grid').appendChild(breakevenUnitsCard);

        // Agregar Valor Presente Neto (VPN)
        const npvCard = document.createElement('div');
        npvCard.className = 'result-card bg-white rounded-lg shadow-md p-6 border-t-4 border-green-500';
        npvCard.innerHTML = `
            <h3 class="text-lg font-semibold mb-2">Valor Presente Neto (VPN)</h3>
            <div class="flex items-end">
                <span id="npv-value" class="text-3xl font-bold">$0</span>
            </div>
            <p id="npv-description" class="mt-2 text-gray-600 text-sm">Indica si tu proyecto generará valor en el tiempo. Un VPN positivo es una señal favorable.</p>
        `;
        resultsSection.querySelector('.grid').appendChild(npvCard);

        // Agregar información de contacto
        const contactInfo = document.createElement('div');
        contactInfo.className = 'mt-6 text-center';
        contactInfo.innerHTML = `
            <p class="text-gray-700">¿Quieres más información? Agenda una consultoría financiera con Daniel Financiero.</p>
            <p class="text-gray-700">Correo: <a href="mailto:juancardona@diciconsultores.com" class="text-blue-600">juancardona@diciconsultores.com</a></p>
            <p class="text-gray-700">WhatsApp: <a href="https://wa.me/573014829425" class="text-blue-600">+57 301 4829425</a></p>
        `;
        resultsSection.appendChild(contactInfo);
    }

    // Manejar el envío del formulario de inicio
    const userInfoForm = document.getElementById('user-info-form');

    if (userInfoForm) {
        userInfoForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Evitar el comportamiento por defecto del formulario

            // Ocultar la página de inicio y mostrar la primera sección del simulador
            document.querySelector('main').innerHTML = `
                <div class="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h2 class="text-xl font-semibold mb-4">Productos y Servicios</h2>
                    <p class="text-gray-600 mb-6">Ingresa los productos o servicios que ofreces, su precio de venta, costo y unidades vendidas mensualmente.</p>
                    <div id="products-container">
                        <!-- Product template will be added here -->
                    </div>
                    <button id="add-product" class="mt-4 flex items-center text-blue-600 hover:text-blue-800">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
                        </svg>
                        Agregar otro producto/servicio
                    </button>
                </div>
                <div class="flex justify-end">
                    <button id="next-step1" class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition duration-300 flex items-center">
                        Siguiente
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                    </button>
                </div>
            `;

            // Agregar funcionalidad al botón "Siguiente"
            document.getElementById('next-step1').addEventListener('click', () => {
                console.log('Navegando a la siguiente sección');
                // Aquí puedes agregar la lógica para avanzar a la siguiente sección
            });
        });
    }
});

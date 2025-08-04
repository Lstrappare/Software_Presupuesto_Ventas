// Mejoras adicionales para el sistema de presupuestos

// Función para guardar datos en localStorage
function guardarDatos() {
    const datos = {
        nombreProducto,
        unidadesProducto,
        precioProducto,
        totalPresupuestoVentas,
        inventarioInicial,
        inventarioFinal,
        precioII,
        totalPresupuestoProduccion,
        // Agregar más variables según sea necesario
        timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('presupuestoData', JSON.stringify(datos));
    console.log('Datos guardados exitosamente');
}

// Función para cargar datos desde localStorage
function cargarDatos() {
    const datosGuardados = localStorage.getItem('presupuestoData');
    
    if (datosGuardados) {
        try {
            const datos = JSON.parse(datosGuardados);
            
            // Restaurar variables globales
            nombreProducto = datos.nombreProducto;
            unidadesProducto = datos.unidadesProducto;
            precioProducto = datos.precioProducto;
            totalPresupuestoVentas = datos.totalPresupuestoVentas;
            inventarioInicial = datos.inventarioInicial;
            inventarioFinal = datos.inventarioFinal;
            precioII = datos.precioII;
            totalPresupuestoProduccion = datos.totalPresupuestoProduccion;
            
            // Restaurar valores en los campos del formulario
            if (datos.nombreProducto) document.getElementById('producto').value = datos.nombreProducto;
            if (datos.unidadesProducto) document.getElementById('unidades').value = datos.unidadesProducto;
            if (datos.precioProducto) document.getElementById('precio').value = datos.precioProducto;
            if (datos.inventarioInicial) document.getElementById('inventarioI').value = datos.inventarioInicial;
            if (datos.inventarioFinal) document.getElementById('inventarioF').value = datos.inventarioFinal;
            if (datos.precioII) document.getElementById('precioII').value = datos.precioII;
            
            console.log('Datos cargados exitosamente');
            return true;
        } catch (error) {
            console.error('Error al cargar datos:', error);
            return false;
        }
    }
    return false;
}

// Función para limpiar todos los datos
function limpiarDatos() {
    if (confirm('¿Está seguro de que desea limpiar todos los datos? Esta acción no se puede deshacer.')) {
        localStorage.removeItem('presupuestoData');
        location.reload();
    }
}

// Función para exportar datos a JSON
function exportarDatos() {
    const datos = {
        nombreProducto,
        unidadesProducto,
        precioProducto,
        totalPresupuestoVentas,
        inventarioInicial,
        inventarioFinal,
        precioII,
        totalPresupuestoProduccion,
        fechaExportacion: new Date().toISOString(),
        version: '1.0'
    };
    
    const dataStr = JSON.stringify(datos, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `presupuesto_${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
}

// Función para validación avanzada de formularios
function validacionAvanzada() {
    // Añadir event listeners para validación en tiempo real
    const inputs = document.querySelectorAll('input[type="number"]');
    
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            // Remover caracteres no válidos
            this.value = this.value.replace(/[^0-9.-]/g, '');
            
            // Validar números negativos donde no se permitan
            if (this.min === "0" && parseFloat(this.value) < 0) {
                this.setCustomValidity('Este campo no puede ser negativo');
            } else {
                this.setCustomValidity('');
            }
        });
        
        input.addEventListener('blur', function() {
            // Formatear el número al salir del campo
            if (this.value && !isNaN(this.value)) {
                const valor = parseFloat(this.value);
                if (this.step === "0.01") {
                    this.value = valor.toFixed(2);
                } else if (this.step === "1") {
                    this.value = Math.round(valor);
                }
            }
        });
    });
}

// Función para mostrar progreso del formulario
function mostrarProgreso() {
    const formularios = document.querySelectorAll('fieldset');
    let completados = 0;
    
    formularios.forEach(fieldset => {
        const inputs = fieldset.querySelectorAll('input[type="text"], input[type="number"]');
        let camposCompletos = 0;
        
        inputs.forEach(input => {
            if (input.value && input.value.trim() !== '') {
                camposCompletos++;
            }
        });
        
        if (inputs.length > 0 && camposCompletos === inputs.length) {
            completados++;
            fieldset.classList.add('completado');
        } else {
            fieldset.classList.remove('completado');
        }
    });
    
    const progreso = (completados / formularios.length) * 100;
    
    // Crear o actualizar barra de progreso
    let barraProgreso = document.getElementById('barra-progreso');
    if (!barraProgreso) {
        barraProgreso = document.createElement('div');
        barraProgreso.id = 'barra-progreso';
        barraProgreso.innerHTML = `
            <div class="progreso-container">
                <div class="progreso-bar">
                    <div class="progreso-fill" style="width: ${progreso}%"></div>
                </div>
                <span class="progreso-texto">${Math.round(progreso)}% completado</span>
            </div>
        `;
        document.querySelector('header').appendChild(barraProgreso);
    } else {
        barraProgreso.querySelector('.progreso-fill').style.width = `${progreso}%`;
        barraProgreso.querySelector('.progreso-texto').textContent = `${Math.round(progreso)}% completado`;
    }
}

// Función para añadir tooltips informativos
function añadirTooltips() {
    const campos = {
        'producto': 'Ingrese el nombre del producto que desea presupuestar',
        'unidades': 'Cantidad de unidades que planea vender',
        'precio': 'Precio de venta por unidad del producto',
        'inventarioI': 'Cantidad de unidades en inventario al inicio del período',
        'inventarioF': 'Cantidad de unidades que desea tener al final del período',
        'precioII': 'Costo por unidad del inventario inicial'
    };
    
    Object.keys(campos).forEach(id => {
        const elemento = document.getElementById(id);
        if (elemento) {
            elemento.setAttribute('title', campos[id]);
            elemento.setAttribute('data-tooltip', campos[id]);
        }
    });
}

// Función para crear botones de acción
function crearBotonesAccion() {
    const header = document.querySelector('header');
    const botonesContainer = document.createElement('div');
    botonesContainer.className = 'botones-accion';
    botonesContainer.innerHTML = `
        <button onclick="guardarDatos()" class="btn btn-primary" title="Guardar progreso">
            💾 Guardar
        </button>
        <button onclick="cargarDatos()" class="btn btn-primary" title="Cargar datos guardados">
            📂 Cargar
        </button>
        <button onclick="exportarDatos()" class="btn btn-primary" title="Exportar a archivo JSON">
            📤 Exportar
        </button>
        <button onclick="limpiarDatos()" class="btn btn-primary" title="Limpiar todos los datos">
            🗑️ Limpiar
        </button>
    `;
    header.appendChild(botonesContainer);
}

// Inicializar mejoras cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    validacionAvanzada();
    añadirTooltips();
    crearBotonesAccion();
    
    // Cargar datos guardados si existen
    cargarDatos();
    
    // Actualizar progreso periódicamente
    setInterval(mostrarProgreso, 1000);
    
    // Guardar automáticamente cada 30 segundos
    setInterval(guardarDatos, 30000);
});

// Guardar datos antes de cerrar la página
window.addEventListener('beforeunload', function() {
    guardarDatos();
});

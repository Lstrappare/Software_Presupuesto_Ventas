// Mejoras adicionales para el sistema de presupuestos
// Función para mostrar notificaciones
function mostrarNotificacion(mensaje, tipo = 'success') {
    // Remover notificación anterior si existe
    const notificacionAnterior = document.querySelector('.notificacion');
    if (notificacionAnterior) {
        notificacionAnterior.remove();
    }
    
    const notificacion = document.createElement('div');
    notificacion.className = `notificacion notificacion-${tipo}`;
    notificacion.innerHTML = `
        <span class="notificacion-icono">${tipo === 'success' ? '✅' : tipo === 'error' ? '❌' : '⚠️'}</span>
        <span class="notificacion-mensaje">${mensaje}</span>
        <button class="notificacion-cerrar" onclick="this.parentElement.remove()">×</button>
    `;
    
    document.body.appendChild(notificacion);
    
    // Auto-remover después de 3 segundos
    setTimeout(() => {
        if (notificacion.parentElement) {
            notificacion.remove();
        }
    }, 3000);
}

// Función para recopilar todos los datos del sistema
function recopilarDatos() {
    const datos = {
        // Información del Producto
        nombreProducto: typeof nombreProducto !== 'undefined' ? nombreProducto : null,
        unidadesProducto: typeof unidadesProducto !== 'undefined' ? unidadesProducto : null,
        precioProducto: typeof precioProducto !== 'undefined' ? precioProducto : null,
        totalPresupuestoVentas: typeof totalPresupuestoVentas !== 'undefined' ? totalPresupuestoVentas : null,
        
        // Inventarios
        inventarioInicial: typeof inventarioInicial !== 'undefined' ? inventarioInicial : null,
        inventarioFinal: typeof inventarioFinal !== 'undefined' ? inventarioFinal : null,
        precioII: typeof precioII !== 'undefined' ? precioII : null,
        
        // Presupuestos MP
        totalPresupuestoProduccion: typeof totalPresupuestoProduccion !== 'undefined' ? totalPresupuestoProduccion : null,
        totalPresupuestoMPNecesariaA: typeof totalPresupuestoMPNecesariaA !== 'undefined' ? totalPresupuestoMPNecesariaA : null,
        totalPresupuestoMPNecesariaB: typeof totalPresupuestoMPNecesariaB !== 'undefined' ? totalPresupuestoMPNecesariaB : null,
        totalPresupuestoMPNecesariaC: typeof totalPresupuestoMPNecesariaC !== 'undefined' ? totalPresupuestoMPNecesariaC : null,
        
        // Inventarios MP
        inventarioIMPA: typeof inventarioIMPA !== 'undefined' ? inventarioIMPA : null,
        inventarioIMPB: typeof inventarioIMPB !== 'undefined' ? inventarioIMPB : null,
        inventarioIMPC: typeof inventarioIMPC !== 'undefined' ? inventarioIMPC : null,
        inventarioFMPA: typeof inventarioFMPA !== 'undefined' ? inventarioFMPA : null,
        inventarioFMPB: typeof inventarioFMPB !== 'undefined' ? inventarioFMPB : null,
        inventarioFMPC: typeof inventarioFMPC !== 'undefined' ? inventarioFMPC : null,
        
        // Precios de compra MP
        pCompraMPA: typeof pCompraMPA !== 'undefined' ? pCompraMPA : null,
        pCompraMPB: typeof pCompraMPB !== 'undefined' ? pCompraMPB : null,
        pCompraMPC: typeof pCompraMPC !== 'undefined' ? pCompraMPC : null,
        
        // Compras MP
        compraUnidadA: typeof compraUnidadA !== 'undefined' ? compraUnidadA : null,
        compraUnidadB: typeof compraUnidadB !== 'undefined' ? compraUnidadB : null,
        compraUnidadC: typeof compraUnidadC !== 'undefined' ? compraUnidadC : null,
        totalCompraMPA: typeof totalCompraMPA !== 'undefined' ? totalCompraMPA : null,
        totalCompraMPB: typeof totalCompraMPB !== 'undefined' ? totalCompraMPB : null,
        totalCompraMPC: typeof totalCompraMPC !== 'undefined' ? totalCompraMPC : null,
        
        // Totales
        totalMateriaPrima: typeof totalMateriaPrima !== 'undefined' ? totalMateriaPrima : null,
        manoObraPagar: typeof manoObraPagar !== 'undefined' ? manoObraPagar : null,
        totalCargosIndirectos: typeof totalCargosIndirectos !== 'undefined' ? totalCargosIndirectos : null,
        costoUnitario: typeof costoUnitario !== 'undefined' ? costoUnitario : null,
        totalCostoVenta: typeof totalCostoVenta !== 'undefined' ? totalCostoVenta : null,
        totalGastosOperacion: typeof totalGastosOperacion !== 'undefined' ? totalGastosOperacion : null,
        
        // Valores de formulario
        formularios: {},
        
        // Metadatos
        timestamp: new Date().toISOString(),
        version: '2.0'
    };
    
    // Recopilar valores de todos los inputs
    const inputs = document.querySelectorAll('input[type="text"], input[type="number"], select');
    inputs.forEach(input => {
        if (input.id && input.value) {
            datos.formularios[input.id] = input.value;
        }
    });
    
    return datos;
}

// Función mejorada para guardar datos en localStorage
function guardarDatos() {
    try {
        const datos = recopilarDatos();
        localStorage.setItem('presupuestoData', JSON.stringify(datos));
        console.log('Datos guardados exitosamente:', datos);
        mostrarNotificacion('💾 Datos guardados correctamente', 'success');
        
        // Actualizar el indicador de último guardado
        actualizarIndicadorGuardado();
        
    } catch (error) {
        console.error('Error al guardar datos:', error);
        mostrarNotificacion('Error al guardar los datos', 'error');
    }
}

// Función para restaurar variables globales
function restaurarVariablesGlobales(datos) {
    // Restaurar variables globales solo si existen en los datos guardados
    if (datos.nombreProducto !== null) nombreProducto = datos.nombreProducto;
    if (datos.unidadesProducto !== null) unidadesProducto = datos.unidadesProducto;
    if (datos.precioProducto !== null) precioProducto = datos.precioProducto;
    if (datos.totalPresupuestoVentas !== null) totalPresupuestoVentas = datos.totalPresupuestoVentas;
    if (datos.inventarioInicial !== null) inventarioInicial = datos.inventarioInicial;
    if (datos.inventarioFinal !== null) inventarioFinal = datos.inventarioFinal;
    if (datos.precioII !== null) precioII = datos.precioII;
    if (datos.totalPresupuestoProduccion !== null) totalPresupuestoProduccion = datos.totalPresupuestoProduccion;
    if (datos.totalPresupuestoMPNecesariaA !== null) totalPresupuestoMPNecesariaA = datos.totalPresupuestoMPNecesariaA;
    if (datos.totalPresupuestoMPNecesariaB !== null) totalPresupuestoMPNecesariaB = datos.totalPresupuestoMPNecesariaB;
    if (datos.totalPresupuestoMPNecesariaC !== null) totalPresupuestoMPNecesariaC = datos.totalPresupuestoMPNecesariaC;
    if (datos.inventarioIMPA !== null) inventarioIMPA = datos.inventarioIMPA;
    if (datos.inventarioIMPB !== null) inventarioIMPB = datos.inventarioIMPB;
    if (datos.inventarioIMPC !== null) inventarioIMPC = datos.inventarioIMPC;
    if (datos.inventarioFMPA !== null) inventarioFMPA = datos.inventarioFMPA;
    if (datos.inventarioFMPB !== null) inventarioFMPB = datos.inventarioFMPB;
    if (datos.inventarioFMPC !== null) inventarioFMPC = datos.inventarioFMPC;
    if (datos.pCompraMPA !== null) pCompraMPA = datos.pCompraMPA;
    if (datos.pCompraMPB !== null) pCompraMPB = datos.pCompraMPB;
    if (datos.pCompraMPC !== null) pCompraMPC = datos.pCompraMPC;
    if (datos.compraUnidadA !== null) compraUnidadA = datos.compraUnidadA;
    if (datos.compraUnidadB !== null) compraUnidadB = datos.compraUnidadB;
    if (datos.compraUnidadC !== null) compraUnidadC = datos.compraUnidadC;
    if (datos.totalCompraMPA !== null) totalCompraMPA = datos.totalCompraMPA;
    if (datos.totalCompraMPB !== null) totalCompraMPB = datos.totalCompraMPB;
    if (datos.totalCompraMPC !== null) totalCompraMPC = datos.totalCompraMPC;
    if (datos.totalMateriaPrima !== null) totalMateriaPrima = datos.totalMateriaPrima;
    if (datos.manoObraPagar !== null) manoObraPagar = datos.manoObraPagar;
    if (datos.totalCargosIndirectos !== null) totalCargosIndirectos = datos.totalCargosIndirectos;
    if (datos.costoUnitario !== null) costoUnitario = datos.costoUnitario;
    if (datos.totalCostoVenta !== null) totalCostoVenta = datos.totalCostoVenta;
    if (datos.totalGastosOperacion !== null) totalGastosOperacion = datos.totalGastosOperacion;
}

// Función mejorada para cargar datos desde localStorage
function cargarDatos() {
    const datosGuardados = localStorage.getItem('presupuestoData');
    
    if (!datosGuardados) {
        mostrarNotificacion('No hay datos guardados para cargar', 'warning');
        return false;
    }
    
    try {
        const datos = JSON.parse(datosGuardados);
        
        // Restaurar variables globales
        restaurarVariablesGlobales(datos);
        
        // Restaurar valores en los campos del formulario
        if (datos.formularios) {
            Object.keys(datos.formularios).forEach(id => {
                const elemento = document.getElementById(id);
                if (elemento && datos.formularios[id]) {
                    elemento.value = datos.formularios[id];
                }
            });
        }
        
        // Recalcular y mostrar resultados si hay datos suficientes
        setTimeout(() => {
            if (datos.totalPresupuestoVentas) {
                actualizarResultadosVentas(datos);
            }
            if (datos.totalPresupuestoProduccion) {
                actualizarResultadosProduccion(datos);
            }
            if (datos.totalPresupuestoMPNecesariaA) {
                actualizarResultadosMP(datos);
            }
        }, 100);
        
        console.log('Datos cargados exitosamente:', datos);
        mostrarNotificacion('📂 Datos cargados correctamente', 'success');
        actualizarIndicadorGuardado(datos.timestamp);
        
        return true;
    } catch (error) {
        console.error('Error al cargar datos:', error);
        mostrarNotificacion('Error al cargar los datos guardados', 'error');
        return false;
    }
}

// Función para actualizar resultados de ventas
function actualizarResultadosVentas(datos) {
    if (datos.totalPresupuestoVentas && datos.unidadesProducto && datos.nombreProducto) {
        document.getElementById('totalPV').textContent = `Total: ${formatearMoneda(datos.totalPresupuestoVentas)}`;
        document.getElementById('totalPVR').textContent = `Unidades a Vender: ${formatearNumero(datos.unidadesProducto)} unidades`;
        document.getElementById('productoR').textContent = `Producto: ${datos.nombreProducto}`;
        document.getElementById('ventasRP').innerHTML = `<strong>${formatearMoneda(datos.totalPresupuestoVentas)}</strong>`;
    }
}

// Función para actualizar resultados de producción
function actualizarResultadosProduccion(datos) {
    if (datos.totalPresupuestoProduccion) {
        document.getElementById('UnidadesProducir').textContent = `Unidades a producir: ${formatearNumero(datos.totalPresupuestoProduccion)} unidades`;
        document.getElementById('unidadesP').innerHTML = `<strong>Unidades a producir: ${formatearNumero(datos.totalPresupuestoProduccion)} unidades</strong>`;
        document.getElementById('unidadesProducidas').innerHTML = `<strong>Unidades Producidas: ${formatearNumero(datos.totalPresupuestoProduccion)} unidades</strong>`;
        
        if (datos.inventarioInicial) document.getElementById('inventarioInicial').innerHTML = formatearNumero(datos.inventarioInicial);
        if (datos.precioII) document.getElementById('precioIITab').innerHTML = formatearMoneda(datos.precioII);
        if (datos.totalPresupuestoProduccion) document.getElementById('unidadesProducidasTab').innerHTML = formatearNumero(datos.totalPresupuestoProduccion);
        if (datos.inventarioFinal) document.getElementById('inventarioFinal').innerHTML = formatearNumero(datos.inventarioFinal);
    }
}

// Función para actualizar resultados de materia prima
function actualizarResultadosMP(datos) {
    if (datos.totalPresupuestoMPNecesariaA) {
        document.getElementById('ResultadoUnidadesNecesariasA').textContent = `Unidades Necesarias A: ${datos.totalPresupuestoMPNecesariaA}`;
        document.getElementById('ResultadoUnidadesNecesariasB').textContent = `Unidades Necesarias B: ${datos.totalPresupuestoMPNecesariaB}`;
        document.getElementById('ResultadoUnidadesNecesariasC').textContent = `Unidades Necesarias C: ${datos.totalPresupuestoMPNecesariaC}`;
        
        document.getElementById('unidadesNR').innerHTML = `
            <p>Unidades Necesarias A: ${datos.totalPresupuestoMPNecesariaA}</p>
            <p>Unidades Necesarias B: ${datos.totalPresupuestoMPNecesariaB}</p>
            <p>Unidades Necesarias C: ${datos.totalPresupuestoMPNecesariaC}</p>
        `;
    }
}

// Función mejorada para limpiar todos los datos
function limpiarDatos() {
    const confirmacion = confirm(
        '¿Está seguro de que desea limpiar TODOS los datos?\n\n' +
        'Esta acción eliminará:\n' +
        '• Todos los datos guardados\n' +
        '• Todos los campos del formulario\n' +
        '• Todos los cálculos realizados\n\n' +
        'Esta acción NO se puede deshacer.'
    );
    
    if (confirmacion) {
        try {
            // Limpiar localStorage
            localStorage.removeItem('presupuestoData');
            
            // Limpiar todos los campos del formulario
            const inputs = document.querySelectorAll('input[type="text"], input[type="number"], select');
            inputs.forEach(input => {
                input.value = '';
            });
            
            // Limpiar resultados mostrados
            const resultados = document.querySelectorAll('[id^="total"], [id^="resultado"], [id^="unidades"]');
            resultados.forEach(elemento => {
                if (elemento.tagName === 'INPUT') return; // No limpiar inputs
                elemento.textContent = elemento.textContent.includes(':') ? 
                    elemento.textContent.split(':')[0] + ': Complete los datos' : 
                    'Complete los datos';
            });
            
            mostrarNotificacion('🗑️ Todos los datos han sido eliminados', 'success');
            
            // Recargar la página después de un breve delay
            setTimeout(() => {
                location.reload();
            }, 1500);
            
        } catch (error) {
            console.error('Error al limpiar datos:', error);
            mostrarNotificacion('Error al limpiar los datos', 'error');
        }
    }
}

// Función para cargar imagen como base64
function cargarImagenComoBase64(rutaImagen) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        
        img.onload = function() {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            canvas.width = this.width;
            canvas.height = this.height;
            
            ctx.drawImage(this, 0, 0);
            
            try {
                const dataURL = canvas.toDataURL('image/png');
                resolve(dataURL);
            } catch (error) {
                reject(error);
            }
        };
        
        img.onerror = () => reject(new Error('No se pudo cargar la imagen'));
        img.src = rutaImagen;
    });
}

// Función mejorada para exportar datos a PDF profesional
async function exportarDatos() {
    try {
        const datos = recopilarDatos();
        
        // Verificar si hay datos para exportar
        const tieneInformacion = Object.values(datos.formularios).some(valor => valor && valor.trim() !== '') ||
                               Object.keys(datos).some(key => 
                                   key !== 'formularios' && 
                                   key !== 'timestamp' && 
                                   key !== 'version' && 
                                   datos[key] !== null
                               );
        
        if (!tieneInformacion) {
            mostrarNotificacion('No hay datos suficientes para exportar', 'warning');
            return;
        }
        
        // Precargar el icono
        let iconoBase64 = null;
        try {
            iconoBase64 = await cargarImagenComoBase64('./Icono.png');
        } catch (error) {
            console.warn('No se pudo cargar el icono, usando fallback:', error);
        }
        
        // Generar PDF profesional
        generarPDFPresupuesto(datos, iconoBase64);
        
    } catch (error) {
        console.error('Error al exportar datos:', error);
        mostrarNotificacion('Error al exportar los datos', 'error');
    }
}

// Función para generar PDF profesional del presupuesto
function generarPDFPresupuesto(datos, iconoBase64 = null) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'mm', 'a4');
    
    // Configuración de colores
    const colorPrimario = [0, 100, 121]; // #006479
    const colorSecundario = [33, 153, 175]; // #2199af
    const colorTexto = [30, 41, 59]; // #1e293b
    const colorFondo = [248, 250, 252]; // #f8fafc
    
    let yPosition = 20;
    
    // ENCABEZADO PRINCIPAL
    doc.setFillColor(...colorPrimario);
    doc.rect(0, 0, 210, 40, 'F');
    
    // Logo/Icono
    if (iconoBase64) {
        try {
            // Añadir el icono real desde el archivo
            doc.addImage(iconoBase64, 'PNG', 15, 12, 16, 16);
        } catch (error) {
            console.warn('Error al añadir icono al PDF:', error);
            // Fallback: círculo simple
            doc.setFillColor(255, 255, 255);
            doc.circle(23, 20, 8, 'F');
            doc.setTextColor(...colorPrimario);
            doc.setFontSize(12);
            doc.text('LOGO', 19, 24);
        }
    } else {
        // Fallback: círculo simple si no hay icono
        doc.setFillColor(255, 255, 255);
        doc.circle(23, 20, 8, 'F');
        doc.setTextColor(...colorPrimario);
        doc.setFontSize(12);
        doc.text('LOGO', 19, 24);
    }
    
    // Título principal
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('PRESUPUESTO DE OPERACIÓN', 40, 20);
    
    // Subtítulo
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text('Sistema Integral de Presupuestación Empresarial', 40, 28);
    
    // Información de generación
    doc.setFontSize(8);
    const fechaGeneracion = new Date().toLocaleDateString('es-MX', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    const horaActual = new Date().toLocaleTimeString('es-MX');
    doc.text(`Generado el ${fechaGeneracion} a las ${horaActual}`, 40, 35);
    
    yPosition = 50;
    
    // INFORMACIÓN GENERAL DEL PRODUCTO
    if (datos.nombreProducto) {
        doc.setTextColor(...colorPrimario);
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text('1. INFORMACIÓN DEL PRODUCTO', 20, yPosition);
        yPosition += 10;
        
        // Caja de información del producto
        doc.setFillColor(...colorFondo);
        doc.rect(20, yPosition - 3, 170, 25, 'F');
        doc.setDrawColor(...colorSecundario);
        doc.rect(20, yPosition - 3, 170, 25, 'S');
        
        doc.setTextColor(...colorTexto);
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text('Producto:', 25, yPosition + 5);
        doc.setFont('helvetica', 'normal');
        doc.text(datos.nombreProducto || 'No especificado', 50, yPosition + 5);
        
        if (datos.unidadesProducto) {
            doc.setFont('helvetica', 'bold');
            doc.text('Unidades a Vender:', 25, yPosition + 12);
            doc.setFont('helvetica', 'normal');
            doc.text(formatearNumero(datos.unidadesProducto), 70, yPosition + 12);
        }
        
        if (datos.precioProducto) {
            doc.setFont('helvetica', 'bold');
            doc.text('Precio Unitario:', 120, yPosition + 5);
            doc.setFont('helvetica', 'normal');
            doc.text(formatearMoneda(datos.precioProducto), 155, yPosition + 5);
        }
        
        if (datos.totalPresupuestoVentas) {
            doc.setFont('helvetica', 'bold');
            doc.text('Total de Ventas:', 120, yPosition + 12);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(...colorPrimario);
            doc.text(formatearMoneda(datos.totalPresupuestoVentas), 155, yPosition + 12);
        }
        
        yPosition += 35;
    }
    
    // PRESUPUESTO DE PRODUCCIÓN
    if (datos.totalPresupuestoProduccion) {
        doc.setTextColor(...colorPrimario);
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text('2. PRESUPUESTO DE PRODUCCIÓN', 20, yPosition);
        yPosition += 8;
        
        const datosProduccion = [
            ['Concepto', 'Unidades'],
            ['Unidades a Vender', datos.unidadesProducto ? formatearNumero(datos.unidadesProducto) : '-'],
            ['(-) Inventario Inicial', datos.inventarioInicial ? formatearNumero(datos.inventarioInicial) : '-'],
            ['(+) Inventario Final', datos.inventarioFinal ? formatearNumero(datos.inventarioFinal) : '-'],
            ['= Unidades a Producir', formatearNumero(datos.totalPresupuestoProduccion)]
        ];
        
        doc.autoTable({
            startY: yPosition,
            head: [datosProduccion[0]],
            body: datosProduccion.slice(1),
            margin: { left: 20, right: 20 },
            styles: { fontSize: 10, cellPadding: 3 },
            headStyles: { fillColor: colorPrimario, textColor: [255, 255, 255] },
            alternateRowStyles: { fillColor: [248, 250, 252] },
            footStyles: { fillColor: colorSecundario, textColor: [255, 255, 255], fontStyle: 'bold' }
        });
        
        yPosition = doc.lastAutoTable.finalY + 15;
    }
    
    // PRESUPUESTO DE MATERIA PRIMA
    if (datos.totalPresupuestoMPNecesariaA) {
        // Verificar si necesitamos nueva página
        if (yPosition > 200) {
            doc.addPage();
            yPosition = 20;
        }
        
        doc.setTextColor(...colorPrimario);
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text('3. PRESUPUESTO DE MATERIA PRIMA', 20, yPosition);
        yPosition += 8;
        
        const datosMateriaPrima = [
            ['Materia Prima', 'Unidades Necesarias', 'Precio Unitario', 'Total'],
            [
                'Materia Prima A',
                datos.totalPresupuestoMPNecesariaA ? formatearNumero(datos.totalPresupuestoMPNecesariaA) : '-',
                datos.pCompraMPA ? formatearMoneda(datos.pCompraMPA) : '-',
                datos.totalCompraMPA ? formatearMoneda(datos.totalCompraMPA) : '-'
            ],
            [
                'Materia Prima B',
                datos.totalPresupuestoMPNecesariaB ? formatearNumero(datos.totalPresupuestoMPNecesariaB) : '-',
                datos.pCompraMPB ? formatearMoneda(datos.pCompraMPB) : '-',
                datos.totalCompraMPB ? formatearMoneda(datos.totalCompraMPB) : '-'
            ],
            [
                'Materia Prima C',
                datos.totalPresupuestoMPNecesariaC ? formatearNumero(datos.totalPresupuestoMPNecesariaC) : '-',
                datos.pCompraMPC ? formatearMoneda(datos.pCompraMPC) : '-',
                datos.totalCompraMPC ? formatearMoneda(datos.totalCompraMPC) : '-'
            ]
        ];
        
        if (datos.totalMateriaPrima) {
            datosMateriaPrima.push(['TOTAL MATERIA PRIMA', '', '', formatearMoneda(datos.totalMateriaPrima)]);
        }
        
        doc.autoTable({
            startY: yPosition,
            head: [datosMateriaPrima[0]],
            body: datosMateriaPrima.slice(1, -1),
            foot: datos.totalMateriaPrima ? [datosMateriaPrima[datosMateriaPrima.length - 1]] : [],
            margin: { left: 20, right: 20 },
            styles: { fontSize: 10, cellPadding: 3 },
            headStyles: { fillColor: colorPrimario, textColor: [255, 255, 255] },
            alternateRowStyles: { fillColor: [248, 250, 252] },
            footStyles: { fillColor: colorSecundario, textColor: [255, 255, 255], fontStyle: 'bold' }
        });
        
        yPosition = doc.lastAutoTable.finalY + 15;
    }
    
    // RESUMEN DE COSTOS DE PRODUCCIÓN
    if (datos.totalMateriaPrima || datos.manoObraPagar || datos.totalCargosIndirectos) {
        if (yPosition > 220) {
            doc.addPage();
            yPosition = 20;
        }
        
        doc.setTextColor(...colorPrimario);
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text('4. RESUMEN DE COSTOS DE PRODUCCIÓN', 20, yPosition);
        yPosition += 8;
        
        const datosCostos = [
            ['Concepto', 'Importe']
        ];
        
        if (datos.totalMateriaPrima) {
            datosCostos.push(['Materia Prima', formatearMoneda(datos.totalMateriaPrima)]);
        }
        if (datos.manoObraPagar) {
            datosCostos.push(['Mano de Obra Directa', formatearMoneda(datos.manoObraPagar)]);
        }
        if (datos.totalCargosIndirectos) {
            datosCostos.push(['Cargos Indirectos', formatearMoneda(datos.totalCargosIndirectos)]);
        }
        
        const totalProduccion = (datos.totalMateriaPrima || 0) + (datos.manoObraPagar || 0) + (datos.totalCargosIndirectos || 0);
        if (totalProduccion > 0) {
            datosCostos.push(['TOTAL COSTO DE PRODUCCIÓN', formatearMoneda(totalProduccion)]);
            
            if (datos.costoUnitario) {
                datosCostos.push(['Costo Unitario', formatearMoneda(datos.costoUnitario)]);
            }
        }
        
        doc.autoTable({
            startY: yPosition,
            head: [datosCostos[0]],
            body: datosCostos.slice(1, -2),
            foot: datosCostos.slice(-2),
            margin: { left: 20, right: 20 },
            styles: { fontSize: 10, cellPadding: 3 },
            headStyles: { fillColor: colorPrimario, textColor: [255, 255, 255] },
            alternateRowStyles: { fillColor: [248, 250, 252] },
            footStyles: { fillColor: colorSecundario, textColor: [255, 255, 255], fontStyle: 'bold' }
        });
        
        yPosition = doc.lastAutoTable.finalY + 15;
    }
    
    // ESTADO DE RESULTADOS PROYECTADO
    if (datos.totalPresupuestoVentas || datos.totalCostoVenta) {
        if (yPosition > 180) {
            doc.addPage();
            yPosition = 20;
        }
        
        doc.setTextColor(...colorPrimario);
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text('5. ESTADO DE RESULTADOS PROYECTADO', 20, yPosition);
        yPosition += 8;
        
        const datosResultados = [
            ['Concepto', 'Importe']
        ];
        
        if (datos.totalPresupuestoVentas) {
            datosResultados.push(['Ventas', formatearMoneda(datos.totalPresupuestoVentas)]);
        }
        if (datos.totalCostoVenta) {
            datosResultados.push(['(-) Costo de Ventas', formatearMoneda(datos.totalCostoVenta)]);
        }
        
        const utilidadBruta = (datos.totalPresupuestoVentas || 0) - (datos.totalCostoVenta || 0);
        if (utilidadBruta !== 0) {
            datosResultados.push(['= Utilidad Bruta', formatearMoneda(utilidadBruta)]);
        }
        
        if (datos.totalGastosOperacion) {
            datosResultados.push(['(-) Gastos de Operación', formatearMoneda(datos.totalGastosOperacion)]);
            
            const utilidadOperacion = utilidadBruta - datos.totalGastosOperacion;
            datosResultados.push(['= Utilidad de Operación', formatearMoneda(utilidadOperacion)]);
        }
        
        doc.autoTable({
            startY: yPosition,
            head: [datosResultados[0]],
            body: datosResultados.slice(1, -1),
            foot: [datosResultados[datosResultados.length - 1]],
            margin: { left: 20, right: 20 },
            styles: { fontSize: 10, cellPadding: 3 },
            headStyles: { fillColor: colorPrimario, textColor: [255, 255, 255] },
            alternateRowStyles: { fillColor: [248, 250, 252] },
            footStyles: { fillColor: [16, 185, 129], textColor: [255, 255, 255], fontStyle: 'bold' }
        });
        
        yPosition = doc.lastAutoTable.finalY + 15;
    }
    
    // PIE DE PÁGINA
    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        
        // Línea separadora
        doc.setDrawColor(...colorSecundario);
        doc.line(20, 280, 190, 280);
        
        // Información del pie
        doc.setTextColor(...colorTexto);
        doc.setFontSize(8);
        doc.setFont('helvetica', 'normal');
        doc.text('Software de Presupuesto de Operación v2.0', 20, 285);
        doc.text(`Página ${i} de ${totalPages}`, 170, 285);
        doc.text(`Generado: ${new Date().toLocaleDateString('es-MX')}`, 20, 290);
        
        // Logo/marca de agua
        doc.setTextColor(200, 200, 200);
        doc.setFontSize(6);
        doc.text('Powered by Sistema Integral de Presupuestación', 120, 290);
    }
    
    // Generar nombre del archivo
    const fechaActual = new Date().toISOString().split('T')[0];
    const nombreProducto = datos.nombreProducto ? datos.nombreProducto.replace(/[^a-zA-Z0-9]/g, '_') : 'presupuesto';
    const nombreArchivo = `Presupuesto_${nombreProducto}_${fechaActual}.pdf`;
    
    // Guardar el PDF
    doc.save(nombreArchivo);
    
    mostrarNotificacion('📄 PDF generado y descargado correctamente', 'success');
    console.log('PDF generado exitosamente:', nombreArchivo);
}

// Función para actualizar indicador de último guardado
function actualizarIndicadorGuardado(timestamp = null) {
    const fecha = timestamp ? new Date(timestamp) : new Date();
    let indicador = document.getElementById('indicador-guardado');
    
    if (!indicador) {
        indicador = document.createElement('div');
        indicador.id = 'indicador-guardado';
        indicador.className = 'indicador-guardado';
        document.querySelector('.progreso-container')?.appendChild(indicador);
    }
    
    indicador.innerHTML = `
        <span class="indicador-icono">💾</span>
        <span class="indicador-texto">Último guardado: ${fecha.toLocaleString('es-MX')}</span>
    `;
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

// Función para crear botones de acción mejorados
function crearBotonesAccion() {
    const header = document.querySelector('header');
    
    // Verificar si ya existen los botones
    if (document.querySelector('.botones-accion')) {
        return;
    }
    
    const botonesContainer = document.createElement('div');
    botonesContainer.className = 'botones-accion';
    botonesContainer.innerHTML = `
        <button onclick="guardarDatos()" class="btn btn-primary btn-accion" title="Guardar progreso actual" data-accion="guardar">
            💾 Guardar
        </button>
        <button onclick="cargarDatos()" class="btn btn-primary btn-accion" title="Cargar datos guardados anteriormente" data-accion="cargar">
            📂 Cargar
        </button>
        <button onclick="exportarDatos()" class="btn btn-primary btn-accion" title="Descargar presupuesto como PDF profesional" data-accion="exportar">
            📄 Exportar PDF
        </button>
        <button onclick="limpiarDatos()" class="btn btn-primary btn-accion btn-peligro" title="Eliminar todos los datos (no se puede deshacer)" data-accion="limpiar">
            🗑️ Limpiar
        </button>
    `;
    header.appendChild(botonesContainer);
    
    // Añadir efectos de clic a los botones
    const botones = botonesContainer.querySelectorAll('.btn-accion');
    botones.forEach(boton => {
        boton.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

// Función para importar datos desde archivo JSON
function importarDatos() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.style.display = 'none';
    
    input.onchange = function(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const datos = JSON.parse(e.target.result);
                
                // Validar estructura básica
                if (datos.version && datos.timestamp) {
                    localStorage.setItem('presupuestoData', JSON.stringify(datos));
                    mostrarNotificacion('📥 Archivo importado correctamente', 'success');
                    
                    // Preguntar si desea cargar los datos inmediatamente
                    setTimeout(() => {
                        if (confirm('¿Desea cargar los datos importados ahora?')) {
                            cargarDatos();
                        }
                    }, 1000);
                } else {
                    mostrarNotificacion('Archivo no válido o corrupto', 'error');
                }
            } catch (error) {
                console.error('Error al importar:', error);
                mostrarNotificacion('Error al leer el archivo', 'error');
            }
        };
        reader.readAsText(file);
    };
    
    document.body.appendChild(input);
    input.click();
    document.body.removeChild(input);
}

// Función para exportar JSON como respaldo
function exportarJSON() {
    try {
        const datos = recopilarDatos();
        
        // Verificar si hay datos para exportar
        const tieneInformacion = Object.values(datos.formularios).some(valor => valor && valor.trim() !== '') ||
                               Object.keys(datos).some(key => 
                                   key !== 'formularios' && 
                                   key !== 'timestamp' && 
                                   key !== 'version' && 
                                   datos[key] !== null
                               );
        
        if (!tieneInformacion) {
            mostrarNotificacion('No hay datos suficientes para exportar', 'warning');
            return;
        }
        
        // Crear el archivo JSON con formato mejorado
        const datosExportacion = {
            ...datos,
            exportacion: {
                fecha: new Date().toLocaleDateString('es-MX'),
                hora: new Date().toLocaleTimeString('es-MX'),
                aplicacion: 'Software de Presupuesto de Operación',
                version: '2.0'
            }
        };
        
        const dataStr = JSON.stringify(datosExportacion, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        
        const fechaActual = new Date().toISOString().split('T')[0];
        const exportFileDefaultName = `presupuesto_respaldo_${fechaActual}.json`;
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.style.display = 'none';
        document.body.appendChild(linkElement);
        linkElement.click();
        document.body.removeChild(linkElement);
        
        mostrarNotificacion('📥 Respaldo JSON descargado correctamente', 'success');
        console.log('Respaldo JSON exportado:', datosExportacion);
        
    } catch (error) {
        console.error('Error al exportar JSON:', error);
        mostrarNotificacion('Error al exportar el respaldo', 'error');
    }
}

// Función para crear menú contextual de exportación
function añadirOpcionExportar() {
    const botonExportar = document.querySelector('[data-accion="exportar"]');
    if (botonExportar) {
        botonExportar.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            
            const menu = document.createElement('div');
            menu.className = 'menu-contextual';
            menu.innerHTML = `
                <div class="menu-item" onclick="exportarDatos(); document.querySelector('.menu-contextual').remove();">
                    📄 Exportar PDF
                </div>
                <div class="menu-item" onclick="exportarJSON(); document.querySelector('.menu-contextual').remove();">
                    📥 Exportar JSON (respaldo)
                </div>
            `;
            
            menu.style.position = 'fixed';
            menu.style.left = e.clientX + 'px';
            menu.style.top = e.clientY + 'px';
            menu.style.zIndex = '10000';
            
            document.body.appendChild(menu);
            
            // Remover menú al hacer clic fuera
            setTimeout(() => {
                document.addEventListener('click', function removerMenu() {
                    const menuExistente = document.querySelector('.menu-contextual');
                    if (menuExistente) {
                        menuExistente.remove();
                    }
                    document.removeEventListener('click', removerMenu);
                });
            }, 100);
        });
    }
}
    const botonCargar = document.querySelector('[data-accion="cargar"]');
    if (botonCargar) {
        botonCargar.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            
            const menu = document.createElement('div');
            menu.className = 'menu-contextual';
            menu.innerHTML = `
                <div class="menu-item" onclick="cargarDatos(); document.querySelector('.menu-contextual').remove();">
                    📂 Cargar desde memoria
                </div>
                <div class="menu-item" onclick="importarDatos(); document.querySelector('.menu-contextual').remove();">
                    📥 Importar desde archivo
                </div>
            `;
            
            menu.style.position = 'fixed';
            menu.style.left = e.clientX + 'px';
            menu.style.top = e.clientY + 'px';
            menu.style.zIndex = '10000';
            
            document.body.appendChild(menu);
            
            // Remover menú al hacer clic fuera
            setTimeout(() => {
                document.addEventListener('click', function removerMenu() {
                    const menuExistente = document.querySelector('.menu-contextual');
                    if (menuExistente) {
                        menuExistente.remove();
                    }
                    document.removeEventListener('click', removerMenu);
                });
            }, 100);
        });
    }

// Función para verificar compatibilidad del navegador
function verificarCompatibilidad() {
    const caracteristicas = {
        localStorage: typeof Storage !== 'undefined',
        JSON: typeof JSON !== 'undefined',
        FileReader: typeof FileReader !== 'undefined'
    };
    
    const incompatible = Object.keys(caracteristicas).filter(key => !caracteristicas[key]);
    
    if (incompatible.length > 0) {
        mostrarNotificacion(
            `Algunas funciones pueden no estar disponibles: ${incompatible.join(', ')}`, 
            'warning'
        );
        return false;
    }
    
    return true;
}

// Función para autoguardado inteligente
function autoguardadoInteligente() {
    let ultimoCambio = Date.now();
    let timeoutGuardado;
    
    // Detectar cambios en formularios
    const inputs = document.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            ultimoCambio = Date.now();
            
            // Cancelar autoguardado anterior si existe
            if (timeoutGuardado) {
                clearTimeout(timeoutGuardado);
            }
            
            // Programar autoguardado después de 5 segundos de inactividad
            timeoutGuardado = setTimeout(() => {
                const tiempoSinCambios = Date.now() - ultimoCambio;
                if (tiempoSinCambios >= 5000) {
                    guardarDatos();
                }
            }, 5000);
        });
    });
}

// Inicializar mejoras cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Inicializando mejoras del sistema...');
    
    // Verificar compatibilidad
    if (!verificarCompatibilidad()) {
        console.warn('Navegador con compatibilidad limitada detectado');
    }
    
    // Inicializar componentes
    validacionAvanzada();
    añadirTooltips();
    crearBotonesAccion();
    autoguardadoInteligente();
    
    // Cargar datos guardados si existen
    setTimeout(() => {
        const datosExisten = localStorage.getItem('presupuestoData');
        if (datosExisten) {
            if (confirm('📂 Se encontraron datos guardados. ¿Desea cargarlos?')) {
                cargarDatos();
            }
        }
    }, 1000);
    
    // Añadir opción de importar
    setTimeout(añadirOpcionImportar, 1500);
    
    // Añadir opción de exportar
    setTimeout(añadirOpcionExportar, 1500);
    
    // Actualizar progreso periódicamente
    setInterval(mostrarProgreso, 2000);
    
    // Guardar automáticamente cada 30 segundos si hay cambios
    setInterval(() => {
        const datosActuales = recopilarDatos();
        const tieneInformacion = Object.values(datosActuales.formularios).some(valor => valor && valor.trim() !== '');
        
        if (tieneInformacion) {
            guardarDatos();
        }
    }, 30000);
    
    console.log('✅ Mejoras del sistema inicializadas correctamente');
});

// Guardar datos antes de cerrar la página
window.addEventListener('beforeunload', function(e) {
    const datosActuales = recopilarDatos();
    const tieneInformacion = Object.values(datosActuales.formularios).some(valor => valor && valor.trim() !== '');
    
    if (tieneInformacion) {
        guardarDatos();
        
        // Mostrar advertencia si hay datos sin guardar recientemente
        const ultimoGuardado = localStorage.getItem('presupuestoData');
        if (ultimoGuardado) {
            const datosGuardados = JSON.parse(ultimoGuardado);
            const tiempoSinGuardar = Date.now() - new Date(datosGuardados.timestamp).getTime();
            
            if (tiempoSinGuardar > 60000) { // Más de 1 minuto sin guardar
                e.preventDefault();
                e.returnValue = 'Hay cambios sin guardar. ¿Está seguro de que desea salir?';
                return e.returnValue;
            }
        }
    }
});

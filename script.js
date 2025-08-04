// Variables globales para almacenar datos del presupuesto
// Información del Producto
var unidadesProducto;
var nombreProducto;
var precioProducto;
var totalPresupuestoVentas;
// Inventarios Iniciales y Finales
var inventarioInicial;
var inventarioFinal;
var precioII;
// Presupuestos MP
var totalPresupuestoProduccion;
var totalPresupuestoMPNecesariaA;
var totalPresupuestoMPNecesariaB;
var totalPresupuestoMPNecesariaC;
// Inventarios Iniciales MP
var inventarioIMPA;
var inventarioIMPB;
var inventarioIMPC;
// Inventarios Finales MP
var inventarioFMPA;
var inventarioFMPB;
var inventarioFMPC;
// Precio de compra MP
var pCompraMPA;
var pCompraMPB;
var pCompraMPC;
// Unidades a Comprar MP
var compraUnidadA;
var compraUnidadB;
var compraUnidadC;
// Total de compra MP
var totalCompraMPA;
var totalCompraMPB;
var totalCompraMPC;
// Total MP
var totalMateriaPrima;
// Total Mano de Obra
var manoObraPagar;
// Total Cargos Indirectos
var totalCargosIndirectos;
// Costo Final Unitario
var costoUnitario;
// Total Costo de venta
var totalCostoVenta;
// Total Gastos de Operación
var totalGastosOperacion;

// Función para formatear números como moneda
function formatearMoneda(numero) {
    return new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN'
    }).format(numero);
}

// Función para formatear números simples
function formatearNumero(numero) {
    return new Intl.NumberFormat('es-MX').format(numero);
}

// Función para añadir animación a elementos
function animarElemento(elementId) {
    const elemento = document.getElementById(elementId);
    if (elemento) {
        elemento.classList.add('fade-in');
    }
}

// Función para validar que los campos requeridos estén llenos
function validarCampos(campos) {
    for (let campo of campos) {
        const elemento = document.getElementById(campo);
        if (!elemento || !elemento.value || elemento.value === '') {
            alert(`Por favor, complete el campo: ${elemento.labels?.[0]?.textContent || campo}`);
            elemento.focus();
            return false;
        }
    }
    return true;
}

// Remover la línea problemática del modo oscuro
// document.querySelector('body').classList.toggle('dark-mode');

function calcularPresupuestoVentas(){
    // Validar campos requeridos
    if (!validarCampos(['producto', 'unidades', 'precio'])) {
        return;
    }

    nombreProducto = document.getElementById('producto').value.trim();
    unidadesProducto = parseFloat(document.getElementById('unidades').value);
    precioProducto = parseFloat(document.getElementById('precio').value);
    
    // Validar que los números sean positivos
    if (unidadesProducto <= 0 || precioProducto <= 0) {
        alert('Las unidades y el precio deben ser números positivos');
        return;
    }
    
    totalPresupuestoVentas = precioProducto * unidadesProducto;

    document.getElementById('totalPV').textContent = `Total: ${formatearMoneda(totalPresupuestoVentas)}`;
    document.getElementById('totalPVR').textContent = `Unidades a Vender: ${formatearNumero(unidadesProducto)} unidades`;
    document.getElementById('productoR').textContent = `Producto: ${nombreProducto}`;
    document.getElementById('ventasRP').innerHTML = `<strong>${formatearMoneda(totalPresupuestoVentas)}</strong>`;
    
    // Animar elementos actualizados
    animarElemento('totalPV');
    animarElemento('totalPVR');
};

function calcularPresupuestoProduccion(){
    // Validar que se haya calculado el presupuesto de ventas primero
    if (!unidadesProducto) {
        alert('Primero debe calcular el presupuesto de ventas');
        return;
    }
    
    // Validar campos requeridos
    if (!validarCampos(['inventarioI', 'inventarioF', 'precioII'])) {
        return;
    }

    inventarioInicial = parseFloat(document.getElementById('inventarioI').value);
    inventarioFinal = parseFloat(document.getElementById('inventarioF').value);
    precioII = parseFloat(document.getElementById('precioII').value);
    
    // Validar que los números no sean negativos
    if (inventarioInicial < 0 || inventarioFinal < 0 || precioII < 0) {
        alert('Los valores de inventario y precios no pueden ser negativos');
        return;
    }
    
    totalPresupuestoProduccion = unidadesProducto - inventarioInicial + inventarioFinal;
    
    if (totalPresupuestoProduccion < 0) {
        alert('Las unidades a producir no pueden ser negativas. Revise los datos ingresados.');
        return;
    }

    document.getElementById('UnidadesProducir').textContent = `Unidades a producir: ${formatearNumero(totalPresupuestoProduccion)} unidades`;
    document.getElementById('unidadesP').innerHTML = `<strong>Unidades a producir: ${formatearNumero(totalPresupuestoProduccion)} unidades</strong>`;
    document.getElementById('unidadesProducidas').innerHTML = `<strong>Unidades Producidas: ${formatearNumero(totalPresupuestoProduccion)} unidades</strong>`;
    document.getElementById('inventarioInicial').innerHTML = formatearNumero(inventarioInicial);
    document.getElementById('precioIITab').innerHTML = formatearMoneda(precioII);
    document.getElementById('unidadesProducidasTab').innerHTML = formatearNumero(totalPresupuestoProduccion);
    document.getElementById('inventarioFinal').innerHTML = formatearNumero(inventarioFinal);
    
    // Animar elementos actualizados
    animarElemento('UnidadesProducir');
};

function presupuestoMPNecesaria(){
    let materiaA = parseFloat(document.getElementById('a').value);
    let materiaB = parseFloat(document.getElementById('b').value);
    let materiaC = parseFloat(document.getElementById('c').value);
    totalPresupuestoMPNecesariaA = totalPresupuestoProduccion * materiaA;
    totalPresupuestoMPNecesariaB = totalPresupuestoProduccion * materiaB;
    totalPresupuestoMPNecesariaC = totalPresupuestoProduccion * materiaC;
    document.getElementById('ResultadoUnidadesNecesariasA').textContent = 'Unidades Necesarias A: ' + totalPresupuestoMPNecesariaA;
    document.getElementById('ResultadoUnidadesNecesariasB').textContent = 'Unidades Necesarias B: ' + totalPresupuestoMPNecesariaB;
    document.getElementById('ResultadoUnidadesNecesariasC').textContent = 'Unidades Necesarias C: ' + totalPresupuestoMPNecesariaC;

    document.getElementById('unidadesNR').innerHTML = `
    <p>Unidades Necesarias A: ${totalPresupuestoMPNecesariaA}</p>
    <p>Unidades Necesarias B: ${totalPresupuestoMPNecesariaB}</p>
    <p>Unidades Necesarias C: ${totalPresupuestoMPNecesariaC}</p>`;

};

function presupuestoMP(){
    // Inventarios Iniciales
    inventarioIMPA = parseFloat(document.getElementById('inventarioIMPA').value);
    inventarioIMPB = parseFloat(document.getElementById('inventarioIMPB').value);
    inventarioIMPC = parseFloat(document.getElementById('inventarioIMPC').value);
    // Inventarios Finales
    inventarioFMPA = parseFloat(document.getElementById('inventarioFMPA').value);
    inventarioFMPB = parseFloat(document.getElementById('inventarioFMPB').value);
    inventarioFMPC = parseFloat(document.getElementById('inventarioFMPC').value);
    // Unidades a Comprar
    compraUnidadA = totalPresupuestoMPNecesariaA - inventarioIMPA + inventarioFMPA;
    compraUnidadB = totalPresupuestoMPNecesariaB - inventarioIMPB + inventarioFMPB;
    compraUnidadC = totalPresupuestoMPNecesariaC - inventarioIMPC + inventarioFMPC;

    document.getElementById('unidadesAComprar').innerHTML = `
    <p>Unidades a Comprar:</p>
    <p>Unidades a Comprar MP A ${compraUnidadA}</p>
    <p>Unidades a Comprar MP B ${compraUnidadB}</p>
    <p>Unidades a Comprar MP C ${compraUnidadC}</p>
    `;
    //Precio de compra
    pCompraMPA = parseFloat(document.getElementById('pCompraMPA').value);
    pCompraMPB = parseFloat(document.getElementById('pCompraMPB').value);
    pCompraMPC = parseFloat(document.getElementById('pCompraMPC').value);
    // Total de Compra MP
    totalCompraMPA = compraUnidadA * pCompraMPA;
    totalCompraMPB = compraUnidadB * pCompraMPB;
    totalCompraMPC = compraUnidadC * pCompraMPC;

    document.getElementById('totalCompra').innerHTML = `
    <p>Total de compra:</p>
    <p>Total de Compra A ${totalCompraMPA}</p>
    <p>Total de Compra B ${totalCompraMPB}</p>
    <p>Total de Compra C ${totalCompraMPC}</p>
    `;
};

function tarjetaAlmacen(){
    //Precios Inventarios Iniciales
    let precioIIMPA = parseFloat(document.getElementById('costoIIMPA').value);
    let precioIIMPB = parseFloat(document.getElementById('costoIIMPB').value);
    let precioIIMPC = parseFloat(document.getElementById('costoIIMPC').value);

    // Selección de Tarjeta de Almacén
    let metodoValuacion = document.getElementById('metodoValuacion').value;
    let mostrarTarjeta;
    // tabla principal UEPS y PEPS
    let tablaPEPSYUEPS = `
    <table>
        <thead>
            <tr>
                <th>Concepto</th>
                <th>Entrada</th>
                <th>Salida</th>
                <th>Existencias</th>
                <th>Costo Unitario</th>
                <th>Debe</th>
                <th>Haber</th>
                <th>Saldo</th>
            </tr>
        </thead>
    `;

    // Tabla Principal Costo Promedio
    let tablaCostoPromedio = `
    <table>
        <thead>
            <tr>
                <th>Concepto</th>
                <th>Entrada</th>
                <th>Salida</th>
                <th>Existencias</th>
                <th>Costo Unitario</th>
                <th>Costo Promedio</th>
                <th>Debe</th>
                <th>Haber</th>
                <th>Saldo</th>
            </tr>
        </thead>
    `;

    // PEPS y UEPS MP A
    let saldoA = inventarioIMPA * precioIIMPA;
    let existenciasA = compraUnidadA + inventarioIMPA;
    let debeA = compraUnidadA * pCompraMPA;
    let saldoA2 = debeA + saldoA;
    //haber
    let salidaA;
    let haberA;
    
    // PEPS y UEPS MP B
    let saldoB = inventarioIMPB * precioIIMPB;
    let existenciasB = compraUnidadB + inventarioIMPB;
    let debeB = compraUnidadB * pCompraMPB;
    let saldoB2 = debeB + saldoB;
    //haber
    let salidaB;
    let haberB;

    // PEPS y UEPS MP C
    let saldoC = inventarioIMPC * precioIIMPC;
    let existenciasC = compraUnidadC + inventarioIMPC;
    let debeC = compraUnidadC * pCompraMPC;
    let saldoC2 = debeC + saldoC;
    //haber
    let salidaC;
    let haberC;

    switch (metodoValuacion) {
        case "peps":
            // PEPS MP A
            salidaA = existenciasA - inventarioIMPA - inventarioFMPA;
            haberA = (inventarioIMPA * precioIIMPA) + (salidaA * pCompraMPA);
            // PEPS MP B
            salidaB = existenciasB - inventarioIMPB - inventarioFMPB;
            haberB = (inventarioIMPB * precioIIMPB) + (salidaB * pCompraMPB);
            // PEPS MP C
            salidaC = existenciasC - inventarioIMPC - inventarioFMPC;
            haberC = (inventarioIMPC * precioIIMPC) + (salidaC * pCompraMPC);
            
            // Tarjeta Materia Prima A
            mostrarTarjeta = `
            <h3>Materia prima A</h3>
            ${tablaPEPSYUEPS}
            <tbody>
            <tr>
                <td>Inventario Inicial</td>
                <td></td>
                <td></td>
                <td>${inventarioIMPA}</td>
                <td>${precioIIMPA}</td>
                <td></td>
                <td></td>
                <td>${saldoA}</td>
            </tr>
            <tr>
                <td>Compra</td>
                <td>${compraUnidadA}</td>
                <td></td>
                <td>${existenciasA}</td>
                <td>${pCompraMPA}</td>
                <td>${debeA}</td>
                <td></td>
                <td>${saldoA2}</td>
            </tr>
            <tr>
                <td>Producción</td>
                <td></td>
                <td>${totalPresupuestoMPNecesariaA}</td>
                <td>${inventarioFMPA}</td>
                <td></td>
                <td></td>
                <td>${haberA}</td>
                <td>${saldoA2  - haberA}</td>
            </tr>
        </tbody>
    </table>

            <h3>Materia prima B</h3>
            ${tablaPEPSYUEPS}
            <tbody>
            <tr>
                <td>Inventario Inicial</td>
                <td></td>
                <td></td>
                <td>${inventarioIMPB}</td>
                <td>${precioIIMPB}</td>
                <td></td>
                <td></td>
                <td>${saldoB}</td>
            </tr>
            <tr>
                <td>Compra</td>
                <td>${compraUnidadB}</td>
                <td></td>
                <td>${existenciasB}</td>
                <td>${pCompraMPB}</td>
                <td>${debeB}</td>
                <td></td>
                <td>${saldoB2}</td>
            </tr>
            <tr>
                <td>Producción</td>
                <td></td>
                <td>${totalPresupuestoMPNecesariaB}</td>
                <td>${inventarioFMPB}</td>
                <td></td>
                <td></td>
                <td>${haberB}</td>
                <td>${saldoB2  - haberB}</td>
            </tr>
        </tbody>
    </table>
            <h3>Materia prima C</h3>
            ${tablaPEPSYUEPS}
            <tbody>
            <tr>
                <td>Inventario Inicial</td>
                <td></td>
                <td></td>
                <td>${inventarioIMPC}</td>
                <td>${precioIIMPC}</td>
                <td></td>
                <td></td>
                <td>${saldoC}</td>
            </tr>
            <tr>
                <td>Compra</td>
                <td>${compraUnidadC}</td>
                <td></td>
                <td>${existenciasC}</td>
                <td>${pCompraMPC}</td>
                <td>${debeC}</td>
                <td></td>
                <td>${saldoC2}</td>
            </tr>
            <tr>
                <td>Producción</td>
                <td></td>
                <td>${totalPresupuestoMPNecesariaC}</td>
                <td>${inventarioFMPC}</td>
                <td></td>
                <td></td>
                <td>${haberC}</td>
                <td>${saldoC2  - haberC}</td>
            </tr>
        </tbody>
    </table>
    `;

            break;

        case "ueps":
            // UEPS MP A
            salidaA = inventarioIMPA - inventarioFMPA;
            haberA = (compraUnidadA * pCompraMPA) + (salidaA * precioIIMPA);
            // UEPS MP B
            salidaB = inventarioIMPB - inventarioFMPB;
            haberB = (compraUnidadB * pCompraMPB) + (salidaB * precioIIMPB);
            // UEPS MP C
            salidaC = inventarioIMPC - inventarioFMPC;
            haberC = (compraUnidadC * pCompraMPC) + (salidaC * precioIIMPC);

            // Tarjeta MP A
            mostrarTarjeta = `
            <h3>Materia prima A</h3>
            ${tablaPEPSYUEPS}
            <tbody>
            <tr>
                <td>Inventario Inicial</td>
                <td></td>
                <td></td>
                <td>${inventarioIMPA}</td>
                <td>${precioIIMPA}</td>
                <td></td>
                <td></td>
                <td>${saldoA}</td>
            </tr>
            <tr>
                <td>Compra</td>
                <td>${compraUnidadA}</td>
                <td></td>
                <td>${existenciasA}</td>
                <td>${pCompraMPA}</td>
                <td>${debeA}</td>
                <td></td>
                <td>${saldoA2}</td>
            </tr>
            <tr>
                <td>Producción</td>
                <td></td>
                <td>${totalPresupuestoMPNecesariaA}</td>
                <td>${inventarioFMPA}</td>
                <td></td>
                <td></td>
                <td>${haberA}</td>
                <td>${saldoA2  - haberA}</td>
            </tr>
        </tbody>
    </table>
            <h3>Materia prima B</h3>
            ${tablaPEPSYUEPS}
            <tbody>
            <tr>
                <td>Inventario Inicial</td>
                <td></td>
                <td></td>
                <td>${inventarioIMPB}</td>
                <td>${precioIIMPB}</td>
                <td></td>
                <td></td>
                <td>${saldoB}</td>
            </tr>
            <tr>
                <td>Compra</td>
                <td>${compraUnidadB}</td>
                <td></td>
                <td>${existenciasB}</td>
                <td>${pCompraMPB}</td>
                <td>${debeB}</td>
                <td></td>
                <td>${saldoB2}</td>
            </tr>
            <tr>
                <td>Producción</td>
                <td></td>
                <td>${totalPresupuestoMPNecesariaB}</td>
                <td>${inventarioFMPB}</td>
                <td></td>
                <td></td>
                <td>${haberB}</td>
                <td>${saldoB2  - haberB}</td>
            </tr>
        </tbody>
    </table>
            <h3>Materia prima C</h3>
            ${tablaPEPSYUEPS}
            <tbody>
            <tr>
                <td>Inventario Inicial</td>
                <td></td>
                <td></td>
                <td>${inventarioIMPC}</td>
                <td>${precioIIMPC}</td>
                <td></td>
                <td></td>
                <td>${saldoC}</td>
            </tr>
            <tr>
                <td>Compra</td>
                <td>${compraUnidadC}</td>
                <td></td>
                <td>${existenciasC}</td>
                <td>${pCompraMPC}</td>
                <td>${debeC}</td>
                <td></td>
                <td>${saldoC2}</td>
            </tr>
            <tr>
                <td>Producción</td>
                <td></td>
                <td>${totalPresupuestoMPNecesariaC}</td>
                <td>${inventarioFMPC}</td>
                <td></td>
                <td></td>
                <td>${haberC}</td>
                <td>${saldoC2  - haberC}</td>
            </tr>
        </tbody>
        </table>
            `;
            break;

        case "costoPromedio":
            //Costo Promedio MP A
            let costoPromedioA = (saldoA2/existenciasA).toFixed(2);
            haberA = totalPresupuestoMPNecesariaA * costoPromedioA;
            //Costo Promedio MP B
            let costoPromedioB = (saldoB2/existenciasB).toFixed(2);
            haberB = totalPresupuestoMPNecesariaB * costoPromedioB;
            //Costo Promedio MP C
            let costoPromedioC = (saldoC2/existenciasC).toFixed(2);
            haberC = totalPresupuestoMPNecesariaC * costoPromedioC;

            mostrarTarjeta = `
            <h3>Materia prima A</h3>
            ${tablaCostoPromedio}
            <tbody>
            <tr>
                <td>Inventario Inicial</td>
                <td></td>
                <td></td>
                <td>${inventarioIMPA}</td>
                <td>${precioIIMPA}</td>
                <td>${precioIIMPA}</td>
                <td></td>
                <td></td>
                <td>${saldoA}</td>
            </tr>
            <tr>
                <td>Compra</td>
                <td>${compraUnidadA}</td>
                <td></td>
                <td>${existenciasA}</td>
                <td>${pCompraMPA}</td>
                <td>${costoPromedioA}</td>
                <td>${debeA}</td>
                <td></td>
                <td>${saldoA2}</td>
            </tr>
            <tr>
                <td>Producción</td>
                <td></td>
                <td>${totalPresupuestoMPNecesariaA}</td>
                <td>${inventarioFMPA}</td>
                <td></td>
                <td>${costoPromedioA}</td>
                <td></td>
                <td>${haberA}</td>
                <td>${saldoA2  - haberA}</td>
            </tr>
        </tbody>
    </table>
            <h3>Materia prima B</h3>
            ${tablaCostoPromedio}
            <tbody>
            <tr>
                <td>Inventario Inicial</td>
                <td></td>
                <td></td>
                <td>${inventarioIMPB}</td>
                <td>${precioIIMPB}</td>
                <td>${precioIIMPB}</td>
                <td></td>
                <td></td>
                <td>${saldoB}</td>
            </tr>
            <tr>
                <td>Compra</td>
                <td>${compraUnidadB}</td>
                <td></td>
                <td>${existenciasB}</td>
                <td>${pCompraMPB}</td>
                <td>${costoPromedioB}</td>
                <td>${debeB}</td>
                <td></td>
                <td>${saldoB2}</td>
            </tr>
            <tr>
                <td>Producción</td>
                <td></td>
                <td>${totalPresupuestoMPNecesariaB}</td>
                <td>${inventarioFMPB}</td>
                <td></td>
                <td>${costoPromedioB}</td>
                <td></td>
                <td>${haberB}</td>
                <td>${saldoB2  - haberB}</td>
            </tr>
        </tbody>
    </table>
            <h3>Materia prima C</h3>
            ${tablaCostoPromedio}
            <tbody>
            <tr>
                <td>Inventario Inicial</td>
                <td></td>
                <td></td>
                <td>${inventarioIMPC}</td>
                <td>${precioIIMPC}</td>
                <td>${precioIIMPC}</td>
                <td></td>
                <td></td>
                <td>${saldoC}</td>
            </tr>
            <tr>
                <td>Compra</td>
                <td>${compraUnidadC}</td>
                <td></td>
                <td>${existenciasC}</td>
                <td>${pCompraMPC}</td>
                <td>${costoPromedioC}</td>
                <td>${debeC}</td>
                <td></td>
                <td>${saldoC2}</td>
            </tr>
            <tr>
                <td>Producción</td>
                <td></td>
                <td>${totalPresupuestoMPNecesariaC}</td>
                <td>${inventarioFMPC}</td>
                <td></td>
                <td>${costoPromedioC}</td>
                <td></td>
                <td>${haberC}</td>
                <td>${saldoC2  - haberC}</td>
            </tr>
        </tbody>
    </table>
            `;
            break;
    };
    document.getElementById('mostrarTarjeta').innerHTML = mostrarTarjeta;

    totalMateriaPrima = haberA + haberB + haberC;
    document.getElementById('materiaPT').innerHTML = `
    <p>Materia Prima: ${totalMateriaPrima}</p>
    `;
};

function presupuestoMO(){
    let horasArt = parseFloat(document.getElementById('horasArt').value);
    let costoTotalMO = parseFloat(document.getElementById('costoTotal').value);
    // Total de HRS MO
    let totalHrsMO = horasArt * totalPresupuestoProduccion;
    document.getElementById('totalHrs').innerHTML = `
    <h4>Total de Horas: ${totalHrsMO}</h4>
    `;
    // Total de MO a pagar
    manoObraPagar = totalHrsMO * costoTotalMO;
    document.getElementById('manoObraP').innerHTML = `
    <h4>Mano de Obra a pagar: ${manoObraPagar}</h4>
    `;

    document.getElementById('manoObraT').innerHTML = `
    <p>Mano de Obra: ${manoObraPagar}</p>
    `;
};

function presupuestoCargosIndirectos(){
    let materiaPI = parseFloat(document.getElementById('materiaPI').value);
    let manoObraI = parseFloat(document.getElementById('manoObraI').value);
    let renta = parseFloat(document.getElementById('renta').value);
    let energia = parseFloat(document.getElementById('energia').value);
    let mantenimiento = parseFloat(document.getElementById('mantenimiento').value);
    let varios = parseFloat(document.getElementById('varios').value);
    // Total Presupuesto de cargos indirectos
    totalCargosIndirectos = materiaPI + manoObraI + renta + energia + mantenimiento + varios;
    document.getElementById('totalCI').innerHTML = `
    <h4>Total: ${totalCargosIndirectos}</h4>
    `;
    document.getElementById('cargosIndirectos').innerHTML = `
    <p>Cargos Indirectos: ${totalCargosIndirectos}</p>
    `;
};

function presupuestoProduccion(){

    let totalProduccion = totalMateriaPrima + manoObraPagar + totalCargosIndirectos;

    document.getElementById('totalProduccion').innerHTML = `
    <h4> Total de producción: ${totalProduccion}</h4>
    `;
    costoUnitario = (totalProduccion/totalPresupuestoProduccion).toFixed(2);

    document.getElementById('costoUnitario').innerHTML = `
    <h4>Costo unitario: ${costoUnitario}</h4>
    `; 

    document.getElementById('precioUP').innerHTML = `
    <td>${costoUnitario}</td>
    `;

    document.getElementById('precioUP2').innerHTML = `
    <td>${costoUnitario}</td>
    `;
    
};

function presupuestoArticulosTerminados(){
    // Inventario Inicial
    let totalII = inventarioInicial * precioII;
    document.getElementById('totalII').innerHTML = `
    <td>${totalII}</td>
    `;
    // Unidades Producidas
    let totalUP = costoUnitario * totalPresupuestoProduccion;
    document.getElementById('totalUP').innerHTML = `
    <td>${totalUP}</td>
    `;
    // Produccion Disponible
    let unidadesDisponibles = inventarioInicial + totalPresupuestoProduccion;
    document.getElementById('unidadesDisp').innerHTML = `
    <td>${unidadesDisponibles}</td>
    `; 
    let totalDisponible = totalII + totalUP;
    document.getElementById('totalDisp').innerHTML = `
    <td>${totalDisponible}</td>
    `;
    // Costo de Venta
    let unidadesCosto = unidadesDisponibles - inventarioFinal;
    document.getElementById('costoUnidades').innerHTML = `
    <td>${unidadesCosto}</td>
    `;
    totalCostoVenta = unidadesCosto * costoUnitario;
    document.getElementById('totalCostoVenta').innerHTML = `
    <td>${totalCostoVenta}</td>
    `;
    document.getElementById('costoDeVentas').innerHTML = `
    <p>Costo de Ventas: ${totalCostoVenta}</p>
    `;
};

function presupuestosGastosOperacion(){
    let comisiones = parseFloat(document.getElementById('comisiones').value);
    let sueldos = parseFloat(document.getElementById('sueldos').value);
    let publicidad = parseFloat(document.getElementById('publicidad').value);
    let servicios = parseFloat(document.getElementById('servicios').value);
    let diversos = parseFloat(document.getElementById('diversos').value);
    totalGastosOperacion = comisiones + sueldos + publicidad + servicios + diversos;
    document.getElementById('totalGastosOperecion').innerHTML = `
    <h4>Total Gastos de Operación: ${totalGastosOperacion}</h4>
    `;
    document.getElementById('gastosOperacion').innerHTML = `
    <p>Gastos de Operación: ${totalGastosOperacion}</p
    `;
};

function estadoResultadoProyectado(){

    let utilidadBruta = totalPresupuestoVentas - totalCostoVenta;

    document.getElementById('utilidadBruta').innerHTML = `
    <h4>Utilidad Bruta: ${utilidadBruta}</h4>
    `;

    let utilidadOperacion = utilidadBruta - totalGastosOperacion;

    document.getElementById('utilidadOperacion').innerHTML = `
    <h4>Utilidad de Operación: ${utilidadOperacion}</h4>
    `;
};
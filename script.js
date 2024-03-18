var unidadesProducto;
var nombreProducto;
var precioProducto;
var totalPresupuestoVentas;
var inventarioInicial;
var inventarioFinal;
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


function calcularPresupuestoVentas(){
    nombreProducto = document.getElementById('producto').value;
    unidadesProducto = parseFloat(document.getElementById('unidades').value);
    precioProducto = parseFloat(document.getElementById('precio').value);
    totalPresupuestoVentas = precioProducto * unidadesProducto;

    document.getElementById('totalPV').textContent = 'Total ' + totalPresupuestoVentas;

    document.getElementById('totalPVR').textContent = 'Unidades a Vender ' + unidadesProducto;

    document.getElementById('productoR').textContent = 'Producto ' + nombreProducto;
};

function calcularPresupuestoProduccion(){
    inventarioInicial = parseFloat(document.getElementById('inventarioI').value);
    inventarioFinal = parseFloat(document.getElementById('inventarioF').value);
    totalPresupuestoProduccion = unidadesProducto - inventarioInicial + inventarioFinal
    document.getElementById('UnidadesProducir').textContent = 'Unidades a producir ' + totalPresupuestoProduccion;
};

function presupuestoMPNecesaria(){
    var materiaA = parseFloat(document.getElementById('a').value);
    var materiaB = parseFloat(document.getElementById('b').value);
    var materiaC = parseFloat(document.getElementById('c').value);
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
    var precioIIMPA = parseFloat(document.getElementById('costoIIMPA').value);
    var precioIIMPB = parseFloat(document.getElementById('costoIIMPB').value);
    var precioIIMPC = parseFloat(document.getElementById('costoIIMPC').value);

    // Selección de Tarjeta de Almacén
    var metodoValuacion = document.getElementById('metodoValuacion').value;
    var mostrarTarjeta;
    // tabla principal UEPS y PEPS
    var tablaPEPSYUEPS = `
    <table>
        <thead>
            <tr>
                <th>Concepto</th>
                <th>Entrada</th>
                <th>Salida</th>
                <th>Existencias</th>
                <th>C/U</th>
                <th>Debe</th>
                <th>Haber</th>
                <th>Saldo</th>
            </tr>
        </thead>
    `;

    switch (metodoValuacion) {
        case "peps":
            // PEPS
            var saldo = inventarioIMPA * precioIIMPA;
            var existencias = compraUnidadA + inventarioIMPA;
            var debe = compraUnidadA * pCompraMPA;
            var saldo2 = debe + saldo;
            var existencias2 = compraUnidadA - existencias;

            mostrarTarjeta = `
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
                <td>${saldo}</td>
            </tr>
            <tr>
                <td>Compra</td>
                <td>${compraUnidadA}</td>
                <td></td>
                <td>${existencias}</td>
                <td>${pCompraMPA}</td>
                <td>${debe}</td>
                <td></td>
                <td>${saldo2}</td>
            </tr>
            <tr>
                <td>Producción</td>
                <td></td>
                <td>${compraUnidadA}</td>
                <td>${existencias2}</td>
                <td></td>
                <td></td>
                <td>${(inventarioIMPA*precioIIMPA)+(existencias*pCompraMPA)}</td>
                <td></td>
            </tr>
        </tbody>
    </table>
            `;
            break;
        case "ueps":
            mostrarTarjeta = `
            <p>2</p>
            `;
            break;
        case "costoPromedio":
            mostrarTarjeta = `
            <p>3</p>
            `;
            break;
    };
    document.getElementById('mostrarTarjeta').innerHTML = mostrarTarjeta;
};
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

}


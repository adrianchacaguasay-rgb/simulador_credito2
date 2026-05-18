// ======================================
// SIMULADOR.JS
// ======================================


// ======================================
// VARIABLES GLOBALES
// ======================================
let clientes = [];
let creditos = [];

let tasaConfigurada = 15;

let clienteSeleccionado = null;

let cuotaCalculada = 0;
let montoCalculado = 0;
let plazoCalculado = 0;

let creditoAprobado = false;


// ======================================
// SECCIONES
// ======================================
function ocultarSecciones() {

    let ids = ["parametros", "clientes", "credito"];

    for (let i = 0; i < ids.length; i++) {

        let componente = document.getElementById(ids[i]);

        if (componente != null) {
            componente.classList.remove("activa");
        }
    }
}

function mostrarSeccion(id) {

    ocultarSecciones();

    let componente = document.getElementById(id);

    if (componente != null) {
        componente.classList.add("activa");
    }
}


// ======================================
// CONFIGURAR TASA
// ======================================
function guardarTasa() {

    let tasa = recuperarFloat("tasaInteres");

    if (isNaN(tasa)) {

        mostrarTexto(
            "mensajeTasa",
            "Ingrese una tasa válida"
        );

        return;
    }

    if (tasa >= 10 && tasa <= 20) {

        tasaConfigurada = tasa;

        mostrarTexto(
            "mensajeTasa",
            "Tasa configurada correctamente: " +
            tasa + "%"
        );

    } else {

        mostrarTexto(
            "mensajeTasa",
            "La tasa debe estar entre 10% y 20%"
        );
    }
}


// ======================================
// GUARDAR CLIENTE
// ======================================
function guardarCliente() {

    let cedula = recuperaraTexto("cedula");
    let nombre = recuperaraTexto("nombre");
    let apellido = recuperaraTexto("apellidos");

    let ingresos = recuperarFloat("ingresos");
    let egresos = recuperarFloat("egresos");


    // VALIDACIONES BASICAS
    if (cedula == "" ||
        nombre == "" ||
        apellido == "") {

        alert("Complete todos los campos");
        return;
    }

    if (isNaN(ingresos) ||
        isNaN(egresos)) {

        alert("Ingresos y egresos deben ser numéricos");
        return;
    }


    // BUSCAR CLIENTE
    let clienteExistente =
        buscarCliente(cedula);


    // CREAR NUEVO
    if (clienteExistente == null) {

        let cliente = {

            cedula: cedula,
            nombre: nombre,
            apellido: apellido,
            ingresos: ingresos,
            egresos: egresos
        };

        clientes.push(cliente);

    } else {

        // ACTUALIZAR
        clienteExistente.nombre = nombre;
        clienteExistente.apellido = apellido;
        clienteExistente.ingresos = ingresos;
        clienteExistente.egresos = egresos;
    }

    pintarClientes();

    limpiarFormularioCliente();
}


// ======================================
// PINTAR CLIENTES
// ======================================
function pintarClientes() {

    let filas = "";

    for (let i = 0; i < clientes.length; i++) {

        filas +=
            "<tr>" +

            "<td>" + clientes[i].cedula + "</td>" +
            "<td>" + clientes[i].nombre + "</td>" +
            "<td>" + clientes[i].apellido + "</td>" +
            "<td>" + clientes[i].ingresos + "</td>" +
            "<td>" + clientes[i].egresos + "</td>" +

            "<td>" +

            "<button onclick=\"seleccionarCliente('" +
            clientes[i].cedula +
            "')\">Actualizar</button>" +

            "<button onclick=\"eliminarCliente('" +
            clientes[i].cedula +
            "')\">Eliminar</button>" +

            "</td>" +

            "</tr>";
    }

    let tabla =
        document.getElementById("tablaClientes");

    if (tabla != null) {
        tabla.innerHTML = filas;
    }
}


// ======================================
// BUSCAR CLIENTE
// ======================================
function buscarCliente(cedula) {

    for (let i = 0; i < clientes.length; i++) {

        if (clientes[i].cedula === cedula) {

            return clientes[i];
        }
    }

    return null;
}


// ======================================
// SELECCIONAR CLIENTE
// ======================================
function seleccionarCliente(cedula) {

    let cliente = buscarCliente(cedula);

    if (cliente == null) {
        return;
    }

    clienteSeleccionado = cliente;

    mostrarTextoEnCaja(
        "cedula",
        cliente.cedula
    );

    mostrarTextoEnCaja(
        "nombre",
        cliente.nombre
    );

    mostrarTextoEnCaja(
        "apellidos",
        cliente.apellido
    );

    mostrarTextoEnCaja(
        "ingresos",
        cliente.ingresos
    );

    mostrarTextoEnCaja(
        "egresos",
        cliente.egresos
    );
}


// ======================================
// ELIMINAR CLIENTE
// ======================================
function eliminarCliente(cedula) {

    for (let i = 0; i < clientes.length; i++) {

        if (clientes[i].cedula === cedula) {

            clientes.splice(i, 1);

            break;
        }
    }

    pintarClientes();
}


// ======================================
// LIMPIAR FORMULARIO CLIENTE
// ======================================
function limpiarFormularioCliente() {

    mostrarTextoEnCaja("cedula", "");
    mostrarTextoEnCaja("nombre", "");
    mostrarTextoEnCaja("apellidos", "");
    mostrarTextoEnCaja("ingresos", "");
    mostrarTextoEnCaja("egresos", "");
}


// ======================================
// BUSCAR CLIENTE PARA CREDITO
// ======================================
function buscarClienteCredito() {

    let cedula =
        recuperaraTexto("buscarCedulaCredito");

    let cliente =
        buscarCliente(cedula);


    if (cliente == null) {

        mostrarTexto(
            "datosClienteCredito",
            "CLIENTE NO ENCONTRADO"
        );

        clienteSeleccionado = null;

        return;
    }


    clienteSeleccionado = cliente;


    let datos =
        "<h3>Datos del Cliente</h3>" +

        "<p><strong>Cédula:</strong> " +
        cliente.cedula +
        "</p>" +

        "<p><strong>Nombre:</strong> " +
        cliente.nombre +
        "</p>" +

        "<p><strong>Apellido:</strong> " +
        cliente.apellido +
        "</p>" +

        "<p><strong>Ingresos:</strong> " +
        cliente.ingresos +
        "</p>" +

        "<p><strong>Egresos:</strong> " +
        cliente.egresos +
        "</p>";


    document.getElementById(
        "datosClienteCredito"
    ).innerHTML = datos;
}


// ======================================
// CALCULAR CREDITO
// ======================================
function calcularCredito() {

    if (clienteSeleccionado == null) {

        alert("Seleccione un cliente");

        return;
    }


    let monto =
        recuperarFloat("montoCredito");

    let plazo =
        recuperarFloat("plazoCredito");


    if (isNaN(monto) || isNaN(plazo)) {

        alert("Ingrese monto y plazo válidos");

        return;
    }


    let ingresos =
        clienteSeleccionado.ingresos;

    let egresos =
        clienteSeleccionado.egresos;


    let disponible =
        calcularDisponible(
            ingresos,
            egresos
        );

    let capacidad =
        capacidadDePago(disponible);

    let interes =
        calcularInteresSimple(
            monto,
            tasaConfigurada,
            plazo
        );

    let total =
        calcularTotalPagar(
            monto,
            interes
        );

    let cuota =
        calcularCuotaMensual(
            total,
            plazo
        );

    let aprobado =
        aprobarCredito(
            capacidad,
            cuota
        );


    creditoAprobado = aprobado;


    let resultado = "";


    if (aprobado) {

        resultado = "APROBADO";

        document.getElementById(
            "resultadoCredito"
        ).className = "aprobado";

        let boton =
            document.getElementById(
                "btnSolicitarCredito"
            );

        if (boton != null) {
            boton.disabled = false;
        }

    } else {

        resultado = "RECHAZADO";

        document.getElementById(
            "resultadoCredito"
        ).className = "rechazado";

        let boton =
            document.getElementById(
                "btnSolicitarCredito"
            );

        if (boton != null) {
            boton.disabled = true;
        }
    }


    let salida =

        "Capacidad de pago: " +
        capacidad.toFixed(2) +

        "<br>" +

        "Total a pagar: " +
        total.toFixed(2) +

        "<br>" +

        "Cuota mensual: " +
        cuota.toFixed(2) +

        "<br>" +

        "Resultado: " +
        resultado;


    document.getElementById(
        "resultadoCredito"
    ).innerHTML = salida;


    montoCalculado = monto;
    plazoCalculado = plazo;
    cuotaCalculada = cuota;
}


// ======================================
// ASIGNAR CREDITO
// ======================================
function asignarCredito() {

    if (clienteSeleccionado == null) {

        alert("No existe cliente seleccionado");

        return;
    }

    if (!creditoAprobado) {

        alert("El crédito no está aprobado");

        return;
    }


    let credito = {

        cedula:
            clienteSeleccionado.cedula,

        nombre:
            clienteSeleccionado.nombre,

        apellido:
            clienteSeleccionado.apellido,

        monto:
            montoCalculado,

        tasa:
            tasaConfigurada,

        plazo:
            plazoCalculado,

        cuota:
            cuotaCalculada
    };


    creditos.push(credito);


    alert("Crédito asignado correctamente");
}
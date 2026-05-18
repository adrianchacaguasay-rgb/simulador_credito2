// ======================================
// UTILITARIOS.JS
// ======================================


// ======================================
// RECUPERAR DATOS
// ======================================
function recuperaraTexto(idComponente) {

    let componente = document.getElementById(idComponente);

    if (componente == null) {
        console.log("No existe el componente:", idComponente);
        return "";
    }

    return componente.value;
}

function recuperarInt(idComponente) {

    let valorCaja = recuperaraTexto(idComponente);

    return parseInt(valorCaja);
}

function recuperarFloat(idComponente) {

    let valorCaja = recuperaraTexto(idComponente);

    return parseFloat(valorCaja);
}


// ======================================
// MOSTRAR DATOS
// ======================================
function mostrarTexto(idComponente, mensaje) {

    let componente = document.getElementById(idComponente);

    if (componente != null) {
        componente.innerText = mensaje;
    }
}

function mostrarTextoEnCaja(idComponente, mensaje) {

    let componente = document.getElementById(idComponente);

    if (componente != null) {
        componente.value = mensaje;
    }
}

function mostrarImagen(idComponente, rutaImagen) {

    let componente = document.getElementById(idComponente);

    if (componente != null) {
        componente.src = rutaImagen;
    }
}


// ======================================
// FORMATO MONEDA
// ======================================
function texto(idComponente, valor) {

    let componente = document.getElementById(idComponente);

    if (componente != null) {
        componente.innerText = "USD " + valor.toFixed(2);
    }
}


// ======================================
// EXTRAER NUMEROS
// ======================================
function extraer(idComponente) {

    let componente = document.getElementById(idComponente);

    if (componente == null) {
        return 0;
    }

    return parseFloat(componente.value);
}


// ======================================
// VALIDACIONES VISUALES
// ======================================
function mostrarError(inputId, errorId, mensaje) {

    let input = document.getElementById(inputId);
    let error = document.getElementById(errorId);

    if (input != null) {
        input.classList.add("error-input");
    }

    if (error != null) {
        error.innerText = mensaje;
    }
}

function limpiarErrores() {

    let errores = document.querySelectorAll(".error");

    errores.forEach(function (e) {
        e.innerText = "";
    });

    let inputs = document.querySelectorAll("input");

    inputs.forEach(function (i) {
        i.classList.remove("error-input");
    });
}


// ======================================
// LOGICA DEL NEGOCIO
// ======================================
function calcularDisponible(ingresos, egresos) {

    let disponible = ingresos - egresos;

    if (disponible < 0) {
        return 0;
    }

    return disponible;
}

function capacidadDePago(disponible) {

    return disponible * 0.5;
}

function calcularInteresSimple(monto, tasa, plazoAnios) {

    let interes =
        monto * (tasa / 100) * plazoAnios;

    return interes;
}

const APORTE_SOLCA = 100;

function calcularTotalPagar(monto, interes) {

    return monto + interes + APORTE_SOLCA;
}

function calcularCuotaMensual(total, plazoAnios) {

    let meses = plazoAnios * 12;

    return total / meses;
}

function aprobarCredito(capacidadPago, cuotaMensual) {

    return capacidadPago >= cuotaMensual;
}


// ======================================
// VALIDACIONES GENERALES
// ======================================
function validar() {

    let valido = true;

    limpiarErrores();

    let ingresos = extraer("txtIngresos");
    let arriendo = extraer("txtArriendo");
    let alimentacion = extraer("txtAlimentacion");
    let varios = extraer("txtVarios");

    let monto = extraer("txtMonto");
    let plazo = extraer("txtPlazo");
    let tasa = extraer("txtTasaInteres");


    // INGRESOS
    if (isNaN(ingresos)) {

        mostrarError(
            "txtIngresos",
            "errIngresos",
            "Campo obligatorio"
        );

        valido = false;

    } else if (ingresos < 100 || ingresos > 50000) {

        mostrarError(
            "txtIngresos",
            "errIngresos",
            "Entre 100 y 50,000 USD"
        );

        valido = false;
    }


    // ARRIENDO
    if (isNaN(arriendo)) {

        mostrarError(
            "txtArriendo",
            "errArriendo",
            "Campo obligatorio"
        );

        valido = false;

    } else if (arriendo < 0) {

        mostrarError(
            "txtArriendo",
            "errArriendo",
            "No negativo"
        );

        valido = false;
    }


    // ALIMENTACION
    if (isNaN(alimentacion)) {

        mostrarError(
            "txtAlimentacion",
            "errAlimentacion",
            "Campo obligatorio"
        );

        valido = false;

    } else if (alimentacion < 0) {

        mostrarError(
            "txtAlimentacion",
            "errAlimentacion",
            "No negativo"
        );

        valido = false;
    }


    // VARIOS
    if (isNaN(varios)) {

        mostrarError(
            "txtVarios",
            "errVarios",
            "Campo obligatorio"
        );

        valido = false;

    } else if (varios < 0) {

        mostrarError(
            "txtVarios",
            "errVarios",
            "No negativo"
        );

        valido = false;
    }


    // TOTAL EGRESOS
    let totalEgresos =
        (arriendo || 0) +
        (alimentacion || 0) +
        (varios || 0);

    if (!isNaN(ingresos) &&
        totalEgresos > ingresos) {

        mostrarError(
            "txtVarios",
            "errVarios",
            "Egresos mayores a ingresos"
        );

        valido = false;
    }


    // MONTO
    if (isNaN(monto)) {

        mostrarError(
            "txtMonto",
            "errMonto",
            "Campo obligatorio"
        );

        valido = false;

    } else if (monto < 500 || monto > 100000) {

        mostrarError(
            "txtMonto",
            "errMonto",
            "Entre 500 y 100,000 USD"
        );

        valido = false;
    }


    // PLAZO
    if (isNaN(plazo)) {

        mostrarError(
            "txtPlazo",
            "errPlazo",
            "Campo obligatorio"
        );

        valido = false;

    } else if (plazo < 1 || plazo > 30) {

        mostrarError(
            "txtPlazo",
            "errPlazo",
            "Entre 1 y 30 años"
        );

        valido = false;
    }


    // TASA
    if (isNaN(tasa)) {

        mostrarError(
            "txtTasaInteres",
            "errTasa",
            "Campo obligatorio"
        );

        valido = false;

    } else if (tasa < 1 || tasa > 25) {

        mostrarError(
            "txtTasaInteres",
            "errTasa",
            "Entre 1% y 25%"
        );

        valido = false;
    }

    return valido;
}


// ======================================
// REINICIAR
// ======================================
function reiniciar() {

    let inputs = document.querySelectorAll("input");

    inputs.forEach(function (i) {
        i.value = "";
    });

    mostrarTexto("spnDisponible", "0");
    mostrarTexto("spnCapacidadPago", "0");
    mostrarTexto("spnEgresos", "0");
    mostrarTexto("spnInteresPagar", "0");
    mostrarTexto("spnTotalPrestamo", "0");
    mostrarTexto("spnCuotaMensual", "0");

    mostrarTexto(
        "spnEstadoCredito",
        "ANALIZANDO..."
    );

    limpiarErrores();
}
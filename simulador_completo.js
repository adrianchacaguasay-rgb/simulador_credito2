
let clientes = [];
let creditos = [];

let tasaInteres = 15;
let clienteSeleccionado = null;
let cuotaCalculada = 0;
let montoCalculado = 0;
let plazoCalculado = 0;
let creditoAprobado = false;


//Para recuperar o mostrar información usar los métodos de la clase utilitarios, puede agregar métodos adicionales en utilitarios
function ocultarSecciones() {
  let componente = document.getElementById("parametros");
  let listaClass = componente.classList;
  listaClass.remove("activa");

  let componente2 = document.getElementById("clientes");
  let listaClass2 = componente2.classList;
  listaClass2.remove("activa");
}


function mostrarSeccion(id) {
  ocultarSecciones();

  let componente = document.getElementById(id);
  let listaClass = componente.classList;
  listaClass.add("activa");
}

function guardarTasa() {
  let tasa = recuperarFloat("tasaInteres");

  if (tasa >= 10 && tasa <= 20) {
    tasaConfigurada = tasa;
    mostrarTexto("mensajeTasa", "Tasa configurada correctamente: " + tasa + "%");
  } else {
    mostrarTexto("mensajeTasa", "La tasa debe estar entre 10% y 20%");
  }
}
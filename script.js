let filtroActual = "todas";

function filtrar(tipo) {
  filtroActual = tipo;
  renderizarTareas();
}

let tareas = JSON.parse(localStorage.getItem("tareas")) || [];

function guardarTareas() {
  localStorage.setItem("tareas", JSON.stringify(tareas));
}

function renderizarTareas() {
  const lista = document.getElementById("lista");
  lista.innerHTML = "";

  let tareasFiltradas = tareas;

    if (filtroActual === "pendientes") {
    tareasFiltradas = tareas.filter(t => !t.completada);
    }

    if (filtroActual === "completadas") {
    tareasFiltradas = tareas.filter(t => t.completada);
    }

  tareasFiltradas.forEach((tarea) => {
  const indexReal = tareas.indexOf(tarea);

  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = tarea.texto;

  if (tarea.completada) {
    span.classList.add("completada");
  }

  span.onclick = () => {
    tareas[indexReal].completada = !tareas[indexReal].completada;
    guardarTareas();
    renderizarTareas();
  };

  const botonEliminar = document.createElement("button");
  botonEliminar.textContent = "Eliminar";

  botonEliminar.onclick = () => {
    tareas.splice(indexReal, 1);
    guardarTareas();
    renderizarTareas();
  };

  li.appendChild(span);
  li.appendChild(botonEliminar);
  lista.appendChild(li);
});

}

function agregarTarea() {
  const input = document.getElementById("tareaInput");
  const texto = input.value;

  if (texto === "") {
    alert("Escribe una tarea");
    return;
  }

  tareas.push({
    texto: texto,
    completada: false
  });

  guardarTareas();
  renderizarTareas();

  input.value = "";
}

renderizarTareas();

document.getElementById("tareaInput").addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    agregarTarea();
  }
});

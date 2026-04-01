// ======================
// ESTADO GLOBAL
// ======================
let tareas = JSON.parse(localStorage.getItem("tareas")) || [];
let filtroActual = "todas";

// ======================
// FUNCIONES PRINCIPALES
// ======================
function guardarTareas() {
  localStorage.setItem("tareas", JSON.stringify(tareas));
}

function filtrar(tipo) {
  filtroActual = tipo;
  renderizarTareas();
}

function agregarTarea() {
  const input = document.getElementById("tareaInput");
  const texto = input.value.trim();

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

// ======================
// RENDERIZADO
// ======================
function renderizarTareas() {
  const lista = document.getElementById("lista");
  lista.innerHTML = "";

  let tareasFiltradas = obtenerTareasFiltradas();

  tareasFiltradas.forEach((tarea) => {
    const indexReal = tareas.indexOf(tarea);

    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = tarea.texto;

    if (tarea.completada) {
      span.classList.add("completada");
    }

    // Marcar como completada
    span.onclick = () => {
      tareas[indexReal].completada = !tareas[indexReal].completada;
      guardarTareas();
      renderizarTareas();
    };

    // Botón eliminar
    const botonEliminar = document.createElement("button");
    botonEliminar.textContent = "Eliminar";

    botonEliminar.onclick = () => {
      tareas.splice(indexReal, 1);
      guardarTareas();
      renderizarTareas();
    };

    // Botón editar
    const botonEditar = document.createElement("button");
    botonEditar.textContent = "Editar";

    botonEditar.onclick = () => {
      const nuevoTexto = prompt("Editar tarea:", tarea.texto);

      if (nuevoTexto !== null && nuevoTexto.trim() !== "") {
        tareas[indexReal].texto = nuevoTexto.trim();
        guardarTareas();
        renderizarTareas();
      }
    };

    // Agregar elementos al li
    li.appendChild(span);
    li.appendChild(botonEditar);
    li.appendChild(botonEliminar);

    lista.appendChild(li);
  });
}

// ======================
// FILTROS
// ======================
function obtenerTareasFiltradas() {
  if (filtroActual === "pendientes") {
    return tareas.filter(t => !t.completada);
  }

  if (filtroActual === "completadas") {
    return tareas.filter(t => t.completada);
  }

  return tareas;
}

// ======================
// EVENTOS
// ======================
document.getElementById("tareaInput").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    agregarTarea();
  }
});

// ======================
// INICIALIZACIÓN
// ======================
renderizarTareas();

export function crearTablaConPaginacion({
  titulo,
  lista,
  columnas,
  renderFila,
  itemsPorPagina = 10,
  contenedorDestino,
}) {
  const section = document.createElement("section");
  section.classList.add("admin-section");

  const heading = document.createElement("h3");
  heading.textContent = titulo;
  heading.classList.add("admin-subtitulo");
  section.appendChild(heading);

  const tabla = document.createElement("table");
  tabla.classList.add("admin-tabla");

  const thead = document.createElement("thead");
  const headRow = document.createElement("tr");
  columnas.forEach((col) => {
    const th = document.createElement("th");
    th.textContent = col;
    th.classList.add("admin-th");
    headRow.appendChild(th);
  });
  thead.appendChild(headRow);
  tabla.appendChild(thead);

  const tbody = document.createElement("tbody");
  tabla.appendChild(tbody);
  section.appendChild(tabla);

  let paginaActual = 1;
  const totalPaginas = Math.ceil(lista.length / itemsPorPagina);

  const renderPagina = () => {
    tbody.innerHTML = "";
    const inicio = (paginaActual - 1) * itemsPorPagina;
    const fin = inicio + itemsPorPagina;
    const itemsPagina = lista.slice(inicio, fin);

    itemsPagina.forEach((item) => {
      const tr = document.createElement("tr");
      tr.classList.add("admin-tr");

      const celdas = renderFila(item); // ← aquí estaba el error

      celdas.forEach((celda) => {
        const td = document.createElement("td");
        if (celda instanceof HTMLElement) {
          td.appendChild(celda);
        } else {
          td.textContent = celda;
        }
        td.classList.add("admin-td");
        tr.appendChild(td);
      });

      tbody.appendChild(tr);
    });
  };

  const paginacionDiv = document.createElement("div");
  paginacionDiv.classList.add("admin-paginacion");

  const btnAnterior = document.createElement("button");
  btnAnterior.textContent = "Anterior";
  btnAnterior.addEventListener("click", () => {
    if (paginaActual > 1) {
      paginaActual--;
      renderPagina();
      actualizarBotones();
    }
  });

  const btnSiguiente = document.createElement("button");
  btnSiguiente.textContent = "Siguiente";
  btnSiguiente.addEventListener("click", () => {
    if (paginaActual < totalPaginas) {
      paginaActual++;
      renderPagina();
      actualizarBotones();
    }
  });

  const actualizarBotones = () => {
    btnAnterior.disabled = paginaActual === 1;
    btnSiguiente.disabled = paginaActual === totalPaginas;
  };

  paginacionDiv.appendChild(btnAnterior);
  paginacionDiv.appendChild(btnSiguiente);
  section.appendChild(paginacionDiv);

  renderPagina();
  actualizarBotones();

  contenedorDestino.appendChild(section);
}

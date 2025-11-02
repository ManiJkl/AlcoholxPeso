document.addEventListener("DOMContentLoaded", () => {
  fetch("alcoholes.csv")
    .then(response => {
      if (!response.ok) {
        throw new Error("No se pudo cargar el archivo CSV");
      }
      return response.text();
    })
    .then(data => {
      const filas = data.split("\n").slice(1); // Saltar encabezado
      const tbody = document.querySelector("#tabla-alcohol tbody");
      tbody.innerHTML = "";

      filas.forEach(fila => {
        if (fila.trim() === "") return; // Evitar líneas vacías
        const columnas = fila.split(",");
        const tr = document.createElement("tr");

        columnas.forEach(celda => {
          const td = document.createElement("td");
          td.textContent = celda.trim();
          tr.appendChild(td);
        });

        tbody.appendChild(tr);
      });
    })
    .catch(error => {
      console.error("Error al cargar los datos:", error);
      const tbody = document.querySelector("#tabla-alcohol tbody");
      tbody.innerHTML = `<tr><td colspan="4" style="color:red;">Error al cargar los datos</td></tr>`;
    });
});

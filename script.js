// ===== AlcoholxPeso =====
// Este script carga los datos desde alcoholes.json
// y permite buscarlos por nombre.

document.addEventListener('DOMContentLoaded', () => {
  const contenedor = document.getElementById('contenedor');
  const buscador = document.getElementById('buscador');

  let datos = [];

  // Cargar los datos desde el archivo JSON
  fetch('alcoholes.json')
    .then(res => res.json())
    .then(data => {
      datos = data;
      mostrarAlcoholes(datos);
    })
    .catch(err => {
      contenedor.innerHTML = `<p style="color:red;">Error al cargar los datos.</p>`;
      console.error(err);
    });

  // Mostrar las cartas con los alcoholes
  function mostrarAlcoholes(lista) {
    contenedor.innerHTML = '';
    lista.forEach(item => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.innerHTML = `
        <h3>${item.Nombre}</h3>
        <p><b>Porcentaje:</b> ${item.Porcentaje}%</p>
        <p><b>Precio:</b> $${item.Precio}</p>
        <p><b>Mililitros:</b> ${item.ML}</p>
        <p><b>ML de alcohol:</b> ${item.ML_Alcohol}</p>
        <p><b>ML de alcohol por peso:</b> ${item.ML_Alcohol_Peso}</p>
      `;
      contenedor.appendChild(card);
    });
  }

  // Buscar por nombre
  buscador.addEventListener('input', e => {
    const texto = e.target.value.toLowerCase();
    const filtrados = datos.filter(a =>
      a.Nombre.toLowerCase().includes(texto)
    );
    mostrarAlcoholes(filtrados);
  });
});

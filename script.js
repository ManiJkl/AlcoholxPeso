const alcoholes = [
  { nombre: "Aguardiente Antioqueño", porcentaje: 29, precio: 32000, ml: 750, peso: 700 },
  { nombre: "Ron Medellín", porcentaje: 35, precio: 45000, ml: 750, peso: 730 },
  { nombre: "Whisky Old Parr", porcentaje: 40, precio: 120000, ml: 750, peso: 740 },
  { nombre: "Cerveza Club Colombia", porcentaje: 4.7, precio: 4500, ml: 330, peso: 350 },
  { nombre: "Four Loko", porcentaje: 12, precio: 13000, ml: 473, peso: 480 },
  { nombre: "Vino Gato Negro", porcentaje: 13, precio: 28000, ml: 750, peso: 760 },
  { nombre: "Tequila José Cuervo", porcentaje: 38, precio: 95000, ml: 750, peso: 730 },
  { nombre: "Baileys Irish Cream", porcentaje: 17, precio: 105000, ml: 750, peso: 740 }
];

const tbody = document.querySelector("tbody");

function mostrarAlcoholes(lista) {
  tbody.innerHTML = "";
  lista.forEach(a => {
    const alcoholPuro = (a.ml * a.porcentaje) / 100;
    const alcoholPorPeso = (alcoholPuro / a.peso) * 100;
    tbody.innerHTML += `
      <tr>
        <td>${a.nombre}</td>
        <td>${a.porcentaje}%</td>
        <td>${a.precio.toLocaleString()}</td>
        <td>${a.ml}</td>
        <td>${alcoholPuro.toFixed(1)}</td>
        <td>${alcoholPorPeso.toFixed(2)}</td>
      </tr>
    `;
  });
}

document.getElementById("buscador").addEventListener("keyup", e => {
  const texto = e.target.value.toLowerCase();
  const filtrados = alcoholes.filter(a => a.nombre.toLowerCase().includes(texto));
  mostrarAlcoholes(filtrados);
});

mostrarAlcoholes(alcoholes);

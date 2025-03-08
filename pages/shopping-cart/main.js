const url = "https://shoes-zen-default-rtdb.firebaseio.com/shoes.json";
let data;

async function getData() {
  try {
    let response = await fetch(url);
    if (!response.ok) throw new Error("Error en la petición");

    data = await response.json(); // Convertir respuesta a JSON
    // console.log("Datos obtenidos:", data);
    return data; // Devolver los datos para usarlos
  } catch (error) {
    console.error("Error:", error);
  }
}

// Llamar la función
await getData();

console.log("db", data);

let keys = Object.keys(data);

Object.keys(data).forEach((id) => {
  console.log(
    `ID: ${id}, title: ${data[id].title} price: ${data[id].price}, count: ${data[id].count}`
  );
});

let content = "";
let total = 0;
Object.keys(data).map((id) => {
  total += parseInt(data[id].price.slice(1, 6).replace(",", ""));

  let count = parseInt(data[id].count);

  let price = count * parseInt(data[id].price.slice(1, 6).replace(",", ""));
  price = price.toString();

  content += `
    <div class="col-6 py-5">
      <p>${data[id].title}</p>
    </div>
    <div class="col-3 py-5"><p>x ${data[id].count}</p></div>
    <div class="col-3 py-5">
      <p>$ ${price[0]},${price.slice(1)}.00</p>
    </div>
  `;

  console.log(parseInt(data[id].price.slice(1, 6).replace(",", "")));
  console.log(total);
});

total = total.toString();
console.log(total[0], total.slice(1));

document.querySelector(".content-products").innerHTML = content;

document.querySelector(".total-price").innerHTML = `$ ${total[0]},${total.slice(
  1
)}.00`;

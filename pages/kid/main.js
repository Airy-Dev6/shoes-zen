let shoes = [];
let dataCard = {};
let exists = false;
let indexShoes;
const url = "https://shoes-zen-default-rtdb.firebaseio.com/shoes.json";

const getCardData = (button) => {
  const card = button.closest(".card");

  const title = card.querySelector(".card-title").textContent;

  const price = card.querySelector(".card-text").textContent;

  shoes.forEach((element, index) => {
    if (element.title === title) {
      exists = true;
      indexShoes = index;
      console.log(index);
    }
  });

  if (exists) {
    shoes[indexShoes].count += 1;
    console.log(shoes[indexShoes].count);
  } else {
    dataCard = {
      title,
      price,
      count: 1,
    };
    shoes.push(dataCard);
    fetch(url, {
      method: "POST", // Método HTTP
      headers: { "Content-Type": "application/json" }, // Encabezados
      body: JSON.stringify({
        // Datos a enviar
        title,
        price,
        count: 1,
      }),
    })
      .then((response) => response.json()) // Convertir respuesta a JSON
      .then((data) => console.log("Post creado:", data)) // Mostrar respuesta
      .catch((error) => console.error("Error:", error));
  }

  console.log(shoes);

  exists = false;
};

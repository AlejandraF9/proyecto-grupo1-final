export function renderCategorys(container) {
  const categorysSection = document.createElement("div");
  categorysSection.classList.add("categorys-section");

  const containerCategorys = document.createElement("div");
  containerCategorys.classList.add("categorys-container");

  // CATEGORÍA: Individuales
  const individualCategory = document.createElement("div");
  individualCategory.classList.add("category-individual");

  const imgIndividual = document.createElement("img");
  imgIndividual.classList.add("individual-image");
  imgIndividual.src =
    "https://images.unsplash.com/photo-1634324040880-63dbf9a4e5ac?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  imgIndividual.alt = "Individual category image";

  const textIndividual = document.createElement("h2");
  textIndividual.classList.add("individual-text");
  textIndividual.textContent = "pavlova";

  individualCategory.appendChild(imgIndividual);
  individualCategory.appendChild(textIndividual);

  // CATEGORÍA: Tartas
  const cakeCategory = document.createElement("div");
  cakeCategory.classList.add("category-cake");

  const imgCake = document.createElement("img");
  imgCake.classList.add("cake-image");
  imgCake.src =
    "https://images.unsplash.com/photo-1595272568891-123402d0fb3b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  imgCake.alt = "Cake category image";

  const textCake = document.createElement("h2");
  textCake.classList.add("cake-text");
  textCake.textContent = "tarta arándanos y limón";

  cakeCategory.appendChild(imgCake);
  cakeCategory.appendChild(textCake);

  // CATEGORÍA: Combinaciones
  const combinationsCategory = document.createElement("div");
  combinationsCategory.classList.add("category-combinations");

  const imgCombinations = document.createElement("img");
  imgCombinations.classList.add("combinations-image");
  imgCombinations.src =
    "https://images.unsplash.com/photo-1569305773791-7b9246c0db75?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  imgCombinations.alt = "Combinations category image";

  const textCombinations = document.createElement("h2");
  textCombinations.classList.add("combinations-text");
  textCombinations.textContent = "Rollitos de canela";

  combinationsCategory.appendChild(imgCombinations);
  combinationsCategory.appendChild(textCombinations);

  // CATEGORÍA: Bebidas
  const drinksCategory = document.createElement("div");
  drinksCategory.classList.add("category-drinks");

  const imgDrinks = document.createElement("img");
  imgDrinks.classList.add("drinks-image");
  imgDrinks.src =
    "https://images.unsplash.com/photo-1526424382096-74a93e105682?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  imgDrinks.alt = "Drinks category image";

  const textDrinks = document.createElement("h2");
  textDrinks.classList.add("drinks-text");
  textDrinks.textContent = "Granizado lima-limón";

  drinksCategory.appendChild(imgDrinks);
  drinksCategory.appendChild(textDrinks);

  // MONTAJE FINAL
  const categorysWrapper = document.createElement("div");
  categorysWrapper.classList.add("categorys-wrapper");

  categorysWrapper.appendChild(individualCategory);
  categorysWrapper.appendChild(cakeCategory);
  categorysWrapper.appendChild(combinationsCategory);
  categorysWrapper.appendChild(drinksCategory);

  containerCategorys.appendChild(categorysWrapper);

  container.appendChild(containerCategorys);
  return containerCategorys;
}

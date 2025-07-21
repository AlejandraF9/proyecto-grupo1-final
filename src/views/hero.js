export function renderHero() {
  const containerHero = document.createElement("div");
  containerHero.classList.add("hero-container");

  // Contenido textual
  const promoText = document.createElement("h2");
  promoText.classList.add("hero-promo-text");
  promoText.textContent = "¡PROMO #DummieRosquis!";
  containerHero.appendChild(promoText);

  const esloganText = document.createElement("h1");
  esloganText.classList.add("hero-eslogan-text");
  esloganText.textContent = "Vive un momento dulce";
  containerHero.appendChild(esloganText);

  const descText = document.createElement("p");
  descText.classList.add("hero-text");
  descText.textContent =
    "Disfruta de nuestra repostería artesanal en cualquier momento del día a un solo click";
  containerHero.appendChild(descText);

  const buttonFrame = document.createElement("div");
  buttonFrame.classList.add("hero-button-frame");

  const buttonGroup = document.createElement("div");
  buttonGroup.classList.add("hero-button-group");

  const buttonBox = document.createElement("div");
  buttonBox.classList.add("hero-button-box");

  const buttonText = document.createElement("div");
  buttonText.classList.add("hero-button-text");
  buttonText.textContent = "SHOP NOW";

  buttonGroup.appendChild(buttonBox);
  buttonGroup.appendChild(buttonText);
  buttonFrame.appendChild(buttonGroup);
  containerHero.appendChild(buttonFrame);

  document.body.appendChild(containerHero);
  return containerHero;
}

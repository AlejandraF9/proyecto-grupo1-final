//container madre
const contactContainer = document.getElementById("contactContainer");
//title común
const contactTitle = document.createElement("h2");
contactTitle.className = "title-h2";
contactTitle.textContent = "Contacto";
contactContainer.appendChild(contactTitle);
//div direcciones
const contactOneDiv = document.createElement("div");
contactOneDiv.className = "primary-div-contact";
contactContainer.appendChild(contactOneDiv);


//subtítulo
const contactH3 = document.createElement("h3");
contactH3.className = "title-h3";
contactH3.textContent= "Nuestras tiendas y horarios";
contactOneDiv.appendChild(contactH3);

//div La laguna
const contactOneDivLaguna = document.createElement("div");
contactOneDivLaguna.className"secondary-div-contact";
contactOneDiv.appendChild(contactOneDivLaguna);
//Contenido la Laguna
const titleLaguna = document.createElement("h4");
titleLaguna.className = "title-h4";
titleLaguna.textContent = "La Laguna";
contactOneDivLaguna.appendChild(titleLaguna);

const addressLaguna = document.createElement("p");
addressLaguna.className = "address-contact";
addressLaguna.innerHTML = 
`Avenida Bartolomé Cairasco, Nº 4 <br> 
Miércoles a Domingo: 9:30 &ndash; 19:00 <br> 
922 123 456`;
contactOneDivLaguna.appendChild(addressLaguna);

const lagunaMap = document.createElement("a");
lagunaMap.href = "https://www.google.es/maps/place/Ayuntamiento+de+San+Crist%C3%B3bal+de+La+Laguna/@28.4872516,-16.316552,17z/data=!3m1!4b1!4m6!3m5!1s0xc41cd92f6b6282f:0x8676e823d9daf0d1!8m2!3d28.4872516!4d-16.3139771!16s%2Fg%2F1tv25d4_?entry=ttu&g_ep=EgoyMDI1MDcyMC4wIKXMDSoASAFQAw%3D%3D";
contactOneDivLaguna.appendChild(lagunaMap);

//div Tacoronte
const contactOneDivTacoronte = document.createElement("div");
contactOneDivTacoronte.className"secondary-div-contact";
contactOneDiv.appendChild(contactOneDivTacoronte);
//Contenido Tacoronte
const titleTacoronte = document.createElement("h4");
titleTacoronte.className = "title-h4";
titleTacoronte.textContent = "Tacoronte";
contactOneDivTacoronte.appendChild(titleTacoronte);

const addressTacoronte = document.createElement("p");
addressTacoronte.className = "address-contact";
addressTacoronte.innerHTML = 
`C/ La madroña , Nº 25 <br> 
Miércoles a Domingo: 9:30 &ndash; 19:00 <br> 
922 789 123`
contactOneDivTacoronte.appendChild(addressTacoronte);

const tacoronteMap = document.createElement("a");
tacoronteMap.href = "https://www.google.es/maps/place/Ayuntamiento+De+Tacoronte/@28.4807883,-16.4152628,17z/data=!3m1!4b1!4m6!3m5!1s0xc41d22e2a7529b9:0x82bdc1c6ead95c47!8m2!3d28.4807883!4d-16.4126879!16s%2Fg%2F1q5bm_42n?entry=ttu&g_ep=EgoyMDI1MDcyMC4wIKXMDSoASAFQAw%3D%3D";
contactOneDivTacoronte.appendChild(tacoronteMap);

//div Santa Úrsula
const contactOneDivUrsula = document.createElement("div");
contactOneDivUrsula.className"secondary-div-contact";
contactOneDiv.appendChild(contactOneDivUrsula);
//Contenido Santa Úrsula
const titleUrsula = document.createElement("h4");
titleUrsula.className = "title-h4";
titleUrsula.textContent = "Santa Úrsula";
contactOneDivUrsula.appendChild(titleUrsula);

const addressUrsula = document.createElement("p");
addressUrsula.className = "address-contact";
addressUrsula.innerHTML = 
`C/ Las Vistas , Nº 53 <br> 
Miércoles a Domingo: 9:30 &ndash; 19:00 <br> 
922 789 123`
contactOneDivUrsula.appendChild(addressUrsula);

const ursulaMap = document.createElement("a");
ursulaMap.href = "https://www.google.es/maps/search/Ayuntamiento+santa+%C3%BArsula/@28.4255478,-16.4944483,17z/data=!3m1!4b1?entry=ttu&g_ep=EgoyMDI1MDcyMC4wIKXMDSoASAFQAw%3D%3D"
contactOneDivUrsula.appendChild(ursulaMap);



//div Icod
const contactOneDivIcod = document.createElement("div");
contactOneDivIcod.className"secondary-div-contact";
contactOneDiv.appendChild(contactOneDivIcod);
//Contenido Icod
const titleIcod = document.createElement("h4");
titleIcod.className = "title-h4";
titleIcod.textContent = "IcoD de los Vinos";
contactOneDivIcod.appendChild(titleIcod);

const addressIcod = document.createElement("p");
addressIcod.className = "address-contact";
addressIcod.className = "address-contact";
addressIcod.innerHTML = 
`C/ Las Tablas , Nº 14 <br> 
Miércoles a Domingo: 9:30 &ndash; 19:00 <br> 
922 789 123`;
contactOneDivIcod.appendChild(addressIcod);

const icodMap = document+.createElement("a");
icodMap,href = "https://www.google.es/maps/place/Ayuntamiento+de+Icod+de+los+Vinos/@28.3676579,-16.7217858,17z/data=!3m1!4b1!4m6!3m5!1s0xc6a7d5500000001:0xfab654561418de8c!8m2!3d28.3676579!4d-16.7192109!16s%2Fg%2F1wk4f9dd?entry=ttu&g_ep=EgoyMDI1MDcyMC4wIKXMDSoASAFQAw%3D%3D"
contactOneDivIcod.appendChild(icodMap);


//div formulario
const contactOneTwo = document.createElement("div");
contactOneTwo.className = "secondary-div-contact";
contactContainer.appendChild(contactOneTwo);

const emailContactDiv = document.createElement("div");
emailContactDiv.className = "email-contact-div";
contactOneTwo.appendChild(emailContactDiv);

const emailContactDivH4 = document.createElement("h4");
emailContactDivH4.className= "title-h4";
emailContactDivH4. textContent = "Escríbenos a:";
emailContactDiv.appendChild(emailContactDivH4);

const emailContactDivText = document.createElement("p");
emailContactDivText.className ="email-text";
emailContactDivText.textContent = "dummiebakery@gmail.com";
emailContactDiv.appendChild(emailContactDivText);


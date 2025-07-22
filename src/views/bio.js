import { goTo } from "../router";

export function renderBio() {

    function createParagraph(text) {
        const p = document.createElement('p');
        p.dir = 'ltr';
        p.appendChild(document.createTextNode(text));
        return p;
    }

    function createTextDiv(className, paragraphs) {
        const div = document.createElement('div');
        div.className = `shape bio-text ${className}`;

        const textNodeHtml = document.createElement('div');
        textNodeHtml.className = 'text-node-html';

        const root = document.createElement('div');
        root.className = 'root rich-text root-0';

        const paragraphSet = document.createElement('div');
        paragraphSet.className = 'paragraph-set root-0-paragraph-set-0';

        paragraphs.forEach(text => {
            paragraphSet.appendChild(createParagraph(text));
        });

        root.appendChild(paragraphSet);
        textNodeHtml.appendChild(root);
        div.appendChild(textNodeHtml);

        return div;
    }

    function createSectionQuienesSomos() {
        const section = document.createElement('div');
        section.className = 'bioSection';

        const group = document.createElement('div');
        group.className = 'bioSectionGroup001';

        const rectangle = document.createElement('div');
        rectangle.className = 'shape rect bio-rectangle-001';

        const title = createTextDiv('bio-text-001', ['¿Quiénes somos?']);

        const texto = createTextDiv('bio-text-002', [
            'El 10 de julio de 2025 da comienzo la aventura que supone los pilares de Dummie Bakery. Una idea a amasar, un proyecto que atemperar y un sueño que decorar.',
            '',
            'Con una propuesta 100% artesanal, nos presentamos como una pastelería familiar con el objetivo de ofrecer dulces que hagan tu día (y el nuestro) una pizca más especial.',
            '',
            'Contamos con enclaves de venta y recogida en San Cristóbal de La Laguna, Tacoronte, Santa Úrsula e Icod de los Vinos. También tenemos una plataforma para hacer cualquiera de tus pedidos a través de la tienda online.',
            '',
            'Nuestros dulces, al igual que nosotras, siempre te estarán esperando con los brazos abiertos.',
            '',
            ''
        ]);

        group.appendChild(rectangle);
        group.appendChild(title);
        section.appendChild(group);
        section.appendChild(texto);

        return section;
    }

    function createSectionQueTenemos() {
        const section = document.createElement('div');
        section.className = 'paraTi';

        const container = document.createElement('div');
        container.className = 'paraTi-group bioSectionGroup002';

        const title = createTextDiv('bio-text-003', ['¿Qué tenemos para ti?']);
        const phrase1 = createTextDiv('bio-text-004', ['Trabajamos con productos llenos de sabor y calidad.']);
        const phrase2 = createTextDiv('bio-text-005', ['Contamos con especialidades por temporada,', '¡experiencias únicas e irrepetibles!']);
        const phrase3 = createTextDiv('bio-text-006', ['Un equipo cercano que te hará sentir como parte de la familia Dummie.']);

        const buttonText = document.createElement('span');
        buttonText.className = 'bio-text-007';
        buttonText.textContent = '¡Quiero hacer mi pedido!';

        const buttonElement = document.createElement('button');
        buttonElement.className = 'group bio-button';
        buttonElement.type = 'button';

        const buttonRect = document.createElement('div');
        buttonRect.className = 'shape rect bio-rectangle-002';

        
        buttonElement.appendChild(buttonRect);
        buttonElement.appendChild(buttonText);

        //Accesibilidad botón NO ES NECESARIO AHORA QUE ES UN BUTTON QUE ES ACCESIBLE DE FORMA NATIVA
        //buttonContainer.setAttribute('role', 'button');
        //buttonContainer.setAttribute('tabindex', '0');

        //Dirección a la que lleva el botón (carrito)
        buttonElement.addEventListener('click', () => {
            goTo('/carrito');
            });
        
        //Soporte para teclado (Enter y Space)
        //buttonContainer.addEventListener('keydown', (e) => {
            //if (e.key === 'Enter' || e.key === ' ') {
                //e.preventDefault(); //para evitar scroll en Space
                //goTo('/carrito');
            //}
        //});

        // Agrupar los textos
        const texts = [title, phrase1, phrase2, phrase3];
        texts.forEach(text => container.appendChild(text));

        container.appendChild(buttonElement);
        section.appendChild(container);

        return section;
    }

    function createBioView() {
        const bioView = document.createElement('div');
        bioView.className = 'bio-view';

        const quienesSomos = createSectionQuienesSomos();
        const queTenemos = createSectionQueTenemos();
        const image = document.createElement('div');
        image.className = 'shape rect bio-img';

        bioView.appendChild(quienesSomos);
        bioView.appendChild(queTenemos);
        bioView.appendChild(image);

        return bioView;
    }

    return createBioView();


}
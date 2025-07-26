///tengo que crearla como una function porque no me deja enlazarla como se haría con un texto html

export function init() {
  

  const legalNoticeContainer = document.getElementById("app");
  legalNoticeContainer.innerHTML = ""; // para que el texto no se acumule uno encima de otro

  const legalTextDiv = document.createElement("div");
  legalNoticeContainer.appendChild(legalTextDiv);

  const legalTextText = document.createElement("p");
  legalTextText.innerHTML = `AQUÍ IRÍA EL AVISO LEGAL DE LA EMPRESA <br> 
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae sem sit amet mauris lacinia semper. Vivamus non sapien et est fermentum pretium. Suspendisse nec lacinia sem. Integer laoreet arcu ut velit sollicitudin, nec facilisis mi bibendum. Curabitur placerat libero ut risus dapibus, vel laoreet eros malesuada.<br>
  
  Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Etiam eget magna purus. Sed convallis feugiat neque, a dapibus elit ultricies ac. Fusce suscipit ex in quam dictum, id lacinia ex congue. In vel massa quis felis commodo finibus. Nunc luctus risus ac lacus suscipit, nec tempor sem faucibus.Donec sed sapien tellus. Sed accumsan libero nec lectus sodales, nec accumsan arcu lacinia. Nulla et sapien quis felis sagittis varius. Duis rhoncus metus at sapien tincidunt, eget malesuada metus condimentum. Suspendisse sit amet viverra tellus. Aenean gravida ante at sapien efficitur, a elementum ligula suscipit. Maecenas feugiat sollicitudin tellus at tempus. Vestibulum tempor lectus ac justo fermentum, sed malesuada augue tincidunt. Aliquam tincidunt erat magna, a faucibus erat facilisis nec. Sed dignissim metus in turpis volutpat viverra. Aliquam erat volutpat. Nullam sollicitudin velit justo, nec laoreet ante dapibus a. Proin finibus turpis id pulvinar malesuada. Pellentesque in neque ut erat placerat porttitor<BR>
    Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Etiam eget magna purus. Sed convallis feugiat neque, a dapibus elit ultricies ac. Fusce suscipit ex in quam dictum, id lacinia ex congue. In vel massa quis felis commodo finibus. Nunc luctus risus ac lacus suscipit, nec tempor sem faucibus.Donec sed sapien tellus. Sed accumsan libero nec lectus sodales, nec accumsan arcu lacinia. Nulla et sapien quis felis sagittis varius. Duis rhoncus metus at sapien tincidunt, eget malesuada metus condimentum. Suspendisse sit amet viverra tellus. Aenean gravida ante at sapien efficitur, a elementum ligula suscipit. Maecenas feugiat sollicitudin tellus at tempus. Vestibulum tempor lectus ac justo fermentum, sed malesuada augue tincidunt. Aliquam tincidunt erat magna, a faucibus erat facilisis nec. Sed dignissim metus in turpis volutpat viverra. Aliquam erat volutpat. Nullam sollicitudin velit justo, nec laoreet ante dapibus a. Proin finibus turpis id pulvinar malesuada. Pellentesque in neque ut erat placerat porttitor.`;

  legalTextDiv.appendChild(legalTextText);
}

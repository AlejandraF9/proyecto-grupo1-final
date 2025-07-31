let activeModalOverlay = null;

export function openModal(contentNode) {
  closeModal();

  const overlay = document.createElement("div");
  overlay.classList.add("modal-overlay");

  const modal = document.createElement("div");
  modal.classList.add("modal-container");

  // Botón de cerrar con la cruz
  const closeButton = document.createElement("button");
  closeButton.classList.add("modal-close-button");
  closeButton.innerHTML = "&times;"; // el símbolo ×
  closeButton.addEventListener("click", closeModal);

  modal.appendChild(closeButton);
  modal.appendChild(contentNode);

  overlay.addEventListener("click", (e) => {
    if (e.target === e.currentTarget) closeModal();
  });

  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  activeModalOverlay = overlay;
}

export function closeModal() {
  if (activeModalOverlay) {
    activeModalOverlay.remove();
    activeModalOverlay = null;
  }
}

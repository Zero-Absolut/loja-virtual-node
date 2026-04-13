function mostrarMensagemERedirecionar(mensagem, rota) {
  const modalElement = document.getElementById("modalMensagem");

  if (!modalElement) {
    console.error("Modal não encontrado no DOM");
    return;
  }

  const modal = new bootstrap.Modal(modalElement);

  const mensagemEl = document.getElementById("mensagemModal");
  mensagemEl.textContent = mensagem;

  const btn = document.getElementById("btnOk");

  // remove eventos antigos (evita múltiplos cliques bugados)
  const novoBtn = btn.cloneNode(true);
  btn.parentNode.replaceChild(novoBtn, btn);

  novoBtn.addEventListener("click", () => {
    location.replace(rota);
  });

  modal.show();
}

function mostrarMensagem(mensagem) {
  const modalElement = document.getElementById("modalMensagem");
  const modal = new bootstrap.Modal(modalElement);

  document.getElementById("mensagemModal").textContent = mensagem;

  const btn = document.getElementById("btnOk");

  const novoBtn = btn.cloneNode(true);
  btn.parentNode.replaceChild(novoBtn, btn);

  // ❗ NÃO tem redirecionamento aqui
  novoBtn.addEventListener("click", () => {
    modal.hide();
  });

  modal.show();
}

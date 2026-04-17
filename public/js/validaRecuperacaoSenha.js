async function apiRecuperacao(dados) {
  try {
    const resposta = await fetch("http://localhost:3000/recuperar-senha", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dados),
    });

    const resultado = await resposta.json();

    return {
      sucesso: resultado.sucesso,
      mensagem: resultado.mensagem,
    };
  } catch (err) {
    console.error("Erro na requisição", err);

    return {
      sucesso: false,
      mensagem: "Erro interno na requisição",
    };
  }
}

function abrirModal() {
  const mod = document.getElementById("modalAlerta");
  if (!mod) return;
  const modal = new bootstrap.Modal(mod);

  modal.show();
}

addEventListener("DOMContentLoaded", async function () {
  const form = document.getElementById("formRecuperarSenha");

  if (!form) return;

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    try {
      const email = document.getElementById("email").value;

      const resultado = await apiRecuperacao({ email });
      console.log(resultado);

      abrirModal();
    } catch (err) {
      console.error(err);

      abrirModal();
    }
  });

  const btnOk = document.getElementById("btnConfirmar");

  if (btnOk) {
    btnOk.addEventListener("click", () => {
      window.location.href = "/recuperar-senha-enviado";
    });
  }
});

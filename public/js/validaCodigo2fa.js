async function validaCodigo2fa(dados) {
  try {
    const resposta = await fetch("http://localhost:3000/verificar_codigo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(dados),
    });

    const resultado = await resposta.json();
    console.log(resultado);

    if (!resultado.sucesso) {
      return {
        sucesso: false,
        mensagem: resultado.mensagem,
      };
    }

    return {
      sucesso: true,
      mensagem: resultado.mensagem,
    };
  } catch (err) {
    console.log("Erro ao encaminhar código", err);

    return {
      sucesso: false,
      mensagem: "Erro ao encaminhar código um.",
    };
  }
}

document.addEventListener("DOMContentLoaded", async function () {
  const form = document.getElementById("formCodigo");

  if (!form) return;

  const inputs = document.querySelectorAll("#formCodigo input");

  inputs.forEach((input, index) => {
    input.addEventListener("input", () => {
      if (input.value.length === 1 && index < inputs.length - 1) {
        inputs[index + 1].focus();
      }
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "Backspace" && !input.value && index > 0) {
        inputs[index - 1].focus();
      }
    });
  });

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const input1 = document.getElementById("id1").value;
    const input2 = document.getElementById("id2").value;
    const input3 = document.getElementById("id3").value;
    const input4 = document.getElementById("id4").value;
    const input5 = document.getElementById("id5").value;
    const input6 = document.getElementById("id6").value;

    const codigo = input1 + input2 + input3 + input4 + input5 + input6;

    if (codigo.length !== 6) {
      mostrarMensagem("Digite o código completo");
      inputs.forEach((input) => (input.value = ""));
      inputs[0].focus();
      return;
    }
    const sucessoLogin = await validaCodigo2fa({ codigo });

    if (!sucessoLogin.sucesso) {
      mostrarMensagem(sucessoLogin.mensagem);
      inputs.forEach((input) => (input.value = ""));
      inputs[0].focus();

      return;
    }

    mostrarMensagem(sucessoLogin.mensagem, "/index");
  });
});

// trabalha comportamento do modal de exibição de mensagens

let rotaRedirecionamento = null;

//  função principal do modal
function mostrarMensagem(mensagem, rota = null) {
  const modalElement = document.getElementById("modalMensagem");

  if (!modalElement) {
    return;
  }

  const modal = bootstrap.Modal.getOrCreateInstance(modalElement);
  const mensagemEl = document.getElementById("mensagemModal");
  mensagemEl.textContent = mensagem;

  rotaRedirecionamento = rota;

  modal.show();
}

//trabalha o evento do modal

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btnOk");

  if (!btn) return;

  btn.addEventListener("click", () => {
    const modalElement = document.getElementById("modalMensagem");
    const modal = bootstrap.Modal.getOrCreateInstance(modalElement);
    modal.hide();

    if (rotaRedirecionamento) {
      location.replace(rotaRedirecionamento);
      rotaRedirecionamento = null;
    }
  });
});

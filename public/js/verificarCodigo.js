async function apiLogin(dados) {
  try {
    const resposta = await fetch("http://localhost:3000/login", {
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
      requer2fa: resultado.requer2fa,
    };
  } catch (err) {
    console.log("Erro ao fazer a requisição", err);

    return {
      sucesso: false,
      mensagem: "Erro interno do sistema",
      requer2fa: false,
    };
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("formLogin");

  if (!form) return;

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const dados = {
      email: document.getElementById("emailLogin").value,
      senha: document.getElementById("senhaLogin").value,
    };

    const resposta = await apiLogin(dados);

    if (resposta.sucesso || resposta.requer2fa) {
      console.log("resposta enviada");

      mostrarMensagemERedirecionar(resposta.mensagem, "/verificar_codigo");
    } else {
      console.log("resposta nao enviada");

      mostrarMensagemERedirecionar(resposta.mensagem, "/verificar_codigo");
    }
  });
});

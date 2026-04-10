//evento que espera o html carregar
console.log("🔥 JS CARREGOU");
async function apiRotaCadastro(dadosform) {
  try {
    const resposta = await fetch("http://localhost:3000/cadastro", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dadosform),
    });

    const resultado = await resposta.json();

    return resultado;
  } catch (err) {
    console.log("Erro", err);
  }
}

document.addEventListener("DOMContentLoaded", async function () {
  const form = document.getElementById("formCadastro");
  console.log(" DOM CARREGADO");

  if (!form) {
    console.log("Formulário não encontrado");
    return;
  }
  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    console.log("🚀 SUBMIT DISPAROU");
    // recuperando os dados do formulario e criando um objeto com eles
    const dados = {
      nome: document.getElementById("nome").value,
      email: document.getElementById("email").value,
      telefone: document.getElementById("telefone").value,
      senha: document.getElementById("senha").value,
      confirmar_senha: document.getElementById("confirmar_senha").value,
      cep: document.getElementById("cep").value,
      logradouro: document.getElementById("logradouro").value,
      numero: document.getElementById("numero").value,
      complemento: document.getElementById("complemento").value,
      bairro: document.getElementById("bairro").value,
      cidade: document.getElementById("cidade").value,
      estado: document.getElementById("estado").value,
      termos: document.getElementById("termos").checked,
    };

    try {
      const resposta = await apiRotaCadastro(dados);

      if (resposta.sucesso === true) {
        alert(resposta.mensagem);
        window.location.href = "/login";
      }
      console.log(resposta.erros);
      //limpo erros antigos do campo
      const camposErro = document.querySelectorAll("[id^='campo-']");
      camposErro.forEach((el) => (el.textContent = ""));
      //populo campo de erros vindo do back
      for (let campo in resposta.erros) {
        if (campo) {
          document.getElementById("erro-" + campo).textContent =
            resposta.erros[campo].msg;
        }
      }
    } catch (err) {
      console.log("Erro ao fazer a requisição.", err);
    }
  });
});

async function apiReenvioEmail(email) {
  try {
    const resposta = await fetch("http://localhost:3000/reenviar-ativacao", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const resultado = await resposta.json();

    return resultado;
  } catch (err) {
    console.log("Erro", err);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const formReenvio = document.getElementById("reenvio");
  const msg = document.getElementById("mensagem");
  console.log(formReenvio);
  if (!formReenvio) {
    console.log("Formulário de reenvio não encontrado");
    return;
  }
  formReenvio.addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("emailReenvio").value;
    const resultado = await apiReenvioEmail(email);
    console.log(resultado);
    // mostra mensagem
    msg.classList.remove("d-none");
    msg.textContent = resultado.mensagem;

    // define cor
    if (resultado.sucesso) {
      msg.classList.remove("alert-danger");
      msg.classList.add("alert-success");
    } else {
      msg.classList.remove("alert-success");
      msg.classList.add("alert-danger");
    }
  });
});

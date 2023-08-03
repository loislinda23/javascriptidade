/*
ALGORITMO

OK 1. Pegar os valores
OK 2. Calcular a Idade
      a. Com base no ano
      b. Com mês (EXTRA)
      c. Com dia (EXTRA)

OK 3. Gerar a faixa etária
    Resultado           Faixa
    0 à 12              Criança
    13 à 17             Adolescente
    18 à 65             Adulto
    Acima de 65         Idoso
   
OK 4. Organizar o objeto pessoa para salvar na lista
OK 5. Cadastrar a pessoa na lista
OK 6. Função para carregar as pessoas, carrega a lista do localStorage, chamar ao carregar a página
OK 7. Renderizar o conteúdo da tabela com as pessoas cadastradas
OK 8. Botão para limpar os registros;
*/

function calcular(event) {

  //Previne o recarregar da página
  event.preventDefault()

  console.log("Foi executada a função calcular");

  //Passo 1
  let usuario = receberValores()

  //Passo 2
  let idadeCalculada = calcularIdade(usuario.ano)

  //Passo 3
  let classificacaoEtaria = faixaEtaria(idadeCalculada)
  console.log(classificacaoEtaria);

  //Passo 4
  usuario = organizarDados(usuario, idadeCalculada, classificacaoEtaria)

  //Passo 5
  cadastrarUsuario(usuario)

  //Passo 6.1 - Recarrega a página
  window.location.reload()


}


//Passo 1
function receberValores() {
  //( .trim ) Limpa os espaços em branco, antes e depois do texto = Trata a entrada de dados do usuário
  let nomeRecebido = document.getElementById("nome").value.trim()
  let diaRecebido = document.getElementById("dia-nascimento").value
  let mesRecebido = document.getElementById("mes-nascimento").value
  let anoRecebido = document.getElementById("ano-nascimento").value

  let dadosUsuario = {
      nome: nomeRecebido,
      dia: diaRecebido,
      mes: mesRecebido,
      ano: anoRecebido
  }
  console.log(dadosUsuario);
  return dadosUsuario
}


//Passo 2
function calcularIdade(ano_) {
  const dataAtual = new Date();
  const anoAtual = dataAtual.getFullYear();

  let calculoIdade = anoAtual - ano_

  console.log("Idade: ", calculoIdade);
  return calculoIdade
}


//Passo 3
function faixaEtaria(idade_) {
  /*
  0 à 12              Criança
  13 à 17             Adolescente
  18 à 65             Adulto
  Acima de 65         Idoso
  */

  if (idade_ <= 12) {
      return "Criança"
  } else if (idade_ >= 13 && idade_ <= 17) {
      return "Adolescente"
  } else if (idade_ >= 18 && idade_ <= 65) {
      return "Adulto"
  } else {
      return "Idoso"
  }
}

//Passo 4
function organizarDados(usuarioDados_, calculoIdade_, situacao_) {

  let dadosUsuarioAtualizado = {
      ...usuarioDados_,
      idade: calculoIdade_,
      situacao: situacao_
  }

  console.log(dadosUsuarioAtualizado);
  return dadosUsuarioAtualizado
}

//Passo 5
function cadastrarUsuario(dadosUsuario_) {
  let listaUsuarios = []

  //Testando o localStorage
  // localStorage.setItem("nomeUsuario", "Rafael")

  //Se houver uma lista de usuários no localStorage, executa o que está dentro do if
  if (localStorage.getItem("usuariosCadastrados") != null) {

      //Converte de String o "usuariosCadastrados" em uma lista de Objetos
      listaUsuarios = JSON.parse(localStorage.getItem("usuariosCadastrados"))
  }

  //Adiciona o usuário na lista de usuários
  listaUsuarios.push(dadosUsuario_)

  //Salva a listaUsuarios no localStorage
  //usuariosCadastrados = chave // listaUsuarios = valor
  //JSON.stringify = Transforma um objeto em String
  localStorage.setItem("usuariosCadastrados", JSON.stringify(listaUsuarios))
}

//Passo 6
function carregarUsuarios() {
  let listaCarregada = []

  //Se houver uma lista de usuários no localStorage, executa o que está dentro do if
  if (localStorage.getItem("usuariosCadastrados") != null) {

      //
      listaCarregada = JSON.parse(localStorage.getItem("usuariosCadastrados"))
  }

  //Se não tiver nenhum usuário cadastrado, mostrar mensagem
  if (listaCarregada.length == 0) {

      let tabela = document.getElementById("corpo-tabela")
      tabela.innerHTML = `<tr class="linha-mensagem">
          <td colspan="4">Nenhum usuário cadastrado 😥</td></tr>`
      /*
      tr = table row
      td = table data
      */

  } else {
      //Montar conteúdo da tabela
      montarTabela(listaCarregada)
  }
  console.log(listaCarregada);
}

//Chamando passo 6
//Sempre que carregar a página, chamar a função carregarUsuarios()
//DOMContentLoad = Evento, significa sempre que carregar a página
window.addEventListener("DOMContentLoaded", () => carregarUsuarios())


//Passo 7
function montarTabela(listaUsuarios_) {
  let tabela = document.getElementById("corpo-tabela")
  let template = ""

  listaUsuarios_.forEach(usuario => {
      template += `<tr>
      <td data-cell="nome">${usuario.nome}</td>
      <td data-cell="data de nascimento">${usuario.dia}/${usuario.mes}/${usuario.ano} </td>
      <td data-cell="idade">${usuario.idade}</td>
      <td data-cell="faixa etária">${usuario.situacao}</td>
     
  </tr>`

  });
  tabela.innerHTML = template

}


function deletarRegistros() {

  //Remove o item do localStorage
  localStorage.removeItem("usuariosCadastrados")

  //Recarrega a página
  window.location.reload()
}

























    
   

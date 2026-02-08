function buscarSolucao() {
  const texto = document.getElementById("problemaInput").value.toLowerCase();
  const resultado = document.getElementById("resultadoIA");

  for (let item of baseConhecimento) {
    for (let palavra of item.problema) {
      if (texto.includes(palavra)) {
        resultado.innerText = item.solucao;
        return;
      }
    }
  }

  resultado.innerText = "❌ Não encontrei na base. Consulte um vendedor.";
}


function calcularOpcao(ladoPlaca, ladoFileiras, preco) {
  const placasDisponiveis = pegarPlacasDisponiveis();
  const fileiras = Math.ceil(ladoFileiras / 0.20);

  let melhor = null;

  placasDisponiveis.forEach(placa => {
    if (placa >= ladoPlaca) {
      const corteMetro = placa - ladoPlaca;
      const sobraTotal = corteMetro * fileiras;

      if (!melhor || sobraTotal < melhor.sobraTotal) {
        melhor = {
          placa,
          fileiras,
          corteCm: Math.round(corteMetro * 100),
          sobraTotal,
          total: fileiras * preco
        };
      }
    }
  });

  return melhor;
}

function calcularOpcaoComLista(ladoPlaca, ladoFileiras, preco, placasLista) {
  const fileiras = Math.ceil(ladoFileiras / 0.20);

  let melhor = null;

  placasLista.forEach(placa => {
    if (placa >= ladoPlaca) {
      const corteMetro = placa - ladoPlaca;
      const sobraTotal = corteMetro * fileiras;

      if (!melhor || sobraTotal < melhor.sobraTotal) {
        melhor = {
          placa,
          fileiras,
          corteCm: Math.round(corteMetro * 100),
          sobraTotal: sobraTotal,
          total: fileiras * preco
        };
      }
    }
  });

  return melhor;
}


function calcular() {
  const comprimento = parseFloat(document.getElementById("comprimento").value);
  const largura = parseFloat(document.getElementById("largura").value);
  const preco = parseFloat(document.getElementById("preco").value);

  if (!comprimento || !largura || !preco) {
    alert("Preencha todos os campos!");
    return;
  }

  const todasPlacas = [2,3,4,5,6];
  const estoquePlacas = pegarPlacasDisponiveis();

  function melhorSentido(placasLista) {
    const op1 = calcularOpcaoComLista(comprimento, largura, preco, placasLista);
    const op2 = calcularOpcaoComLista(largura, comprimento, preco, placasLista);

    if (op1.sobraTotal < op2.sobraTotal) {
      return { ...op1, sentido: "COMPRIMENTO" };
    } else {
      return { ...op2, sentido: "LARGURA" };
    }
  }

  const ideal = melhorSentido(todasPlacas);
  const real = melhorSentido(estoquePlacas);

  const diferenca = (real.sobraTotal - ideal.sobraTotal).toFixed(2);

  document.getElementById("resultado").innerHTML = `
    <div class="result-box">
      <h3>💡 Melhor opção com o estoque atual</h3>

      <p><strong>Sentido das placas:</strong> ${real.sentido}</p>
      <p><strong>Placa de:</strong> ${real.placa} m</p>
      <p><strong>Fileiras:</strong> ${real.fileiras}</p>
      <p><strong>Corte por placa:</strong> ${real.corteCm} cm</p>
      <p><strong>Sobra total:</strong> ${real.sobraTotal.toFixed(2)} m</p>
      <p><strong>Valor total:</strong> R$ ${real.total.toFixed(2)}</p>

      ${
        diferenca > 0
          ? `<div style="margin-top:15px;padding:10px;background:#ffe5e5;border-radius:6px;">
               ⚠️ O ideal seria usar placa de <strong>${ideal.placa} m</strong>
               no sentido <strong>${ideal.sentido}</strong>, que geraria
               <strong>${ideal.sobraTotal.toFixed(2)} m</strong> de sobra.

               <br><br>
               Com o estoque atual, haverá <strong>${diferenca} m</strong> de desperdício a mais.
             </div>`
          : ``
      }
    </div>
  `;
}


function pegarPlacasDisponiveis() {
  const checkboxes = document.querySelectorAll('.estoque input:checked');
  let placas = [];
  checkboxes.forEach(cb => placas.push(parseFloat(cb.value)));
  return placas;
}

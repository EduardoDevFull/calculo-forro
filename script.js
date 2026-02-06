

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

// ===== Moldura e Cantos =====
const perimetro = 2 * (comprimento + largura);
const barrasMoldura = Math.ceil(perimetro / 3);
const totalComprado = barrasMoldura * 3;
const sobraMoldura = (totalComprado - perimetro).toFixed(2);
const cantos = 4;

document.getElementById("resultado").innerHTML = `
  <div class="result-box">
    <h3>💡 Melhor opção</h3>

    <p><strong>Instalar as placas no sentido :</strong> ${real.sentido}</p>
    <p><strong>Modelo da placa:</strong> ${real.placa} m</p>
    <p><strong>Quantidade de fileiras:</strong> ${real.fileiras}</p>
    <p><strong>Corte necessário por placa:</strong> ${real.corteCm} cm</p>
    <p><strong>Valor total:</strong> R$ ${real.total.toFixed(2)}</p>

    <hr style="margin:15px 0">

    <p><strong>Moldura (barra 3m):</strong> ${barrasMoldura} barras</p>
    <p><strong>Total comprado:</strong> ${totalComprado.toFixed(2)} m</p>
    <p><strong>Vai sobrar de moldura (corte):</strong> ${sobraMoldura} m</p>
    <p><strong>Cantos internos:</strong> ${cantos} unidades</p>
  </div>
`;
  


}


function pegarPlacasDisponiveis() {
  const checkboxes = document.querySelectorAll('.estoque input:checked');
  let placas = [];
  checkboxes.forEach(cb => placas.push(parseFloat(cb.value)));
  return placas;
}

function abrirAba(aba) {
  const abas = ['forro', 'persiana', 'tijolo', 'piso'];

  abas.forEach(a => {
    document.getElementById('aba-' + a).style.display = 'none';
  });

  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));

  document.getElementById('aba-' + aba).style.display = 'block';

  const index = abas.indexOf(aba);
  document.querySelectorAll('.tab-btn')[index].classList.add('active');
}


function calcularPersiana() {
  const largura = parseFloat(document.getElementById('larguraPersiana').value);
  const altura = parseFloat(document.getElementById('alturaPersiana').value);
  const precoM2 = parseFloat(document.getElementById('tecido').value);
  const bando = document.getElementById('bando').checked;
  const afastador = document.getElementById('afastador').checked;

  if (!largura || !altura) {
    alert("Preencha largura e altura!");
    return;
  }

  const area = largura * altura;
  let total = area * precoM2;

  if (bando) {
    total += 80 * largura;
  }

  const tecidoSelecionado = document.getElementById('tecido').selectedIndex;

  // Afastador só para 3%, 1% e Blackout
  if (afastador && tecidoSelecionado !== 3) {
    total += 34.9 * largura;
  }

  document.getElementById('resultadoPersiana').innerHTML = `
    <div class="result-box">
      <p><strong>Área:</strong> ${area.toFixed(2)} m²</p>
      <p><strong>Valor total:</strong> R$ ${total.toFixed(2)}</p>
    </div>
  `;
}

function calcularTijolo() {
  const largura = parseFloat(document.getElementById('larguraParede').value);
  const altura = parseFloat(document.getElementById('alturaParede').value);
  const tipo = document.getElementById('tipoBloco').value;
  const perdaExtra = parseFloat(document.getElementById('perdaExtra').value);

  if (!largura || !altura) {
    alert("Preencha largura e altura!");
    return;
  }

  const areaParede = largura * altura;

  const pecas = {
  baiano: { area: 0.24 * 0.14, nome: "Bloco Baiano 11,5×14×24" },
  baianinho: { area: 0.19 * 0.19, nome: "Baianinho 9×19×19" },
  baianao: { area: 0.29 * 0.19, nome: "Bloco Baianão 14×19×29" },
  concreto: { area: 0.36 * 0.18, nome: "Bloco Concreto 18×18×36" },
  tijolo: { area: 0.18 * 0.091, nome: "Tijolo barro 4,3×9,1×18" }
};

  const areaPeca = pecas[tipo].area;
  const nome = pecas[tipo].nome;

  let quantidade = Math.ceil(areaParede / areaPeca);

  // 10% padrão de obra
  quantidade = quantidade * 1.10;

  // extra escolhido pelo cliente
  quantidade = quantidade * (1 + perdaExtra);

  quantidade = Math.ceil(quantidade);

  let html = `
    <div class="result-box">
      <p><strong>${nome}</strong></p>
      <p>Área da parede: ${areaParede.toFixed(2)} m²</p>
  `;

  if (tipo === "tijolo") {
    const pacotes = Math.ceil(quantidade / 10);
    html += `
      <p>Tijolos necessários: ${quantidade} unidades</p>
      <p><strong>Pacotes (10 un): ${pacotes}</strong></p>
    `;
  } else {
    html += `
      <p><strong>Blocos necessários: ${quantidade}</strong></p>
    `;
  }

  html += `</div>`;

  document.getElementById('resultadoTijolo').innerHTML = html;
}


function calcularPiso() {
  const largura = parseFloat(document.getElementById('larguraPiso').value);
  const comprimento = parseFloat(document.getElementById('comprimentoPiso').value);
  const areaDireta = parseFloat(document.getElementById('areaDireta').value);
  const m2Caixa = parseFloat(document.getElementById('m2Caixa').value);
  const comPerda = document.getElementById('perdaPiso').checked;

  if (!m2Caixa) {
    alert("Informe o m² por caixa!");
    return;
  }

  let area;

  if (areaDireta && areaDireta > 0) {
    area = areaDireta;
  } else if (largura && comprimento) {
    area = largura * comprimento;
  } else {
    alert("Informe largura e comprimento OU a área direta!");
    return;
  }

  const areaOriginal = area;

  if (comPerda) {
    area = area * 1.10;
  }

  const caixas = Math.ceil(area / m2Caixa);

  document.getElementById('resultadoPiso').innerHTML = `
    <div class="result-box">
      <p><strong>Área base:</strong> ${areaOriginal.toFixed(2)} m²</p>
      ${comPerda ? `<p><strong>Área com 10%:</strong> ${area.toFixed(2)} m²</p>` : ``}
      <p><strong>Caixas necessárias:</strong> ${caixas}</p>
    </div>
  `;
}

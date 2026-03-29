// Seletores
const nomeInput = document.getElementById('nome');
const valorInput = document.getElementById('valor');
const tipoInput = document.getElementById('tipo');
const mesAnoInput = document.getElementById('mesAno');
const form = document.getElementById('registroForm');
const tabelaBody = document.querySelector('#registrosTable tbody');
const faturamentoDisplay = document.getElementById('faturamento');
const gastosDisplay = document.getElementById('gastos');
const lucroDisplay = document.getElementById('lucro');
const limparBtn = document.getElementById('limparDados');

let registros = JSON.parse(localStorage.getItem('registros')) || [];

// Gráficos
const graficoMensal = new Chart(document.getElementById('graficoMensal'), {
    type: 'bar',
    data: {
        labels: [],
        datasets: [
            { label:'Faturamento', data:[], backgroundColor:'#00FF7F' },
            { label:'Despesas', data:[], backgroundColor:'#FF4500' }
        ]
    },
    options: { responsive:true, scales:{y:{beginAtZero:true}} }
});

const graficoPizza = new Chart(document.getElementById('graficoPizza'), {
    type:'pie',
    data:{labels:[], datasets:[{data:[], backgroundColor:['#FF4500','#FFD700','#6A0DAD','#00CED1']}]},
    options:{responsive:true, plugins:{legend:{position:'bottom'}}}
});

// Atualiza dashboard
function atualizarDashboard() {
    let faturamentoTotal = registros.filter(r=>r.tipo==='faturamento').reduce((a,b)=>a+b.valor,0);
    let despesasTotal = registros.filter(r=>r.tipo==='despesa').reduce((a,b)=>a+b.valor,0);
    let lucro = faturamentoTotal - despesasTotal;

    faturamentoDisplay.textContent = faturamentoTotal.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
    gastosDisplay.textContent = despesasTotal.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
    lucroDisplay.textContent = lucro.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});

    atualizarTabela();
    atualizarGraficos();
}

// Atualiza tabela
function atualizarTabela() {
    tabelaBody.innerHTML = '';
    registros.forEach((r,i)=>{
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${r.nome}</td>
                        <td>${r.valor.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}</td>
                        <td>${r.tipo}</td>
                        <td>${r.mesAno}</td>
                        <td><button onclick="removerRegistro(${i})">Excluir</button></td>`;
        tabelaBody.appendChild(tr);
    });
}

// Atualiza gráficos
function atualizarGraficos() {
    // Gráfico mensal
    const meses = {};
    registros.forEach(r=>{
        if(!meses[r.mesAno]) meses[r.mesAno]={f:0,d:0};
        if(r.tipo==='faturamento') meses[r.mesAno].f += r.valor;
        else meses[r.mesAno].d += r.valor;
    });
    const labels = Object.keys(meses).sort();
    graficoMensal.data.labels = labels;
    graficoMensal.data.datasets[0].data = labels.map(l=>meses[l].f);
    graficoMensal.data.datasets[1].data = labels.map(l=>meses[l].d);
    graficoMensal.update();

    // Gráfico pizza
    const categorias = {};
    registros.filter(r=>r.tipo==='despesa').forEach(r=>{
        if(categorias[r.nome]) categorias[r.nome] += r.valor;
        else categorias[r.nome] = r.valor;
    });
    graficoPizza.data.labels = Object.keys(categorias);
    graficoPizza.data.datasets[0].data = Object.values(categorias);
    graficoPizza.update();
}

// Adicionar registro
form.addEventListener('submit',e=>{
    e.preventDefault();
    const nome = nomeInput.value.trim();
    const valor = parseFloat(valorInput.value);
    const tipo = tipoInput.value;
    const mesAno = mesAnoInput.value;

    if(!nome || !valor || valor<=0 || !tipo || !mesAno){
        alert('Preencha todos os campos corretamente');
        return;
    }

    registros.push({nome,valor,tipo,mesAno});
    localStorage.setItem('registros', JSON.stringify(registros));

    nomeInput.value = '';
    valorInput.value = '';
    tipoInput.value = '';
    mesAnoInput.value = '';

    atualizarDashboard();
});

// Remover registro
function removerRegistro(index){
    if(confirm('Deseja realmente excluir este registro?')){
        registros.splice(index,1);
        localStorage.setItem('registros', JSON.stringify(registros));
        atualizarDashboard();
    }
}

// Limpar todos
limparBtn.addEventListener('click',()=>{
    if(confirm('Deseja realmente limpar todos os registros?')){
        registros = [];
        localStorage.removeItem('registros');
        atualizarDashboard();
    }
});

// Inicializar
atualizarDashboard();
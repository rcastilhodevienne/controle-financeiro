let transacoes = JSON.parse(localStorage.getItem('financasFamilia')) || [];

function adicionarTransacao() {
    const descricao = document.getElementById('descricao').value;
    const valor = parseFloat(document.getElementById('valor').value);
    const tipo = document.getElementById('tipo').value;

    if (!descricao || isNaN(valor) || valor <= 0) {
        alert("Preencha a descrição e um valor válido.");
        return;
    }

    transacoes.push({ id: Date.now(), descricao, valor, tipo });
    salvarEAtualizar();
    
    document.getElementById('descricao').value = '';
    document.getElementById('valor').value = '';
}

function excluir(id) {
    transacoes = transacoes.filter(t => t.id !== id);
    salvarEAtualizar();
}

function salvarEAtualizar() {
    localStorage.setItem('financasFamilia', JSON.stringify(transacoes));
    renderizar();
}

function renderizar() {
    const lista = document.getElementById('lista-transacoes');
    let saldo = 0;
    lista.innerHTML = '';

    transacoes.forEach(t => {
        if (t.tipo === 'entrada') saldo += t.valor;
        else saldo -= t.valor;

        const div = document.createElement('div');
        div.className = 'item';
        div.innerHTML = `
            <span>${t.descricao}</span>
            <div>
                <span class="${t.tipo}">R$ ${t.valor.toFixed(2)}</span>
                <button class="btn-excluir" onclick="excluir(${t.id})">X</button>
            </div>
        `;
        lista.appendChild(div);
    });

    const saldoEl = document.getElementById('saldo-total');
    saldoEl.textContent = `R$ ${saldo.toFixed(2)}`;
    saldoEl.style.color = saldo >= 0 ? '#2ecc71' : '#e74c3c';
}

renderizar();

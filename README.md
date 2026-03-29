# Dashboard Financeiro

O **Dashboard Financeiro** é uma ferramenta de auxílio para gerentes de loja que desejam acompanhar **faturamento, despesas e lucro** de forma clara, interativa e prática. Ele foi desenvolvido para funcionar **offline**, sem necessidade de servidor, salvando os dados diretamente no navegador com **LocalStorage**.

---

## Funcionalidades

### 1. Painel de Indicadores
- **Faturamento** – soma de todos os registros do tipo “faturamento”.
- **Gastos** – soma de todas as despesas.
- **Lucro** – calculado automaticamente como `Lucro = Faturamento - Gastos`.

### 2. Formulário de Cadastro
- Adicione registros financeiros com:
  - Nome da despesa ou receita.
  - Valor (apenas números positivos).
  - Tipo: “faturamento” ou “despesa”.
  - Mês/Ano para acompanhamento mensal.
- Validações automáticas:
  - Campos obrigatórios.
  - Valor maior que zero.

### 3. Tabela de Registros
- Lista todos os registros adicionados.
- Permite excluir registros individualmente.
- Botão para **limpar todos os registros** com confirmação.

### 4. Gráficos
- **Gráfico mensal (barra)** – compara faturamento e despesas mês a mês.
- **Gráfico de pizza** – mostra a distribuição das despesas por categoria, facilitando identificar onde o dinheiro está sendo gasto.

### 5. Persistência de Dados
- Todos os registros são salvos no **LocalStorage**.
- Mantém os dados mesmo após fechar a aba ou reiniciar o navegador.
- Não depende de internet ou servidor.

---

## Tecnologias Utilizadas

| Camada | Tecnologia | Função |
|--------|------------|--------|
| Frontend | HTML | Estrutura da página (cards, formulário, tabela e gráficos) |
| Estilo | CSS | Layout moderno, escuro e responsivo |
| Interatividade | JavaScript | Cadastro, exclusão, cálculos e atualização dinâmica |
| Gráficos | Chart.js | Gráfico de barras (mensal) e pizza (despesas) |

---

## Como Usar

1. Abra o arquivo `index.html` no navegador.
2. Adicione faturamento e despesas pelo formulário.
3. Visualize os cards com faturamento, gastos e lucro.
4. Confira a tabela de registros e utilize os botões de excluir ou limpar.
5. Observe os gráficos que atualizam automaticamente.
6. Todos os dados ficam salvos no navegador.

---

## Publicação

O projeto pode ser publicado facilmente usando **GitHub Pages**, tornando o dashboard acessível online sem necessidade de servidor.

---

## Objetivo

O objetivo do Dashboard Financeiro é fornecer uma **visão clara e prática** das finanças da loja, permitindo ao gerente tomar decisões rápidas e acompanhar o desempenho mensal com **gráficos e relatórios visuais**.

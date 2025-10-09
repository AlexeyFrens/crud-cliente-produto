// Constantes de elementos do DOM
const btnNovoProduto = document.getElementById('btnNovoProduto');
const productModal = document.getElementById('productModal');
const btnCancel = document.getElementById('btnCancel');
const productForm = document.getElementById('productForm');
const productsTableBody = document.getElementById('productsTableBody');
const modalTitle = document.getElementById('modalTitle');

// Campos do formulário
const productId = document.getElementById('productId');
const nome = document.getElementById('nome');
const descricao = document.getElementById('descricao');
const preco = document.getElementById('preco');
const estoque = document.getElementById('estoque');

const API_URL = '/api/produtos'; // O endpoint REST que o Spring Boot deve expor

// --- Funções de Modal ---

/** Abre o modal para novo cadastro. */
function openNewProductModal() {
    modalTitle.textContent = 'Novo Produto';
    productForm.reset();
    productId.value = ''; // Indica que é uma criação (POST)
    productModal.style.display = 'block';
}

/** Abre o modal para edição. */
function openEditProductModal(produto) {
    modalTitle.textContent = 'Editar Produto';
    productId.value = produto.id; // Indica que é uma edição (PUT)
    // Preenche os campos com os dados
    nome.value = produto.nome;
    descricao.value = produto.descricao || ''; 
    preco.value = produto.preco;
    estoque.value = produto.estoque;
    
    productModal.style.display = 'block';
}

/** Fecha o modal. */
function closeModal() {
    productModal.style.display = 'none';
    productForm.reset();
}

// --- Funções CRUD ---

/** Carrega a lista de produtos (GET /api/produtos) e preenche a tabela. */
async function loadProducts() {
    productsTableBody.innerHTML = '<tr><td colspan="6" class="no-data">Carregando produtos...</td></tr>';
    
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Erro ao carregar produtos. Status: ' + response.status);
        }
        const produtos = await response.json();
        
        productsTableBody.innerHTML = '';
        
        if (produtos.length === 0) {
            productsTableBody.innerHTML = '<tr><td colspan="6" class="no-data">Não há produtos cadastrados</td></tr>';
            return;
        }

        produtos.forEach(produto => {
            const row = productsTableBody.insertRow();
            
            row.insertCell().textContent = produto.id;
            row.insertCell().textContent = produto.nome;
            // Limita a descrição na tabela
            row.insertCell().textContent = produto.descricao ? produto.descricao.substring(0, 80) + '...' : '-'; 
            // Formata o preço
            row.insertCell().textContent = `R$ ${parseFloat(produto.preco).toFixed(2).replace('.', ',')}`; 
            row.insertCell().textContent = produto.estoque;

            const actionsCell = row.insertCell();
            
            // Ícone de Edição (Lápis)
            const editIcon = document.createElement('span');
            editIcon.className = 'action-icon edit-icon';
            editIcon.innerHTML = '✏️'; 
            editIcon.title = 'Editar';
            editIcon.addEventListener('click', () => fetchProductAndOpenEdit(produto.id));
            actionsCell.appendChild(editIcon);

            // Ícone de Deletar (Lixeira)
            const deleteIcon = document.createElement('span');
            deleteIcon.className = 'action-icon delete-icon';
            deleteIcon.innerHTML = '🗑️'; 
            deleteIcon.title = 'Excluir';
            deleteIcon.addEventListener('click', () => deleteProduct(produto.id, produto.nome));
            actionsCell.appendChild(deleteIcon);
        });

    } catch (error) {
        console.error('Erro:', error);
        productsTableBody.innerHTML = `<tr><td colspan="6" class="no-data" style="color: red;">Falha ao conectar com a API de Produtos. Verifique o console.</td></tr>`;
    }
}

/** Busca um produto específico e abre o modal de edição. */
async function fetchProductAndOpenEdit(id) {
     try {
        const response = await fetch(`${API_URL}/${id}`); 
        if (!response.ok) {
            throw new Error('Produto não encontrado.');
        }
        const produto = await response.json();
        openEditProductModal(produto);
    } catch (error) {
        alert('Erro ao buscar produto para edição: ' + error.message);
    }
}

/** Salva ou atualiza um produto (POST/PUT). */
async function saveProduct(event) {
    event.preventDefault();

    const isEdit = productId.value;
    const method = isEdit ? 'PUT' : 'POST'; 
    const url = isEdit ? `${API_URL}/${productId.value}` : API_URL;

    // Converte os valores para os tipos esperados pelo Spring Boot
    const produto = {
        nome: nome.value,
        descricao: descricao.value,
        preco: parseFloat(preco.value), 
        estoque: parseInt(estoque.value)
    };
    
    try {
        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(produto)
        });

        if (response.status >= 400) {
            // Tratamento de erro de validação (ex: nome em branco)
            const errorText = await response.text();
            alert(`Falha ao salvar. Mensagem da API: ${errorText.substring(0, 150)}...`);
            throw new Error(`Erro ao salvar produto. Status ${response.status}`);
        }

        alert(`Produto ${isEdit ? 'atualizado' : 'cadastrado'} com sucesso!`);
        closeModal();
        loadProducts(); // Recarrega a lista

    } catch (error) {
        console.error('Erro ao salvar:', error);
        if (error.message.startsWith('Failed to fetch')) {
            alert('Não foi possível se conectar com a API. Verifique se o backend está ativo.');
        }
    }
}


/** Deleta um produto (DELETE /api/produtos/{id}). */
async function deleteProduct(id, nome) {
    if (!confirm(`Tem certeza que deseja excluir o produto "${nome}"? Esta ação é irreversível.`)) {
        return; 
    }

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        if (response.ok || response.status === 204) { 
            alert('Produto excluído com sucesso!');
            loadProducts(); // Recarrega a lista
        } else {
            throw new Error('Erro ao excluir produto. Status: ' + response.status);
        }

    } catch (error) {
        console.error('Erro ao deletar:', error);
        alert('Falha ao excluir o produto: ' + error.message);
    }
}

// --- Event Listeners ---
btnNovoProduto.addEventListener('click', openNewProductModal);
btnCancel.addEventListener('click', closeModal);
productForm.addEventListener('submit', saveProduct);

// --- Inicialização ---
loadProducts();
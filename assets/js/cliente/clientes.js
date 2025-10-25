const clientsTable = document.querySelector("#clientesTableBody");
const modalAdd = document.querySelector("#clienteAddModal");
const modalEdit = document.querySelector("#clienteEditModal");

const modalAddName = document.querySelector("#nomeAdd");
const modalAddEmail = document.querySelector("#emailAdd");
const modalAddTelefone = document.querySelector("#telefoneAdd");
const modalAddEndereco = document.querySelector("#enderecoAdd");

const modalEditName = document.querySelector("#nomeClientEdit");
const modalEditEmail = document.querySelector("#emailClientEdit");
const modalEditTelefone = document.querySelector("#telefoneClientEdit");
const modalEditEndereco = document.querySelector("#enderecoClientEdit");

const openAddModal = () => {
    modalAdd.style.display = "flex";
}

const closeAddModal = () => {
    modalAdd.style.display = "none";
}

let currentEditClient = null;

const openEditModal = async (botao) => {
    modalEdit.style.display = "flex";

    const idClient = botao.dataset.id;

    currentEditClient = idClient;
    const oldClient = await findClientById(idClient);

    if(oldClient){
        modalEditName.value = oldClient.nome;
        modalEditEmail.value = oldClient.email;
        modalEditTelefone.value = oldClient.telefone;
        modalEditEndereco.value = oldClient.endereco;
    }
}

const closeEditModal = () => {
    modalEdit.style.display = "none";

    currentEditClient = null;
}

function addClient() {

    const newClient = {
        nome: modalAddName.value,
        email: modalAddEmail.value,
        telefone: modalAddTelefone.value,
        endereco: modalAddEndereco.value,
    }

    createClient(newClient);
}

function editClient() {
    const idClient = currentEditClient;

    const updatedClient = {
        nome: modalEditName.value,
        email: modalEditEmail.value,
        telefone: modalEditTelefone.value,
        endereco: modalEditEndereco.value,
    }

    updateClient(idClient, updatedClient);
}

async function excludeClient(button) {
    const idClient = button.dataset.id;

    const result = await Swal.fire({
        text: `Deseja realmente excluir o cliente com o ID: ${idClient}? Você não poderá reverter isso!`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sim, excluir!',
        cancelButtonText: 'Cancelar'
    });

    if(result.isConfirmed) {
        deleteClient(idClient);
        window.location.reload();
    }
}

(async () => {
    const clientData = await loadClients();

    if(clientData.length !== 0) {
        clientsTable.innerHTML = clientData.map((item) => {
            return `
            <tr>
                <td>${item.id}</td>
                <td>${item.nome}</td>
                <td>${item.email}</td>
                <td>${item.telefone}</td>
                <td>${item.endereco}</td>
                <td>
                    <button class="editar" title="Editar" data-id=${item.id} onclick="openEditModal(this)">
                        <svg width="25" height="25" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.77792 32.2221H9.79167L28.3333 13.7083L26.3196 11.6946L7.77792 30.2083V32.2221ZM5 35V29.0833L28.3054 5.81956C28.5649 5.56956 28.8635 5.37512 29.2013 5.23623C29.5393 5.09734 29.8935 5.02789 30.2638 5.02789C30.6157 5.02789 30.9629 5.09734 31.3054 5.23623C31.6482 5.37512 31.9538 5.57414 32.2221 5.83331L34.2083 7.83331C34.4861 8.10192 34.6875 8.40748 34.8125 8.74998C34.9375 9.09248 35 9.43512 35 9.77789C35 10.1296 34.9329 10.479 34.7987 10.8262C34.6643 11.1734 34.4675 11.4768 34.2083 11.7362L10.9167 35H5ZM27.3196 12.7083L26.3196 11.6946L28.3333 13.7083L27.3196 12.7083Z" fill="#477CEE"/>
                        </svg>
                    </button>
                    <button class="deletar" title="Excluir" data-id=${item.id} onclick="excludeClient(this)">
                        <svg width="25" height="25" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.1388 35C10.3749 35 9.72105 34.7281 9.17716 34.1842C8.63328 33.64 8.36133 32.986 8.36133 32.2221V9.16667H6.66675V6.38875H14.6667V5H25.3334V6.38875H33.3334V9.16667H31.6388V32.2221C31.6388 32.9721 31.3634 33.6226 30.8126 34.1737C30.2617 34.7246 29.6113 35 28.8613 35H11.1388ZM28.8613 9.16667H11.1388V32.2221H28.8613V9.16667ZM15.1947 28.7221H17.9722V12.6388H15.1947V28.7221ZM22.028 28.7221H24.8055V12.6388H22.028V28.7221Z" fill="#E45656"/>
                        </svg>
                    </button>
                </td>
            </tr>
       `
        }).join('');
    }
})()
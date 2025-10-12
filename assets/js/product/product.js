const productTable = document.querySelector("#productsTableBody");
const modalAdd = document.querySelector("#productAddModal");
const modalEdit = document.querySelector("#productEditModal");

const modalAddName = document.querySelector("#nome");
const modalAddDescription = document.querySelector("#descricao");
const modalAddPrice = document.querySelector("#preco");
const modalAddStock = document.querySelector("#estoque");

const modalEditName = document.querySelector("#nomeEdit");
const modalEditDescription = document.querySelector("#descricaoEdit");
const modalEditPrice = document.querySelector("#precoEdit");
const modalEditStock = document.querySelector("#estoqueEdit");

const openAddModal = () => {
    modalAdd.style.display = "block";
}

const closeAddModal = () => {
    modalAdd.style.display = "none";
}

let currentEditProduct = null;

const openEditModal = async (botao) => {
    modalEdit.style.display = "block";

    const idProduct = botao.dataset.id;

    currentEditProduct = idProduct;
    const oldProduct = await findById(idProduct);

    if(oldProduct){
        modalEditName.value = oldProduct.name;
        modalEditDescription.value = oldProduct.description;
        modalEditPrice.value = oldProduct.price;
        modalEditStock.value = oldProduct.stock;
    }
}

const closeEditModal = () => {
    modalEdit.style.display = "none";

    currentEditProduct = null;
}

function addProduct() {

    const newProduct = {
        name: modalAddName.value,
        description: modalAddDescription.value,
        price: modalAddPrice.value,
        stock: modalAddStock.value,
    }

    createProduct(newProduct);
    window.location.reload();
}

function editProduct() {
    const idProduct = currentEditProduct;

    const updatedProduct = {
        name: modalEditName.value,
        description: modalEditDescription.value,
        price: modalEditPrice.value,
        stock: modalEditStock.value,
    }

    updateProduct(idProduct, updatedProduct);
    window.location.reload();
}

function excludeProduct(button) {
    const idProduct = button.dataset.id;
    deleteProduct(idProduct);
    window.location.reload();
}

(async () => {
   const productData = await loadProducts();

   if(productData.length !== 0) {
       productTable.innerHTML = productData.map((item) => {
           return `
            <tr>
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.description}</td>
                <td>${item.price}</td>
                <td>${item.stock}</td>
                <td>
                    <button class="editar" title="Editar" data-id=${item.id} onclick="openEditModal(this)">
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.77792 32.2221H9.79167L28.3333 13.7083L26.3196 11.6946L7.77792 30.2083V32.2221ZM5 35V29.0833L28.3054 5.81956C28.5649 5.56956 28.8635 5.37512 29.2013 5.23623C29.5393 5.09734 29.8935 5.02789 30.2638 5.02789C30.6157 5.02789 30.9629 5.09734 31.3054 5.23623C31.6482 5.37512 31.9538 5.57414 32.2221 5.83331L34.2083 7.83331C34.4861 8.10192 34.6875 8.40748 34.8125 8.74998C34.9375 9.09248 35 9.43512 35 9.77789C35 10.1296 34.9329 10.479 34.7987 10.8262C34.6643 11.1734 34.4675 11.4768 34.2083 11.7362L10.9167 35H5ZM27.3196 12.7083L26.3196 11.6946L28.3333 13.7083L27.3196 12.7083Z" fill="#477CEE"/>
                        </svg>
                    </button>
                    <button class="deletar" title="Excluir" data-id=${item.id} onclick="excludeProduct(this)">
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.1388 35C10.3749 35 9.72105 34.7281 9.17716 34.1842C8.63328 33.64 8.36133 32.986 8.36133 32.2221V9.16667H6.66675V6.38875H14.6667V5H25.3334V6.38875H33.3334V9.16667H31.6388V32.2221C31.6388 32.9721 31.3634 33.6226 30.8126 34.1737C30.2617 34.7246 29.6113 35 28.8613 35H11.1388ZM28.8613 9.16667H11.1388V32.2221H28.8613V9.16667ZM15.1947 28.7221H17.9722V12.6388H15.1947V28.7221ZM22.028 28.7221H24.8055V12.6388H22.028V28.7221Z" fill="#E45656"/>
                        </svg>
                    </button>
                </td>
            </tr>
       `
       }).join('');
   }
})()
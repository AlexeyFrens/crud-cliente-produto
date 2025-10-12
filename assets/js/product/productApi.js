
async function loadProducts(){
    const response = await fetch("http://localhost:3000/products");
    return await response.json();
}

async function findById(id) {
    const response = await fetch(`http://localhost:3000/products/${id}`);
    return await response.json();
}

function createProduct(product) {
    fetch("http://localhost:3000/products", {
        method: "POST",
        body: JSON.stringify(product),
    });
}

function updateProduct(id, product) {
    fetch(`http://localhost:3000/products/${id}`, {
        method: "PUT",
        body: JSON.stringify(product),
    })
}

function deleteProduct(id) {
    fetch(`http://localhost:3000/products/${id}`, {
        method: "DELETE",
    })
}
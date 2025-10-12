
async function loadClients(){
    const response = await fetch("http://localhost:3000/clients");
    return await response.json();
}

async function findClientById(id) {
    const response = await fetch(`http://localhost:3000/clients/${id}`);
    return await response.json();
}

function createClient(client) {
    fetch("http://localhost:3000/clients", {
        method: "POST",
        body: JSON.stringify(client),
    });
}

function updateClient(id, client) {
    fetch(`http://localhost:3000/clients/${id}`, {
        method: "PUT",
        body: JSON.stringify(client),
    })
}

function deleteClient(id) {
    fetch(`http://localhost:3000/clients/${id}`, {
        method: "DELETE",
    })
}
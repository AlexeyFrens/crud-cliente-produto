
async function loadClients(){
    const response = await fetch("http://localhost:8080/clientes", {
        headers: {
            'Authorization': `Basic ${btoa(`teste:teste123`)}`
        }
    });
    return await response.json();
}

async function findClientById(id) {
    const response = await fetch(`http://localhost:8080/clientes/${id}`, {
        headers: {
            'Authorization': `Basic ${btoa(`teste:teste123`)}`
        }
    });
    return await response.json();
}

function createClient(client) {
    fetch("http://localhost:8080/clientes", {
        method: "POST",
        body: JSON.stringify(client),
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Basic ${btoa(`teste:teste123`)}`
        }
    }).then(async r => console.log(await r.json()));
}

function updateClient(id, client) {
    fetch(`http://localhost:8080/clientes/${id}`, {
        method: "PUT",
        body: JSON.stringify(client),
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Basic ${btoa(`teste:teste123`)}`
        }
    })
}

function deleteClient(id) {
    fetch(`http://localhost:8080/clientes/${id}`, {
        headers: {
            'Authorization': `Basic ${btoa(`teste:teste123`)}`
        },
        method: "DELETE",
    })
}
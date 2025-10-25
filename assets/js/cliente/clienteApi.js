function errorMessage(response, errorData) {
    let message = `Erro (${response.status}): ${errorData.mensagem}`;

    if(errorData.erros){
        errorData.erros.forEach(err => {
            message += `\nCampo '${err.campo}': ${err.erro}`;
        })
    }

    throw new Error(message);
}

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

async function createClient(client) {
    try {
        const response = await fetch("http://localhost:8080/clientes", {
            method: "POST",
            body: JSON.stringify(client),
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Basic ${btoa(`teste:teste123`)}`
            }
        });

        if(!response.ok){
            const errorData = await response.json();

            errorMessage(response, errorData);
        }

        window.location.reload();
    } catch (error) {

        const formatedMessage = error.message.replace(/\n/g, '<br>');

        Swal.fire({
            icon: 'error',
            title: 'Erro ao adicionar cliente',
            html: formatedMessage,
            confirmButtonText: 'Entendi'
        });
    }
}

async function updateClient(id, client) {
    try {
        const response = await fetch(`http://localhost:8080/clientes/${id}`, {
            method: "PUT",
            body: JSON.stringify(client),
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Basic ${btoa(`teste:teste123`)}`
            }
        })

        if(!response.ok){
            const errorData = await response.json();
            errorMessage(response, errorData);
        }

        window.location.reload();
    } catch (error) {
        const formatedMessage = error.message.replace(/\n/g, '<br>');

        Swal.fire({
            icon: 'error',
            title: 'Erro ao atualizar cliente',
            html: formatedMessage,
            confirmButtonText: 'Entendi'
        });
    }
}

function deleteClient(id) {
    fetch(`http://localhost:8080/clientes/${id}`, {
        headers: {
            'Authorization': `Basic ${btoa(`teste:teste123`)}`
        },
        method: "DELETE",
    })
}
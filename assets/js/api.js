function errorMessage(response, errorData) {
    let message = `Erro (${response.status}): ${errorData.mensagem}`;

    if(errorData.erros){
        errorData.erros.forEach(err => {
            message += `\nCampo '${err.campo}': ${err.erro}`;
        })
    }

    throw new Error(message);
}

async function loadEntities(entityRequestName){
    const response = await fetch(`http://localhost:8080/${entityRequestName}`, {
        headers: {
            'Authorization': `Basic ${btoa(`teste:teste123`)}`
        }
    });
    return await response.json();
}

async function findEntityById(entityRequestName, id) {
    const response = await fetch(`http://localhost:8080/${entityRequestName}/${id}`, {
        headers: {
            'Authorization': `Basic ${btoa(`teste:teste123`)}`
        }
    });
    return await response.json();
}

async function createEntity(entityRequestName, entity) {
    try {
        const response = await fetch(`http://localhost:8080/${entityRequestName}`, {
            method: "POST",
            body: JSON.stringify(entity),
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

        if(entityRequestName === "clientes") {
            Swal.fire({
                icon: 'error',
                title: 'Erro ao adicionar cliente',
                html: formatedMessage,
                confirmButtonText: 'Entendi'
            });
        }else {
            Swal.fire({
                icon: 'error',
                title: 'Erro ao adicionar produto',
                html: formatedMessage,
                confirmButtonText: 'Entendi'
            });
        }
    }
}

async function updateEntity(entityRequestName, id, entity) {
    try {
        const response = await fetch(`http://localhost:8080/${entityRequestName}/${id}`, {
            method: "PUT",
            body: JSON.stringify(entity),
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

        if(entityRequestName === "clientes") {
            Swal.fire({
                icon: 'error',
                title: 'Erro ao atualizar cliente',
                html: formatedMessage,
                confirmButtonText: 'Entendi'
            });
        }else {
            Swal.fire({
                icon: 'error',
                title: 'Erro ao atualizar produto',
                html: formatedMessage,
                confirmButtonText: 'Entendi'
            });
        }
    }
}

function deleteEntity(entityRequestName, id) {
    fetch(`http://localhost:8080/${entityRequestName}/${id}`, {
        headers: {
            'Authorization': `Basic ${btoa(`teste:teste123`)}`
        },
        method: "DELETE",
    })
}
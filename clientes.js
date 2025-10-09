 // abrir modal
    const modal = document.getElementById("clienteModal");
    const btnNovo = document.getElementById("btnNovoCliente");
    const btnCancel = document.getElementById("btnCancel");

    btnNovo.addEventListener("click", () => {
      modal.style.display = "flex";
    });

    btnCancel.addEventListener("click", () => {
      modal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
      if (e.target === modal) modal.style.display = "none";
    });
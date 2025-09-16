document.addEventListener("DOMContentLoaded", () => {
    // ======= SEARCH FORM =======
    const form = document.querySelector(".search-container .one-only form");
    const resultsContainer = document.querySelector(".results-container");
    const warningPopup = document.getElementById("warning-popup");
    const closeWarning = document.getElementById("close-warning");

    // Funciones de fade
    function fadeIn(element, displayType = "block") {
        element.style.display = displayType;
        setTimeout(() => element.style.opacity = "1", 10);
    }
    function fadeOut(element) {
        element.style.opacity = "0";
        setTimeout(() => element.style.display = "none", 300);
    }

    // Cerrar popup
    if (closeWarning) closeWarning.addEventListener("click", () => fadeOut(warningPopup));

    // Submit del form
    if (form) form.addEventListener("submit", (e) => {
        e.preventDefault();
        const inputs = form.querySelectorAll("input");
        let filled = false;
        inputs.forEach(inp => { if(inp.value.trim() !== "") filled = true; });

        if(filled){
            fadeIn(resultsContainer, "grid");
            fadeOut(warningPopup);
        } else {
            fadeOut(resultsContainer);
            fadeIn(warningPopup);
        }
    });

    // ======= PAYMENT PAGE / RECONNECT =======
    const oneSections = document.querySelectorAll('.one');
    let balanceElem, pastDueElem;

    oneSections.forEach(section => {
        const h3s = section.querySelectorAll('h3');
        h3s.forEach(h3 => {
            const nextP = h3.nextElementSibling;
            if(!nextP) return;
            if(h3.textContent.includes("Balance")) balanceElem = nextP;
            if(h3.textContent.includes("Past Due Amount")) pastDueElem = nextP.querySelector('span');
        });
    });

    // Actualizar balance y past due desde localStorage
    if(localStorage.getItem("balance") && balanceElem){
        balanceElem.textContent = `$${parseFloat(localStorage.getItem("balance")).toFixed(2)}`;
    }
    if(localStorage.getItem("pastDue") && pastDueElem){
        pastDueElem.textContent = `$${parseFloat(localStorage.getItem("pastDue")).toFixed(2)}`;
    }

    // Reconnect
    const reconnectBtn = document.getElementById("reconnect");
    const reconnectPopup = document.getElementById("reconnect-popup");
    const statusSpan = document.querySelector('.one:nth-child(1) span');

    if(reconnectBtn){
        reconnectBtn.addEventListener("click", () => {
            if(reconnectPopup) reconnectPopup.style.display = "block";

            setTimeout(() => {
                if(reconnectPopup) reconnectPopup.style.display = "none";
                if(statusSpan){
                    statusSpan.textContent = "Active";
                    statusSpan.style.color = "green";
                }
            }, 3000); // Duración de popup 3 segundos
        });
    }
});

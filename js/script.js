document.addEventListener("DOMContentLoaded", () => {
    // 1️⃣ Guardamos los elementos
    const form = document.querySelector(".search-container .one-only form");
    const resultsContainer = document.querySelector(".results-container");
    const warningPopup = document.getElementById("warning-popup");
    const closeWarning = document.getElementById("close-warning");

    // 2️⃣ Funciones de fade
    function fadeIn(element, displayType = "block") {
        element.style.display = displayType;
        setTimeout(() => {
            element.style.opacity = "1";
        }, 10);
    }

    function fadeOut(element) {
        element.style.opacity = "0";
        setTimeout(() => {
            element.style.display = "none";
        }, 300);
    }

    // 3️⃣ Cerrar popup al hacer clic
    closeWarning.addEventListener("click", () => fadeOut(warningPopup));

    // 4️⃣ Escuchar submit del form
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        // Guardamos todos los inputs y eliminamos espacios
        const inputs = form.querySelectorAll("input");
        let hasValue = false;

        inputs.forEach(input => {
            if (input.value.trim() !== "") hasValue = true;
        });

        if (hasValue) {
            fadeIn(resultsContainer, "grid"); // Mostrar resultados
            fadeOut(warningPopup); // Ocultar popup si estaba
        } else {
            fadeOut(resultsContainer); // Ocultar resultados
            fadeIn(warningPopup); // Mostrar popup
        }
    });
});
/**** payment page */
/* pop up*/
  // Traer balance y past due desde localStorage (billing.html)
// ======= Reconnect & Past Due / Balance =======
window.addEventListener("DOMContentLoaded", () => {
    // ======= Balance y Past Due =======
    const oneSections = document.querySelectorAll('.one');
    let balanceElem, pastDueElem;

    oneSections.forEach(section => {
        const h3s = section.querySelectorAll('h3');
        h3s.forEach(h3 => {
            const nextP = h3.nextElementSibling;
            if (!nextP) return;
            if (h3.textContent.includes("Balance")) balanceElem = nextP;
            if (h3.textContent.includes("Past Due Amount")) pastDueElem = nextP.querySelector('span');
        });
    });

    // Actualizar con datos de localStorage
    if (localStorage.getItem("balance") && balanceElem) {
        balanceElem.textContent = `$${parseFloat(localStorage.getItem("balance")).toFixed(2)}`;
    }
    if (localStorage.getItem("pastDue") && pastDueElem) {
        pastDueElem.textContent = `$${parseFloat(localStorage.getItem("pastDue")).toFixed(2)}`;
    }

    // ======= Reconnect button =======
    const reconnectBtn = document.getElementById("reconnect");
    const reconnectPopup = document.getElementById("reconnect-popup");
    const statusSpan = document.querySelector('.one:nth-child(1) span');

    reconnectBtn.addEventListener("click", () => {
        reconnectPopup.style.display = "block";

        setTimeout(() => {
            reconnectPopup.style.display = "none";
            if(statusSpan) {
                statusSpan.textContent = "Active";
                statusSpan.style.color = "green";
            }
        }, 1000);
    });
});
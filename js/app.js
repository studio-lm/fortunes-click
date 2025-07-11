// document.addEventListener("DOMContentLoaded", () => {
//   const accepted = localStorage.getItem("cookiesAccepted");
//   if (accepted === "true") {
//     document.getElementById("cookie-popup").style.display = "none";
//     document.body.style.overflow = "auto";
//   }
// });


function acceptCookies() {
    const popup = document.getElementById("cookie-popup");
    popup.style.backdropFilter = "blur(0px)";
    popup.classList.add("fall-out");
    localStorage.setItem("cookiesAccepted", "true");
    setTimeout(() => {
        popup.style.display = "none";
        document.body.style.overflow = "auto";
    }, 600);
}

function declineCookies() {
    const step1Box = document.getElementById("popup-step-1");
    const step2Box = document.getElementById("popup-step-2");
    step1Box.classList.add("fall-out");
    setTimeout(() => {
        step1Box.classList.add("hidden");
        step2Box.classList.remove("hidden");
        step2Box.classList.add("bounce-in");
    }, 600);
}

document.getElementById("cookie-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const address = form.address.value.trim();
    const postal = form.postal.value.trim();

    if (!name || !email || !address || !postal) {
        const popup = document.getElementById("popup-step-2");
        popup.classList.remove("shake");
        void popup.offsetWidth;
        popup.classList.add("shake");
        return;
    }

    // Check cookie counter from localStorage
    let cookieCount = parseInt(localStorage.getItem("cookieCount") || "0");

    // Maximal 12 Cookies
    if (cookieCount >= 12) {
        const popup = document.getElementById("popup-step-2");
        popup.classList.add("fall-out");
        setTimeout(() => {
            popup.classList.add("hidden");
            const step3Box = document.getElementById("popup-step-3");
            const confirmText = document.getElementById("cookie-confirm-text");
            confirmText.textContent = "Sorry, all 12 cookies have already been sent.";
            step3Box.classList.remove("hidden");
            step3Box.classList.add("bounce-in");
        }, 600);
        return;
    }

    // Wenn noch Platz → absenden
    fetch(form.action, {
        method: 'POST',
        headers: {
            'Accept': 'application/json'
        },
        body: new FormData(form)
    }).then(response => {
        if (response.ok) {
            // Zähler erhöhen und speichern
            cookieCount += 1;
            localStorage.setItem("cookieCount", cookieCount);

            const popup = document.getElementById("popup-step-2");
            popup.classList.add("fall-out");

            setTimeout(() => {
                popup.classList.add("hidden");

                const step3Box = document.getElementById("popup-step-3");
                const confirmText = document.getElementById("cookie-confirm-text");
                confirmText.textContent = `Nice, your cookie is almost on the way. (${cookieCount}/12 Cookies sent.)`;

                step3Box.classList.remove("hidden");
                step3Box.classList.add("bounce-in");
            }, 600);
        } else {
            alert("Oops! Something went wrong.");
        }
    }).catch(() => {
        alert("Could not send the form. Please try again later.");
    });
});



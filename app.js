AOS.init({
    duration: 1000,
    once: true
});

const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbzJ-Mp9Hy6RZe_8jVv2mI80u_1NV90LyJfgEaXSLlDobO4vW9AjpZM7OGXkjLMb3XnB/exec";

const targetDate = new Date("2026-10-03T21:00:00");

/* ======================
   COUNTDOWN
====================== */

function updateCountdown() {

    const diff = targetDate - new Date();

    if (diff <= 0) return;

    document.getElementById("days").textContent =
        Math.floor(diff / 86400000);

    document.getElementById("hours").textContent =
        Math.floor((diff % 86400000) / 3600000);

    document.getElementById("minutes").textContent =
        Math.floor((diff % 3600000) / 60000);

    document.getElementById("seconds").textContent =
        Math.floor((diff % 60000) / 1000);
}

updateCountdown();
setInterval(updateCountdown, 1000);

/* ======================
   GALERÍA
====================== */

document
    .querySelectorAll(".gallery img")
    .forEach(img => {

        img.addEventListener("click", () => {
            window.open(img.src, "_blank");
        });

    });

/* ======================
   RSVP
====================== */

document
    .getElementById("rsvpForm")
    .addEventListener("submit", async event => {

        event.preventDefault();

        const btn =
            event.target.querySelector("button");

        btn.disabled = true;
        btn.textContent = "Enviando...";

        const data = {
            nombre:
                document.getElementById("nombre").value,
            asiste:
                document.getElementById("asiste").value,
            cancion:
                document.getElementById("cancion").value,
            comentarios:
                document.getElementById("comentarios").value
        };

        try {

            await fetch(SCRIPT_URL, {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type":
                    "text/plain;charset=utf-8"
                },
                body: JSON.stringify(data)
            });

            confetti({
                particleCount: 200,
                spread: 90,
                origin: {
                    y: 0.6
                }
            });

            document.getElementById("mensaje").innerHTML =
                "✨ ¡Gracias por confirmar tu asistencia!";

            event.target.reset();

        } catch (error) {

            document.getElementById("mensaje").innerHTML =
                "⚠️ No se pudo enviar la información. Intentá nuevamente.";

            console.error(error);

        } finally {

            btn.disabled = false;
            btn.textContent = "Confirmar";

        }

    });
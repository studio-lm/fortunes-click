// document.addEventListener("DOMContentLoaded", () => {
//   const accepted = localStorage.getItem("cookiesAccepted");
//   if (accepted === "true") {
//     document.getElementById("cookie-popup").style.display = "none";
//     document.body.style.overflow = "auto";
//   }
// });

const SUPABASE_URL = "https://fzyfrkugailgwkndxlym.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ6eWZya3VnYWlsZ3drbmR4bHltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIyMjUxMTQsImV4cCI6MjA2NzgwMTExNH0.suukaJ2nZLX6rH7qDd5uErr5uhLJZ08kLlWHzUs9pQ8";

async function getAndUpdateCookieCount() {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/cookie_count?id=eq.1`, {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
    },
  });

  const data = await res.json();
  let { successful_cookies, total_requests } = data[0];

  total_requests++;

  let cookieGranted = successful_cookies < 12;
  if (cookieGranted) successful_cookies++;

  const update = await fetch(`${SUPABASE_URL}/rest/v1/cookie_count?id=eq.1`, {
    method: "PATCH",
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify({
      total_requests,
      successful_cookies,
    }),
  });

  const result = await update.json();
  return {
    cookieGranted,
    successfulCount: result[0].successful_cookies,
    totalCount: result[0].total_requests,
  };
}



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

  // ⬇️ Hier kommt der Supabase-Check
  getAndUpdateCookieCount().then(async (countData) => {
    const { cookieGranted, successfulCount, totalCount } = countData;

    // Wenn Cookie verfügbar → an Formspree senden
    if (cookieGranted) {
      await fetch(form.action, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: new FormData(form),
      });
    }

    const popup = document.getElementById("popup-step-2");
    popup.classList.add("fall-out");

    setTimeout(() => {
      popup.classList.add("hidden");

      const step3Box = document.getElementById("popup-step-3");
      const confirmText = document.getElementById("cookie-confirm-text");
      const statsText = document.getElementById("cookie-stats-text");

      if (cookieGranted) {
        confirmText.textContent = `Nice, your cookie is almost on the way! (${successfulCount}/12 Cookies sent)`;
      } else {
        confirmText.textContent = `Sorry, all 12 cookies have already been sent.`;
      }

      statsText.textContent = `Total people who wanted a cookie: ${totalCount}`;

      step3Box.classList.remove("hidden");
      step3Box.classList.add("bounce-in");
    }, 600);
  }).catch((err) => {
    alert("Something went wrong while connecting to the cookie server.");
    console.error(err);
  });
});

const limit = 5;
let countdownInterval = null;

async function sendRequest() {
  const status = document.getElementById("status");
  const fill = document.getElementById("fill");
  const countEl = document.getElementById("count");
  const timerEl = document.getElementById("timer");

  try {
    const res = await fetch("/api/request");

    const used = Number(res.headers.get("X-RateLimit-Used")) || 0;
    let remainingTime = Number(res.headers.get("X-RateLimit-Reset")) || 0;

    // Clear any old timer
    if (countdownInterval) {
      clearInterval(countdownInterval);
      countdownInterval = null;
    }

    if (res.status === 429) {
      status.innerText = "❌ TOO MANY REQUESTS";
      status.style.color = "red";

      // Start smooth countdown
      timerEl.innerText = `Wait ${remainingTime} seconds`;

      countdownInterval = setInterval(() => {
        remainingTime--;

        if (remainingTime <= 0) {
          clearInterval(countdownInterval);
          countdownInterval = null;
          timerEl.innerText = "You can send request now ✅";
          status.innerText = "🟢 READY";
          status.style.color = "green";
        } else {
          timerEl.innerText = `Wait ${remainingTime} seconds`;
        }
      }, 1000);

    } else {
      status.innerText = "✅ REQUEST ALLOWED";
      status.style.color = "green";
      timerEl.innerText = "";
    }

    // Update progress UI
    fill.style.width = `${Math.min((used / limit) * 100, 100)}%`;
    countEl.innerText = `Requests Used: ${Math.min(used, limit)} / ${limit}`;

  } catch (err) {
    console.error(err);
    status.innerText = "Server error";
    status.style.color = "red";
  }
}

const firebaseURL = "PASTE_YOUR_FIREBASE_DATABASE_URL_HERE/messages.json";

const form = document.getElementById("messageForm");
const nameInput = document.getElementById("nameInput");
const messageInput = document.getElementById("messageInput");
const messagesList = document.getElementById("messagesList");

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const name = nameInput.value.trim();
  const message = messageInput.value.trim();

  if (!name || !message) {
    alert("Please write your name and message.");
    return;
  }

  const newMessage = {
    name: name,
    message: message,
    date: new Date().toLocaleString()
  };

  await fetch(firebaseURL, {
    method: "POST",
    body: JSON.stringify(newMessage),
    headers: {
      "Content-Type": "application/json"
    }
  });

  nameInput.value = "";
  messageInput.value = "";

  getMessages();
});

async function getMessages() {
  messagesList.innerHTML = "<p>Loading messages...</p>";

  const response = await fetch(firebaseURL);
  const data = await response.json();

  messagesList.innerHTML = "";

  if (!data) {
    messagesList.innerHTML = "<p>No messages yet. Be the first to write one.</p>";
    return;
  }

  const messages = Object.values(data).reverse();

  messages.forEach(function (item) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message");

    messageElement.innerHTML = `
      <h3>${item.name}</h3>
      <p>${item.message}</p>
      <small>${item.date}</small>
    `;

    messagesList.appendChild(messageElement);
  });
}

getMessages();

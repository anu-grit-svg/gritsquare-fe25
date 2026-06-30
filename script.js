const firebaseURL = "https://gritsquare-fe25-default-rtdb.europe-west1.firebasedatabase.app/messages.json";

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

  try {
    await fetch(firebaseURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newMessage)
    });

    form.reset();
    getMessages();

  } catch (error) {
    console.error(error);
    alert("Could not save the message.");
  }
});

async function getMessages() {
  messagesList.innerHTML = "<p>Loading messages...</p>";

  try {
    const response = await fetch(firebaseURL);
    const data = await response.json();

    messagesList.innerHTML = "";

    if (!data) {
      messagesList.innerHTML = "<p>No messages yet. Be the first to write one.</p>";
      return;
    }

    const messages = Object.values(data).reverse();

    messages.forEach((item) => {
      const div = document.createElement("div");
      div.className = "message";

      div.innerHTML = `
        <h3>${item.name}</h3>
        <p>${item.message}</p>
        <small>${item.date}</small>
      `;

      messagesList.appendChild(div);
    });

  } catch (error) {
    console.error(error);
    messagesList.innerHTML = "<p>Unable to load messages.</p>";
  }
}

getMessages();

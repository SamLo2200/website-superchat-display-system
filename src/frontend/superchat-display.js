// Create a new WebSocket connection
const socket = new WebSocket("ws://localhost:3000");

// WebSocket message event handler
socket.addEventListener("message", (event) => {
    // Parse the received JSON payload
    const data = JSON.parse(event.data);

    // // Display the received data on the DOM
    // const messageContainer = document.getElementById("message-container");
    // const messageElement = document.createElement("div");

    // // Format and add the message to the DOM
    // messageElement.innerHTML = `
    //                      <p><strong>Name:</strong> ${data.name}</p>
    //                      <p><strong>Amount:</strong> ${data.amount}</p>
    //                      <p><strong>Message:</strong> ${data.message}</p>
    //             `;

    // messageContainer.appendChild(messageElement);

    // setTimeout(() => {
    //     messageContainer.removeChild(messageElement);
    // }, 40000);

    const superchatWrapper = document.createElement("div");
    superchatWrapper.classList.add("superchat-wrapper");

    const messageContainer = document.createElement("div");
    messageContainer.classList.add("message-container");

    const superchatInfo = document.createElement("div");
    superchatInfo.classList.add("superchat-info");

    const name = document.createElement("p");
    name.classList.add("name");
    name.textContent = `${data.name}`;

    const amount = document.createElement("p");
    amount.classList.add("amount");
    amount.textContent = `$${data.amount}`;

    const content = document.createElement("div");
    content.classList.add("content");

    const message = document.createElement("p");
    message.classList.add("message");
    message.textContent = `${data.message}`;

    // Combine child elements with their parents
    superchatInfo.appendChild(name);
    superchatInfo.appendChild(amount);

    content.appendChild(message);

    messageContainer.appendChild(superchatInfo);
    messageContainer.appendChild(content);

    superchatWrapper.appendChild(messageContainer);

    // Insert the final structure into a designated parent element
    document.body.appendChild(superchatWrapper); // Or any other appropriate parent

    setTimeout(() => {
        superchatWrapper.parentNode.removeChild(superchatWrapper);
    }, 10000);
});

const express = require("express");
const WebSocket = require("ws");
const path = require("path");
require("dotenv").config();

// console.log(process.env.API_KEY);

const app = express();
const server = app.listen(3000, () => {
    console.log("Server listening on port 3000");
});

function sanitize(string) {
    const map = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#x27;",
        "/": "&#x2F;",
    };
    const reg = /[&<>"'/]/gi;
    return string.toString().replace(reg, (match) => map[match]);
}

// Create a WebSocket server
const wss = new WebSocket.Server({ server });

// Store the connected WebSocket clients
const clients = new Set();

// WebSocket server connection event
wss.on("connection", (ws) => {
    console.log("New WebSocket client connected");

    // Add the new client to the client set
    clients.add(ws);

    // WebSocket message event
    ws.on("message", (message) => {
        console.log(`Received message from client: ${message}`);
    });

    // WebSocket close event
    ws.on("close", () => {
        console.log("WebSocket client disconnected");

        // Remove the disconnected client from the client set
        clients.delete(ws);
    });
});

// Express route for handling HTTP requests

app.use(express.static(path.join(__dirname, "../frontend")));

app.post("/send", express.json(), (req, res) => {
    console.log("Request Received");
    const { name, amount, message, API_KEY } = req.body;

    // sanitizedName = sanitize(name);
    // sanitizedAmount = sanitize(amount);
    // sanitizedMessage = sanitize(message);

    // Create the payload with the provided data
    // const payload = JSON.stringify({ sanitizedName, sanitizedAmount, sanitizedMessage });
    const payload = JSON.stringify({ name, amount, message });

    // Send the payload to all connected WebSocket clients

    if (API_KEY == process.env.API_KEY) {
        clients.forEach((client) => {
            client.send(payload);
        });

        // Respond with a success message
        res.status(200).json({ message: "Data sent to WebSocket clients" });
        console.log("Data sent to WebSocket clients");
    } else {
        res.status(401).json({ message: "401 Unauthorized" });
        console.log("401 Unauthorized");
    }
});

//deliver website
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../frontend", "superchat-display.html"));
});

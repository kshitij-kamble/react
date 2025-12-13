import { useState } from "react";
import { Chatbot } from "supersimpledev";
import loader from "../assets/loading-spinner.gif";
import "./ChatInput.css";
import dayjs from "dayjs";

export function ChatInput({ chatMessages, setChatMessages }) {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  async function sendMessage() {
    if (isLoading || inputText === "") {
      return;
    }
    setIsLoading(true);
    const newChatMessages = [
      ...chatMessages, //makes the copy of existing array
      {
        message: inputText, // this is the new object of array that will be added to the above copy of array
        sender: "user",
        id: crypto.randomUUID(),
        time: dayjs().valueOf(),
      },
      //after making copy and adding new object in array react will replace this new array with old array.
    ];
    setChatMessages([
      ...newChatMessages,
      {
        message: <img src={loader} className="loading" />,
        sender: "robot",
        id: crypto.randomUUID(),
        time: dayjs().valueOf(),
      },
    ]);
    setInputText("");

    const response = await Chatbot.getResponseAsync(inputText);
    setChatMessages([
      ...newChatMessages, //makes the copy of existing array
      {
        message: response, // this is the new object of array that will be added to the above copy of array
        sender: "robot",
        id: crypto.randomUUID(),
        time: dayjs().valueOf(),
      },
    ]); //after making copy and adding new object in array react will replace this new array with old array.
    setIsLoading(false);
  }
  function enterToSend(event) {
    // console.log(event.key);
    if (event.key === "Enter") {
      sendMessage();
    } else if (event.key === "Escape") {
      setInputText("");
    }
  }
  function clearMessages() {
    setChatMessages([]);
  }
  return (
    <div className="chat-input-container">
      <input
        placeholder="Send a message to Chatbot"
        size="30"
        onChange={saveInputText}
        value={inputText}
        onKeyDown={enterToSend}
        className="chat-input"
      />
      <button onClick={sendMessage} className="send-button">
        Send
      </button>

      <button onClick={clearMessages} className="clear-button">
        Clear
      </button>
    </div>
  );
}

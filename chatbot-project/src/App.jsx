import { useState } from 'react';
import './App.css'
 function ChatInput({ chatMessages, setChatMessages }) {
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
            },
            //after making copy and adding new object in array react will replace this new array with old array.
          ];
          setChatMessages([
            ...newChatMessages,
            {
              message: <img src="loading-spinner.gif" className="loading"/>,
              sender: "robot",
              id: crypto.randomUUID(),
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
          </div>
        );
      }
      function ChatMessage({ message, sender }) {
        return (
          <div
            className={
              sender === "user" ? "chat-message-user" : "chat-message-robot"
            }
          >
            {sender === "robot" && (
              <img src="robot.png" className="chat-message-profile" />
            )}
            <div className="chat-message-text">{message}</div>
            {sender === "user" && (
              <img src="user.png" className="chat-message-profile" />
            )}
          </div>
        );
      }
 function useAutoScroll(dependencis){
        const containerRef = React.useRef(null);
        React.useEffect(() => {
          const containerElem = containerRef.current;
          if (containerElem) {
            containerElem.scrollTop = containerElem.scrollHeight;
          }
        }, dependencis);

        return containerRef;

      }
      function ChatMessages({ chatMessages }) {
       const chatMessageRef = useAutoScroll([chatMessages]); 
        return (
          <div className="chat-messages-container" ref={chatMessageRef}>
            {chatMessages.map((chatMessage) => {
              return (
                <ChatMessage
                  message={chatMessage.message}
                  sender={chatMessage.sender}
                  key={chatMessage.id}
                />
              );
            })}
          </div>
        );
      } 
function App() {
  const [chatMessages, setChatMessages] = useState([]);


        return (
          <div className="app-container">
            {chatMessages.length === 0 && (<p className="welcome">Welcome to the chatbot project! Send a message using the textbox below.</p>)}
            <ChatMessages chatMessages={chatMessages} />
             <ChatInput
                chatMessages={chatMessages}
                setChatMessages={setChatMessages}
            />
          </div>
        );
}

export default App

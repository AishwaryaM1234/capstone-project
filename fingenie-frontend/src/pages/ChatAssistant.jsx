import React, { useState } from "react";
import BackButton from "../components/BackButton";

function ChatAssistant() {

  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const handleSend = () => {

    const msg = message.toLowerCase();
    let reply = "";

    if (msg.includes("account")) {
      reply = "Accounts Module helps create and manage bank accounts.";
    } else if (msg.includes("transaction")) {
      reply = "Transactions Module helps perform deposits and withdrawals.";
    } else if (msg.includes("loan")) {
      reply = "Loans Module helps users apply for loans and track loan status.";
    } else if (msg.includes("investment")) {
      reply = "Investments Module helps users manage investment portfolios.";
    } else if (msg.includes("fraud")) {
      reply = "Fraud Alerts are generated for high transactions above ₹50,000.";
    } else {
      reply = "Please ask about Accounts, Transactions, Loans, Investments or Fraud Alerts.";
    }

    setResponse(reply);
  };

  return (
    <>
      <style>{`

        .chat-container {
          height: 100vh;
          background: linear-gradient(135deg, #141e30, #243b55);
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: 'Segoe UI', sans-serif;
        }

        .chat-card {
          width: 420px;
          height: 600px;
          display: flex;
          flex-direction: column;
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 50px rgba(0,0,0,0.3);
        }

        /* HEADER */
        .chat-header {
          background: linear-gradient(90deg,#007bff,#00c6ff);
          color: white;
          padding: 15px;
          font-weight: bold;
          text-align: center;
        }

        /* BODY */
        .chat-body {
          flex: 1;
          padding: 15px;
          overflow-y: auto;
          background: #f5f7fb;
        }

        .msg {
          margin-bottom: 12px;
        }

        .user-msg {
          text-align: right;
        }

        .bot-msg {
          text-align: left;
        }

        .bubble {
          display: inline-block;
          padding: 12px 16px;
          border-radius: 20px;
          max-width: 75%;
          font-size: 14px;
        }

        .user-bubble {
          background: linear-gradient(45deg,#007bff,#00c6ff);
          color: white;
          border-bottom-right-radius: 5px;
        }

        .bot-bubble {
          background: #e3f2fd;
          color: #333;
          border-bottom-left-radius: 5px;
        }

        /* INPUT */
        .chat-footer {
          padding: 10px;
          display: flex;
          gap: 10px;
          background: #fff;
          border-top: 1px solid #eee;
        }

        .chat-input {
          flex: 1;
          padding: 10px;
          border-radius: 20px;
          border: 1px solid #ccc;
        }

        .send-btn {
          padding: 10px 18px;
          border-radius: 20px;
          border: none;
          background: linear-gradient(45deg,#28a745,#00c851);
          color: white;
          font-weight: bold;
          cursor: pointer;
          transition: 0.3s;
        }

        .send-btn:hover {
          transform: scale(1.08);
        }

        .back-wrapper {
          position: absolute;
          top: 15px;
          left: 15px;
        }

      `}</style>

      <div className="chat-container">

        <div className="back-wrapper">
          <BackButton />
        </div>

        <div className="chat-card">

          <div className="chat-header">
            🤖 FinGenie Assistant
          </div>

          {/* CHAT BODY */}
          <div className="chat-body">

            {message && (
              <div className="msg user-msg">
                <div className="bubble user-bubble">
                  {message}
                </div>
              </div>
            )}

            {response && (
              <div className="msg bot-msg">
                <div className="bubble bot-bubble">
                  {response}
                </div>
              </div>
            )}

          </div>

          {/* INPUT AREA */}
          <div className="chat-footer">

            <input
              type="text"
              className="chat-input"
              placeholder="Ask something..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <button className="send-btn" onClick={handleSend}>
              Send
            </button>

          </div>

        </div>

      </div>
    </>
  );
}

export default ChatAssistant;
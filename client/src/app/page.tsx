"use client";

import { useState, FormEvent, useEffect } from "react";

export default function Home() {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    ws?.send(message);

    setMessage("");
    setMessages(prev => [...prev, message])
  };

  useEffect(() => {
    const newWs = new WebSocket("ws://localhost:8080");

    newWs.onmessage = (ev) => {
      console.log(ev.data);
      setMessages((prev) => [...prev, ev.data]);
    };

    setWs(newWs);

    return () => {
      newWs.close()
    }
  }, []);

  return (
    <main className="grow grid place-items-center">
      <div className="flex flex-col h-1/2 min-h-[30rem] w-1/2 min-w-fit max-w-3xl rounded-lg overflow-hidden">
        <div className="grow flex flex-col gap-3 p-3 bg-slate-900">
          {messages.map((message) => (
            <div key={message} className="bg-slate-700 w-fit p-2 rounded-md">{message}</div>
          ))}
        </div>
        <form
          onSubmit={onSubmit}
          className="flex gap-3 bg-slate-800 p-4 items-center"
        >
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Send a message..."
            className="grow rounded-md px-3 py-2 outline-none bg-slate-700"
          />
          <label htmlFor="submit" className="text-slate-500 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
          </label>
          <input type="submit" id="submit" value="Send" className="hidden" />
        </form>
      </div>
    </main>
  );
}

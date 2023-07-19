"use client";

import { useState, FormEvent, useEffect } from "react";

interface Message {
  from: string;
  text: string;
}

export default function Home() {
  const [nicknameText, setNicknameText] = useState<string | null>(null);
  const [nickname, setNickname] = useState<string | null>(null);
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    const newMessage = {
      from: nickname!,
      text: message,
    };

    ws?.send(JSON.stringify(newMessage));

    setMessage("");
    setMessages((prev) => [...prev, newMessage]);
  };

  const onNicknameSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (nicknameText) {
      setNickname(nicknameText);
    }
  };

  useEffect(() => {
    const newWs = new WebSocket("ws://localhost:8080");

    newWs.onmessage = (ev) => {
      console.log(ev.data);
      setMessages((prev) => [...prev, JSON.parse(ev.data) as Message]);
    };

    setWs(newWs);

    return () => {
      newWs.close();
    };
  }, []);

  return (
    <main className="grow grid place-items-center">
      <div className="h-1/2 min-h-[30rem] w-1/2 min-w-fit max-w-3xl rounded-lg overflow-hidden">
        {!nickname ? (
          <div className="h-full bg-slate-900 grid place-items-center">
            <div className="text-center">
              <p className="text-xl mb-5">Enter a nickname</p>
              <form
                className="flex gap-2 items-stretch"
                onSubmit={onNicknameSubmit}
              >
                <input
                  type="text"
                  placeholder="RemarkableDisaster21"
                  value={nicknameText ?? ""}
                  onChange={(e) => setNicknameText(e.target.value)}
                  className="rounded-md px-3 py-2 outline-none bg-slate-700"
                />
                <label
                  htmlFor="nicknameSubmit"
                  className="bg-blue-500 px-2 rounded-md flex items-center hover:bg-blue-600 group"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 transition group-hover:translate-x-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </label>
                <input
                  type="submit"
                  id="nicknameSubmit"
                  className="hidden"
                  value="Next"
                />
              </form>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col">
            <div className="grow flex flex-col gap-3 p-5 overflow-scroll bg-slate-900">
              {messages.map(({ from, text }) =>
                from === nickname ? (
                  <div
                    key={text}
                    className="max-w-xs self-end bg-blue-500 w-fit p-2 rounded-lg"
                  >
                    {text}
                  </div>
                ) : (
                  <div key={text}>
                    <p className="text-slate-500 text-sm">{from}</p>
                    <div
                      key={text}
                      className="max-w-xs bg-slate-700 w-fit p-2 rounded-lg"
                    >
                      {text}
                    </div>
                  </div>
                )
              )}
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
              <input
                type="submit"
                id="submit"
                value="Send"
                className="hidden"
              />
            </form>
          </div>
        )}
      </div>
    </main>
  );
}

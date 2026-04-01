import { useState } from "react";
import { Send, X, MessageCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Card } from "./ui/card";
function Chat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: "1",
      text: "Hello! How can I help you today?",
      sender: "other",
      timestamp: /* @__PURE__ */ new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const sendMessage = () => {
    if (!input.trim()) return;
    const newMessage = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: /* @__PURE__ */ new Date()
    };
    setMessages([...messages, newMessage]);
    setInput("");
    setTimeout(() => {
      const response = {
        id: (Date.now() + 1).toString(),
        text: "Thanks for your message! A farmer will respond shortly.",
        sender: "other",
        timestamp: /* @__PURE__ */ new Date()
      };
      setMessages((prev) => [...prev, response]);
    }, 1e3);
  };
  if (!isOpen) {
    return <Button
      onClick={() => setIsOpen(true)}
      className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50"
      size="icon"
    ><MessageCircle className="h-6 w-6" /></Button>;
  }
  return <Card className="fixed bottom-6 right-6 w-96 h-[500px] shadow-xl z-50 flex flex-col fm-panel"><div className="flex items-center justify-between p-4 border-b border-black/5"><div className="flex items-center gap-2"><div className="h-3 w-3 bg-primary rounded-full" /><h3 className="font-semibold">Chat Support</h3></div><Button
    variant="ghost"
    size="icon"
    onClick={() => setIsOpen(false)}
  ><X className="h-4 w-4" /></Button></div><ScrollArea className="flex-1 p-4"><div className="space-y-4">{messages.map((message) => <div
    key={message.id}
    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
  ><div
    className={`max-w-[80%] rounded-2xl px-4 py-2 ${message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-white/70 text-foreground border border-black/5"}`}
  ><p className="text-sm">{message.text}</p><p className="text-xs opacity-70 mt-1">{message.timestamp.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  })}</p></div></div>)}</div></ScrollArea><div className="p-4 border-t"><div className="flex gap-2"><Input
    value={input}
    onChange={(e) => setInput(e.target.value)}
    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
    placeholder="Type a message..."
  /><Button onClick={sendMessage} size="icon"><Send className="h-4 w-4" /></Button></div></div></Card>;
}
export {
  Chat
};

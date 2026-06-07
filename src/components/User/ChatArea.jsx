import { useState, useRef, useEffect } from "react";

const initialContacts = [
  { id: 1, initials: "SR", name: "Sara Ramos", lastMsg: "Are you free this evening?", time: "2m", unread: 3, online: true, color: "bg-purple-900 text-purple-300" },
  { id: 2, initials: "MK", name: "Mike Keller", lastMsg: "👍 Sounds good, let's do it", time: "18m", unread: 0, online: false, color: "bg-emerald-900 text-emerald-400" },
  { id: 3, initials: "DJ", name: "Dev Team 🚀", lastMsg: "Priya: Pushed the fix, check CI", time: "1h", unread: 12, online: true, color: "bg-amber-900 text-amber-400" },
  { id: 4, initials: "NN", name: "Nina Nakamura", lastMsg: "Photo shared", time: "3h", unread: 0, online: false, color: "bg-blue-900 text-blue-400" },
  { id: 5, initials: "AL", name: "Alex Lee", lastMsg: "Thanks for the update!", time: "Yesterday", unread: 0, online: true, color: "bg-violet-900 text-violet-300" },
  { id: 6, initials: "PD", name: "Priya Das", lastMsg: "See you at standup!", time: "Mon", unread: 0, online: false, color: "bg-green-900 text-green-400" },
];

const initialMessages = [
  { id: 1, from: "them", text: "Hey! How's everything going? 👋", time: "10:14 AM", read: true },
  { id: 2, from: "me", text: "Hey Sara! All good here, pretty busy with the project. You?", time: "10:16 AM", read: true },
  { id: 3, from: "them", text: "Same! The deadline's next Friday. Are you free this evening to catch up and maybe review the mockups together?", time: "10:18 AM", read: true },
  { id: 4, from: "me", text: "Definitely! I'll be free after 6pm. Should we hop on a call or meet somewhere?", time: "10:21 AM", read: true },
  { id: 5, from: "them", text: "A call works perfectly! I'll send you the link at 6. 🎉", time: "10:22 AM", read: true },
  { id: 6, from: "me", text: "Perfect, see you then! 🙌", time: "10:23 AM", read: false },
];

const SidebarIcon = ({ icon, active, badge }) => (
  <button
    className={`relative w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-150 ${
      active ? "bg-red-500/15" : "hover:bg-white/7"
    }`}
  >
    <span className={`text-xl ${active ? "text-red-500" : "text-gray-500"}`}>{icon}</span>
    {badge && (
      <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
    )}
  </button>
);

const Avatar = ({ initials, color, online, size = "md" }) => {
  const sizes = { sm: "w-7 h-7 text-xs", md: "w-9 h-9 text-sm", lg: "w-10 h-10 text-sm" };
  const dotSizes = { sm: "w-2 h-2", md: "w-2.5 h-2.5", lg: "w-2.5 h-2.5" };
  return (
    <div className="relative flex-shrink-0">
      <div className={`${sizes[size]} rounded-full font-semibold flex items-center justify-center font-mono ${color}`}>
        {initials}
      </div>
      {online && (
        <span className={`absolute bottom-0 right-0 ${dotSizes[size]} bg-emerald-500 rounded-full border-2 border-[#2c2c2c]`} />
      )}
    </div>
  );
};

export default function ChatArea() {
  const [contacts, setContacts] = useState(initialContacts);
  const [activeContact, setActiveContact] = useState(contacts[0]);
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [activeTab, setActiveTab] = useState("chats");
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  const filteredContacts = contacts.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), from: "me", text: input.trim(), time, read: false },
    ]);
    setInput("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 3000);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleInput = (e) => {
    setInput(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 90) + "px";
  };

  const selectContact = (contact) => {
    setActiveContact(contact);
    setContacts((prev) =>
      prev.map((c) => (c.id === contact.id ? { ...c, unread: 0 } : c))
    );
  };

  const sidebarItems = [
    { id: "chats", icon: "💬", badge: true },
    { id: "groups", icon: "👥", badge: false },
    { id: "calls", icon: "📞", badge: false },
    { id: "stories", icon: "⭕", badge: false },
  ];

  return (
    <div className="flex flex-col h-screen bg-[#3a3a3a] font-sans overflow-hidden">
      {/* Navbar */}
      <nav className="bg-[#222] flex items-center justify-between px-5 h-[62px] border-b border-white/5 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-red-500 rounded-lg flex items-center justify-center text-white text-lg">
            💬
          </div>
          <div>
            <div className="font-bold text-xl tracking-tight">
              <span className="text-white">Nex</span>
              <span className="text-red-500">chat</span>
            </div>
            <div className="text-[9px] text-gray-500 tracking-[2px] -mt-0.5">REAL-TIME MESSAGING</div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="relative w-9 h-9 rounded-full bg-white/5 border border-white/8 flex items-center justify-center hover:bg-white/10 transition-colors">
            <span className="text-gray-400 text-base">🔔</span>
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold rounded-full px-1 leading-4 min-w-[16px] text-center">
              9+
            </span>
          </button>
          <button className="w-9 h-9 rounded-full bg-white/5 border border-white/8 flex items-center justify-center hover:bg-white/10 transition-colors">
            <span className="text-gray-400 text-base">👥</span>
          </button>
          <div className="relative w-9 h-9 rounded-full bg-gradient-to-br from-violet-600 to-purple-500 flex items-center justify-center font-bold text-white text-sm cursor-pointer border-2 border-white/10">
            AK
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#222]" />
          </div>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-[68px] bg-[#282828] border-r border-white/5 flex flex-col items-center py-3 gap-1 flex-shrink-0">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`relative w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-150 ${
                activeTab === item.id ? "bg-red-500/15" : "hover:bg-white/7"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.badge && activeTab === item.id && (
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
              )}
            </button>
          ))}
          <div className="flex-1" />
          <button className="w-11 h-11 rounded-xl flex items-center justify-center hover:bg-white/7 transition-colors">
            <span className="text-lg">⚙️</span>
          </button>
        </div>

        {/* Contacts Panel */}
        <div className="w-60 bg-[#2c2c2c] border-r border-white/5 flex flex-col flex-shrink-0">
          <div className="px-4 pt-4 pb-3 border-b border-white/5">
            <h2 className="text-[15px] font-semibold text-gray-200 mb-3">Messages</h2>
            <div className="bg-white/5 border border-white/8 rounded-lg flex items-center px-3 gap-2 h-9">
              <span className="text-gray-500 text-sm">🔍</span>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search conversations..."
                className="bg-transparent border-none outline-none text-gray-300 text-[13px] flex-1 placeholder-gray-600"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10">
            {filteredContacts.map((contact) => (
              <button
                key={contact.id}
                onClick={() => selectContact(contact)}
                className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 transition-colors text-left ${
                  activeContact.id === contact.id
                    ? "bg-red-500/8 border-r-2 border-red-500"
                    : "hover:bg-white/4"
                }`}
              >
                <Avatar
                  initials={contact.initials}
                  color={contact.color}
                  online={contact.online}
                  size="md"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <span className="text-[13px] font-medium text-gray-300 truncate">{contact.name}</span>
                    <span className="text-[11px] text-gray-600 flex-shrink-0 ml-1">{contact.time}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <p className="text-[12px] text-gray-600 truncate flex-1">{contact.lastMsg}</p>
                    {contact.unread > 0 && (
                      <span className="bg-red-500 text-white text-[10px] font-bold rounded-full px-1.5 leading-4 flex-shrink-0">
                        {contact.unread}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Main Chat */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Chat Header */}
          <div className="bg-[#2a2a2a] px-5 h-[58px] flex items-center justify-between border-b border-white/5 flex-shrink-0">
            <div className="flex items-center gap-3">
              <Avatar
                initials={activeContact.initials}
                color={activeContact.color}
                online={activeContact.online}
                size="lg"
              />
              <div>
                <div className="text-[14px] font-semibold text-gray-100">{activeContact.name}</div>
                <div className={`text-[12px] ${activeContact.online ? "text-emerald-500" : "text-gray-500"}`}>
                  {activeContact.online ? "Online" : "Offline"}
                </div>
              </div>
            </div>
            <div className="flex gap-1.5">
              {["📞", "📹", "🔍", "⋮"].map((icon, i) => (
                <button
                  key={i}
                  className="w-8 h-8 rounded-lg bg-white/5 border border-white/7 flex items-center justify-center hover:bg-white/10 transition-colors text-[15px]"
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-3.5 scrollbar-thin scrollbar-thumb-white/8">
            <div className="text-center my-1">
              <span className="text-[11px] text-gray-600 bg-[#3a3a3a] px-3 py-0.5 rounded-full tracking-wide">
                Today
              </span>
            </div>

            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-end gap-2.5 ${msg.from === "me" ? "flex-row-reverse" : ""}`}
              >
                {msg.from === "them" && (
                  <div className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-semibold ${activeContact.color}`}>
                    {activeContact.initials}
                  </div>
                )}
                <div className={`flex flex-col gap-0.5 max-w-[65%] ${msg.from === "me" ? "items-end" : ""}`}>
                  <div
                    className={`px-3.5 py-2.5 rounded-2xl text-[13.5px] leading-relaxed break-words ${
                      msg.from === "me"
                        ? "bg-red-500 text-white rounded-br-sm"
                        : "bg-[#333] text-gray-300 rounded-bl-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-gray-600">
                    <span>{msg.time}</span>
                    {msg.from === "me" && (
                      <span className={`text-[13px] ${msg.read ? "text-emerald-500" : "text-gray-600"}`}>
                        {msg.read ? "✓✓" : "✓"}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex items-end gap-2.5">
                <div className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-semibold ${activeContact.color}`}>
                  {activeContact.initials}
                </div>
                <div className="bg-[#333] rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1 items-center">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="w-1.5 h-1.5 bg-gray-500 rounded-full inline-block animate-bounce"
                      style={{ animationDelay: `${i * 0.2}s`, animationDuration: "1.2s" }}
                    />
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Composer */}
          <div className="bg-[#2a2a2a] border-t border-white/5 px-5 py-3.5 flex items-end gap-3 flex-shrink-0">
            <div className="flex-1 bg-white/5 border border-white/10 rounded-xl flex items-end px-4 pr-2 py-1 gap-2">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={handleInput}
                onKeyDown={handleKeyDown}
                placeholder="Type a message…"
                rows={1}
                className="flex-1 bg-transparent border-none outline-none text-gray-300 text-[13.5px] resize-none max-h-[90px] min-h-[28px] leading-relaxed py-1 placeholder-gray-600"
              />
              <div className="flex items-center gap-0.5 pb-1.5">
                <button className="w-7 h-7 rounded-md flex items-center justify-center hover:bg-white/8 transition-colors text-gray-500 hover:text-gray-400 text-base">
                  📎
                </button>
                <button className="w-7 h-7 rounded-md flex items-center justify-center hover:bg-white/8 transition-colors text-gray-500 hover:text-gray-400 text-base">
                  😊
                </button>
              </div>
            </div>
            <button
              onClick={sendMessage}
              className="w-10 h-10 bg-red-500 hover:bg-red-600 active:scale-95 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-150 text-white text-base"
            >
              ➤
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-[#222] text-center py-2 text-[11px] text-gray-600 tracking-wide border-t border-white/4 flex-shrink-0">
        @copyright_reserved
      </div>
    </div>
  );
}

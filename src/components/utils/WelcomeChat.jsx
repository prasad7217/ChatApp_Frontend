import React, { useEffect, useState } from "react";
import { BASE_URL, getSocket } from "../../Constants";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import { PiPaperclipFill, PiVideoCameraFill } from "react-icons/pi";
import { IoMdCall } from "react-icons/io";
import { MdEmojiEmotions } from "react-icons/md";
import { IoSend } from "react-icons/io5";
import { welcomeCards } from "./defaults";

/* ─────────────────────────────────────────
   Welcome screen shown when no chat is open
───────────────────────────────────────── */
const WelcomeChat = () => (
  <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6 py-10 text-center">

    {/* Pulsing icon */}
    <div className="w-20 h-20 rounded-full bg-red-600/15 border-2 border-red-500/40 flex items-center justify-center animate-pulse">
      <svg className="w-9 h-9 text-red-400" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    </div>

    <h2 className="text-white text-xl font-semibold">Welcome to Nexchat</h2>
    <p className="text-neutral-400 text-sm max-w-xs leading-relaxed mb-4">
      Connect and chat with your team in real time. Pick someone from the left panel to get started.
    </p>

    {/* Live badge */}
    <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-4 py-1.5 text-green-400 text-xs">
      <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
      Real-time messaging is active
    </div>

    {/* Feature cards */}
    {/* <div className="flex items-center justify-center gap-24 w-full">
      {welcomeCards?.map((f, i) => (
        <div
          key={i}
          className="bg-[#484848] w-[180px] border border-white/[0.07] rounded-xl p-3.5 text-left"
        >
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2.5 ${f.bg}`}>
            {f.icon}
          </div>
          <p className="text-neutral-200 text-xs font-semibold mb-1">{f.title}</p>
          <p className="text-neutral-500 text-[11px] leading-relaxed">{f.desc}</p>
        </div>
      ))}
    </div> */}

    {/* Tip bar */}
    <div className="flex items-start gap-2.5 bg-[#484848] border border-white/[0.07] rounded-xl px-4 py-3 max-w-sm w-full text-left mt-10">
      <svg className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <p className="text-neutral-500 text-[11.5px] leading-relaxed">
        Tip: Click any contact on the left, or use the{" "}
        <span className="text-neutral-300 font-medium">Message</span> button on a profile to jump into a chat instantly.
      </p>
    </div>
  </div>
);
export default WelcomeChat;
/* ─────────────────────────────────────────
   Main ChatPage component
───────────────────────────────────────── */
// const ChatPage = (value) => {
//   const [message, setMessage] = useState("");
//   const [recieveMsg, setRecieveMsg] = useState([]);

//   const user = useSelector((store) => store.user.profile);
//   const idParam = useParams();

//   let targetUserId;
//   if (idParam?.targetUserId !== ":") {
//     targetUserId = idParam?.targetUserId;
//   } else {
//     targetUserId = value?.chatUserId;
//   }

//   const userId = user?._id;

//   const fetchMessages = async (id) => {
//     try {
//       const res = await axios.post(BASE_URL + "/chat/" + id, {}, { withCredentials: true });
//       if (res?.data?.success) {
//         setRecieveMsg(res?.data?.data?.message);
//       }
//     } catch (error) {
//       console.log("Error:", error);
//     }
//   };

//   useEffect(() => {
//     if (!userId || !targetUserId) return;

//     fetchMessages(targetUserId);

//     const socket = getSocket();

//     socket.emit("joinChat", {
//       userName: user?.userName,
//       userId,
//       targetUserId,
//     });

//     socket.on("recieveMessage", (data) => {
//       setRecieveMsg(data?.message);
//     });

//     socket.on("error", (data) => {
//       console.log("error", data);
//     });

//     return () => {
//       socket.off("recieveMessage");
//       socket.off("error");
//     };
//   }, [userId, targetUserId]);

//   const sendMessage = () => {
//     const socket = getSocket();
//     if (!message.trim()) return;

//     socket.emit("sendMessages", {
//       message,
//       userName: user?.userName,
//       userId,
//       targetUserId,
//     });

//     setMessage("");
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter") sendMessage();
//   };

//   /* ── No user selected → show welcome ── */
//   if (!targetUserId) {
//     return <WelcomeScreen />;
//   }

//   /* ── Chat view ── */
//   return (
//     <div className="flex flex-col w-full h-[83vh]">

//       {/* ── Header ── */}
//       <div className="flex items-center justify-between px-6 py-3 bg-[#3a3a3a] border-b border-white/5 shrink-0">
//         <div className="flex items-center gap-3">
//           <div className="relative shrink-0">
//             <img
//               src="https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
//               alt="profile"
//               className="w-10 h-10 rounded-full object-cover"
//             />
//             <span className="absolute bottom-0.5 right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-[#3a3a3a]" />
//           </div>
//           <div>
//             <p className="text-sm font-medium text-neutral-100 leading-tight">Username</p>
//             <p className="text-xs text-neutral-400 leading-tight">designation</p>
//           </div>
//         </div>

//         <div className="flex items-center gap-6">
//           <button aria-label="Video call" className="text-neutral-400 hover:text-neutral-200 transition-colors">
//             <PiVideoCameraFill className="text-[22px]" />
//           </button>
//           <button aria-label="Voice call" className="text-neutral-400 hover:text-neutral-200 transition-colors">
//             <IoMdCall className="text-[22px]" />
//           </button>
//         </div>
//       </div>

//       {/* ── Messages area ── */}
//       <div className="flex-1 overflow-y-auto px-5 py-4 bg-[#585858] flex flex-col gap-3 chatArea">
//         {recieveMsg?.length === 0 ? (
//           <div className="flex flex-col items-center justify-center h-full gap-2">
//             <p className="text-neutral-400 text-sm">No messages yet</p>
//             <p className="text-neutral-500 text-xs">Say hello 👋</p>
//           </div>
//         ) : (
//           recieveMsg?.map((each, id) => {
//             const isMine = each?.senderId === userId;
//             return (
//               <div
//                 key={id}
//                 className={`flex ${isMine ? "justify-end" : "justify-start"}`}
//               >
//                 <span
//                   className={`max-w-[65%] px-4 py-2 rounded-2xl text-sm leading-relaxed break-words
//                     ${isMine
//                       ? "bg-red-600 text-white rounded-br-sm"
//                       : "bg-[#484848] text-neutral-200 rounded-bl-sm border border-white/[0.07]"
//                     }`}
//                 >
//                   {each?.text}
//                 </span>
//               </div>
//             );
//           })
//         )}
//       </div>

//       {/* ── Message input ── */}
//       <div className="shrink-0 px-4 py-3 bg-[#2e2e2e] border-t border-white/5">
//         <div className="flex items-center gap-2 bg-[#3a3a3a] border border-white/10 rounded-full px-3 py-2 max-w-3xl mx-auto">

//           <button
//             aria-label="Attach file"
//             className="w-8 h-8 flex items-center justify-center rounded-full text-neutral-400 hover:bg-white/10 hover:text-neutral-200 transition-all shrink-0"
//           >
//             <PiPaperclipFill className="text-[20px]" />
//           </button>

//           <input
//             type="text"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             onKeyDown={handleKeyDown}
//             placeholder="Type a message…"
//             className="flex-1 bg-transparent text-sm text-neutral-200 placeholder:text-neutral-500 outline-none px-1"
//           />

//           <button
//             aria-label="Emoji"
//             className="w-8 h-8 flex items-center justify-center rounded-full text-neutral-400 hover:bg-white/10 hover:text-neutral-200 transition-all shrink-0"
//           >
//             <MdEmojiEmotions className="text-[20px]" />
//           </button>

//           <button
//             aria-label="Send"
//             onClick={sendMessage}
//             className="w-9 h-9 flex items-center justify-center rounded-full bg-red-600 hover:bg-red-500 active:scale-95 transition-all shrink-0"
//           >
//             <IoSend className="text-[15px] text-white" />
//           </button>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatPage;

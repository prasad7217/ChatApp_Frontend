export const messages = [
    { id: 1, text: "Hey everyone! 👋", time: "10:30 AM", type: "received" },
    { id: 2, text: "Hi Bro! whats up?", time: "10:31 AM", type: "sent" },
    { id: 3, text: "I'm fine! What about you?", time: "10:32 AM", type: "received" },
];

export const welcomeCards = [
        {
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          ),
          bg: "bg-red-600/20 text-red-400",
          title: "Instant delivery",
          desc: "Messages via WebSocket — no refresh needed.",
        },
        {
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          ),
          bg: "bg-emerald-500/20 text-emerald-400",
          title: "Read receipts",
          desc: "Know when your message has been seen.",
        },
        {
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          ),
          bg: "bg-blue-500/20 text-blue-400",
          title: "Online presence",
          desc: "See who's online and available now.",
        },
        {
          icon: (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          ),
          bg: "bg-amber-500/20 text-amber-400",
          title: "Secure chats",
          desc: "Your conversations stay private.",
        },
      ]
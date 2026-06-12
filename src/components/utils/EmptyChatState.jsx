import React from "react";

const QUICK_STARTERS = [
  "Hey! How are you doing?",
  "Can we connect for a quick call?",
  "Hi, wanted to reach out!",
];

const EmptyChatState = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full px-6 py-10 text-center bg-[#585858]">

      {/* Avatar */}
      <div className="w-20 h-20 rounded-full bg-[#484848] border-2 border-white/10 flex items-center justify-center text-2xl font-semibold text-neutral-200 mb-4">
        GK
      </div>

      {/* Name */}
      <p className="text-white text-lg font-semibold mb-2">
        Ganesh Kumar
      </p>

      {/* Subtitle */}
      <p className="text-neutral-400 text-sm max-w-[260px] leading-relaxed mb-7">
        You haven't chatted with Ganesh yet.{" "}
        Send a message to start the conversation.
      </p>

      {/* Quick starter buttons */}
      <div className="flex flex-col gap-3 w-full max-w-[320px] mb-6">
        {QUICK_STARTERS.map((text, i) => (
          <button
            key={i}
            className="w-full bg-[#4a4a4a] border border-white/10 rounded-full px-5 py-3 text-neutral-300 text-sm font-medium hover:bg-[#555555] hover:border-red-500/40 hover:text-white active:scale-95 transition-all duration-150 text-center"
          >
            {text}
          </button>
        ))}
      </div>

      {/* Divider */}
      <div className="flex items-center gap-3 w-full max-w-[320px] mb-5">
        <div className="flex-1 h-px bg-white/10" />
        <span className="text-neutral-500 text-xs whitespace-nowrap">
          or type your own message below
        </span>
        <div className="flex-1 h-px bg-white/10" />
      </div>

      {/* Lock note */}
      <div className="flex items-center gap-1.5 text-neutral-500 text-xs">
        <svg
          className="w-3.5 h-3.5 shrink-0"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
        Messages are private and secure
      </div>

    </div>
  );
};

export default EmptyChatState;

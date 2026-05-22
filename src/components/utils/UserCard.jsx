import { useState } from "react";

export default function UserCard({ card }) {
  const [following, setFollowing] = useState(false);

  return (
    <div className="w-56 h-[40%] min-h-[360px] bg-white dark:bg-[#1a1d27] border border-gray-200 dark:border-white/[0.07] rounded-2xl p-6 flex flex-col items-center gap-3 shadow-sm">

      <img
        src={card?.profilePic}
        alt={card?.userName}
        className="w-20 h-20 rounded-full object-cover border-2 border-gray-200 dark:border-white/10"
        onError={(e) => {
          e.target.style.display = "none";
          e.target.nextSibling.style.display = "flex";
        }}
      />
      <div className="hidden w-20 h-20 rounded-full bg-blue-100 items-center justify-center text-blue-600 text-2xl font-semibold">
        {card?.userName?.charAt(0)}
      </div>

      <div className="text-center">
        <h3 className="text-gray-900 dark:text-white font-semibold text-base">{card?.userName}</h3>
        <p className="text-gray-500 text-sm mt-0.5">{card?.designation}</p>
      </div>

      <p className="text-gray-500 text-sm text-center leading-relaxed">{card?.bio}</p>

      <div className="flex gap-6 py-3 border-y border-gray-100 dark:border-white/[0.07] w-full justify-center">
        <div className="text-center">
          <p className="text-gray-900 dark:text-white font-semibold text-sm">128</p>
          <p className="text-gray-400 text-xs mt-0.5">Followers</p>
        </div>
        <div className="w-px bg-gray-200 dark:bg-white/10" />
        <div className="text-center">
          <p className="text-gray-900 dark:text-white font-semibold text-sm">64</p>
          <p className="text-gray-400 text-xs mt-0.5">Following</p>
        </div>
      </div>

      <button
        onClick={() => setFollowing(!following)}
        className={`w-full py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
          following
            ? "bg-transparent border border-red-500 text-red-500"
            : "bg-red-500 text-white border border-red-500 hover:bg-red-600"
        }`}
      >
        {following ? "✓ Following" : "+ Follow"}
      </button>
    </div>
  );
}
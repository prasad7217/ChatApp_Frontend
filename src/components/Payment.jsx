import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../Constants";

const features = [
  {
    icon: (
      <svg
        className="w-[18px] h-[18px]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        <path
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Unlimited messaging",
    desc: "Chat with anyone — zero daily limits or cooldowns.",
  },
  {
    icon: (
      <svg
        className="w-[18px] h-[18px]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        <path
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Verified badge",
    desc: "Get a verified checkmark on your profile and messages.",
  },
  {
    icon: (
      <svg
        className="w-[18px] h-[18px]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        <path
          d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "HD video & voice calls",
    desc: "Crystal-clear calls with up to 20 participants.",
  },
  {
    icon: (
      <svg
        className="w-[18px] h-[18px]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        <path
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "4 GB media sharing",
    desc: "Share photos, videos, and files up to 4 GB per transfer.",
  },
  {
    icon: (
      <svg
        className="w-[18px] h-[18px]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        <path
          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "End-to-end encryption",
    desc: "Military-grade encryption on every message you send.",
  },
  {
    icon: (
      <svg
        className="w-[18px] h-[18px]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        <path
          d="M13 10V3L4 14h7v7l9-11h-7z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: "Priority support",
    desc: "Get help from our team within 2 hours, any time.",
  },
];

export default function Payment() {
  const [selected, setSelected] = useState("yearly");
  const [loading, setLoading] = useState(false);
  const [paid, setPaid] = useState(false);

  // const plan = plans.find((p) => p.id === selected);

  const handlePay = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setPaid(true);
    }, 1800);
  };

  const handlePayment = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/payment/create",
        {},
        { withCredentials: true },
      );
      console.log("pay", res);
      if (res?.data?.success) {

        const {amount, currency, orderId, reciept, status, userId, notes} = res?.data?.paymentData

        const options = {
          key: res?.data?.key,
          amount, // Amount is in currency subunits.
          currency,
          name: "Nexchat",
          image: "https://res.cloudinary.com/dssabhgtb/image/upload/v1780591922/gemini-svg_axdgwu.png",
          order_id: orderId,
          prefill: {
            name: notes?.userName, //your customer's name
            email: notes?.email
          },
          notes: {
            address: "Razorpay Corporate Office",
          },
          theme: {
            color: "#cc334d",
          },
        };
        var rzp1 = new window.Razorpay(options);
        rzp1.open();
      }
    } catch (error) {
      console.log("Error :", error);
    }
  };

  if (paid) {
    return (
      <div className="bg-[#2a2a2a] rounded-xl overflow-hidden font-sans text-slate-200 max-w-[620px] mx-auto border border-white/5">
        <div className="py-13 px-8 text-center">
          <div className="w-16 h-16 rounded-full bg-[#22c55e]/10 flex items-center justify-center mx-auto mb-4.5">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="#22c55e"
              strokeWidth="2.2"
              viewBox="0 0 24 24"
            >
              <path
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <p className="text-2xl font-bold mb-1.5 text-white">
            You're subscribed!
          </p>
          <p className="text-[13px] text-white/45 mb-6 leading-relaxed">
            Welcome to Nexchat Pro. Your verified badge is now live.
          </p>
          <div className="inline-flex items-center gap-2 bg-[#333333] border border-white/10 rounded-full py-2 px-4">
            <span className="text-sm font-bold text-white">Prasad</span>
            <span className="text-[11px] font-semibold bg-[#22c55e]/15 text-[#22c55e] rounded-full py-0.5 px-2">
              Online
            </span>
            <span className="flex items-center gap-1 text-xs font-semibold text-[#22c55e]">
              <svg className="w-3.5 h-3.5" fill="#22c55e" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Verified
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#4a4a4a] rounded-xl overflow-hidden font-sans text-slate-200 max-w-full mx-auto border border-white/5 shadow-2xl sm:px-44 sm:mt-6">
      {/* ── Hero ── */}
      <div className="py-7 px-6">
        <p className="text-[14px] font-semibold tracking-widest text-[#e53e3e] mb-1.5 uppercase">
          Upgrade your account
        </p>
        <h1 className="text-4xl font-bold mb-2 tracking-tight text-white">
          Chat without limits
        </h1>
        <p className="text-[14px] text-white/45 leading-relaxed">
          Join{" "}
          <strong className="text-slate-200 font-semibold">
            2.4M+ subscribers
          </strong>{" "}
          and unlock the full Nexchat experience.
        </p>
      </div>

      <div className="h-[1px] bg-white/5 mx-6" />

      {/* ── Features ── */}
      <div className="py-4.5 px-6">
        <p className="text-[10px] font-semibold tracking-widest text-white/30 mb-3.5 uppercase">
          What you get
        </p>
        <div className="grid grid-cols-2 gap-x-5 gap-y-3">
          {features.map((f) => (
            <div key={f.title} className="flex gap-2.5 items-start">
              <div className="w-12 h-12 rounded-lg bg-[#e53e3e]/10 text-[#e53e3e] flex items-center justify-center flex-shrink-0 text-[28px]">
                {f.icon}
              </div>
              <div>
                <p className="text-[16px] font-semibold mb-[2px] text-slate-200">
                  {f.title}
                </p>
                <p className="text-xs text-white/40 leading-normal">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="h-[1px] bg-white/5 mx-6" />

      {/* ── Plan Selector ── */}
      <div className="py-4.5 px-6">
        <div className="flex gap-2.5">
          <button
            // onClick={() => setSelected(p.id)}
            className={`flex-1 bg-[#333333] border rounded-xl py-3.5 px-4 cursor-pointer text-left relative transition-all duration-150`}
          >
            <span className="absolute -top-2.5 right-3 text-[9px] font-bold bg-[#22c55e] text-emerald-950 rounded-full py-0.5 px-2 tracking-wide"></span>

            <p className="text-[11px] text-white/40 mb-1 font-medium"></p>
            <div className="flex items-baseline gap-1">
              <span
                className={`text-2xl font-bold text-slate-200 transition-colors`}
              >
                ₹ 399/-
              </span>
              <span className="text-xs text-white/35"></span>
            </div>
            <p className="text-[10px] text-white/30 mt-1"></p>
          </button>
        </div>
      </div>

      <div className="h-[1px] bg-white/5 mx-6" />

      {/* ── Checklist ── */}
      {/* <div className="py-4.5 px-6">
        <p className="text-[10px] font-semibold tracking-widest text-white/30 mb-3.5 uppercase">Profile info</p>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
          {[
            "Unlimited real-time messaging",
            "Verified profile badge",
            "HD video & voice calls",
            "4 GB media sharing",
            "End-to-end encryption",
            "Priority 24/7 support",
          ].map((item) => (
            <div key={item} className="flex items-center gap-2">
              <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="#22c55e" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-[13px] text-white/60">{item}</span>
            </div>
          ))}
        </div>
      </div> */}

      <div className="h-[1px] bg-white/5 mx-6" />

      {/* ── Pay Action ── */}
      <div className="pt-4.5 pb-2 px-6 flex items-center justify-between gap-4">
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold text-white tracking-tight"></span>
          <span className="text-[13px] text-white/35"></span>
        </div>
        <button
          onClick={handlePayment}
          disabled={loading}
          className={`flex items-center gap-2 py-[11px] px-[22px] rounded-lg bg-[#e53e3e] hover:bg-[#c53030] active:scale-[0.98] text-white text-sm font-semibold border-none cursor-pointer tracking-tight transition-all whitespace-nowrap ${
            loading ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          {loading ? (
            <span className="w-4 h-4 border-2 border-white/30 border-top-white rounded-full inline-block animate-spin" />
          ) : (
            <>
              <svg
                className="w-[17px] h-[17px]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Subscribe now
            </>
          )}
        </button>
      </div>
      <p className="text-[11px] text-white/25 text-center mb-5 px-6">
        Cancel anytime · No hidden fees · Secured by Stripe
      </p>
    </div>
  );
}

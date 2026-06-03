import { useState } from "react";

const features = [
  {
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Unlimited messaging",
    desc: "Chat with anyone — zero daily limits or cooldowns.",
  },
  {
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Verified badge",
    desc: "Get a verified checkmark on your profile and messages.",
  },
  {
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "HD video & voice calls",
    desc: "Crystal-clear calls with up to 20 participants.",
  },
  {
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "4 GB media sharing",
    desc: "Share photos, videos, and files up to 4 GB per transfer.",
  },
  {
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "End-to-end encryption",
    desc: "Military-grade encryption on every message you send.",
  },
  {
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Priority support",
    desc: "Get help from our team within 2 hours, any time.",
  },
];

const plans = [
  { id: "monthly", label: "Monthly", price: 9.99, period: "/ month", billed: null, save: null },
  { id: "yearly", label: "Yearly", price: 7.49, period: "/ month", billed: "Billed as $89.88/yr", save: "Save 25%" },
];

export default function NexchatSubscription() {
  const [selected, setSelected] = useState("yearly");
  const [loading, setLoading] = useState(false);
  const [paid, setPaid] = useState(false);

  const plan = plans.find((p) => p.id === selected);

  const handlePay = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setPaid(true); }, 1800);
  };

  if (paid) {
    return (
      <div style={s.root}>
        <div style={s.successWrap}>
          <div style={s.successCircle}>
            <svg width="32" height="32" fill="none" stroke="#22c55e" strokeWidth="2.2" viewBox="0 0 24 24">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p style={s.successTitle}>You're subscribed!</p>
          <p style={s.successSub}>Welcome to Nexchat Pro. Your verified badge is now live.</p>
          <div style={s.verifiedPreview}>
            <span style={s.verifiedUsername}>Prasad</span>
            <span style={s.verifiedOnline}>Online</span>
            <span style={s.verifiedBadge}>
              <svg width="13" height="13" fill="#22c55e" viewBox="0 0 24 24">
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
    <div style={s.root}>

      {/* ── Header ── */}
      <div style={s.topBar}>
        <div style={s.logoRow}>
          <div style={s.logoBox}>
            <svg width="16" height="16" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span style={s.logoLabel}>
            <span style={{ color: "#fff" }}>Nex</span>
            <span style={{ color: "#e53e3e" }}>chat</span>
          </span>
          <span style={s.logoSub}>REAL-TIME MESSAGING</span>
        </div>
        <div style={s.proBadge}>PRO</div>
      </div>

      {/* ── Hero ── */}
      <div style={s.hero}>
        <p style={s.heroEyebrow}>Upgrade your account</p>
        <h1 style={s.heroTitle}>Chat without limits</h1>
        <p style={s.heroSub}>
          Join <strong style={{ color: "#e2e8f0" }}>2.4M+ subscribers</strong> and unlock the full Nexchat experience.
        </p>
      </div>

      <div style={s.divider} />

      {/* ── Features ── */}
      <div style={s.section}>
        <p style={s.sectionLabel}>WHAT YOU GET</p>
        <div style={s.featureGrid}>
          {features.map((f) => (
            <div key={f.title} style={s.featureRow}>
              <div style={s.featureIconWrap}>{f.icon}</div>
              <div>
                <p style={s.featureTitle}>{f.title}</p>
                <p style={s.featureDesc}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={s.divider} />

      {/* ── Plan selector ── */}
      <div style={s.section}>
        <p style={s.sectionLabel}>CHOOSE YOUR PLAN</p>
        <div style={s.planRow}>
          {plans.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelected(p.id)}
              style={{ ...s.planCard, ...(selected === p.id ? s.planCardActive : {}) }}
            >
              {p.save && <span style={s.savePill}>{p.save}</span>}
              <p style={s.planName}>{p.label}</p>
              <div style={s.planPriceRow}>
                <span style={{ ...s.planPrice, ...(selected === p.id ? { color: "#e53e3e" } : {}) }}>
                  ${p.price}
                </span>
                <span style={s.planPer}>{p.period}</span>
              </div>
              {p.billed && <p style={s.planBilled}>{p.billed}</p>}
            </button>
          ))}
        </div>
      </div>

      <div style={s.divider} />

      {/* ── Checklist ── */}
      <div style={s.section}>
        <p style={s.sectionLabel}>PROFILE INFO</p>
        <div style={s.checkGrid}>
          {[
            "Unlimited real-time messaging",
            "Verified profile badge",
            "HD video & voice calls",
            "4 GB media sharing",
            "End-to-end encryption",
            "Priority 24/7 support",
          ].map((item) => (
            <div key={item} style={s.checkRow}>
              <svg width="14" height="14" fill="none" stroke="#22c55e" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span style={s.checkText}>{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={s.divider} />

      {/* ── Pay ── */}
      <div style={s.paySection}>
        <div style={s.payLeft}>
          <span style={s.payPrice}>${plan.price}</span>
          <span style={s.payPer}>{plan.period}</span>
        </div>
        <button
          onClick={handlePay}
          disabled={loading}
          style={{ ...s.payBtn, ...(loading ? s.payBtnDisabled : {}) }}
        >
          {loading ? (
            <span style={s.spinner} />
          ) : (
            <>
              <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Subscribe now
            </>
          )}
        </button>
      </div>
      <p style={s.payNote}>Cancel anytime · No hidden fees · Secured by Stripe</p>

    </div>
  );
}

const s = {
  root: {
    background: "#2b2b2b",
    borderRadius: 12,
    overflow: "hidden",
    fontFamily: "'Segoe UI', sans-serif",
    color: "#e2e8f0",
    maxWidth: 620,
    margin: "0 auto",
    border: "1px solid rgba(255,255,255,0.07)",
  },

  /* top bar — matches app navbar */
  topBar: {
    background: "#222222",
    borderBottom: "1px solid rgba(255,255,255,0.07)",
    padding: "12px 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logoRow: { display: "flex", alignItems: "center", gap: 8 },
  logoBox: {
    width: 30, height: 30, borderRadius: 8,
    background: "#e53e3e",
    display: "flex", alignItems: "center", justifyContent: "center",
  },
  logoLabel: { fontSize: 18, fontWeight: 700, letterSpacing: "-0.02em" },
  logoSub: {
    fontSize: 9, letterSpacing: "0.1em",
    color: "rgba(255,255,255,0.35)",
    fontWeight: 500,
    alignSelf: "flex-end",
    marginBottom: 1,
  },
  proBadge: {
    fontSize: 10, fontWeight: 700, letterSpacing: "0.1em",
    background: "#e53e3e",
    color: "#fff",
    borderRadius: 6,
    padding: "3px 8px",
  },

  /* hero */
  hero: { padding: "28px 24px 20px" },
  heroEyebrow: {
    fontSize: 11, fontWeight: 600, letterSpacing: "0.1em",
    color: "#e53e3e", margin: "0 0 6px",
    textTransform: "uppercase",
  },
  heroTitle: {
    fontSize: 24, fontWeight: 700, margin: "0 0 8px",
    letterSpacing: "-0.02em", color: "#fff",
  },
  heroSub: {
    fontSize: 13, color: "rgba(255,255,255,0.45)",
    margin: 0, lineHeight: 1.6,
  },

  divider: { height: 1, background: "rgba(255,255,255,0.07)", margin: "0 24px" },

  section: { padding: "18px 24px" },
  sectionLabel: {
    fontSize: 10, fontWeight: 600, letterSpacing: "0.1em",
    color: "rgba(255,255,255,0.3)",
    margin: "0 0 14px", textTransform: "uppercase",
  },

  /* features */
  featureGrid: {
    display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px 20px",
  },
  featureRow: { display: "flex", gap: 10, alignItems: "flex-start" },
  featureIconWrap: {
    width: 32, height: 32, borderRadius: 8,
    background: "rgba(229,62,62,0.12)",
    color: "#e53e3e",
    display: "flex", alignItems: "center", justifyContent: "center",
    flexShrink: 0,
  },
  featureTitle: { fontSize: 13, fontWeight: 600, margin: "0 0 2px", color: "#e2e8f0" },
  featureDesc: { fontSize: 12, color: "rgba(255,255,255,0.38)", margin: 0, lineHeight: 1.5 },

  /* plans */
  planRow: { display: "flex", gap: 10 },
  planCard: {
    flex: 1, background: "#333333",
    border: "1.5px solid rgba(255,255,255,0.09)",
    borderRadius: 10, padding: "14px 16px",
    cursor: "pointer", textAlign: "left",
    position: "relative", transition: "border-color 0.15s",
  },
  planCardActive: {
    border: "1.5px solid #e53e3e",
    background: "rgba(229,62,62,0.07)",
  },
  savePill: {
    position: "absolute", top: -9, right: 12,
    fontSize: 9, fontWeight: 700,
    background: "#22c55e", color: "#052e16",
    borderRadius: 20, padding: "2px 7px",
    letterSpacing: "0.04em",
  },
  planName: { fontSize: 11, color: "rgba(255,255,255,0.4)", margin: "0 0 4px", fontWeight: 500 },
  planPriceRow: { display: "flex", alignItems: "baseline", gap: 3 },
  planPrice: { fontSize: 22, fontWeight: 700, color: "#e2e8f0", transition: "color 0.15s" },
  planPer: { fontSize: 12, color: "rgba(255,255,255,0.35)" },
  planBilled: { fontSize: 10, color: "rgba(255,255,255,0.28)", margin: "4px 0 0" },

  /* checklist — styled like profile info section */
  checkGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "9px 16px" },
  checkRow: { display: "flex", alignItems: "center", gap: 7 },
  checkText: { fontSize: 13, color: "rgba(255,255,255,0.6)" },

  /* pay */
  paySection: {
    padding: "18px 24px 10px",
    display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16,
  },
  payLeft: { display: "flex", alignItems: "baseline", gap: 5 },
  payPrice: { fontSize: 28, fontWeight: 700, color: "#fff", letterSpacing: "-0.03em" },
  payPer: { fontSize: 13, color: "rgba(255,255,255,0.35)" },
  payBtn: {
    display: "flex", alignItems: "center", gap: 7,
    padding: "11px 22px", borderRadius: 9,
    background: "#e53e3e", color: "#fff",
    fontSize: 14, fontWeight: 600,
    border: "none", cursor: "pointer",
    letterSpacing: "-0.01em",
    transition: "opacity 0.15s",
    whiteSpace: "nowrap",
  },
  payBtnDisabled: { opacity: 0.6, cursor: "not-allowed" },
  spinner: {
    width: 16, height: 16,
    border: "2px solid rgba(255,255,255,0.3)",
    borderTop: "2px solid #fff",
    borderRadius: "50%",
    display: "inline-block",
    animation: "spin 0.7s linear infinite",
  },
  payNote: {
    fontSize: 11, color: "rgba(255,255,255,0.25)",
    textAlign: "center", margin: "0 0 20px", padding: "0 24px",
  },

  /* success */
  successWrap: {
    padding: "52px 32px", textAlign: "center",
  },
  successCircle: {
    width: 64, height: 64, borderRadius: "50%",
    background: "rgba(34,197,94,0.1)",
    display: "flex", alignItems: "center", justifyContent: "center",
    margin: "0 auto 18px",
  },
  successTitle: { fontSize: 22, fontWeight: 700, margin: "0 0 6px", color: "#fff" },
  successSub: { fontSize: 13, color: "rgba(255,255,255,0.45)", margin: "0 0 24px", lineHeight: 1.6 },
  verifiedPreview: {
    display: "inline-flex", alignItems: "center", gap: 8,
    background: "#333333",
    border: "1px solid rgba(255,255,255,0.09)",
    borderRadius: 40,
    padding: "8px 16px",
  },
  verifiedUsername: { fontSize: 14, fontWeight: 700, color: "#fff" },
  verifiedOnline: {
    fontSize: 11, fontWeight: 600,
    background: "rgba(34,197,94,0.15)",
    color: "#22c55e", borderRadius: 20,
    padding: "2px 8px",
  },
  verifiedBadge: {
    display: "flex", alignItems: "center", gap: 4,
    fontSize: 12, fontWeight: 600, color: "#22c55e",
  },
};
export const maskedEmail = (email) => {

    const [userStand, defaultStand] = email?.split("@");

    const initial = userStand.slice(0, 3);
    const hidingPart = "x".repeat(5);

    return `${initial}${hidingPart}@${defaultStand}`;

}

export const formateTime = (timer) => {

    const min = Math.floor(timer / 60).toString().padStart(2, 0);
    const sec = Math.floor(timer % 60).toString().padStart(2, 0);

    return `${min}:${sec}`;

}

export const formateTime12 = (time) => {

  if(!time) return;

  const times = new Date(time);

  const hour24 = times.getHours();
  const isAmorPm = hour24 >= 12 ? "pm" : "am";
  const hour12 = hour24 % 12;
  let min = String(times.getMinutes());

  if(min.length < 2){
    min = "0" + min;
  }

const timing = hour12+":"+min+isAmorPm

return timing;

}


export const styles = {
  wrap: {
    minHeight: "100vh",
    background: "#0f1623",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem",
    fontFamily: "'Segoe UI', sans-serif",
  },
  card: {
    background: "#161d2e",
    borderRadius: "16px",
    padding: "2.5rem 2rem",
    width: "100%",
    maxWidth: "380px",
  },
  iconCircle: {
    width: "56px",
    height: "56px",
    borderRadius: "50%",
    background: "rgba(232, 52, 74, 0.12)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 1.25rem",
  },
  heading: {
    color: "#fff",
    fontSize: "22px",
    fontWeight: 700,
    textAlign: "center",
    marginBottom: "8px",
  },
  sub: {
    color: "#7a8499",
    fontSize: "13px",
    textAlign: "center",
    lineHeight: 1.6,
    marginBottom: "1.5rem",
  },
  infoBox: {
    background: "rgba(232, 52, 74, 0.07)",
    border: "1px solid rgba(232, 52, 74, 0.2)",
    borderRadius: "10px",
    padding: "10px 14px",
    display: "flex",
    alignItems: "flex-start",
    gap: "10px",
    marginBottom: "1.5rem",
  },
  infoText: {
    fontSize: "12px",
    color: "#9aa3b8",
    lineHeight: 1.5,
    margin: 0,
  },
  field: {
    marginBottom: "1.25rem",
  },
  fieldLabel: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    marginBottom: "8px",
  },
  labelText: {
    color: "#c8cdd8",
    fontSize: "13px",
    fontWeight: 500,
  },
  input: {
    width: "100%",
    background: "#0f1623",
    border: "1.5px solid #252e42",
    borderRadius: "10px",
    padding: "12px 14px",
    color: "#e2e6f0",
    fontSize: "14px",
    outline: "none",
    transition: "border-color 0.2s",
    boxSizing: "border-box",
  },
  submitBtn: {
    width: "100%",
    background: "#e8344a",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    padding: "13px",
    fontSize: "15px",
    fontWeight: 600,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    transition: "background 0.2s",
  },
  divider: {
    border: "none",
    borderTop: "1px solid #1e2840",
    margin: "1.5rem 0",
  },
  backRow: {
    textAlign: "center",
    fontSize: "13px",
    color: "#7a8499",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    cursor: "pointer",
  },
};
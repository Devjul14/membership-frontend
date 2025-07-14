export const getNonce = async (wallet: string) => {
  const res = await fetch(`http://localhost:3001/api/nonce?wallet=${wallet}`);
  if (!res.ok) throw new Error("Failed to get nonce");
  return res.json(); // expected: { nonce: '...' }
};

export const loginWithSignature = async (wallet: string, signature: string) => {
  const res = await fetch("http://localhost:3001/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ wallet, signature }),
  });
  if (!res.ok) throw new Error("Login failed");
  return res.json();
};

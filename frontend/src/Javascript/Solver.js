// src/api.js
export async function solvePuzzle(data) {
  const res = await fetch("http://localhost:8080/solve", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  return res.json();
}
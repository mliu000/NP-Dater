export async function getSolverResult() {
  try {
    const response = await fetch("http://localhost:3001/api/solve", {
      method: "POST"
    });

    if (!response.ok) {
      throw new Error("Solver call failed");
    }

    const data = await response.json();
    return data; // data is the parsed JSON from your C++ program
  } catch (err) {
    console.error("Error calling solver:", err);
    return null;
  }
}
const { execFile } = require("child_process");
const path = require("path");

function callSolver() {
  const solverPath = path.join(__dirname, "../cpp/cpp_runner/main.exe");

  return new Promise((resolve, reject) => {
    execFile(solverPath, [], (error, stdout, stderr) => {
      if (error) {
        console.error("C++ Solver Error:", stderr);
        return reject({ error: "Solver execution failed", details: stderr });
      }

      try {
        const json = JSON.parse(stdout);
        resolve(json);
      } catch (parseErr) {
        console.error("Invalid JSON output from solver:", stdout);
        reject({ error: "Invalid JSON from solver", raw: stdout });
      }
    });
  });
}

module.exports = { callSolver };
const { spawn } = require("child_process");
const path = require("path");

function callSolver(payload = {}) {
  // Determine the path to C++ based on platform
  const fileName = process.platform === "win32" ? "main.exe" : "main";
  const solverPath = path.join(__dirname, `../cpp/cpp_runner/${fileName}`);


  return new Promise((resolve, reject) => {
    const cpp = spawn(solverPath);

    cpp.stdin.write(JSON.stringify(payload));
    cpp.stdin.end();

    let stdout = '';
    let stderr = '';

    cpp.stdout.on("data", (data) => {
      stdout += data.toString();
    });

    cpp.stderr.on("data", (data) => {
      stderr += data.toString();
    });

    cpp.on("close", (code) => {
      if (code !== 0) {
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
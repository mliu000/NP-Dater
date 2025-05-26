const { spawn } = require("child_process");
const path = require("path");

function callSolver() {
  const solverPath = path.join(__dirname, "../cpp/cpp_runner/main.exe");

  return new Promise((resolve, reject) => {
    const cpp = spawn(solverPath);

    const payload = {
      x: 13, 
      y: 17
    }

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

    // If you're not passing input, just close stdin
    cpp.stdin.end();
  });
}

module.exports = { callSolver };
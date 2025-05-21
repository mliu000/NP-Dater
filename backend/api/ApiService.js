const { execFile } = require("child_process");
const path = require("path");

function callSolver(command, input) {
  const solverPath = path.join(__dirname, "../solver/solver.exe");

  return new Promise((resolve, reject) => {
    execFile(solverPath, [command, input], (err, stdout, stderr) => {
      if (err) return reject(stderr);
      resolve(stdout.trim());
    });
  });
}

module.exports = { callSolver };
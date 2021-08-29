const fetch = require("node-fetch");

async function main() {
  console.log("Hello World");

  const response = await (
    await fetch("http://localhost:3001/schedules")
  ).json();

  console.log(response);

  return 0;
}

main();

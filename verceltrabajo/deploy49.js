const { exec } = require("child_process");
const fs = require("fs");

const TOTAL = 5;
const links = [];

function randomSuffix(length = 6) {
  return Math.random()
    .toString(36)
    .substring(2, 2 + length);
}

function deploy(index) {
  return new Promise((resolve) => {

    // Nombre bonito
    const projectName =
      `Ca-E-1u4l-Luma-com-${randomSuffix()}`;

    console.log(`\nDeploy ${index + 1}/${TOTAL}...\n`);
    console.log(`Proyecto: ${projectName}\n`);

    const cmd =
      `wrangler pages project create ${projectName} --production-branch main && ` +
      `wrangler pages deploy . --project-name ${projectName}`;

    exec(cmd, (error, stdout, stderr) => {

      if (error) {
        console.log(stderr);
        return resolve();
      }

      const link = `https://${projectName}.pages.dev`;

      links.push(link);

      console.log(`LINK GENERADO: ${link}`);

      fs.appendFileSync("links.txt", link + "\n");

      resolve();
    });
  });
}

async function run() {

  fs.writeFileSync("links.txt", "");

  for (let i = 0; i < TOTAL; i++) {
    await deploy(i);
  }

  console.log("\n====================");
  console.log("DEPLOYS TERMINADOS");
  console.log("====================");

  console.log("\nTodos los links fueron guardados en:");
  console.log("links.txt");
}

run();
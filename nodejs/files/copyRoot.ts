import fs from "fs";
import path from "path";

function moveFile(rootDir: string, dir = __dirname) {
  const files = fs.readdirSync(dir);
  console.log('start ', rootDir, files);
  files.forEach(item => {
    const filePath = path.join(dir, item)
    const stat = fs.statSync(filePath)
    console.log("forEach ",filePath, stat.isFile())
    if (stat.isFile()) {
      fs.linkSync(filePath, path.join(rootDir, item))
    } else {
      moveFile(rootDir, filePath)
    }
  })
}

moveFile(__dirname, path.join(__dirname, 'a'));

import fs from "fs";
class logService {
  static write(file: string, text: string) {
    fs.appendFileSync("logs/" + file, `${text}\n`);
  }
}

export default logService;

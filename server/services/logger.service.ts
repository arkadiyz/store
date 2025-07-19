import * as fs from 'fs';
const logsDir = './logs';
import path from 'path';

if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

function getTime() {
  let now = new Date();
  return now.toUTCString();
}

function doLog(line: string, level: string = 'Debug') {
  const fileName = getCallerFile();
  const timestamp = new Date().toISOString();
  line = `#--${fileName.trim()}--| ${getTime()} - ${level} - ${line}  \n`;

  fs.appendFileSync('./logs/backend.log', line);
}

function getCallerFile(): string {
  const stack = new Error().stack?.split('\n') || [];
  const callerLine = stack[3] || '';

  // מצא שם קובץ בלבד (עם סיומת .ts או .js)
  const match = callerLine.match(/(?:\/|\\)([^\/\\]+?\.(ts|js)):/);
  return match?.[1] || '--unknown--';
}

function debug(line: string) {
  doLog(line, 'Debug');
}

function info(line: string) {
  doLog(line, 'Info');
}

function warm(line: string) {
  doLog(line, 'Warm');
}

function error(line: string) {
  doLog(line, 'Error');
}

export default {
  debug,
  info,
  warm,
  error,
};

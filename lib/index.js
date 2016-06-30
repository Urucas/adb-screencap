import child_process from 'child_process';
import semafor from 'semafor';
let spawn = child_process.spawnSync;
let logger = semafor();

export default function screencap() {
  const cmd = "adb";
  const time = (new Date()).getTime();
  // TODO - change sdcard with data on some devices
  const screen_path = `/sdcard/screen${time}.png`;
  const home = process.env.HOME || process.env.USERPROFILE;
  const desktop_path = `${home}/Desktop/`
  let params = ["shell", "screencap", "-p", screen_path];
  let err = spawn(cmd, params);
  if(err.stderr && err.stderr != "") {
      logger.fail(err.stderr);
      return;
  }
  params = ["pull", screen_path, desktop_path];
  err = spawn(cmd, params);
  logger.ok(err.stderr);
  
  params = ["shell", "rm", screen_path];
  spawn(cmd, params);
  logger.ok("Thank you, Come again!");
}

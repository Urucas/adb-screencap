import child_process from 'child_process';
import path from 'path';
let spawn = child_process.spawnSync;

const screencap  = {
  cmd: function(cb) {
    const cmd = "adb";
    const time = (new Date()).getTime();
    // TODO - change sdcard with data on some devices
    const screen_name = `screen${time}.png`
    const screen_path = `/sdcard/${screen_name}`;
    const home = process.env.HOME || process.env.USERPROFILE;
    const desktop_path = path.join(home,'Desktop');
    let params = ["shell", "screencap", "-p", screen_path];
    let err = spawn(cmd, params);
    if(err.stderr && err.stderr != "") {
      if(cb != null) cb(err.stderr, null);
      return;
    }
    params = ["pull", screen_path, desktop_path];
    err = spawn(cmd, params);
    
    params = ["shell", "rm", screen_path];
    spawn(cmd, params);
    if(cb != null) cb(null, path.join(desktop_path, screen_name));
  }
}

export default function cmd(cb) {
  screencap.cmd(cb);
}

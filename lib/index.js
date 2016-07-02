import child_process from 'child_process';
import path from 'path';
let spawn = child_process.spawn;

function exec(cmd, params, cb) {
  const s = spawn(cmd, params);
  s.on("close", cb);
}


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
    exec(cmd, params, (code) => {
      params = ["pull", screen_path, desktop_path];
      exec(cmd, params, (code) => {
        params = ["shell", "rm", screen_path];
        exec(cmd, params, () => {
          if(cb != null) cb(null, path.join(desktop_path, screen_name));
        }) 
      });  
    });
  }
}

export default function cmd(cb) {
  screencap.cmd(cb);
}

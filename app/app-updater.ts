// import { app } from 'electron';
import { autoUpdater } from 'electron-updater';
import { app, dialog } from 'electron';
import log from 'electron-log';
import axios from 'axios';
import fs from 'fs';
import path from 'path';

export default class AppUpdater {
  private patchPromise: any = null;

  public async run() {
    // 先检查否是有增量更新的版本, 然后再检查走原有逻辑
    // todo
    if (true) {
      await this.autoUpdate();
    } else {
      await this.patch();
    }
  }

  // 增量更新
  public async patch() {
    let { patchPromise } = this;

    if (this.patchPromise) return this.patchPromise;

    const nullizePromise = () => {
      this.patchPromise = null;
    };

    patchPromise = this.doPatch()
      .then(it => {
        nullizePromise();
        return it;
      })
      .catch(e => {
        nullizePromise();
        throw e;
      });
    this.patchPromise = patchPromise;
    return patchPromise;
  }

  // 增量更新
  private async doPatch() {
    // 如果正在全量更新，不再增量更新
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((autoUpdater as any).checkForUpdatesPromise) return this;

    // 检查更新
    // todo
    const choice = await dialog.showMessageBox({
      type: 'info',
      message: '系统升级，是否立即更新？',
      detail: '升级后会自动重启应用，如果工作区的内容尚未保存，请选择稍后更新',
      buttons: ['立即更新', '稍后更新']
    });
    if (choice.response === 0) {
      // 修改文件
      const res = await axios.get('http://localhost:5000/app.html.backup');
      const unpackedPath = path.join(app.getAppPath(), '../app.asar.unpacked');
      fs.writeFileSync(path.join(unpackedPath, './app.html'), res.data);

      // 修改 package.json

      app.relaunch();
      app.exit(0);
    }
    return this;
  }

  // 自动更新
  public autoUpdate() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
    return this;
  }
}

module.exports = ({rl, onSuccess, onFail}) => {
  let arr = [];
  let appId = "";
  let appVer = "";
  let appBuild = "";

  rl.on("line", l => {
    if (l.indexOf("applicationId") !== -1) {
      arr = l.trim().split(" ");
      appId = arr[1].replace(/["]+/g, "");
    }

    if (l.indexOf("versionName") !== -1) {
      arr = l.trim().split(" ");
      appVer = arr[1].replace(/["]+/g, "");
    }

    p = /^\s+versionCode[\s]+\d+/;
    if (p.test(l)) {
      arr = l.trim().split(" ");
      appBuild = arr[1];
    }
  });

  rl.on("close", () => {
    appId && appVer ? onSuccess({appId, appVer, appBuild}) : onFail();
  });
};

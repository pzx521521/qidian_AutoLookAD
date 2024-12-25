importClass(android.content.Context);
importClass(android.provider.Settings);
try {
    var enabledServices = Settings.Secure.getString(context.getContentResolver(), Settings.Secure.ENABLED_ACCESSIBILITY_SERVICES);
    log('当前已启用的辅助服务\n', enabledServices);
    var Services = enabledServices + ":com.script.main/com.stardust.autojs.core.accessibility.AccessibilityService";
    Settings.Secure.putString(context.getContentResolver(), Settings.Secure.ENABLED_ACCESSIBILITY_SERVICES, Services);
    Settings.Secure.putString(context.getContentResolver(), Settings.Secure.ACCESSIBILITY_ENABLED, '1');
    toastLog("成功开启AutoJS的辅助服务");
} catch (error) {
    //授权方法：开启usb调试并使用adb工具连接手机，执行 adb shell pm grant com.script.main android.permission.WRITE_SECURE_SETTINGS
    toastLog("\n请确保已给予 WRITE_SECURE_SETTINGS 权限\n\n授权代码已复制，请使用adb工具连接手机执行(重启不失效)\n\n", error);
    setClip("adb shell pm grant com.script.main android.permission.WRITE_SECURE_SETTINGS");
}


function MyClick(str, selfClick) {
    var meButton = text(str).findOnce()
    if (meButton != undefined) {
        if (!selfClick) {
            meButton = meButton.parent();
            if (!meButton.clickable()) {
                meButton = meButton.parent();
            }
        }
        toastLog("找到了:" + str)
        meButton.click()
        return true
    } else {
        toastLog("找不到:" + str)
        return false
    }
}

function CloseAd(caption) {
    toastLog("看视频等待20s" + caption)
    sleep(20000)
    if (text("跳过广告").exists()) {
        text("跳过广告").click()
    } else {
        var meButtons = className("android.widget.ImageView").find()
        if (meButtons.empty()) {
            toastLog("没找到关闭按钮╭(╯^╰)╮");
        } else {
            meButtons.some(function (bt) {
                if (bt.clickable()) {
                    bt.click();
                    return true;
                }
            });
        }
    }
    toastLog("看视频结束: " + caption)
    sleep(1000)
}



function LookAd() {
    for (let index = 1; index <= 13; index++) {
        if (MyClick("看视频", true)) {
            CloseAd("第" + index + "次")
        }
    }
}

home()
sleep(1000)
if (launchApp("起点读书")) {
    toastLog("启动起点读书成功")
    sleep(3000)
    MyClick("我")
    sleep(1500)
    if (MyClick("我知道了")) {
        sleep(1500)
    }
    MyClick("福利中心")
    sleep(2500)
    LookAd()
    toastLog("运行结束")
} else {
    toastLog("启动起点读书失败")
}
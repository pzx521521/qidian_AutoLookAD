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


function MyClick(str){
    var meButton = text(str).findOnce()
    if (meButton != undefined){
        meButton = meButton.parent();
        toastLog("找到了" + str)
        meButton.click()
    }  
}

function Close(){
    // back() 失效 原因未知
    var meButton =className("android.widget.Image").text("cross").findOnce()
    if (meButton == undefined){
        meButton = className("android.widget.Image").text("此图片未加标签。打开右上角的“更多选项”菜单即可获取图片说明。").findOnce()
    }    
    if (meButton != undefined){
        meButton = meButton.parent();
        toastLog("找到了关闭按钮")
        meButton.click()
    }
}

home()

if (launchApp("起点读书")){
    toastLog("启动起点读书成功")
}else{
    toastLog("启动起点读书失败")
}
sleep(3000)

//找到我 
MyClick("我")
sleep(2000)
MyClick("福利中心")
sleep(2000)

//看视频1-8
for (let index = 1; index < 11; index++) {
    let caption = "第" + parseInt(index) +"个"   
    var meButton = undefined
    if(index>8){
        meButton =text("看视频").findOnce();
    }else{
        meButton =textMatches("看第\\d+个视频").findOnce();
        if (meButton == undefined){
            continue
        }
        caption = meButton.text()        
    }
    toastLog("看视频" + caption)
    if (meButton == undefined){
        toastLog("没有找到:" + caption)
        continue
    }    
    meButton.click()
    toastLog("看视频等待20s" + caption)
    sleep(20000)
    Close()  
    sleep(2000)
    toastLog("查找开心收下")
    var meButton =text("开心收下").findOnce()
    if (meButton != undefined){
        meButton = meButton.parent();
        meButton.click()
    }               
    toastLog("看视频结束: " + caption) 
    sleep(2000)
}

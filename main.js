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
        if(!meButton.clickable()){
            meButton = meButton.parent();
        }
        toastLog("找到了" + str)
        meButton.click()
        return true
    }else{
        return false 
    }     
}

function ExprClick(str){
    var meButton =textMatches(str).findOnce();
    if (meButton != undefined){
        meButton = meButton.parent();
        toastLog("找到了" + str)
        meButton.click()
    }  
}

function CloseAd(caption){
    toastLog("看视频等待20s" + caption)
    sleep(20000)
    
function Close(){
    if(text("关闭").exists()){
        text("关闭").click() 
    }else{
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
    sleep(2000)
    MyClick("我知道了")               
    toastLog("看视频结束: " + caption) 
    sleep(1000)
}

function ClickAd8(){
    var meButton = undefined
    meButton =textMatches("看视频领福利").findOnce();
    if (meButton == undefined){
        toastLog("没有找到:" + "看第\\d+个视频")
        return false
    }else{
        var caption = meButton.text()   
        toastLog("找到了:" + caption)
        meButton.click()
        return true
    }    
}

function ClickAd3(){
    var meButton =textMatches(".*?\/3次").findOnce();
    if (meButton == undefined){
        toastLog("找不到次数")
    }else{
        toastLog("找到了次数" + meButton.parent().childCount())
        parentButton = meButton.parent().children()
        .forEach(function(child){
            if(child.className() == "android.widget.Button"){
                child.click()
            }
        });
    }
}

function ClickAd3New(){
    var meButtons =textMatches("看视频").find();
    if (meButtons.length == 0){
        toastLog("找不到看视频")
    }else{
        var meButton = meButtons[1]
        toastLog("找到了"+meButtons.length +"个看视频")
        parentButton = meButton.parent()
        parentButton.click()

    }
}

function LookAd(){
    // //看视频1-8
    for (let index = 1; index <= 8; index++) { 
        if (ClickAd8()){
            CloseAd("前8次的第"+index+ "次")
        }   
    }
    for (let index = 1; index <= 5; index++) { 
        if (MyClick("看视频")){
            CloseAd("后3次的第"+index+ "次")
        }          
    }
    if(MyClick("领奖励")){
        sleep(1000)
        MyClick("我知道了")  
    }
    
}
home()
sleep(1000)
if (launchApp("起点读书")){
    toastLog("启动起点读书成功")
    sleep(3000)
    MyClick("我")
    sleep(1500)
    if (MyClick("我知道了")){
        sleep(1500)
    }
    MyClick("福利中心")
    sleep(1500)
    LookAd()
}else{
    toastLog("启动起点读书失败")
}

// 这是一个后台脚本。
// 它在后台运行！
// 本质上，它是一个服务工作线程，符合最新标准（manifest V3）。
// 颜色参考: http://zhongguose.com

// 根据消息更改活动标签的颜色
chrome.runtime.onMessage.addListener(async function (message, sender, sendResponse) {
    let { r, g, b } = message;
    if (typeof (r) === 'number' && typeof (g) === 'number' && typeof (b) === 'number') {
        let tabs = await chrome.tabs.query({ active: true, currentWindow: true });
        let activeTab = tabs[0];
        chrome.scripting.executeScript({
            target: { tabId: activeTab.id },
            function: (r, g, b) => {
                let colorStyle = "rgb(" + r + "," + g + "," + b + ")";
                console.log("设置背景颜色: ", colorStyle);
                document.body.style.backgroundColor = colorStyle;
            },
            args: [r, g, b],
        });
    }
});

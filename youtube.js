$(window).on('load', function () {
    setTimeout(() => {
        console.log("çalıştı");

        chrome.runtime.sendMessage({ command: "youtube_tab_closed" });
    }, 40000);
});
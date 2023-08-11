chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.command === "youtube_tab_closed" && sender.tab) {
        // İlgili YouTube sekmesini kapat
        if (sender.tab.url.includes("youtube.com")) {
            chrome.tabs.remove(sender.tab.id, function () {
                console.log('YouTube sekmesi kapatıldı.');

                // custom.js dosyasına mesajı gönder
                chrome.tabs.query({ url: "*://*.easyhits4u.com/*" }, function (tabs) {
                    tabs.forEach(function (tab) {
                        chrome.tabs.sendMessage(tab.id, { command: "youtube_tab_closed" });
                    });
                });
            });
        } else {
            console.log('Aktif sekme YouTube değil.');
        }
    }
});
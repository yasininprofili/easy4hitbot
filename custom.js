$(window).ready(function()
{
    setTimeout(() => 
    {
        $(".button-group-switch").append('<button class="start-button">Başla</button>')
        $(".button-group-switch").append('<button class="stop-button">Dur</button>')

        $(".stop-button").hide();
    }, 2000);

    $("body").on("click", ".start-button", function(){

        $(".start-button").html("Çalışıyor...")
        $(".start-button").attr("disabled",true);
        $(".stop-button").fadeIn();

        youtubePlay();

        chrome.storage.local.get("command", function (result) {
            // "command" anahtarına sahip bir değer var mı kontrol edelim
            if (typeof result.command !== "undefined") {
                // "command" anahtarı zaten var, dolayısıyla güncelleyelim
                chrome.storage.local.set({ command: "start" }, function () {
                    console.log("Start komutu güncellendi.");
                });
            } else {
                // "command" anahtarı yok, dolayısıyla oluşturalım
                chrome.storage.local.set({ command: "start" }, function () {
                    console.log("Start komutu kaydedildi.");
                });
            }
        });
    })



    $("body").on("click", ".stop-button", function () 
    {
        $(".start-button").html("Başla")
        $(".start-button").attr("disabled", false);
        $(".stop-button").hide();

        chrome.storage.local.set({ command: "stop" }, function () {
            console.log("Stop komutu kaydedildi.");
        });
    })



});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.command === "youtube_tab_closed") {
        setTimeout(() => 
        {
            chrome.storage.local.get("command", function (data) 
            {
                var command = data.command;
                if (command === "start") 
                {
                    youtubePlay();
                }
            });

        }, 3000);
    }
});

var youtubePlay = () => 
{
    var item    = $("#my_logs").find(".youtube").first();
    var content = item.closest(".task-row");
    content.find(".task-content").trigger("click");
    item.removeClass("youtube");

    $('html, body').animate({
        scrollTop: content.offset().top
    }, 1000); // 1000 milisaniyede scroll işlemi tamamlansın (isteğe bağlı)
}

function scrollToBottom() {
    $('html, body').animate({ scrollTop: $(document).height() }, 1000);
}
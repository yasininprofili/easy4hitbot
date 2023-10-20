$(window).ready(function()
{

    setTimeout(() => 
    {
        $(".filter_system .select-option:last").trigger("click")

    }, 2000);

    setTimeout(() => 
    {
        youtubePlay();
    }, 5000);

   
    // 5 dakika (5 dakika = 300 saniye)
    const beklemeSuresiMs = 5 * 60 * 1000;

    // Sayfanın belirtilen süre aralıklarla yenilenmesini sağlayacak işlev
    function sayfayiYenile() {
        location.reload(); // Sayfayı yenile
    }

    // setInterval kullanarak işlemin belirtilen süre aralıklarla tekrarlanmasını sağla
    setInterval(sayfayiYenile, beklemeSuresiMs);

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
            youtubePlay();

        }, 3000);
    }
});

var youtubePlay = () => 
{
    var item = $("#my_logs").find(".task-row").first();
    item.find(".task-content").trigger("click");
    item.removeClass("task-row");

    $('html, body').animate({
        scrollTop: item.offset().top
    }, 1000); // 1000 milisaniyede scroll işlemi tamamlansın (isteğe bağlı)
}

function scrollToBottom() {
    $('html, body').animate({ scrollTop: $(document).height() }, 1000);
}
const colorTable = {
    "0": { start: "<span style=\"color: #000000;\">", end: "</span>" },
    "1": { start: "<span style=\"color: #0000AA;\">", end: "</span>" },
    "2": { start: "<span style=\"color: #00AA00;\">", end: "</span>" },
    "3": { start: "<span style=\"color: #00AAAA;\">", end: "</span>" },
    "4": { start: "<span style=\"color: #AA0000;\">", end: "</span>" },
    "5": { start: "<span style=\"color: #AA00AA;\">", end: "</span>" },
    "6": { start: "<span style=\"color: #FFAA00;\">", end: "</span>" },
    "7": { start: "<span style=\"color: #AAAAAA;\">", end: "</span>" },
    "8": { start: "<span style=\"color: #555555;\">", end: "</span>" },
    "9": { start: "<span style=\"color: #5555FF;\">", end: "</span>" },
    "a": { start: "<span style=\"color: #55FF55;\">", end: "</span>" },
    "b": { start: "<span style=\"color: #55FFFF;\">", end: "</span>" },
    "c": { start: "<span style=\"color: #FF5555;\">", end: "</span>" },
    "d": { start: "<span style=\"color: #FF55FF;\">", end: "</span>" },
    "e": { start: "<span style=\"color: #FFFF55;\">", end: "</span>" },
    "f": { start: "<span style=\"color: #FFFFFF;\">", end: "</span>" },
    "g": { start: "<span style=\"color: #DDD605;\">", end: "</span>" },
    "k": { start: "<span>", end: "</span>" },
    "l": { start: "<b>", end: "</b>" },
    "m": { start: "<s>", end: "</s>" },
    "n": { start: "<u>", end: "</u>" },
    "o": { start: "<i>", end: "</i>" }
}

$.fn.formatColorCodes = function() {
    $(this).each(function(index, value) {
        var text = $(value).text()

        var html = ""
        var close = []
        var i = 0
        var obs = false
        while (i < text.length) {
            var c = text.charAt(i)
            if (c === "§") {
                i++
                var code = text.charAt(i)
                if (code === "r") {
                    obs = false
                    while (close.length !== 0) {
                        html += close.pop()
                    }
                } else if (code === "k"){
                    obs = true
                } else {
                    var tags = colorTable[code]
                    if (tags) {
                        html += tags.start
                        close.push(tags.end)
                    }
                }
            } else {
                if (obs) {
                    html += "█"
                } else {
                    html += c
                }
            }
            i++
        }
        while (close.length !== 0) {
            html += close.pop()
        }
        $(value).html(html)
    })
    return this
}

$.fn.cleanColorCodes = function() {
    $(this).each(function(index, value) {
        var text = $(value).text()
        var html = ""
        var i = 0
        while (i < text.length) {
            var c = text.charAt(i)
            if (c === "§") {
                i++
            } else {
                html += c
            }
            i++
        }
        $(value).html(html)
    })
    return this
}

$(function() {
    $(".color-coded").formatColorCodes()
    $(".color-clear").cleanColorCodes()
})
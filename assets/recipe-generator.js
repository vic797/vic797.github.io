var ids = {}
var selected = ""

function scrollToTop() {
    document.scrollToTop()
}


function showRecipe(key, storageKey) {
    selected = key
    var entry = localStorage.getItem(storageKey)
    if (entry) {
        var obj = JSON.parse(entry)
        if (obj[key]) {
            var recipe = obj[key]
            if (recipe.type === "spell") {
                $("#spell-function").val(key)
                $("#spell-name").val(recipe.spell.name)
                $("#spell-id").val(recipe.spell.id)
                $("#spell-level").val(recipe.spell.level)
                if (recipe.trading !== undefined) {
                    $("#trade-cost").val(recipe.trading.cost)
                    $("#trade-multiplier").val(recipe.trading.multiplier)
                    $("#trade-xp").val(recipe.trading.xp)
                    $("#enable-trading").prop("checked", true)
                } else {
                    $("#enable-trading").prop("checked", false)
                }
            } else if (recipe.type === "crafting") {
                $("#recipe-function").val(key)
                $("#item-id").val("").data("slot", "-1b")
                $("#item-nbt").val("").data("slot", "-1b")
                $("#result-id").val(recipe.result.id).selectpicker('val', recipe.result.id)
                $("#result-nbt").val(recipe.result.nbt)
                $("#result-count").val(recipe.result.count)
                var info = ids[recipe.result.id]
                $("#result-view").data("id", recipe.result.id).data("nbt", recipe.result.nbt).attr("src", "data:image/png;base64, " + info.image).attr("title", info.name)
                $("[data-recipe]").each(function(index, value) {
                    var key = recipe.pattern[index]
                    var item = recipe.ingredients[key]
                    if (item) {
                        info = ids[item.id]
                        $(value).data("id", item.id)
                        $(value).data("nbt", item.nbt)
                    } else {
                        info = ids["minecraft:air"]
                        $(value).data("id", "minecraft:air")
                        $(value).data("nbt", "")
                    }
                    $(value).attr("src", "data:image/png;base64, " + info.image)
                    $(value).attr("title", info.name)
                })
            }
        }
    }
}

function reloadRecipes() {
    $("#recipe-list").empty()
    var recipes = localStorage.getItem("recipes")
    if (recipes) {
        var entries = JSON.parse(recipes)
        Object.keys(entries).forEach(function (value) {
            var item = `<button type="button" class="list-group-item list-group-item-action" data-key="${value}">${value}</button>`
            var $btn = $(item)
            $btn.click(function() {
                showRecipe($(this).data("key"), "recipes")
                scrollToTop()
            })
            $("#recipe-list").append($btn)
        })
    }
}

function reloadSpells() {
    $("#spell-list").empty()
    var spells = localStorage.getItem("spells")
    if (spells) {
        var entries = JSON.parse(spells)
        Object.keys(entries).forEach(function (value) {
            var item = `<button type="button" class="list-group-item list-group-item-action" data-key="${value}">${value}</button>`
            var $btn = $(item)
            $btn.click(function() {
                showRecipe($(this).data("key"), "spells")
                scrollToTop()
            })
            $("#spell-list").append($btn)
        })
    }
}

function resetCrafting() {
    $("#recipe-function").val("")
    $("#item-nbt").val("").data("slot", "-1b")
    $("#item-id").val("minecraft:air").selectpicker('val', "minecraft:air").data("slot", "-1b")
    $("#result-id").val("minecraft:air").selectpicker('val', "minecraft:air")
    $("#result-nbt").val("")
    $("#result-count").val(1)
    var info = ids["minecraft:air"]
    $("[data-recipe]").each(function(index, value) {
        $(value).data("id", "minecraft:air")
        $(value).data("nbt", "")
        $(value).attr("src", "data:image/png;base64, " + info.image)
        $(value).attr("title", info.name)
    })
}

function resetSpell() {
    $("#spell-function").val("")
    $("#spell-name").val("")
    $("#spell-id").val("")
    $("#spell-level").val(1)
    $("#trade-cost").val(1)
    $("#trade-multiplier").val(0)
    $("#trade-xp").val(0)
    $("#enable-trading").prop("checked", false)
}

$(document).ready(function() {
    var url = $("meta[name=tools-host]").attr("content")
    $.ajax({
        url: url + "../assets/ids.json",
        contentType: "text/json",
        success: function(data) {
            $("img[data-id]").each(function (index, value) {
                var info = data[$(value).data("id")]
                $(value).attr("src", "data:image/png;base64, " + info.image)
                $(value).attr("title", info.name)
                $(value).click(function(e) {
                    $("#item-id").val($(this).data("id")).data("slot", $(this).attr("data-slot")).selectpicker('val', $(this).data("id"))
                    $("#item-nbt").val($(this).data("nbt")).data("slot", $(this).attr("data-slot"))
                    $(".table-info").removeClass("table-info")
                    $(this).parent().addClass("table-info")
                })
            })
            Object.keys(data).forEach(function(value) {
                var item = data[value]
                $("#item-id").append($(`<option value="${value}" data-tokens="${item.name} ${value}">${item.name}</option>`))
                $("#result-id").append($(`<option value="${value}" data-tokens="${item.name} ${value}">${item.name}</option>`))
            })
            $("#item-id").selectpicker()
            $("#result-id").selectpicker()
            $("#item-id").on("changed.bs.select", function (e, clickedIndex, isSelected, previousValue) {
                var target = $("#item-id").data("target")
                var val = $("#item-id").val()
                var slot = $("#item-id").data("slot")
                var item = $(`img[data-slot=${slot}]`)
                $(item).data(target, val)
                var info = ids[val]
                $(item).attr("src", "data:image/png;base64, " + info.image)
                $(item).attr("title", info.name)
            })
            ids = data
        }
    })
    $("#namespace").change(function(e) {
        localStorage.setItem("namespace", $(this).val())
    }).val(localStorage.getItem("namespace"))
    $("#reset-crafting").click(function(e) {
        resetCrafting()
        scrollToTop()
    })
    $("#reset-spell").click(function(e) {
        resetSpell()
        scrollToTop()
    })
    $("#save-spell").click(function(e) {
        var spell = {
            type: "spell",
            spell: {
                id: $("#spell-id").val(),
                level: $("#spell-level").val(),
                name: $("#spell-name").val()
            }
        }
        if ($("#enable-trading").prop("checked")) {
            spell["trading"] = {
                cost: $("#trade-cost").val(),
                multiplier: $("#trade-multiplier").val(),
                xp: $("#trade-xp").val(),
            }
        }
        var spells = localStorage.getItem("spells")
        var data = {}
        if (spells) {
            data = JSON.parse(spells)
        }
        data[$("#spell-function").val()] = spell
        localStorage.setItem("spells", JSON.stringify(data))
        reloadSpells()
        resetSpell()
        scrollToTop()
    })
    $("#save-crafting").click(function(e) {
        var recipe = {
            type: "crafting",
            ingredients: {},
            pattern: [],
            result: {
                id: $("#result-id").val(),
                nbt: $("#result-nbt").val(),
                count: $("#result-count").val()
            }
        }
        $("[data-recipe]").each(function(index, value) {
            var id = $(value).data("id")
            if (id !== "minecraft:air") {
                var seed = 0
                for (var i = 0; i < id.length; i++) {
                    seed += id.charCodeAt(i)
                }
                var key = String.fromCharCode((21 * seed + 125) % 125)
                recipe.ingredients[key] = {
                    id: id,
                    nbt: $(value).data("nbt")
                }
                recipe.pattern.push(key)
            } else {
                recipe.pattern.push(" ")
            }
        })
        var recipes = localStorage.getItem("recipes")
        var data = {}
        if (recipes) {
            data = JSON.parse(recipes)
        }
        data[$("#recipe-function").val()] = recipe
        localStorage.setItem("recipes", JSON.stringify(data))
        reloadRecipes()
        resetCrafting()
        scrollToTop()
    })
    $("#delete-crafting").click(function() {
        var recipes = localStorage.getItem("recipes")
        if (recipes) {
            var data = JSON.parse(recipes)
            var name = $("#recipe-function").val()
            if (data[name]) {
                var del = confirm(`Do you want to delete "${name}"?`)
                if (del) {
                    delete data[$("#recipe-function").val()]
                    localStorage.setItem("recipes", JSON.stringify(data))
                    reloadRecipes()
                    resetCrafting()
                }
            }
        }
        scrollToTop()
    })
    $("#delete-spell").click(function() {
        var spells = localStorage.getItem("spells")
        if (spells) {
            var data = JSON.parse(spells)
            var name = $("#spell-function").val()
            if (data[name]) {
                var del = confirm(`Do you want to delete "${name}"?`)
                if (del) {
                    delete data[name]
                    localStorage.setItem("spells", JSON.stringify(data))
                    reloadSpells()
                    resetSpell()
                }
            }
        }
        scrollToTop()
    })
    $("#delete-all").click(function() {
        var del = confirm("Do you want to delete all your data?")
        if (del) {
            localStorage.removeItem("spells")
            localStorage.removeItem("recipes")
            localStorage.removeItem("namespace")
            location.reload()
        }
    })
    reloadRecipes()
    reloadSpells()
})
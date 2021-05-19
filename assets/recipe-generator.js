var ids = {}
var selected = ""

function getItems(pattern, ingredients) {
    var out = []
    var indexes = indexes = ["3b", "4b", "5b", "12b", "13b", "14b", "21b", "22b", "23b"]
    var index = 0
    for (var i = 0; i < pattern.length; i++) {
        var k = pattern[i]
        if (k !== " " && ingredients[k]) {
            var ingredient = ingredients[k]
            var slot = indexes[index]
            var id = ingredient.id
            if (ingredient.nbt) {
                var nbt = ingredient.nbt.replace("\"", "\\\"")
                out.push(`{Slot:${slot},id:\"${id}\",tag:${nbt}}`)
            } else {
                out.push(`{Slot:${slot},id:\"${id}\"}`)
            }
        }
        index++
    }
    return out.join(",")
}

function generateBook(pattern, ingredients) {
    var out = {}
    var indexes = indexes = ["3b", "4b", "5b", "12b", "13b", "14b", "21b", "22b", "23b"]
    var index = 0
    for (var i = 0; i < pattern.length; i++) {
        var k = pattern[i]
        if (k !== " " && ingredients[k]) {
            var ingredient = ingredients[k]
            var slot = indexes[index]
            out[slot] = ingredient.id
        }
        index++
    }
    return out
}

function generateFunctions(target) {
    var url = $("meta[name=tools-host]").attr("content")
    var recipes = localStorage.getItem("recipes")
    if (recipes) {
        var entries = JSON.parse(recipes)
        var rdir = target.folder("recipes")
        var rbdir = target.folder("recipe_book")
        Object.keys(entries).forEach(function (value) {
            var recipe = entries[value]
            var items = getItems(recipe.pattern, recipe.ingredients)
            if (recipe.result.nbt === undefined) {
                recipe.result.nbt = "{}"
            }
            var id = recipe.result.id
            var nbt = recipe.result.nbt
            var count = 1
            if (recipe.result.count) {
                count = parseInt(recipe.result.count)
            }
            var line0 = `execute unless score @s NBTC_Craft matches 1 store success score @s NBTC_Craft run execute if data block ~ ~ ~ {Items:[${items}]}`
            var line1 = `execute if data block ~ ~ ~ {Items:[${items}]} if score @s NBTC_Craft matches 1 run data modify block ~ ~ ~ Items append value {Slot:16b,id:\"${id}\",Count:${count}b,tag:${nbt}}`
            rdir.file(value + ".mcfunction", `${line0}\n${line1}\n`)

            var book = {
                items: generateBook(recipe.pattern, recipe.ingredients),
                name: recipe.result.name
            }
            var burl = encodeURI(JSON.stringify(book))
            var tell = `tellraw @s ["",{"text":"${recipe.result.name}","color":"yellow"},{"text":" "},{"text":"[View]","color":"green","clickEvent":{"action":"open_url","value":"${url}/tools/recipe-viewer.html#${burl}"}}]`
            rbdir.file(value + ".mcfunction", `${tell}\n`)
        })
    }
    var spells = localStorage.getItem("spells")
    if (spells) {
        var entries = JSON.parse(spells)
        var spellsd = target.folder("spells")
        var trading = target.folder("trading")
        Object.keys(entries).forEach(function (value) {
            var spell = entries[value]
            var name = spell.spell.name.replace("\"", "\\\"")
            var id = spell.spell.id
            var level = spell.spell.level
            var lines = `execute if score $RandFlag NBTC_Random matches 1 unless score $SkipNext NBTC_Random matches 1 run data modify block ~ ~ ~ Items append value {Count:1b,Slot:5b,id:\"minecraft:paper\",tag:{Enchantments:[{id:\"nbtcrafter:spell\",lvl:1}],display:{Name:\"{\\\"translate\\\":\\\"item.nbtcrafter.spell\\\"}\",Lore:[\"{\\\"text\\\":\\\"\\\"}\",\"{\\\"text\\\":\\\"${name}\\\"}\"]},Spell:{id:\"${id}\",lvl:${level}b},SpellSource:1b,SpellBroken:0b}}\n`
            lines += "execute if score $RandFlag NBTC_Random matches 1 run scoreboard players set $SkipNext NBTC_Random 1\n"
            lines += "execute if score $RandFlag NBTC_Random matches 0 run function nbtcrafter:misc/random_flag\n"
            spellsd.file(value + ".mcfunction", lines)
            if (spell.trading) {
                var cost = spell.trading.cost
                var multiplier = parseFloat(spell.trading.multiplier)
                var xp = spell.trading.xp
                var t = `execute if score $RandFlag NBTC_Random matches 1 unless score $SkipNext NBTC_Random matches 1 run data modify entity @s Offers.Recipes append value {buy:{id:\"minecraft:emerald\",Count:${cost}b,maxUses:8b},buyB:{id:\"minecraft:paper\",Count:1b},sell:{Count:1b,id:\"minecraft:paper\",tag:{Enchantments:[{id:\"nbtcrafter:spell\",lvl:1}],display:{Name:\"{\\\"translate\\\":\\\"item.nbtcrafter.spell\\\"}\",Lore:[\"{\\\"text\\\":\\\"\\\"}\",\"{\\\"text\\\":\\\"${name}\\\"}\"]},Spell:{id:\"${id}\",lvl:${level}b},SpellSource:1b,SpellBroken:0b},priceMultiplier:${multiplier}f,xp:${xp}}}\n`
                t += "execute if score $RandFlag NBTC_Random matches 1 run scoreboard players set $SkipNext NBTC_Random 1\n"
                t += "execute if score $RandFlag NBTC_Random matches 0 run function nbtcrafter:misc/random_flag\n"
                trading.file(value + ".mcfunction", t)
            }
        })
    }
}

function generateTags(target) {
    var ns = localStorage.getItem("namespace")
    var recipes = localStorage.getItem("recipes")
    if (recipes) {
        var entries = JSON.parse(recipes)
        var values = {
            values: []
        }
        var book = {
            values: []
        }
        Object.keys(entries).forEach(function (value) {
            values.values.push(`${ns}:recipes/recipes/${value}`)
            book.values.push(`${ns}:recipes/recipe_book/${value}`)
        })
        target.file("crafting.json", JSON.stringify(values, null, 4))
        target.file("recipe_book.json", JSON.stringify(book, null, 4))
    }
    var spells = localStorage.getItem("spells")
    if (spells) {
        var entries = JSON.parse(spells)
        var spellList = {
            values: []
        }
        var tradingList = {
            values: []
        }
        Object.keys(entries).forEach(function (value) {
            spellList.values.push(`${ns}:recipes/spells/${value}`)
            var t = entries[value]
            if (t.trading) {
                tradingList.values.push(`${ns}:recipes/trading/${value}`)
            }
        })
        target.file("spells.json", JSON.stringify(spellList, null, 4))
        target.file("spell_trade.json", JSON.stringify(tradingList, null, 4))
    }
}

function generateDataPack() {
    var zip = new JSZip()
    zip.file("pack.mcmeta", JSON.stringify({
        pack: {
            pack_format: 6,
            description: "NBT Recipes"
        }
    }, null, 4))
    var data = zip.folder("data")
    var ns = data.folder(localStorage.getItem("namespace"))
    var functions = ns.folder("functions").folder("recipes")
    generateFunctions(functions)
    var tags = data.folder("nbtcrafter").folder("tags").folder("functions")
    generateTags(tags)
    zip.generateAsync({type:"blob"})
    .then(function(content) {
        // see FileSaver.js
        var ns = localStorage.getItem("namespace")
        var d = new Date();
        var n = d.getTime();
        saveAs(content, `${ns}-recipes-${n}.zip`);
    });
}

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
                $("#result-book").val(recipe.result.name)
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
    $("#result-book").val("")
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

function backupRecipes() {
    var result = {}
    result.namespace = localStorage.getItem("namespace")
    result.recipes = JSON.parse(localStorage.getItem("recipes"))
    result.spells = JSON.parse(localStorage.getItem("spells"))
    var blob = new Blob([JSON.stringify(result, null, 4)], {type: "text/plain;charset=utf-8"});
    var d = new Date();
    var n = d.getTime();
    saveAs(blob, `${result.namespace}-${n}.json`);
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
                count: $("#result-count").val(),
                name: $("#result-book").val()
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
    $("#download-pack").click(function(e) {
        generateDataPack()
    })
    $("#backup-recipes").click(function(e) {
        backupRecipes()
    })
    if (typeof window.FileReader !== 'function') {
        $("#restore-action").attr("disabled", "disabled")
    }
    $("#restore-recipes").click(function() {
        var file = document.getElementById("file-selector").files[0]
        var reader = new FileReader()
        reader.onload = function(e) {
            var data = JSON.parse(reader.result)
            var storedSpells = localStorage.getItem("spells")
            var spells = {}
            if (storedSpells !== undefined) {
                spells = JSON.parse(storedSpells)
            }
            if (spells === undefined || spells === null) {
                spells = {}
            }
            var storedRecipes = localStorage.getItem("recipes")
            var recipes = {}
            if (storedRecipes !== undefined) {
                recipes = JSON.parse(storedRecipes)
            }
            if (recipes === undefined || recipes === null) {
                recipes = {}
            }
            if ($("#override-namespace").prop("checked") && data.namespace !== undefined && localStorage.getItem("namespace") === undefined) {
                localStorage.setItem("namespace", data.namespace)
            }
            if (data.spells !== undefined) {
                var overrideSpells = $("#override-spells").prop("checked")
                Object.keys(data.spells).forEach(function(val) {
                    if (spells[val] !== undefined) {
                        if (overrideSpells) {
                            spells[val] = data.spells[val]
                        }
                    } else {
                        spells[val] = data.spells[val]
                    }
                })
            }
            localStorage.setItem("spells", JSON.stringify(spells))
            if (data.recipes !== undefined) {
                var overrideRecipes = $("#override-recipes").prop("checked")
                Object.keys(data.recipes).forEach(function(val) {
                    if (recipes[val] !== undefined) {
                        if (overrideRecipes) {
                            recipes[val] = data.recipes[val]
                        }
                    } else {
                        recipes[val] = data.recipes[val]
                    }
                })
            }
            localStorage.setItem("recipes", JSON.stringify(recipes))
            location.reload()
        }
        reader.onloadstart = function(e) {
            var modal = new bootstrap.Modal($("#restore-progress-modal"))
            modal.show()
        }
        reader.onprogress = function(e) {
            var p = Math.round((e.loaded * e.total) / 100)
            $("#restore-progress").attr("aria-valuenow", p).css("width", `${p}%`)
        }
        reader.readAsText(file, "utf-8")
    })
    reloadRecipes()
    reloadSpells()
})
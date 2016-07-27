/**
 * Created by bcheruk on 7/9/16.
 */

var s1=document.createElement("script");
s1.type="text/javascript";
s1.src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js";
s1.async=true;

var s2=document.createElement("script");
s2.type="text/javascript";
s2.src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js";
s2.async=true;

document.getElementsByTagName("head")[0].appendChild(s1);
document.getElementsByTagName("head")[0].appendChild(s2);

window.setTimeout(function () {
    console.log('Time out');

    $("document").ready(function () {
        console.log('#########################' + cordova.file);

        var fileSystem;
        var fileEntry;

        // User selected list
        var selectedListID = null;

        String.prototype.replaceAll = function(search, replace)
        {
            //if replace is not sent, return original string otherwise it will
            //replace search string with 'undefined'.
            if (replace === undefined) {
                return this.toString();
            }

            return this.replace(new RegExp(search , 'g'), replace);
        };

        String.prototype.capitalizeFirstLetter = function() {
            return this.charAt(0).toUpperCase() + this.slice(1);
        };

        // The uber object for all the lists and their items
        var l;
        // generateLists();

        function generateLists() {
            console.log(l);
            for (var key in l) {
                var listObj = l[key];
                var id = key.substring(0, key.indexOf('-'));
                updateList(id);

                var listNameID = id + "-list-name";
                var listOptionsChevron = id + "-list-options-chevron";

                $("#" + listNameID).removeAttr("contenteditable");
                $("#" + listNameID).html(listObj.name);
                $("#" + listOptionsChevron).css("display", "block");
            }
        }

        function generateItems() {
            var selectedList = selectedListID + "-list-name";

            $("#list-name-id").html(l[selectedList].name);

            if (l[selectedList] != null) {
                for (var key in l[selectedList].items) {
                    var itemObj = l[selectedList].items[key];
                    var itemNameId = itemObj.id;
                    var id = itemNameId.substring(0, itemNameId.indexOf('-'));
                    update(id);

                    var itemNameID = id + "-item-name";
                    var itemQuantityID = id + "-item-q";
                    var itemSizeID = id + "-item-s";
                    var itemOptionsChevron = id + "-options-chevron";
                    var itemCompleteID = id + "-item-complete";
                    var itemCompleteActionID = id + "-item-complete-action";

                    $("#" + itemNameID).html(itemObj.name);
                    $("#" + itemQuantityID).val(itemObj.quantity);
                    $("#" + itemSizeID).val(itemObj.size);
                    $("#" + itemOptionsChevron).css("display", "block");

                    if (itemObj.complete) {
                        $("#" + itemNameID).css("text-decoration", "line-through");

                        $("#" + itemCompleteID).removeClass('white');
                        $("#" + itemCompleteID).addClass('green');
                        $("#" + itemCompleteActionID).removeClass('white');
                        $("#" + itemCompleteActionID).addClass('green');
                    }
                    else {
                        $("#" + itemNameID).css("text-decoration", "");

                        $("#" + itemCompleteID).removeClass('green');
                        $("#" + itemCompleteID).addClass('white');
                        $("#" + itemCompleteActionID).removeClass('green');
                        $("#" + itemCompleteActionID).addClass('white');
                    }
                }
            }

            $("#list-name-edit").on("click", function() {
                $("#list-name-id").attr("contenteditable", true);
                $("#list-name-id").focus();
            });

            $("#list-name-id").keypress(function(e) {
                if (e.which == 13) {
                    if ($("#list-name-id").html() != '') {
                        $("#list-name-id").html($("#list-name-id").html().capitalizeFirstLetter());
                        l[selectedList].name = $("#list-name-id").html();
                        $("#list-name-id").removeAttr("contenteditable");
                        console.log(l);
                        this.blur();

                        writeFile();
                    }
                    else {
                        refresh();
                    }

                    return false;
                }
            });
        }

        $("#add-item-btn").on("click", function () {
            var id = Date.now();
            update(id);
            document.getElementById(id + '-item-name').focus();
        });

        $("#voice-btn").on("click", function () {
            // var id = Date.now();
            // update(id);
            // document.getElementById(id + '-item-name').focus();
            recognizeSpeech();
        });

        $("#create-list-button").on("click", function () {
            var id = Date.now();
            updateList(id);
            document.getElementById(id + '-list-name').focus();
        });

        function refresh() {
            $(".shopping-list").remove();
            generateLists();
            generateItems();
        }

        function updateList(id) {
            var listDivStr =
                '<div id="gen-id-list-div" class="shopping-list">' +
                    '<div class="glyphicon glyphicon-list dark-gray" aria-hidden="true" style="display: inline; float: left; padding-left: 5px"></div>' +
                    '<div id="gen-id-list-name" style="float:left; margin-left: 10px; width: 70%; display: inline-block; padding-bottom: 2px" contenteditable="true" >' +
                    '</div>' +
                    '<div style="float: right">' +
                        '<span id="gen-id-list-options-chevron" class="glyphicon glyphicon-option-vertical dark-gray" data-toggle="collapse" data-target="#gen-id-list-options" style="display: none"></span>' +
                    '</div>' +
                    '<br>' +
                    '<div id="gen-id-list-options" class="full-width collapse background-orange" style="padding: 10px; overflow-y: auto">' +
                        '<div style="float: right">' +
                            '<span id="gen-id-list-share" class="glyphicon glyphicon-share white" aria-hidden="true"></span>' +
                            '<span>   </span>' +
                            '<span id="gen-id-list-delete" class="glyphicon glyphicon-trash white" aria-hidden="true"></span>' +
                        '</div>' +
                    '</div>' +
                '</div>';

            var listDivID = id;
            listDivStr = listDivStr.replaceAll("gen-id", listDivID);
            var listDiv = $(listDivStr);
            console.log(listDiv);

            $("#shopping-lists").prepend(listDiv);

            var listNameID = listDivID + "-list-name";
            var listOptionsChevron = listDivID + "-list-options-chevron";
            var listDeleteID = listDivID + "-list-delete";
            // var listShareID = listDivID + "-list-share";

            $("#" + listNameID).keypress(function(e) {
                if (e.which == 13) {
                    if ($("#" + listNameID).html() != '') {
                        $("#" + listNameID).html($("#" + listNameID).html().capitalizeFirstLetter());

                        l[listNameID] = {};
                        l[listNameID].id = listDivID;
                        l[listNameID].name = $("#" + listNameID).html();
                        l[listNameID].items = {};

                        $("#" + listOptionsChevron).css('display', 'block');
                        $("#" + listNameID).removeAttr("contenteditable");

                        console.log(l);

                        this.blur();

                        writeFile();
                    }
                    else {
                        refresh();
                    }

                    return false;
                }
            });

            $("#" + listNameID).on("click", function () {
                $("#item-lists-page").css("display", "block");
                $("#shopping-lists-page").css("display", "none");

                selectedListID = listNameID.substring(0, listNameID.indexOf('-'));

                refresh();
            });

            $("#" + listNameID).focusout(function () {
                if ($("#" + listNameID).html() != '') {
                    l[listNameID] = {};
                    l[listNameID].id = listDivID;
                    l[listNameID].name = $("#" + listNameID).html();
                    l[listNameID].items = {};

                    $("#" + listOptionsChevron).css('display', 'block');
                    console.log(l);

                    this.blur();
                    writeFile();
                }
                else {
                    // $("#" + listDivID + "-list-div").remove();
                    // generateLists();

                    refresh();
                }
            });

            $("#" + listDeleteID).on('click', function () {
                delete l[listNameID];
                // $("#" + listDivID + "-list-div").remove();
                // generateLists();
                writeFile();
                refresh();
                console.log(l);
            });
        }

        function update(id) {
            var itemDivStr =
                '<div id="gen-id-item" class="shopping-list">' +
                    '<div style="float: left; padding-left: 3px">' +
                        '<span class="glyphicon glyphicon-record dark-gray" aria-hidden="true"></span>' +
                    '</div>' +
                    '<div style="float:left; margin-left: 5px; padding-bottom: 2px; width: 70%; display: inline-block; text-decoration: replace-line-through" contenteditable="true" id="gen-id-item-name"></div>' +
                    '<div style="float: right;"><span id="gen-id-options-chevron" style="display: none" class="glyphicon glyphicon-option-vertical dark-gray" data-toggle="collapse" data-target="#gen-id-item-options"></span></div>' +
                    '<div style="float: right; padding-right: 10px">' +
                        '<span id="gen-id-item-complete" class="glyphicon glyphicon-ok-sign white" style="size: " aria-hidden="true"></span>' +
                    '</div>' +
                    '<br>' +
                    '<div id="gen-id-item-options" class="full-width collapse item-options" style="padding: 10px; overflow-y: auto">' +
                        '<div style="float: left">' +
                            '<div style="display: inline; float: left">Q:</div>' +
                            '<div class="input-group" style="width: 120px; float: left; padding-left: 10px">' +
                                '<span class="input-group-btn">' +
                                    '<button type="button" class="btn btn-danger btn-number"  data-type="minus" data-field="quant[2]">' +
                                        '<span class="glyphicon glyphicon-minus"></span>' +
                                    '</button>' +
                                '</span>' +
                                '<input id="gen-id-item-q" type="text" name="quant[2]" class="form-control input-number" value="10" min="1" max="100">' +
                                    '<span class="input-group-btn">' +
                                        '<button type="button" class="btn btn-success btn-number" data-type="plus" data-field="quant[2]">' +
                                            '<span class="glyphicon glyphicon-plus"></span>' +
                                        '</button>' +
                                    '</span>' +
                            '</div>' +
                        '</div>' +
                        '<div style="float: left; padding-left: 20px">' +
                            '<div style="display: inline; float: left">S:</div>' +
                            '<div class="input-group" style="width: 120px; float: left; padding-left: 10px">' +
                                '<input id="gen-id-item-s" type="text" name="quant[2]" class="form-control" value="10 lbs">' +
                            '</div>' +
                        '</div>' +
                        '<div id="gen-id-item-delete" style="float: right; padding-right: 10px">' +
                            '<span class="glyphicon glyphicon-trash white" aria-hidden="true"></span>' +
                        '</div>' +
                        '<div style="float: right; padding-right: 10px">' +
                            '<span id="gen-id-item-complete-action" class="glyphicon glyphicon-ok-sign white" aria-hidden="true"></span>' +
                        '</div>' +
                    '</div>' +
                '</div>';

            var itemDivID = id;
            itemDivStr = itemDivStr.replaceAll("gen-id", itemDivID);
            var itemDiv = $(itemDivStr);

            var itemNameID = itemDivID + "-item-name";
            var itemOptionsChevron = itemDivID + "-options-chevron";
            var itemQuantityID = itemDivID + "-item-q";
            var itemSizeID = itemDivID + "-item-s";
            var itemDeleteID = itemDivID + "-item-delete";
            var itemCompleteID = itemDivID + "-item-complete";
            var itemCompleteActionID = itemDivID + "-item-complete-action";

            $("#item-lists").prepend(itemDiv);

            console.log('============== ' + $("#" + itemSizeID).html());

            $("#" + itemNameID).keypress(function(e) {
                if(e.which == 13) {
                    var selectedList = selectedListID + "-list-name";
                    console.log(selectedList);
                    console.log(l);
                    console.log(l[selectedList]);

                    if ($("#" + itemNameID).html() != '') {
                        $("#" + itemNameID).html($("#" + itemNameID).html().capitalizeFirstLetter());

                        l[selectedList].items[itemNameID] = {};
                        l[selectedList].items[itemNameID].id = itemNameID;
                        l[selectedList].items[itemNameID].name = $("#" + itemNameID).html();
                        l[selectedList].items[itemNameID].quantity = $("#" + itemQuantityID).val();
                        l[selectedList].items[itemNameID].size = $("#" + itemSizeID).val();

                        $("#" + itemOptionsChevron).css('display', 'block');
                        console.log(l);

                        this.blur();
                        writeFile();
                    }
                    else {
                        // $(".shopping-list").remove();
                        // generateItems();
                        refresh();
                    }

                    return false;
                }
            });

            $("#" + itemNameID).focusout(function () {
                var selectedList = selectedListID + "-list-name";

                if ($("#" + itemNameID).html() != '') {
                    l[selectedList].items[itemNameID] = {};
                    l[selectedList].items[itemNameID].id = itemNameID;
                    l[selectedList].items[itemNameID].name = $("#" + itemNameID).html();
                    l[selectedList].items[itemNameID].quantity = $("#" + itemQuantityID).val();
                    l[selectedList].items[itemNameID].size = $("#" + itemSizeID).val();

                    $("#" + itemOptionsChevron).css('display', 'block');
                    console.log(l);

                    this.blur();
                    writeFile();
                }
                else {
                    // $(".shopping-list").remove();
                    // generateItems();
                    refresh();
                }
            })

            $("#" + itemQuantityID).on('change', function () {
                var selectedList = selectedListID + "-list-name";

                l[selectedList].items[itemNameID] = {};
                l[selectedList].items[itemNameID].id = itemNameID;
                l[selectedList].items[itemNameID].name = $("#" + itemNameID).html();
                l[selectedList].items[itemNameID].quantity = $("#" + itemQuantityID).val();
                l[selectedList].items[itemNameID].size = $("#" + itemSizeID).val();
                console.log(l);
                writeFile();
            });

            $("#" + itemSizeID).on('change', function () {
                var selectedList = selectedListID + "-list-name";

                l[selectedList].items[itemNameID] = {};
                l[selectedList].items[itemNameID].id = itemNameID;
                l[selectedList].items[itemNameID].name = $("#" + itemNameID).html();
                l[selectedList].items[itemNameID].quantity = $("#" + itemQuantityID).val();
                l[selectedList].items[itemNameID].size = $("#" + itemSizeID).val();
                console.log(l);
                writeFile();
            });

            $("#" + itemDeleteID).on('click', function () {
                var selectedList = selectedListID + "-list-name";

                delete l[selectedList].items[itemNameID];
                // $(".shopping-list").remove();
                // generateLists();
                // generateItems();

                refresh();
                console.log(l);
                writeFile();
            });

            $("#" + itemCompleteID).on('click', function () {
                if ($("#" + itemCompleteID).hasClass('white')) {
                    var selectedList = selectedListID + "-list-name";
                    l[selectedList].items[itemNameID].complete = true;

                    $("#" + itemNameID).css("text-decoration", "line-through");

                    $("#" + itemCompleteID).removeClass('white');
                    $("#" + itemCompleteID).addClass('green');
                    $("#" + itemCompleteActionID).removeClass('white');
                    $("#" + itemCompleteActionID).addClass('green');

                    writeFile();
                }
                else {
                    var selectedList = selectedListID + "-list-name";
                    l[selectedList].items[itemNameID].complete = false;

                    console.log('======= Removing the strike')
                    $("#" + itemNameID).css("text-decoration", "");

                    $("#" + itemCompleteID).removeClass('green');
                    $("#" + itemCompleteID).addClass('white');
                    $("#" + itemCompleteActionID).removeClass('green');
                    $("#" + itemCompleteActionID).addClass('white');

                    writeFile();
                }
                console.log(l);
            });

            $("#" + itemCompleteActionID).on('click', function () {
                if ($("#" + itemCompleteActionID).hasClass('white')) {
                    var selectedList = selectedListID + "-list-name";
                    l[selectedList].items[itemNameID].complete = true;

                    $("#" + itemNameID).css("text-decoration", "line-through");
                    $("#" + itemCompleteID).removeClass('white');
                    $("#" + itemCompleteID).addClass('green');
                    $("#" + itemCompleteActionID).removeClass('white');
                    $("#" + itemCompleteActionID).addClass('green');

                    writeFile();
                }
                else {
                    var selectedList = selectedListID + "-list-name";
                    l[selectedList].items[itemNameID].complete = false;

                    $("#" + itemNameID).css("text-decoration", "");
                    $("#" + itemCompleteID).removeClass('green');
                    $("#" + itemCompleteID).addClass('white');
                    $("#" + itemCompleteActionID).removeClass('green');
                    $("#" + itemCompleteActionID).addClass('white');

                    writeFile();
                }
                console.log(l);
            });
        }

        $("#back-btn").on("click", function () {
            refresh();
            $("#item-lists-page").css("display", "none");
            $("#shopping-lists-page").css("display", "block");
        });

        $("#safeway-list-id").on("click", function () {
            $("#item-lists-page").css("display", "block");
            $("#shopping-lists-page").css("display", "none");
        });

        function recognizeSpeech() {
            var maxMatches = 1;
            var promptString = "Speak now. "; // optional
            var language = "en-US";                     // optional
            window.plugins.speechrecognizer.startRecognize(function(result){
                // // =====================================================================================================
                var itemSpoken = result[0];
                var itemsSplit = itemSpoken.split('and');
                for (var item in itemsSplit) {
                    var id = Date.now();
                    update(id);

                    var itemNameID = id + "-item-name";
                    var selectedList = selectedListID + "-list-name";
                    var itemOptionsChevron = id + "-options-chevron";

                    $("#" + itemNameID).html(itemsSplit[item].trim().capitalizeFirstLetter());
                    $("#" + itemOptionsChevron).css('display', 'block');

                    l[selectedList].items[itemNameID] = {};
                    l[selectedList].items[itemNameID].id = itemNameID;
                    l[selectedList].items[itemNameID].name = itemsSplit[item].trim().capitalizeFirstLetter();
                }

                writeFile();

                // this.blur();
                // =====================================================================================================

            }, function(errorMessage){
                console.log("Error message: " + errorMessage);
            }, maxMatches, promptString, language);
        }

        window.requestFileSystem(window.PERSISTENT, 5 * 1024 * 1024, function (fs) {
            console.log('file system open: ' + fs.name);
            createFile(fs.root, "shopping-lists.txt");
            fileSystem = fs;
        },
            function(err)  {
            console.log('Error: ' + err);
        });

        function createFile(dirEntry, fileName) {
            // Creates a new file or returns the file if it already exists.
            dirEntry.getFile(fileName, {create: true, exclusive: false}, function(fe) {
                fileEntry = fe;
                readFile();
            },
                function(err)  {
                console.log('Error: ' + err);
            });
        }

        function readFile() {
            fileEntry.file(function (file) {
                var reader = new FileReader();
                reader.onloadend = function() {
                    console.log("Successful file read: " + this.result);
                    l = JSON.parse(this.result);
                    console.log('########### Read file: ' + l);
                    generateLists();
                };

                reader.readAsText(file);
            });
        }

        function writeFile(dataObj) {
            // Create a FileWriter object for our FileEntry (log.txt).
            fileEntry.createWriter(function (fileWriter) {

                fileWriter.onwriteend = function() {
                    console.log("Successful file write...");
                };

                fileWriter.onerror = function (e) {
                    console.log("Failed file write: " + e.toString());
                };

                // If data object is not passed in,
                // create a new Blob instead.
                if (!dataObj) {
                    dataObj = new Blob([JSON.stringify(l)], { type: 'text/plain' });
                }

                fileWriter.write(dataObj);
            });
        }
    });
}, 1000);

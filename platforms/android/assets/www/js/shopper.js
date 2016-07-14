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
    $("document").ready(function () {

        String.prototype.replaceAll = function(search, replace)
        {
            //if replace is not sent, return original string otherwise it will
            //replace search string with 'undefined'.
            if (replace === undefined) {
                return this.toString();
            }

            return this.replace(new RegExp(search , 'g'), replace);
        };

        var l = {};
        dummyL();
        generateList();

        function dummyL() {
            l.safeway = {};
            l.safeway.id=1;
            l.safeway.name = 'Safeway';

            l.safeway.items = {};
            //
            // l.safeway.items['111-item-name'] = {};
            // l.safeway.items['111-item-name'].name = 'Beer';
            // l.safeway.items['111-item-name'].id = '111-item-name';
            // l.safeway.items['111-item-name'].quantity = 11;
            // l.safeway.items['111-item-name'].size = '12 lbs';
            //
            // l.safeway.items['121-item-name'] = {};
            // l.safeway.items['121-item-name'].name = 'Chips';
            // l.safeway.items['121-item-name'].id = '121-item-name';
            // l.safeway.items['121-item-name'].quantity = 12;
            // l.safeway.items['121-item-name'].size = '12 lbs';
        }

        function generateList() {
            for (var key in l.safeway.items) {
                var itemObj = l.safeway.items[key];
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

        $("#add-item-btn").on("click", function () {
            var id = Date.now();
            update(id);
            document.getElementById(id + '-item-name').focus();
        });

        function update(id) {
            var listDivStr =
                '<div id="gen-id-item" class="shopping-list">' +
                    '<div style="float:left; padding-bottom: 2px; width: 70%; display: inline-block; text-decoration: replace-line-through" contenteditable="true" id="gen-id-item-name"></div>' +
                    '<div style="float: right;"><span id="gen-id-options-chevron" style="display: none" class="glyphicon glyphicon-chevron-right dark-gray" data-toggle="collapse" data-target="#gen-id-item-options"></span></div>' +
                    '<div style="float: right; padding-right: 10px">' +
                        '<span id="gen-id-item-complete" class="glyphicon glyphicon-ok white" aria-hidden="true"></span>' +
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
                            '<span id="gen-id-item-complete-action" class="glyphicon glyphicon-ok white" aria-hidden="true"></span>' +
                        '</div>' +
                    '</div>' +
                '</div>';

            var listDivID = id;
            listDivStr = listDivStr.replaceAll("gen-id", listDivID);
            var listDiv = $(listDivStr);

            var itemNameID = listDivID + "-item-name";
            var itemOptionsChevron = listDivID + "-options-chevron";
            var itemQuantityID = listDivID + "-item-q";
            var itemSizeID = listDivID + "-item-s";
            var itemDeleteID = listDivID + "-item-delete";
            var itemCompleteID = listDivID + "-item-complete";
            var itemCompleteActionID = listDivID + "-item-complete-action";

            $("#shopping-lists").prepend(listDiv);

            console.log('============== ' + $("#" + itemSizeID).html());

            $("#" + itemNameID).keypress(function(e) {
                if(e.which == 13) {
                    if ($("#" + itemNameID).html() != '') {
                        l.safeway.items[itemNameID] = {};
                        l.safeway.items[itemNameID].id = itemNameID;
                        l.safeway.items[itemNameID].name = $("#" + itemNameID).html();
                        l.safeway.items[itemNameID].quantity = $("#" + itemQuantityID).val();
                        l.safeway.items[itemNameID].size = $("#" + itemSizeID).val();

                        $("#" + itemOptionsChevron).css('display', 'block');
                        console.log(l);

                        this.blur();
                    }
                    else {
                        $(".shopping-list").remove();
                        generateList();
                    }

                    return false;
                }
            });

            $("#" + itemNameID).focusout(function () {
                if ($("#" + itemNameID).html() != '') {
                    l.safeway.items[itemNameID] = {};
                    l.safeway.items[itemNameID].id = itemNameID;
                    l.safeway.items[itemNameID].name = $("#" + itemNameID).html();
                    l.safeway.items[itemNameID].quantity = $("#" + itemQuantityID).val();
                    l.safeway.items[itemNameID].size = $("#" + itemSizeID).val();

                    $("#" + itemOptionsChevron).css('display', 'block');
                    console.log(l);

                    this.blur();
                }
                else {
                    $(".shopping-list").remove();
                    generateList();
                }
            })

            $("#" + itemQuantityID).on('change', function () {
                l.safeway.items[itemNameID] = {};
                l.safeway.items[itemNameID].id = itemNameID;
                l.safeway.items[itemNameID].name = $("#" + itemNameID).html();
                l.safeway.items[itemNameID].quantity = $("#" + itemQuantityID).val();
                l.safeway.items[itemNameID].size = $("#" + itemSizeID).val();
                console.log(l);
            });

            $("#" + itemSizeID).on('change', function () {
                l.safeway.items[itemNameID] = {};
                l.safeway.items[itemNameID].id = itemNameID;
                l.safeway.items[itemNameID].name = $("#" + itemNameID).html();
                l.safeway.items[itemNameID].quantity = $("#" + itemQuantityID).val();
                l.safeway.items[itemNameID].size = $("#" + itemSizeID).val();
                console.log(l);
            });

            $("#" + itemDeleteID).on('click', function () {
                delete l.safeway.items[itemNameID];
                $(".shopping-list").remove();
                generateList();
                console.log(l);
            });

            $("#" + itemCompleteID).on('click', function () {
                if ($("#" + itemCompleteID).hasClass('white')) {
                    l.safeway.items[itemNameID].complete = true;
                    $("#" + itemNameID).css("text-decoration", "line-through");

                    $("#" + itemCompleteID).removeClass('white');
                    $("#" + itemCompleteID).addClass('green');
                    $("#" + itemCompleteActionID).removeClass('white');
                    $("#" + itemCompleteActionID).addClass('green');
                }
                else {
                    l.safeway.items[itemNameID].complete = false;
                    console.log('======= Removing the strike')
                    $("#" + itemNameID).css("text-decoration", "");

                    $("#" + itemCompleteID).removeClass('green');
                    $("#" + itemCompleteID).addClass('white');
                    $("#" + itemCompleteActionID).removeClass('green');
                    $("#" + itemCompleteActionID).addClass('white');
                }
                console.log(l);
            });

            $("#" + itemCompleteActionID).on('click', function () {
                if ($("#" + itemCompleteActionID).hasClass('white')) {
                    l.safeway.items[itemNameID].complete = true;
                    $("#" + itemNameID).css("text-decoration", "line-through");

                    $("#" + itemCompleteID).removeClass('white');
                    $("#" + itemCompleteID).addClass('green');
                    $("#" + itemCompleteActionID).removeClass('white');
                    $("#" + itemCompleteActionID).addClass('green');
                }
                else {
                    l.safeway.items[itemNameID].complete = false;
                    $("#" + itemNameID).css("text-decoration", "");

                    $("#" + itemCompleteID).removeClass('green');
                    $("#" + itemCompleteID).addClass('white');
                    $("#" + itemCompleteActionID).removeClass('green');
                    $("#" + itemCompleteActionID).addClass('white');
                }
                console.log(l);
            });
        }
    });
}, 1000)




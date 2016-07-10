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
    console.log('Timing out');
    $("document").ready(function () {

        $("#add-item-btn").on("click", function () {
            console.log("Creating a new row of content");

            String.prototype.replaceAll = function(search, replace)
            {
                //if replace is not sent, return original string otherwise it will
                //replace search string with 'undefined'.
                if (replace === undefined) {
                    return this.toString();
                }

                return this.replace(new RegExp(search , 'g'), replace);
            };

            var listDivStr = '<div id="gen-id-item" class="shopping-list"><div style="float:left; padding-bottom: 2px; width: 70%" c><span id="gen-id-item-name">Bread</span></div><div style="float: right"><span class="glyphicon glyphicon-chevron-right dark-gray" data-toggle="collapse" data-target="#gen-id-item-options" style: "display:none"></span></div><br><div id="gen-id-item-options" class="full-width collapse item-options" style="padding: 10px; overflow-y: auto"><div style="float: left"><div style="display: inline; float: left">Q:</div><div class="input-group" style="width: 120px; float: left; padding-left: 10px"><span class="input-group-btn"><button type="button" class="btn btn-danger btn-number"  data-type="minus" data-field="quant[2]"><span class="glyphicon glyphicon-minus"></span></button></span><input type="text" name="quant[2]" class="form-control input-number" value="10" min="1" max="100"><span class="input-group-btn"><button type="button" class="btn btn-success btn-number" data-type="plus" data-field="quant[2]"><span class="glyphicon glyphicon-plus"></span></button></span></div></div><div style="float: left; padding-left: 20px"><div style="display: inline; float: left">S:</div><div class="input-group" style="width: 120px; float: left; padding-left: 10px"><input type="text" name="quant[2]" class="form-control" value="10 lbs"></div></div><div id="gen-id-item-delete" style="float: right; padding-right: 10px"><span class="glyphicon glyphicon-trash white" aria-hidden="true"></span></div><div id="gen-id-item-complete" style="float: right; padding-right: 10px"><span class="glyphicon glyphicon-ok white" aria-hidden="true"></span></div></div></div>';
            listDivStr = listDivStr.replaceAll("gen-id", Date.now() + "");
            var listDiv = $(listDivStr);

            console.log(listDiv);
            console.log($("#shopping-lists"));
            $("#shopping-lists").append(listDiv);

        });
    });
}, 1000)




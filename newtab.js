var bookmarks = chrome.bookmarks;
function readBooks() {
    var box = null;
    var createPanel = function (node) {
        var tmp = $("#siteSetTemp").html();
        str = tmp.replace(/#id#/g, node.id);
        str = str.replace(/#title#/g, node.title);
        return str;
    };
    var createSite = function (node) {
        bookmarks.getChildren(node.id, function (children) {
            var tmp = $("#siteTemp").html();

            var str = "";
            var panel = createPanel(node);
            panel = $(panel);

            var site = null;
            for (var i = 0; i < children.length; i++) {
                site = children[i];
                if (site.url == null || site.url == "") {
                    continue;
                }

                str = tmp.replace(/#url#/g, site.url);
                str = str.replace(/#title#/g, site.title);
                str = str.replace(/#icon#/g, getIcon(site));
                panel.append(str);
            }
            panel.find("img").bind("error", function () {
                $(this).attr('src', 'default.png');
                console.log("error");
            });
            $("#panel").append(panel);
        });
    };
    bookmarks.search("favorites", function (items) {
    	if (items == null || items.length == 0) return;
        box = items[0];
        if (box == null) { return; }
        box.title = "常用站点";
        createSite(box);
        bookmarks.getChildren(box.id, function (children) {
            var site = null;
            for (var i = 0; i < children.length; i++) {
                site = children[i];
                if (site.url == null || site.url == "") {
                    createSite(site);
                }
            }
        });
    });
}
function getIcon(site) {
    var us = site.url.split("/");
    iconUrl = us[0] + "//" + us[2] + "/favicon.ico";
    return iconUrl;
}
function getIconByNet(url) {
    var ret;
    $.ajax({
        url: getIconUrl(url),
        type: "get",
        async: false,
        success: function (d, p) {

        }
    });

    return ret;
}
function getIconByStore(id) {
    var store = localStorage;
    var icons = store.getItem("iconSet");
    icons = $.parseJSON(icons);
    return icons[id];
}
function getIconUrl(url) {
    var us = url.split("/");
    console.log(us);
    iconUrl = us[0] + "//" + us[2] + "/favicon.ico";
    return iconUrl;
}
$(function () {
	readBooks();
	$("#search").bind("click", function () {
		$("#searcher").submit();
	});


});
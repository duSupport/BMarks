var bookmarks = chrome.bookmarks;
function readBooks() {
	var box = null;
	bookmarks.search("favorites", function(items) {
		box = items[0];
		bookmarks.getChildren(box.id, function(children) {
			var tmp = $("#siteTemp").html();
			var str = "";
			for (var i = 0; i < children.length; i++) {
				str = tmp.replace(/#url#/g, children[i].url);
				str = str.replace(/#title#/g, children[i].title);
				str = str.replace(/#icon#/g, getIcon(children[i].url));
				$("#panel").append(str);
			}

		});
	});
}
function getIcon(url) {
	var us = url.split("/");
	console.log(us);
	iconUrl = us[0] + "//" + us[2] + "/favicon.ico";
	return iconUrl;
}
$(function() {
	readBooks();
})
var EditorCreator = {
	convert : function(b, a, c) {
		if (!b || !a || !$tom) {
			return
		}
		$tom.applyStyles(b, {
			display : "none"
		});
		Trex.I.XHRequester.sendRequest("get", a, "", false, function(e) {
			var d = document.createElement("div");
			d.innerHTML = e;
			$tom.insertNext(d, b);
			c && c()
		})
	}
};
BasicGame.Item = (function () {
	var testVar = 42;
	var my = {};
	// ...

	var foo = function() {
		console.log("bar");
		console.log(testVar);
	}

	return {
		foo : foo
	};
}());
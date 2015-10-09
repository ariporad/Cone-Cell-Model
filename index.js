// Don't use this till later
var config = Object.create(null);

// TODO: Better top of cone, colors, inside, rest of cell, organelles, labels

/**
 * Parts
 */
var outerSegment = part(function outerSegment() {
	var cone = translate([0, 0, 0], cylinder({
		h: this.height,
		r1: this.radiusStart,
		r2: this.radiusEnd,
		fn: this.resolution,
	}));

	var roundedTop = translate([0, 0, this.height - .2], sphere(this.radiusEnd));

	var shell = union(cone, roundedTop);

	var hollow = translate([0, 0, this.thickness], scale(1 - this.thickness / 2, shell));

	var cutaway = translate([0, 0, 0], cube({
		size: this.radiusStart * 2,
	}));

	return difference(shell, hollow, cutaway);
});

function main() {
	return [outerSegment.render(0, 0, 3)];
}

/**
 * Helpers
 */
function _parseAxis(axis) {
	if (typeof axis === 'number' && !isNaN(axis)) return axis;
	axis = parseFloat(axis, 10);
	if (isNaN(axis)) return 0;
	return axis;

}

// function _assign(target, obj) {
// 	var keys = Object.keys(obj);
// 	keys.forEach(function assignKey(key) {
// 		target[key] = target[key] || obj[key];
// 	});

// 	return target;
// }

// function assign(a, b) {
// 	var objs = [];
// 	for(var i = 0; i < arguments.length; i++) {
// 		objs.push(arguments[i]);
// 	}

// 	var target = objs.shift();
// 	return objs.reduce(_assign, target);
// }

function part(render) {
	var partObj = Object.create(config);
	partObj.render = function partWrapper(x, y, z) {
		var axiis = [_parseAxis(x), _parseAxis(y), _parseAxis(z)];
		return translate(axiis, render.call(partObj));
	}

	config._parts = config._parts || [];
	config._parts.push(partObj);

	return partObj;
}

/**
 * Config
 */

// General Settings
config.resolution = 30;

// Outer Segment
outerSegment.height = 6;
outerSegment.radiusStart = 3.5;
outerSegment.radiusEnd = 1;
outerSegment.thickness = .1;
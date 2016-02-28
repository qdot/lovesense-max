// One inlet, for input from serial object
inlets = 1
// Two outlets, one for status messages, one for
// accelerometer data.
outlets = 2
var cur_string = [];

function msg_int(i) {
	cur_string += String.fromCharCode(i);
	// If we've hit a semicolon, time to send out
	// data.
	if (i == 59) {
		if (cur_string[0] != 'G') {
	    	outlet(0, cur_string);
			cur_string = '';
			return;
		}
		// If the string leads with a G, it's an 
		// accelerometer reading. Turn it into a
		// list of integers.
		var accel = [];
		for (var j = 1; j < cur_string.length; j += 4) {
			accel.push((parseInt(cur_string[j], 16) << 4) +
					   (parseInt(cur_string[j+1], 16) << 0) +
					   (parseInt(cur_string[j+2], 16) << 12) +
					   (parseInt(cur_string[j+3], 16) << 8));
		}
		outlet(1, accel);
		accel = []
		cur_string = '';
	}
}
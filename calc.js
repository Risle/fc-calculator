document.addEventListener('DOMContentLoaded', function() {

	var maxInputLength = 13,
		inputLog = [],
		currentVal = '',
		input = '',
		handlersArr = [],
		char,
		keyNodeList = document.querySelectorAll('.digit'),
		nodeArray = [],
		display = document.getElementById('display'),
		keyLog = [],
		integerPart = '',
		cmd = '',
		pressed = '';

	FocusOnInput();
	handle();

	console.log(display.clientWidth);

	function FocusOnInput() {
    display.focus();
    setTimeout(function () { display.focus(); }, 3);
	}

	function handle() {
		display.addEventListener('keydown', stopDefaultAction, false);
		nodeArray = [].slice.call(keyNodeList);
		nodeArray.forEach(function(node) {
			document.getElementById(node.id).addEventListener('click', function(evt) {
				processInput(node.value);
			});
		})
	};

//g No non-numeric or non-operator. Permit only one decimal.
	function stopDefaultAction(evt) {
		pressed = evt.key.toString();
		evt.preventDefault();

		validateKey(evt);
	}

// Use 'enter' key to mean '='...
	function validateKey(keyEvt) {
		cmd = keyEvt.key;
		switch (cmd) {
			case 'Delete' : cmd = 'clear';
				break;
			case 'Backspace' : cmd = 'back';
				break;
			case 'Enter' : cmd = '=';
				break;
		}
		if (cmd === '.') {
				if ( currentVal.indexOf('.') > -1 ) {
							return;
				}
		}
		console.log(cmd);
		processInput(cmd);
	}

	// Direct input based on value
	function processInput(value) {
		input = value;
		input = (parseInt(input, 10)) ? parseInt(input, 10) : input;
		keyLog.push(input);
		if ( (/[-+=*/]/).test(input) ) {
				operate(input);
		} else if (input === 'clear' ||
					  input === 'clearEntry' ||
					  input === 'back' ) {
			deleteSomething(input)
		} else if ( Number.isInteger(input) ||
					  input === '.' ||
					  input === '0' ) {
			validateNum( input, processNum );
		}	else if ( input === 'negToggle' ) {
			negToggle();
		}
		return;
	}

	function displayer(val) {
		var length = val.toString().length;
		display.value = val;
	}

//start new calculation if a number is pressed directly after '='
	function validateNum(num, process) {
		if (keyLog[keyLog.length - 2] === '=') {
			inputLog = [];
			keyLog.pop();
		}
		process(num)
	}

//Add numeric input to a string
	function processNum(num) {
		currentVal += num;
		displayer(currentVal);
	}

//Calculate answer after each operation
	function operate(operator) {
		currentVal = eval(inputLog.join('') + currentVal);
		isFinite(currentVal) ? displayer(currentVal) : displayer('undefined') ; //deal with the 'x/0 = infinity' problem
		console.log(currentVal);
		inputLog = [];
		inputLog.push(currentVal);
		if (operator !== '=') {
			inputLog.push(operator);
		}
		currentVal = '';
	}

	function deleteSomething(deleteCmd) {
		switch (deleteCmd) {
			case 'back':
				currentVal = currentVal.slice(0, -1);
				displayer(currentVal);
				break;
			case 'clearEntry':
				currentVal = '';
				displayer(currentVal);
				display.value = '0';
				break;
			case 'clear':
				inputLog = [];
				currentVal = '';
				displayer(currentVal);
				break;
			default:
				console.error('\'deleteSomething\' called with incorrect specifications.');
		}
	}

	function negToggle() {
		if ( currentVal.indexOf('-') === 0 ) {
			currentVal = currentVal.slice(1);
		} else if ( currentVal.length > 0 ) {
			currentVal = '-' + currentVal;
		}
		displayer(currentVal);
	}
});

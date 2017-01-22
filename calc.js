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
		command = '',
		pressed = '';

	FocusOnInput();
	handle();

	function FocusOnInput() {
    display.focus();
    setTimeout(function () { display.focus(); }, 3);
	}

	function handle() {
		display.addEventListener('keydown', stopDefaultAction);
		display.addEventListener('keyup', validateKey);
		nodeArray = [].slice.call(keyNodeList);
		nodeArray.forEach(function(node) {
			document.getElementById(node.id).addEventListener('click', function() {
				processInput(node.value);
				//buttonShadow();
			});
		})
	};

//g No non-numeric or non-operator. Permit only one decimal.
	function stopDefaultAction(evt) {
		pressed = evt.key;
		if ( !((/[0-9+-=*./]/).test(pressed)
				 || pressed === 'Delete'
				 || pressed === 'Backspace'
			 	 || pressed === 'Enter') ) {
					 evt.preventDefault();
			}
		/*	if (pressed === '.') {
					if (/([.])/g).test(currentVal) { evt.preventDefault() };
			}*/
	}

// Use 'enter' key to mean '='...
	function validateKey(keyEvent) {
		command = keyEvent.key;
		switch (command) {
			case 'Delete' : command = 'clear';
				break;
			case 'Backspace' : command = 'back';
				break;
			case 'Enter' : command = '=';
				break;
		}
		processInput(command);
	}
	// Direct input based on value
	function processInput(value) {
		input = value;
			//	console.log('1: input: ' + input);
		input = (parseInt(input, 10)) ? parseInt(input, 10) : input;
		keyLog.push(input);
		if ( (/[-+=*//]/).test(input) ) {
				operate(input);
		} else if (input === 'clear' ||
					  input === 'clearEntry' ||
					  input === 'back' ) {
			deleteSomething(input)
		} else if ( Number.isInteger(input) ||
					  input === '.' ||
					  input === '0' ) {
							console.log('2: numberic input: ' + input);
			validateNum( input, processNum );
		} else if ( input = 'negToggle' ) {
			negToggle();
		} else {
			console.error('Input Not Permitted');
		}
	}

	function displayer(str) {
		display.value = str;
	}

	//handle displayed text
	function displayAnswer(str) {
		console.log('3: ' + str);
		integerPart = str.toString().split('.')[0];
		console.log(integerPart);
		if ( str.length > maxInputLength ) {
			if ( integerPart.length <= maxInputLength ) {
				str = str.toFixed(maxInputLength - (integerPart + 1));
			} else if ( integerPart.length > maxInputLength ) { //scientific notation
				str = integerPart.slice(0, 1) + '.' + integerPart.slice(1, 3) + 'e' + integerPart.length;
			} else {
				console.error('Input length is too long and string does not validate.');
			}
		}
		console.log('4: ' + str);
		displayer(str);
	}

//start new calculation if a number is pressed directly after '='
	function validateNum(num, process) {
		if (keyLog[keyLog.length - 2] === '=') {
			inputLog = [];
			keyLog.pop();
		}
		process(num)
	}
	
//All numeric input is added to string.
	function processNum(num) {
		currentVal += num;
		displayer(currentVal);
	}

//Calculate answer after each operation
	function operate(operator) {
		console.log('1: currentVal' + currentVal + ' operator: ' + operator);
		currentVal = eval(inputLog.join('') + currentVal);
		displayAnswer(currentVal);
		inputLog = [];
		inputLog.push(currentVal);
		console.log('2: ' + currentVal)
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
				console.error('delete function called with incorrect specifications.');
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

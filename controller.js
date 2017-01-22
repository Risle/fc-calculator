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
		command = '';

	FocusOnInput();
	handle();

	function FocusOnInput() {
    display.focus();
    setTimeout(function () { display.focus(); }, 1);
}

	function handle() {
		display.addEventListener('keyup', function(e) {
			validateKey (e);
		})
		nodeArray = [].slice.call(keyNodeList);
		nodeArray.forEach(function(node) {
			document.getElementById(node.id).addEventListener('click', function() {
				processInput(node.value);
				//buttonShadow();
			});
		})
	};

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
	/*	if ( (/[+-=*./]/).test(command)
			 || command === 'clear'
			 || command === 'back' ) {
			console.log(command, keyEvent);
			processInput(command, keyEvent);
		} else {*/
		console.log('keyEvent: ' + command);
			return false;
			//keyEvent.preventDefault();

	}

	function processInput(value) {
		input = value;
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
			validateNum( input, processNum );
		} else if ( input = 'negToggle' ) {
			negToggle();

		} else {
			console.error('Input Not Permitted');
			//return false;
		}
	}

	function displayer(str) {
		display.value = str;
	}

	function displayAnswer(str) {
		console.log(str);
		integerPart = str.toString().split('.')[0];
		console.log(integerPart);
		if ( str.length > maxInputLength ) {
			if ( integerPart.length <= maxInputLength ) {
				currentVal = currentVal.toFixed(maxInputLength - (integerPart + 1));
			} else if ( integerPart.length > maxInputLength ) { //scientific notation
				str = integerPart.slice(0, 1) + '.' + integerPart.slice(1, 3) + 'e' + integerPart.length;
			} else {
				console.error('Input length is too long and string does not validate.');
			}
		}
		displayer(str);
	}

	function validateNum(num, process) {
		if (keyLog[keyLog.length - 2] === '=') {
			inputLog = [];
			keyLog.pop();
		}
		processNum(input);
		//return true;
	}

	function processNum(num) {
		//	if(!validateNum()) return;
		if (num === '.') {

		}
		currentVal += num;
		displayer(currentVal);
	}

	function operate(operator) {
		//inputLog.push(currentVal);
		currentVal = eval(inputLog.join('') + currentVal);
		displayAnswer(currentVal);
		console.log('Pre-operation: inputLog: '
						+ inputLog, 'currentVal: '
						+ currentVal, 'operator: '
						+ operator);
		inputLog = [];
		//	processInput(currentVal);
		inputLog.push(currentVal);
		if (operator !== '=') inputLog.push(operator);{
		currentVal = '';
		}


	}

	function validateDelete() {
		//	if (keyLog[keyLog.length - 2] === )
	}

	function deleteSomething(deleteWhat) {
		//	if (!validateDelete()) inputLog.push(currentVal);
		switch (deleteWhat) {
			case 'back':
				currentVal = currentVal.slice(0, -1);
				//	inputLog[inputLog.length - 1] = inputLog[inputLog.length - 1].slice(0, -1);
				displayer(currentVal) // = inputLog.slice(0, -1);
				break;
			case 'clearEntry':
				//if (inputLog.length > 0) inputLog.pop();
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
		//return inputLog;
	}

	function negToggle() {
		if ( currentVal.indexOf('-') === 0 ) {
			currentVal = currentVal.slice(1);
		} else {
			currentVal = '-' + currentVal;
		}
		displayer(currentVal);
	}

	function buttonShadow() {

	}
});

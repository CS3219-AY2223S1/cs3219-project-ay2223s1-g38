export const passwordValidate = (password) => {
	const uppercaseRegExp = /(?=.*?[A-Z])/;
	const lowercaseRegExp = /(?=.*?[a-z])/;
	const digitsRegExp = /(?=.*?[0-9])/;
	const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
	const minLengthRegExp = /.{8,}/;

	const passwordLength = password.length;
	const uppercasePassword = uppercaseRegExp.test(password);
	const lowercasePassword = lowercaseRegExp.test(password);
	const digitsPassword = digitsRegExp.test(password);
	const specialCharPassword = specialCharRegExp.test(password);
	const minLengthPassword = minLengthRegExp.test(password);
	let errMsg = null;

	if (passwordLength === 0) {
		errMsg = "Password is empty";
	} else if(!uppercasePassword) {
		errMsg = "At least one uppercase character is required.";
	} else if(!lowercasePassword) {
		errMsg = "At least one lowercase character is required.";
	} else if(!digitsPassword) {
		errMsg = "At least one digit is required.";
	} else if(!specialCharPassword) {
		errMsg = "At least one special character (#?!@$%^&*-) is required.";
	} else if(!minLengthPassword) {
		errMsg = "Password has to be at least 8 characters long.";
	}

	return errMsg;
};
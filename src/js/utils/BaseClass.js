export default class BaseClass {

	constructor(options = {}) {
		this.options = options;
	}

	setOptions(options) {
		Object.assign(this.options, options);
	}

}
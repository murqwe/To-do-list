export default class Counter {
	constructor(selector, val = 0) {
		this.selector = selector;
		this.val = val;
	}

	increment() {
		this.val++;
		$(this.selector).text(this.val);
	}

	decrement() {
		this.val--;
		$(this.selector).text(this.val);
	}
}

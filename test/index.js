const test = require('ava');
const promiseMeLater = require('../src/index');

test('Limit 1 call per 1000ms', (t) => {
	let inflight = 0;
	t.plan(10);
	const delay = () => new Promise((resolve) => {
		console.log('will resolve');
		inflight += 1;
		t.truthy(inflight <= 1, 'Within limit');
		console.log(inflight)
		setTimeout(() => {
			console.log('resolved');
			inflight -= 1;
			resolve();
		}, 1000);
	});
	const limitDelay = promiseMeLater(delay, 1, 1000);
	for (let i = 0; i < 10; i += 1) {
		limitDelay();
	}
});

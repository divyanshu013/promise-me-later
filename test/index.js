const test = require('ava');
const promiseMeLater = require('../src/index');
let inflight = 0;

const fn = () => new Promise((res, rej) => {
	console.log('Waiting for promise to resolve');
	inflight += 1;
	console.log(inflight);
	setTimeout(() => {
		res()
		console.log('Promise resolved')
		inflight -= 1;
		console.log(inflight)
	}, 3000 + (Math.random() * 100));
});

const throttled = promiseMeLater(fn, 2, 1000);

test('Limit 1 call per 1000ms', async (t) => {
	const p = [];
	for (let index = 0; index < 5; index += 1) {
		p.push(throttled());
	}
	await Promise.all(p);
	t.pass();
});

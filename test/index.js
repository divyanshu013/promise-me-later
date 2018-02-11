const test = require('ava');
const promiseMeLater = require('../src/index');

test('Limit 1 call per 1000ms', async (t) => {
	// keep track of inflight requests
	let inflight = 0;
	// check at intervals to ensure limit
	setInterval(() => t.truthy(
		inflight <= 1,
		`Inflight requests = ${inflight}`
	), 1000);
	const delay = () => new Promise((res) => {
		inflight += 1;
		// just in case check while adding inflight requests too
		t.truthy(inflight <= 1, `Inflight requests = ${inflight}`);
		setTimeout(() => {
			res();
			inflight -= 1;
		}, 1000 + (Math.random() * 100));
	});
	const throttled = promiseMeLater(delay, 1, 1000);
	const p = [];
	for (let index = 0; index < 5; index += 1) {
		p.push(throttled());
	}
	await Promise.all(p);
	t.pass();
});

test('Limit 3 calls per 1500ms', async (t) => {
	// keep track of inflight requests
	let inflight = 0;
	// check at intervals to ensure limit
	setInterval(() => t.truthy(
		inflight <= 3,
		`Inflight requests = ${inflight}`
	), 1500);
	const delay = () => new Promise((res) => {
		inflight += 1;
		// just in case check while adding inflight requests too
		t.truthy(inflight <= 3, `Inflight requests = ${inflight}`);
		setTimeout(() => {
			res();
			inflight -= 1;
		}, 100 + (Math.random() * 100));
	});
	const throttled = promiseMeLater(delay, 3, 1500);
	const p = [];
	for (let index = 0; index < 50; index += 1) {
		p.push(throttled());
	}
	await Promise.all(p);
	t.pass();
});

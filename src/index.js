const PromiseMeLater = (fn, limit, time) => {
	const requestQueue = [];
	const completionQueue = [];
	let inProgress = 0;

	// gets current request and mutates the requestQueue
	const getCurrentRequest = () => requestQueue.shift();

	const initQueue = () => {
		const now = Date.now();

		// remove requests from completionQueue if time limit has reset
		while (completionQueue.length && now - completionQueue[0] > time) {
			completionQueue.shift();
		}

		while (requestQueue.length && inProgress + completionQueue.length < limit) {
			const current = getCurrentRequest();
			inProgress += 1;

			const req = fn(current.args);
			Promise.resolve(req)
				.then(
					res => current.resolve(res),
					err => current.reject(err)
				)
				.then(() => {
					completionQueue.push(Date.now());
					inProgress -= 1;
					if (requestQueue.length) {
						setTimeout(initQueue, time - (Date.now() - now));
					}
				});
		}

		if (requestQueue.length && completionQueue.length) {
			setTimeout(initQueue, time - (now - completionQueue[0]));
		}
	};

	return () => (
		new Promise((resolve, reject) => {
			requestQueue.push({
				args: arguments,
				resolve,
				reject
			});

			initQueue();
		})
	);
};

module.exports = PromiseMeLater;

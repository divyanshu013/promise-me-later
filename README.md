# promise-me-later

A minimal, vanilla JS library to throttle/rate-limit `fetch`, API calls and other promise returning functions :recycle:

## When to use
When you need to limit any promise returning function call rate but still want each call to happen over time. For example, a good use case for this is to limit calling APIs from `fetch` in browser or `node-fetch` in node environment.

## Usage

### As a node module

```bash
npm i promise-me-later
```

```js
import promiseMeLater from 'promise-me-later';

// any promise returning function
const delay = () => new Promise((resolve, reject) => {
	console.log('Resolving promise');
	setTimeout(() => {
		resolve();
		console.log('Promise resolved');
	}, 1000);	// resolves the promise after 1 second
})

// returns a rate limited function
const limit = promiseMeLater(delay, 1, 2000);	// call at max once in 2 seconds

// also try this with fetch call, since it also returns a promise
const limitFetch = promiseMeLater(fetch, 2, 1000);
/* will only be called at max twice in 1 second
 * as soon as a promise is resloved, another will be picked
 * from the queue and invoked
 *  Now you can use `limitFetch` instead of `fetch`
 * and all your `fetch` calls will be rate limited */
```

### As a UMD


## Motivation

I was looking for a simple way to rate limit fetch calls, the caveat being that each call should happen (unlike throttling).

For best results, listen to [Promise by Slash :guitar: and Chris :heart:](https://www.youtube.com/watch?v=NPaAlAL8Z50)

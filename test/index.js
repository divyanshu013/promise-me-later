const altThrottle = require('../src/index');
let bm = 'yo';
const obj = {
  bm: 'hi',
  gg() {
    console.log('this')
  }
}

let inflight = 0;

setInterval(() => inflight = 0, 300)

const delay = () => {
	inflight++;
	console.log('inflight', inflight)
	return (
	  new Promise((resolve, reject) => {
	    setTimeout(resolve, Math.random() * 100)
	  })
	);
};

const saygg = altThrottle(delay, 2, 300);
// const saygg = obj.gg
for (var i = 0; i < 100; i++) {
	setTimeout(saygg, Math.random() * 200);
}

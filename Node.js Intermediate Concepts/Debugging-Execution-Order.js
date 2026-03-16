// Predict the output order of this program:
console.log("Start");
setTimeout(() => {
  console.log("Timeout");
}, 0);
Promise.resolve().then(() => {
  console.log("Promise");
});
console.log("End");

// a) What will be the exact output order?
// -> Start, End, Promise, Timeout

// b) Explain why this order occurs in Node.js.
// -> So in node.js or in JS executes synchronous code immediately. Then resolved promise goes to microtask queue and microtask queue runs immediately after the synchronous code finishes. And setTimout goes to macrotask queue and it does not run immediately it waits for event loop. Event loop first check all synchronou and microtasks executed then it will executes the macrotasks.

// c) Which mechanism executes first: microtasks or callbacks?
// -> Microtasks executed first.
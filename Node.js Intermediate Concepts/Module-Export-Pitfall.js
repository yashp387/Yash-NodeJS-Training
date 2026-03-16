// Analyze the module: 

// math.js 
exports.add = (a,b) => a + b; 
exports = (a,b) => a * b; 

// Another file: 
const math = require('./math'); 
console.log(math.add(2,3));

// a) What will be the output and why? 
//  -> output = 5; Because intially exports === module.exports and when you do exports.add you are adding a property to module.exports and then in next line you reassign the local variable exports not module.exports to that is why the output is 5

// b) Explain why assigning a value to exports is a problem. 
// Because exports is just and reference to module.exports, not the actual exported object. And node only exports module.exports not the reassigned exports so the multiplication function is not exported.

// c) Rewrite the module correctly so both add and multiply functions are exported.
exports.add = (a,b) => a + b; 
exports.multiply = (a,b) => a * b; 
// Consider the following code:
// async function getUser() {
//   try {
//     const user = database.findById(5);
//     return user.name;
//   } catch (err) {
//     console.error("Error occurred");
//   }
// }
// getUser();


// a) Why will the catch block NOT handle database errors in this code?
    // -> Because database.findById(5) is an asynchronous code and return a promise. Since there is no await, the try catch block only handles synchronous error so it does not handle errors that occurs inside the promise.so the promise rejects then error happens outside the try block and the catch will not run or handle the error.


// b) Rewrite the function so errors are handled correctly using async/await.
    async function getUser() {
      try {
        const user = await database.findById(5);
        return user.name;
      } catch (err) {
        console.error("Error occurred");
      }
    }
    getUser(); 


// c) What type of error is this: synchronous or asynchronous?
    // -> This is an asynchronous error because error happens inside a promise
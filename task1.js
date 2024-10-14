// Что вернет консоль в каждом случае

let a = null + undefined;
console.log(a); 

a = 12 + undefined;
console.log(a); 

a = 12 + null;
console.log(a); 

a = 100/0;
console.log(a); 

a = 100 * 'aaa';
console.log(a);

a = (1,5 - 1) * 2;
console.log(a); 
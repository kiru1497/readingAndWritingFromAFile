let arr = [1,2,3]; 
//store the arrays values inside a buffer 

let bufferValues = Buffer.from(arr); 
console.log(bufferValues); 
//output <Buffer 01 02 03> -> hexadecial values of 1,2,3 

let str = "ABC"; 
//store the strings values inside a buffer 

let bufferVal = Buffer.from(str); 
console.log(bufferVal);
//output - <Buffer 41 42 43> - hexadecimal values of ABC 

let str2 = " XYZ"; 

let bufferVal2 = Buffer.from(str2); 
console.log(bufferVal2); 
//output - <Buffer 20 58 59 5a> - hexadecial values of space XYZ 

//to combine str1 and str2, you can use concat function which is predefined for buffer to combine these values 

let combinedBuffer = Buffer.concat([bufferVal,bufferVal2]);
console.log(combinedBuffer); 
//output - <Buffer 41 42 43 20 58 59 5a>
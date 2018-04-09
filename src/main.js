import app from './app.js'; // 引入app.js
import './main.css';// 引入对应的css

let Arr = [1,2];
[Arr[0],Arr[1]] = [Arr[1],Arr[0]];
console.log(Arr)
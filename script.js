const canvas = document.getElementById("myCanvas")
const context  = canvas.getContext("2d")

const width = 1000;
const height = 200;
canvas.width = width
canvas.height= height

context.fillStyle = "lightPink"
let arr = Array.from({length: 1000}, () => Math.floor(Math.random() * 100));
for(let i=0;i<arr.length;i=i+9){
    arr[i] = -arr[i]
    i++
}
console.log(arr)
for(let i=0;i<arr.length;i++){
    context.fillRect(i,100,5,-arr[i])
    i = i+5
}
    // context.fillRect(100,10,10,100)
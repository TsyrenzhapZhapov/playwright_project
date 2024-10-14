// Сделайте функцию, которая заполнит массив случайными латинскими буквами

const arr = []

function randomLetter() {
    const letters = "abcdefghijklmnop"
    return letters[Math.floor(Math.random() * letters.length)]
}

for (let i = 1; i < Math.floor(Math.random() * 10); i++){
    arr.push(randomLetter())
}

console.log(arr)
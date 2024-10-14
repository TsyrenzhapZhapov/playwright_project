// Подсчитать сумму всех элементов в массиве - const array1 = [[1, 3], [2, 6], [8, 10], [15, 18, 36]]

const array1 = [[1, 3], [2, 6], [8, 10], [15, 18, 36]]

let arr2 = array1.reduce(arr)
function arr(a,b) {
    return a.concat(b)
}
let result = arr2.reduce(arrSum)
function arrSum(sum, num) {
    return sum + num
}
console.log(result)
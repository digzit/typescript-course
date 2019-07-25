function numberCruncher (numA, numB){
  return numA + numB;
}

var result = numberCruncher(5, 5);
console.log(result)

result = numberCruncher(5, true);
console.log(result)

result = numberCruncher(5, 'js4lyfe');
console.log(result)

result = numberCruncher(5, {param: true});
console.log(result)

/*
*Функция Check(str) 
*
*@param str строка с отношением
*
*Функция, получая строку str парсит её по знаку ";" . После проходя по каждому элементу массива pairs получившемуся после парсинга сравнивает его с регулярным выражением /([a-z],[a-z])/. 
*Если элемент массива pairs не соответствует выражению, фун-я возвращает false. 
*Иначе фун-я удаляет одинаковые элементы массива pairs.
*После фун-я создаёт двумерный массив matrx, распарсив массив pairs по ( , ).
*По завершению фун-я возвращает двумерный массив matrx.
*
*@return matrx - если валидация пройдена
*@return false - если валидация непройдена
*/
function check(str){
	var pairs = str.split(";");
	for(var i = 0; i < pairs.length; i++){
		if(pairs[i].length != 5){
			return false;
		} else if(!(pairs[i].match(/([a-z],[a-z])/))){ //
			return false;
		}
	}
	for(var i = pairs.length - 1; i >= 0; i--){
		for(var ii = i - 1; ii >= 0; ii--){
			if(pairs[i] == pairs[ii]){
				pairs.splice(i, 1);
				ii = -1;
			}
		}
	}
	var matrx = new Array();
	pairs.forEach(function(item, index) {
		item = item.replace("(", "");
		item = item.replace(")", "");
		matrx[index] = item.split(",");
	});
	return matrx;
}

/*
*function isFunc()
*
*@param matrix матрица с отношением
*
*объявляется две переменных которые будут определять функцию для соответствующего столбца
*Проходя весь массив для каждого элемента сравнивается с предыдущим, кроме проверенных, если в одном из индексов существуют повторяющиеся элементы соответствующей булевой переменной присваевается false
*
*@return true - если проверка пройдена
*@return false - если проверка не пройдена
*/

function isFunc(matrix) {
	var len = matrix.length;
	var first = true;
	for(var i = 0; i < len - 1; i++) {
		for(var ii = i + 1; ii < len; ii++) {
			if(matrix[i][0] == matrix[ii][0]) {
				first = false;
			}
		}
	}

	return first;
}



/*
*function inn()
*
*запускается по клику на кнопку
*проверяет входные данные 
*
*@return false - если входные данные признаны невалидными фун-ей check()
*/
function inn(){
	var out = document.getElementById("out");
	var targ = document.getElementById("mat1");
	var matrix = check(targ.value);
	if(check(targ.value) == false){
		out.innerHTML = "Неверный формат ввода";
		return false;
	}
	if(isFunc(matrix)){
		out.innerHTML = "Отношение является функцией";	
	} else {
		out.innerHTML = "Отношение НЕявляется функцией";
	}
}


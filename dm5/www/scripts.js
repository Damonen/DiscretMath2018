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
*@return matrx если валидация пройдена
*@return false если валидация непройдена
*/
function check(str)	{
	var pairs = str.split(";");
	for(var i = 0; i < pairs.length; i++)	{
		if(pairs[i].length != 5)	{
			return false;
		} else if(!(pairs[i].match(/([a-z],[a-z])/)))	{ //
			return false;
		}
	}
	for(var i = pairs.length - 1; i >= 0; i--)	{
		for(var ii = i - 1; ii >= 0; ii--)	{
			if(pairs[i] == pairs[ii])	{	
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
*function arrToStr(out)
*
*@param matrix - двумерный массив содержащий матрицу достижимости
*
*Создаёт строку с матрицей достижимости для вывода в html в виде таблицы
*
*@return outstr - строка c html таблицей
*/
function arrToStr(out) {
	var outStr = "<table><tr><td></td>",
	max = out.length;
	for(i = 0; i < max; i++) {
		outStr += "<td>" + String.fromCharCode(i + 97) + "</td>";
	}
	outStr += "</tr>";
	for(i = 0; i < max; i++) {
		outStr += "<tr><td>" + String.fromCharCode(i + 97) + "</td>";
		for(ii = 0; ii < max; ii++) {
			outStr += "<td>" + out[i][ii] + "</td>";
		}
		outStr += "</tr>";
	}
	outStr += "</table>";
	return outStr;
}


/*
*function matrReach(matrix)
*
*@param matrix - двумерный массив содержащий пары элементов
*
*Создаёт матрицу достижимости для графа
*
*@return String - строка c матрицей достижимости
*/
function matrReach(matrix) {
	var len = matrix.length,
		max = 0,
		isTransit,
		out = new Array();
	
	for(var i = 0; i < len; i++) {
		matrix[i][0] = matrix[i][0].charCodeAt(0) - 97;
		matrix[i][1] = matrix[i][1].charCodeAt(0) - 97;
		if(matrix[i][1] > max) {
			max = matrix[i][1];
		} else if(matrix[i][0] > max) {
			max = matrix[i][0];
		}
	}
	
	for(i = 0; i <= max; i++) {
		out[i] = new Array();
		for(ii = 0; ii <= max; ii++) {
			out[i][ii] = 0;
		}
	}
	
	for(var i = 0; i < len; i++) {
		out[matrix[i][0]][matrix[i][1]] = 1;
	}
	
	do {
		isTransit = false;
		for(var i = 0; i <= max; i++) {
			for(var ii = 0; ii <= max; ii++) {
				if(out[i][ii] == 1) {
					for(var iii = 0; iii <= max; iii++) {
						if(out[ii][iii] == 1) {
							if(out[i][iii] == 0) {
								out[i][iii] = 1;
								isTransit = true;
							}
						}
					}
				}
			}
		}
	} while (isTransit);
	
	return arrToStr(out);
}

/*
*function inn()
*
*запускается по клику на кнопку
*
*
*@return null
*/
function inn() {
	var out = document.getElementById("out");
	var targ = document.getElementById("mat1");
	var matrix = check(targ.value);
	if(check(targ.value) == false)	{
		out.innerHTML = "Неверный формат ввода";
		return false;
	}
	out.innerHTML = "Матрица достижимости:<br>";
	out.innerHTML = matrReach(matrix);
}
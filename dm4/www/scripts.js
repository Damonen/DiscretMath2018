/*
*Функция Check(str) 
*
*@param str строка с отношением
*
*Функция, получая строку str парсит её по знаку ";" . После проходя по каждому элементу массива pairs получившемуся после парсинга сравнивает его с регулярным выражением /([a-z],[a-z],[0-9]+)/. 
*Если элемент массива pairs не соответствует выражению, фун-я возвращает false. 
*Иначе фун-я удаляет одинаковые элементы массива pairs.
*После фун-я создаёт двумерный массив matrx, распарсив массив pairs по ( , , ).
*По завершению фун-я возвращает двумерный массив matrx.
*
*@return matrx если валидация пройдена
*@return false если валидация непройдена
*/
function check(str)	{
	var pairs = str.split(";"),
		matrx = new Array();
	for(var i = 0; i < pairs.length; i++)	{
		if(!(pairs[i].match(/([a-z],[a-z],[0-9]+)/)))	{ //
			return false;
		}
	}
	for(var i = pairs.length - 1; i >= 0; i--)	{
		for(var ii = i - 1; ii >= 0; ii--)	{
			if((pairs[i].charAt(1) == pairs[ii].charAt(1)) && (pairs[i].charAt(3) == pairs[ii].charAt(3)))	{	
				return false;
			}
		}
	}
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
*@param out - двумерный массив содержащий матрицу достижимости
*
*Создаёт строку с матрицей достижимости для вывода в html в виде таблицы
*
*@return outstr - строка c html таблицей
*/
function arrToStr(out) {
	var outStr = "<table><tr><td></td>",
	max = out.length;
	for(i = 0; i < max; i++) {
		outStr += "<td>" +String.fromCharCode(i + 97) + "</td>";
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
*arrToStr()
*
*@param matrix - двумерный массив содержащий пути
*
*Создаёт строку из массива кратчайших путей для вывода в html в виде таблицы
*
*@return outstr - строка c html таблицей
*/
function pathToStr(out) {
	var outStr = "<table>",
	max = out[0].length;
	
	for(var i = 0; i < out.length; i++) {
		if(i != 2) {
			outStr += "<tr>";
			for(var ii = 0; ii < out[i].length; ii++) {
				if(i == 3) {
					if(out[i][ii].length == 1) {
						outStr += "<td>-</td>";
					} else {
						outStr += "<td>" + out[i][ii] + "</td>";
					}
				} else {
					outStr += "<td>" + out[i][ii] + "</td>";
				}
			}
			outStr += "</tr>";
		}
	}
	
	return outStr;
}

/*
*function matrReach(matrix)
*
*@param matrix - двумерный массив содержащий пары элементов и веса
*
*Создаёт матрицу весов для графа
*
*@return String - строка c весовой матрицей
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
		out[matrix[i][0]][matrix[i][1]] = matrix[i][2] * 1;
	}
		
	return out;
}


/*
*isZero()
*
*@param arr - массив с числами
*
*Проверяет наличие ненулевых элементов
*
*
*@return true - если есть ненулевые элементы
*@return false - если нету ненулевых элементов
*/
function isZero(arr) {
	for(var i = 0; i < arr.length; i++) {
		if(arr[i] != 0) {
			return true;
		}
	}
	return false;
}


/*
*findMin()
*
*@param arr - массив с числами
*
*Находит индекс минимального элемента в массиве
*
*
*@return n - индекс минимального элемента
*/
function findMin(arr) {
	var min = 500,
		n = -1;
	for(var i = 0; i < arr.length; i++) {
		if((min > arr[i]) && (arr[i] != 0)) {
			min = arr[i];
			n = i;
		}
	}
	return n;
}


/*
*checkPoint()
*
*@param obj - объект содержащий в себе матрицу весов, массив с кратчайшим путем и вершину из которой нужно искать пути
*
*функция добавляет к пути, записанному в obj.unic, длину и траекторию из вершины obj.one во все доступные, если они меньше имеющихся и *вызывает для каждой доступной вершины checkPoint
*
*@return obj - объект содержащий в себе матрицу весов, массив с кратчайшим путем и вершину из которой нужно искать пути						
*/
function checkPoint(obj) {
	var currNode = obj.one;
	obj.unic[2][currNode] = true;
	while(isZero(obj.tWei[currNode])) {
		var minI = findMin(obj.tWei[currNode]);
		if(obj.unic[1][minI] != 0){
			if(obj.unic[1][minI] > obj.unic[1][currNode] + obj.tWei[currNode][minI]) {
				obj.unic[1][minI] = obj.unic[1][currNode] + obj.tWei[currNode][minI];
				obj.unic[3][minI] = obj.unic[3][currNode] + "<br>" + String.fromCharCode(minI + 97);
			}
		} else {
			obj.unic[1][minI] = obj.unic[1][currNode] + obj.tWei[currNode][minI];
			obj.unic[3][minI] = obj.unic[3][currNode] + "<br>" + String.fromCharCode(minI + 97);
		}
		obj.tWei[currNode][minI] = 0;
		if(obj.unic[2][minI] == false) {
			obj.one = minI;
			obj = checkPoint(obj);
		}
	}
	return obj;
}


/*
*shortestPath()
*
*@param matrix - массив уникальных элементов
*@param tableWeight - весовая матрица графа
*@param one - номер стартовой вершины
*
*Функция ищет кратчайший путь во все вершины из заданной вершины с помощью алгоритма дейкстры
*
*@return q - объект содержащий в себе матрицу весов, массив с кратчайшим путем и последний пройденый элемент
*/
function shortestPath(unic, tableWeight, one) {
	for(var i = 0; i < tableWeight.length; i++) {
		if(tableWeight[one][i] != 0) {
			unic[1][i] == tableWeight[one][i];
		}
	}
	for(var i = 0; i < unic[3].length; i++) {
		unic[3][i] = String.fromCharCode(one + 97);
	}
	var obj = {unic:unic, tWei:tableWeight, one:one};	
	var q = checkPoint(obj);
	return q;
}


/*
*function unic(matrix)
*
*@param matrix - двумерный массив пар элементов и весов
*
*Возвращает массив с уникальными элементами(вершинами)
*
*
*@return unical - массив уникальных элементов
*/
function unic(matrix) {
	var unical = new Array();
	for(var i = 0; i < 4; i++){
		unical[i] = new Array();
	}
	for(var i = 0; i < matrix.length; i++) {
		unical[0][i] = String.fromCharCode(i + 97);
	}
	for(var i = 0; i < unical[0].length; i++) {
		unical[2][i] = false;
		unical[1][i] = 0;
		unical[3][i] = "";
	}
	return unical;
}


/*
*function inn()
*
*
*запускается по клику на кнопку собирает из html необходимые данные и выводит результат
*
*
*@return null
*/
function inn() {
	var out = document.getElementById("out"),
		targ = document.getElementById("mat1"),
		strt = document.getElementById("strt").value.charCodeAt(0) - 97,
		matrix = check(targ.value);
		
	if(check(targ.value) == false)	{
		out.innerHTML = "Неверный формат ввода";
		return null;
	}
	
	var tableWeight = matrReach(matrix);
		
	out.innerHTML = "Матрица весов:<br>";
	out.innerHTML += arrToStr(tableWeight);
	
	var q = shortestPath(unic(tableWeight), tableWeight, strt);
	
	out.innerHTML += "<br>" + pathToStr(q.unic);
	
}

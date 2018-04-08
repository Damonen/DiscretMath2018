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
*Функция reflective(matr, uniq) 
*
*@param matr матрица с элементами отношения
*@param uniq массив с уникальными элементами отношения
*
*Фун-я проходит через двумерный массив matr, находя пару с одинаковыми элементами устанавливает условие антирефлекcивности, булеву переменную noPair, в значение false
*После для каждого элемента массива с уникальными буквами uniq, ф-я ищет в массиве matr пару состоящую из этого элемента 
*Если такая пара ненаходится, условие рефлекcивности переменная isPair принимает значение false
*После при верности условия антирефлекcивности ф-я возвращает текстовую строку с сообщением об этом
*Иначе при верности условия рефлекcивности ф-я возвращает текстовую строку с сообщением об этом
*Иначе ф-я возвращает текстовую строку с сообщением о неверности условий рефлекcивности и антирефлекcивности
*
*@return - строка с текстовым сообщением 
*/
function reflective(matr, uniq) {
	var noPair = true;		//условие антирефлекcивности
	var isPair = true;		//условие рефлекcивности
	for(var i = 0; i < matr.length; i++) {
		if(matr[i][0] == matr[i][1]) {
			noPair = false;
		}
	}
	for(var i = 0; i < uniq.length; i++) {
		var pair = false;
		for(var ii = 0; ii < matr.length; ii++) {
			if((matr[ii][0] == uniq[i])&&(matr[ii][0] == matr[ii][1])) {
				pair = true;
			}
		}
		if(!(pair)) {
			isPair = false;
			i = uniq.length +  1;
		}
	}	
	if(noPair) {
		return "Отношение антирефлекcивно"
	} else if(isPair) {
		return "Отношение рефлекcивно"
	} else {
		return "Отношение НЕрефлекcивно и НЕантирефлекcивно"
	}
	
}
/*
*Функция findUnique(matrix) 
*
*@param matrix - матрица с элементами отношения
*
*
*
*
*
*@return unical - массив с уникальными элементами
*/
function findUnique(matrix){
	var unical = new Array();
	for(var i = 0; i < matrix.length; i++){
		for(var ii = 0; ii < matrix[i].length; ii++){
			var iinn = true;
			for(var iii = 0; iii < unical.length; iii++){
				if(matrix[i][ii] == unical[iii]){
					iinn = false;
				}
			}
			if(iinn){
				unical.push(matrix[i][ii]);
			}
		}
	}
	return unical
}

/*
*Функция simmetry(matr) 
*
*@param matr - матрица с элементами отношения
*
*@return - строка с текстовым сообщением
*/
function simmetry(matr){
	var init = matr.length;
	var strin = "";
	
	var kos = false;
	for(var i = 0; i < init; i++) {
		for(var ii = 0; ii < init; ii++) {
			if((matr[i][0] == matr[ii][1]) && (matr[i][1] == matr[ii][0])) {
				if(matr[i][0] != matr[i][1]){
					kos = true;
				}
			}
		}
	}
	
	for(var i = init - 1; i >= 0; i--){
		var del = true;
		if(matr[i][0] == matr[i][1]){
			matr.splice(i, 1);
			del = false;
		}
		if((del) && (matr[i-1] != null)){
			for(var ii = i - 1; ii >= 0; ii--){
				if((matr[ii][0] == matr[i][1])&&(matr[ii][1] == matr[i][0])){
					matr.splice(i, 1);
					matr.splice(ii, 1);
					i--;
					ii = -1;
				}
			}
		}
	}
	
	if(matr.length == 0) {
		strin += "Отношение симметрично"
	} else if(init == matr.length) {
		strin += "Отношение антисимметрично"
	} else {
		strin += "Отношение НЕсимметрично и НЕантисимметрично"
	}
	
	if(kos) {
		strin += ", НЕкососимметрично";
	} else {
		strin += ", кососимметрично";
	}
	
	return strin
}

/*
*Функция transitivity(matr) 
*
*@param matr - матрица с элементами отношения
*
*@return - строка с текстовым сообщением
*/
function transitivity(matr) {
	var cond = true;
	for(var i = 0; i < matr.length; i++) {
		for(var ii = 0; ii < matr.length; ii++) {
			if(matr[i][1] == matr[ii][0]) {
				var bool = true;
				for(var iii = 0; iii < matr.length; iii++) {
					if((matr[i][0] == matr[iii][0])&&(matr[ii][1] == matr[iii][1])) {
						bool = false;
					}
				}
				if(bool) {
					cond = false;
				}
			}
		}
	}
	if(cond) {
		return "Отношение является транзитивным"
	} else {
		return "Отношение не является транзитивным"
	}
}
/*
*function inn()
*
*запускается по клику на кнопку
*/
function inn(){
	var out = document.getElementById("out");
	var targ = document.getElementById("mat1");
	var matrix = check(targ.value);
	if(check(targ.value) == false){
		out.innerHTML = "Неверный формат ввода";
		return false;
	}
	out.innerHTML = "";
	out.innerHTML += reflective(matrix, findUnique(matrix)) + "<br>";
	out.innerHTML += simmetry(matrix) + "<br>";
	out.innerHTML += transitivity(matrix) + "<br>";
}


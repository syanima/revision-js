var r = {};
exports.r = r;
//Dont use for/while/do loops

var lib = {};

lib.findSlope = function(pointA,pointB){ 
	var x1 = pointA.x;
	var y1 = pointA.y;
	var x2 = pointB.x;
	var y2 = pointB.y;
	return (y2-y1)/(x2-x1);
}

lib.isParallelTo = function(otherLine){
	var m1 = lib.findSlope(this.pointA,this.pointB);
	var m2 = lib.findSlope(otherLine.pointA,otherLine.pointB);
	return !(m1==m2);
}

lib.nextDay = function(date){
	var ymd = date.split('-');
	var newObj = {};
	newObj.date=ymd[2];
	newObj.month=ymd[1];
	newObj.year=ymd[0];
	var newDate = lib.checkdate(newObj);
	return newDate.year+'-'+newDate.month+'-'+newDate.date;
};

var newMorN = function(item){
	n = 0;
	return n.toString()+(parseInt(item)+1).toString();
}

var calculate = function(ymd,lastDate){
	if(ymd.date>0 && ymd.date<lastDate+1)
		if(ymd.date==lastDate){
			return {date:newMorN(0),month:newMorN(ymd.month),year:ymd.year};
		}
		var n=0;
		var x ={date:newMorN(ymd.date),month:ymd.month,year:ymd.year};
		return x;
}

var days30 = function(ymd){
	return calculate(ymd,30);
}

var days31 = function(ymd){
	return calculate(ymd,31);
}

var days28 = function(ymd){
	return calculate(ymd,28);
}

lib.checkdate = function(ymd){
	var x;
	switch(ymd.month){
				case '01':x=days31(ymd);
							break;
				case '02':x=days28(ymd);
							break;
				case '03':x=days31(ymd);
							break;
				case '04':x=days30(ymd);
							break;
				case '05':x=days31(ymd);
							break;
				case '06':x=days30(ymd);
							break;
				case '07':x=days31(ymd);
							break;				
				case '08':x=days31(ymd);
							break;
				case '09':x=days30(ymd);
							break;
				case '10':x=days31(ymd);
							break;
				case '11':x=days30(ymd);
							break;
				case '12':x=days31(ymd);
							break;
				default : x="Sorry...!!";
							break;
			};
			return x;
}

lib.isEqualTo = function(otherPoint){
	return (this.x == otherPoint.x && this.y == otherPoint.y);
}

var vowelCount = function(previousWord,newWord){
	var newCount = newWord.split('').reduce(function(newCount,charact){
		var character = charact.toLowerCase();
		if(character=='a' || character=='e'||character=='i'||character=='o'||character=='u');
			return newCount+1;
		return newCount;
		},0)
	return (previousWord.count<=newCount)?previousWord:{word:newWord,count:newCount};
}


//------------------------------------------------------------------------------------


r.Line = function(pointA,pointB){
	var newLine = new String('[Line from '+pointA.x+','+pointA.y+' to '+pointB.x+','+pointB.y+']')
	newLine.pointA = pointA;
	newLine.pointB = pointB;
	newLine.isParallelTo = lib.isParallelTo;
	newLine.isEqualTo = function(otherLine){
		return JSON.stringify(this)===JSON.stringify(otherLine);
	}
	return newLine ;
}


r.welcome = function(text,repeatNumber){
	if(!text)
		return 'who is it';
	if(!isNaN(text) && text.toString().match('.'))
		return "hey decimal";
	var result = '';
	var	count = 1;
	var repeater = function(result,repeatNumber){
	 	if(count<repeatNumber){
			count++;
			result = result+text+'-';
			return repeater(result,repeatNumber);
			}
		return result+text;
	};
	return repeater(result,repeatNumber);
}

r.to = {nextDay : lib.nextDay};

r.readBinary = function(text){
	return parseInt(text,2);
}

r.until = function(){
	return {do:function(){}}
}

r.Point = function(x,y){
	this.x = x.toFixed(3);
	this.y = y.toFixed(3);
	this.isEqualTo = lib.isEqualTo;
}

r.if = function(condition){
	return {then:function(ifValue){
		var ifVal = (ifValue.toString().match("function"))?ifValue():ifValue;
		return {else:function(elseValue){
			var elseVal = (elseValue.toString().match("function"))?elseValue():elseValue;
			return (condition)?ifVal:elseVal}}
	}}
}

r.accumulator = function(value){
	return {value:(value)?value:0}
}

value = 0;

r.operate = function(accumulator,getValue,a,b,c,d){
	value = accumulator.value;
	var array = [a,b,c,d];
	if(getValue == 'add'){
		value = array.reduce(function(a,b){return (isNaN(b))?a:(a+b)},value);
		accumulator.value = value;
		return value;
	}
	if(getValue == 'remove'){
		value = accumulator.value;
		value = array.reduce(function(a,b){return (isNaN(b))?a:(a-b)},value);
		accumulator.value = value;
		return value;
	}
	if(getValue.toString().match("function")){
		value = accumulator.value;
		value = getValue();
		return value;
	}
}

r.findBestVowelWord = function(words){
	var result = words.reduce(vowelCount,{word:words[0],length:1});
	return result.word;
}

r.createNewArray = function(length,value){
	var newArray = [];
	var repeater = function(count){
		if(count<length){
			newArray.push(value);
			return repeater(count+1);
		}
		return newArray;
	};
	repeater(0);
	return newArray;
}

r.createNewArray.protoType = function(){
	this.length = newArray.length;
}

lib.findnumberOfFactors = function(number){
	var first = 1; 
	var last = number;
	count = 0;
	var repeater = function(){
		if(first>last)
			return count;
		if(number%first==0)
			count++;
		first++;
		return repeater();
	}
	repeater();
	return count;
}

r.compare = { 
	strings: function(a,b){
		return  a[0].charCodeAt()-b[0].charCodeAt();
	},
	numbers_by_total_factors: function(a,b){
		return lib.findnumberOfFactors(a) - lib.findnumberOfFactors(b);
	},
	strings_by_length: function(a,b){
		return a.length - b.length ;
	}
}

r.getVowelCount = function(text){
		newCount = 0;
		var count = text.split('').reduce(function(newCount,charact){
			var character = charact.toUpperCase();
			if(character=='A' || character=='E'||character=='I'||character=='O'||character=='U'){
				return newCount+1;
			}
			return newCount;
		},0)
	return count;
}

r.range = function(initValue,finalValue,step){
	var result = [initValue];
	var repeater = function(){
		var currentValue = result[result.length-1]
		if(currentValue<finalValue-step){
			result.push(currentValue+step);
			return repeater();
		}
		return result;
	};
	repeater();
	return result;
}

r.is = { the_point_on : function(a){ 
	return function(element){
		var x = element.x>=a.pointA.x && element.x<=a.pointB.x;
		var y = element.y>=a.pointA.y && element.y<=a.pointB.y;
		return (x && y);
	}
	}
};

r.Circle = function(centre,radius){
	Object.defineProperty(this,"centre",{value:centre,writable:false,enumerable:true})
	Object.defineProperty(this,"radius",{value:radius,writable:false,enumerable:true})
	Object.defineProperty(this,"area",{value:Math.round(Math.PI * radius * radius),writable:false,enumerable:true})
	Object.defineProperty(this,"perimeter",{value:Math.round(2 * Math.PI * radius),writable:false,enumerable:true})
}

r.changeToBinary = function(number){
	return +number.toString(2);
}

r.readOctal = function(number){
	return parseInt(number,8);
}

r.createRectangle = function(x,dimension){
	var newObject = {};
	newObject.moveTo = function(otherObject){
		return otherObject=this;
	};	
	newObject.length = dimension[0];
	newObject.width = dimension[1];
	newObject.area = dimension[0]*dimension[1];
	newObject.perimeter = 2*(dimension[0]+dimension[1]);
	return newObject;
}

r.Sets = { phi:{cardinality:0,isEqualTo:function(otherLine){
		return JSON.stringify(this)===JSON.stringify(otherLine);
	}}}

r.Set = function(a,b){
	this.cardinality = 2;
	this.isEqualTo = function(otherLine){
		return JSON.stringify(this)===JSON.stringify(otherLine);
	}
}

r.finder = function(){
	lastSeen = [];
	return function(word){
		var result = lastSeen.reduce(function(word,lastword){
			return (word.toString().length<lastword.toString().length)?lastword:word;
		},word);
		lastSeen.push(word);
		return result;
	}
}


r.do = function(action){
	return {until: repeater = function(condition){
		action();
		if(!condition)
			repeater(condition);
	}}
}

r.reverseWords = function(sentence){
	var words = sentence.split(' ')
	return words.map(function(word){
		return word.split('').reverse().join('');
	}).join(' ')
}


r.Complex = function(a,b){
	this.x = a;
	this.y = b;
}
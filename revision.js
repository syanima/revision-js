var r = {};
exports.r = r;
//Dont use for/while/do loops

var convertObjectIntoArray = function(obj){
	return Object.keys(obj).map(function(key){
		return obj[key]
	})
};
r.Set = function(){
	this.defaultSet = convertObjectIntoArray(arguments);
};

var isEqualTo = function(set){
	console.log(this.unionSet,set.defaultSet)
	return this.unionSet === set.defaultSet
};

r.Set.prototype = {
	union : function(set){
		var firstSet = this.defaultSet
		var secondSet = set.defaultSet
		var unionSet = 
		secondSet.filter(function(eachElement){
			return firstSet.indexOf(eachElement)>-1;
			})
			return {unionSet:unionSet,isEqualTo:isEqualTo};
		},
};

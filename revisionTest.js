var r = require('./revision.js').r;
var assert = require('assert');
var test = {};
exports.test = test;

test.overlapping_lines_are_not_parallel = function (){
	var c = new r.Line({x:0,y:0},{x:4,y:4});
	var d = new r.Line({x:1,y:1},{x:3,y:3});
	assert.ok(false === d.isParallelTo(c));
	assert.ok(false === c.isParallelTo(d));
};
test.welcome_responds_with_multiple_texts_with_two_arguments = function (){
	assert.equal('goldy-goldy-goldy-goldy-goldy',r.welcome('goldy',5));
	assert.equal('a-a-a-a-a-a-a',r.welcome('a',7));
};
test.find_next_day = function (){
	assert.deepEqual(['2014-01-01','2014-03-01','2014-05-01','2014-09-02'].map(r.to.nextDay),["2014-01-02","2014-03-02","2014-05-02","2014-09-03"]);
	assert.deepEqual(['2012-01-31','2013-02-28','2009-05-01','2018-09-02'].map(r.to.nextDay),["2012-02-01","2013-03-01","2009-05-02","2018-09-03"]);
};
test.welcome_responds_with_hey_decimal_for_decimal_numbers = function (){
	assert.equal('hey decimal', r.welcome(2.1));
	assert.equal('hey decimal', r.welcome(420.45));
	assert.equal('hey decimal', r.welcome(0.1));
	assert.equal('hey decimal', r.welcome(-25.01));
};
test.readBinary_reads_text_as_binary = function (){
	assert.equal(0,r.readBinary('0'));
	assert.equal(1,r.readBinary('1'));
	assert.equal(2,r.readBinary('10'));
	assert.equal(9,r.readBinary('1001'));
	assert.equal(255,r.readBinary('11111111'));
};
test.until_does_not_perform_action_if_condition_is_set = function (){
	//Dont use any loops to implement this
	var count=10;
	var countIs10 = function(){return count==10;}
	var until_count_is_10 = r.until(countIs10);
	var incrementCount = function(){count++;}
	until_count_is_10.do(incrementCount);
	assert.equal(10,count);
};
test.two_points_can_be_equal_for_3_decimal_precision = function (){
	var a = new r.Point(1.333,4);	
	var b = new r.Point(4/3,4);
	var c = new r.Point(1.33,4);
	assert.ok(a.isEqualTo(b));
	assert.ok(b.isEqualTo(a));
	assert.ok(!b.isEqualTo(c));		
};
test.if_gives_respective_values = function (){
	assert.equal(5,r.if(true).then(5).else(6));
	assert.equal(6,r.if(false).then(5).else(6));
	assert.equal('hello',r.if(true).then('hello').else('who'));
	assert.equal('who',r.if(false).then('hello').else('who'));
};
test.accumulator_starts_with_0 = function (){
	var accumulator = new r.accumulator;
	var getValue = function(){return this.value;};
	assert.deepEqual(0,r.operate(accumulator,getValue));
};
test.empty_sets_have_cardinality_of_0 = function (){
	assert.deepEqual(r.Sets.phi.cardinality,0);
};
test.findBestVowelWord_finds_the_first_word_with_highest_number_of_vowels_ignoring_case = function (){
	var x = ['A','dry','sky','is','a','dry','sky'];
	var y = 'A';
	assert.equal(r.findBestVowelWord(x),y);
};
test.createNewArray_creates_an_array_of_given_size_with_given_value = function (){
	var a = r.createNewArray(2,25);
	assert.deepEqual(a.length,2);
	assert.equal(a[0],25);
	assert.equal(a[1],25);
};
test.sort_strings_in_alphabetical_order = function (){
	var a =['hello','how','are','you'];
	assert.deepEqual(a.sort(r.compare.strings),["are","hello","how","you"]);
	var b = ['good','mornings','are','good','or','not'];
	assert.deepEqual(b.sort(r.compare.strings),["are","good","good","mornings","not","or"]);	
};
test.getVowelCount_gets_the_count_of_vowels_with_capital_letters = function (){
	assert.equal(r.getVowelCount('Owl'),1);
	assert.equal(r.getVowelCount('cOOling'),3);
	assert.equal(r.getVowelCount('I am not'),3);
};
test.range_can_move_at_given_frequency = function (){	
	assert.deepEqual(r.range(1,3.1,0.5),[1,1.5,2,2.5,3]);
	assert.deepEqual(r.range(2.1,3.1,0.25),[2.1,2.35,2.6,2.85]);
};
test.the_points_are_on_line = function (){
	var point_is_on = r.is.the_point_on;
	var a = new r.Line({x:0,y:0},{x:3,y:4});
	var _0_0 = new r.Point(0,0);
	var _3_4 = new r.Point(3,4);
	var _3_5 = new r.Point(3,5);
	assert.ok([_0_0,_3_4].every(point_is_on(a)));
	assert.ok([_0_0,_3_4].some(point_is_on(a)));

	assert.ok(false === [_3_5,_3_4].every(point_is_on(a)));
	assert.ok([_3_5,_3_4].some(point_is_on(a)));	
};
test.line_is_represented_by_start_and_end = function (){
	var a = new r.Line({x:0,y:0},{x:3,y:4});
	assert.equal(a,'[Line from 0,0 to 3,4]');
};
test.sort_numbers_by_number_of_factors_they_have = function (){
	var a = [1,2,6,8,9,24,25,27,29,33,66,52,50,989];
	var b = [10,20,25,50,101];
	assert.deepEqual(a.sort(r.compare.numbers_by_total_factors),[1,2,29,9,25,33,6,8,989,27,52,50,24,66]);
	assert.deepEqual(b.sort(r.compare.numbers_by_total_factors),[101,25,10,20,50]);
};
test.the_circle_is_not_editable = function (){
	var a = new r.Circle({x:0,y:0},7);
	a.radius = 9;
	a.area = 8;
	a.perimeter = 1;
	a.centre = {x:1,y:1};
	assert.equal(7,a.radius);
	assert.equal(154,a.area);
	assert.equal(44,a.perimeter);
	assert.deepEqual({x:0,y:0},a.centre);
	delete a.radius;
	delete a.perimeter;
	delete a.centre;
	delete a.area;
};
test.sort_strings_by_length = function (){
	var a =['hello','how','are','you'];
	assert.deepEqual(a.sort(r.compare.strings_by_length),["how","are","you","hello"]);
	var b = ['good','mornings','are','good','or','not'];
	assert.deepEqual(b.sort(r.compare.strings_by_length),["or","are","not","good","good","mornings"]);	
};
test.if_evaluates_respective_values = function (){
	var good = function(){return 'good';};
	var bad = function(){return 'bad';};	
	assert.equal('good',r.if(true).then(good).else(bad));
	assert.equal('bad',r.if(false).then(good).else(bad));	
};
test.changeToBinary_converts_numbers_to_binary = function (){
	assert.equal(true,11 === r.changeToBinary(3));
	assert.equal(true, 11111111 === r.changeToBinary(255));	
};
test.readOctal_reads_numbers_as_octal = function (){
	assert.equal(0,r.readOctal(0));
	assert.equal(1,r.readOctal(1));
	assert.equal(8,r.readOctal(10));
	assert.equal(513,r.readOctal(1001));
	assert.equal(299593,r.readOctal(1111111));
};
test.moveTo_moves_the_Rectangle_to_the_new_place = function (){
	var a = r.createRectangle([0,0],[5,10]);
	var b = a.moveTo([-5,-5]);
	assert.equal(5,a.length);
	assert.equal(10,a.width);
	assert.equal(50,a.area);
	assert.equal(30,a.perimeter);
	assert.equal(5,b.length);
	assert.equal(10,b.width);
	assert.equal(50,b.area);
	assert.equal(30,b.perimeter);
};
test.lines_can_be_equal = function (){
	var a = new r.Line({x:0,y:0},{x:1.5,y:2});
	var b = new r.Line({x:0,y:0},{x:1.5,y:2});
	var c = new r.Line({x:1.5,y:2},{x:3,y:4});
	assert.ok(a.isEqualTo(b));
	assert.ok(b.isEqualTo(a));
	assert.ok(!a.isEqualTo(c));
	assert.ok(!c.isEqualTo(b));
};
test.finder_helps_finding_the_longest_word_seen_till_now = function (){
	var find = new r.finder();
	assert.equal('a',find('a'));
	assert.equal('ab',find('ab'));
	assert.equal('ab',find('c'));
	assert.equal('good',find('good'));
	assert.equal('good',find('bad'));
	assert.equal('good',find('is'));
	assert.equal(45.57,find(45.57));
	assert.equal(123456,find(123456));
	assert.equal(123456,find(12));
	assert.equal('hahahahaha',find('hahahahaha'));
};
test.do_performs_action_once_if_condition_is_set = function (){
	//Dont use any loops to implement this
	var count=10;
	var countIsGreaterThan9 = function(){return count>9;}
	var incrementCount = function(){count++;}
	r.do(incrementCount).until(countIsGreaterThan9);
	assert.equal(11,count);
};
test.reverseWords_reverses_words_in_sentance = function (){
	var x = 'The world is a very wide space. Or is it not?';
	var y = 'ehT dlrow si a yrev ediw .ecaps rO si ti ?ton';
	assert.deepEqual(r.reverseWords(x),y);
};
test.welcome_responds_with_who_is_it_for_undefined = function (){
	var x;
	assert.equal('who is it',r.welcome(x));
};
test.create_a_set_of_few_numbers = function (){
	var phi = r.Sets.phi;
	var x = new r.Set(1,2);
	var y = new r.Set(2,1);
	assert.equal(2,x.cardinality);
	assert.equal(2,y.cardinality);
	assert.ok(x.isEqualTo(y));
	assert.ok(y.isEqualTo(x));
	assert.deepEqual(false,phi.isEqualTo(x));
	assert.deepEqual(false,phi.isEqualTo(y));
};
test.operate_by_name_on_accumulator = function (){
	var a = new r.accumulator(27);
	r.operate(a,'remove',5,6,7,-8);	
	var getValue = function(){return this.value;}
	assert.deepEqual(17,r.operate(a,getValue));
	r.operate(a,'add',5,6,7,8);		
	assert.deepEqual(43,r.operate(a,getValue));
};
test.complex_numbers_have_only_two_fields = function (){
	var Complex = r.Complex;
	var a = new Complex(1,2);
	assert.deepEqual(Object.keys(a),['x','y']);
};
test.complex_matches_its_representation_for_negative_y = function (){
	var Complex = r.Complex;
	assert.equal(new Complex(1,-2),'1-2i');
};
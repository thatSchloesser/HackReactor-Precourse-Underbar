(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
  		return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    var spliceIndex = 0;
    if(n < array.length){
      spliceIndex = array.length-n
    }

  	return n === undefined ? array[array.length -1] : array.slice(spliceIndex, array.length);
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {

    // console.log("iterator: " + iterator.toString())
    // console.log("colletion: " + collection.toString())
    if(Array.isArray(collection)){
       for (var i=0; i < collection.length; i++){
        iterator(collection[i], i, collection)
      }
    } else {
      for (var key in collection){
        iterator(collection[key], key, collection)
      }
    }
    //I over-complicated this one, the directions are straightforward but: the iterator() signature confused me, not sure what the purpose of passing collection to it is...
      //I guess its a transform method?

  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) { //??
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    
    //console.log("test: " + test)
   
    var ans = []
    for (var i=0; i < collection.length; i++){
      if(test(collection[i])){
        ans.push(collection[i])
      }
    }
    return ans;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it

      //not sure how to do this tip in LESS lines of code
      //tried Array.filter() brielfy but not sure if that was a good idea.
      //came up with this, but am not a fan:

      var ans = []
      var inverse = _.filter(collection, test)
      for (var i=0; i < collection.length; i++){
        if(!inverse.includes(collection[i])){
          ans.push(collection[i])
        }
      }
      //... bc I'm pretty sure this is less efficient than just copying _filter and adding "!"...

    return ans
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array, isSorted, iterator) {
    //WHY do I need the last two paramters?
    	//=> look at https://underscorejs.org/

    // ... I'm still not sure how to use the iterator function

    var ans = []
    // if(isSorted){

    		//insert faster algorithm here without the !includes function call 

    		//push in first element

    		//loop through items

    		//just check previous item in array

    		//not implimenting rn because TECHNICALLY don't need to to get the correct answer... 
    // } 

    if(iterator !== undefined){
    	//store returned iterator values
    	var track = []

  		//call iterator function on each element and check uniqueness
    	for (var i=0; i<array.length; i++){

			var transform = iterator(array[i])		
			if (!track.includes(transform)){
			  track.push(transform)
			  //store the unique value of that array
			  ans.push(array[i])
			}
		}
    } else {
    	//literally just save the value if it doesn't alreay exist in the array
		for (var i=0; i<array.length; i++){
			if (!ans.includes(array[i])){
			  ans.push(array[i])
			}
		}
	}
	return ans; 
  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    var ans = []
    for (var i=0; i< collection.length; i++){
    	ans.push(iterator(collection[i]))
    }
    return ans
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns an array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //  
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //  
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //  
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = function(collection, iterator, accumulator) {

  		//NOTE: I'm assuming collection[0] is defined. Error not handled

  		if(accumulator === undefined){

        //initialize accumulator since it is undefined
  			accumulator = collection[0]
        //iterate & accumulate.
	  		for (var i =1; i< collection.length; i++){
  				accumulator = iterator(accumulator, collection[i])
  			}
  		} 
  		//accumultaor is defined, same as above without intializing
  		else {

	  		for (var i =0; i< collection.length; i++){
  				accumulator = iterator(accumulator, collection[i])
  			}
	  	}
	  	return accumulator
  };



//-----------------------
//PART 2: 
//-----------------------



  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };
  //my reduce has no erros, but this does, idk.

  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.
    

    for(let i=0; i< collection.length; i++){
      //check undefined
      if(iterator === undefined){
        if(!collection[i]){
          return false;
        }
      }
      //call iterator
      else {
        if(!iterator(collection[i])){
          return false
        }        
      }
    }

    //no false values
    return true
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
      //?

    for(let i=0; i< collection.length; i++){
      //check undefined
      if(iterator === undefined){
        if(collection[i]){
          return true;
        }
      }
      //call iterator
      else {
        if(iterator(collection[i])){
          return true
        }        
      }
    }

    //no false values
    return false
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    // console.log(arguments)

    //loop through passed in arguments (there could be many)
    for(let i =1; i<arguments.length; i++){
      //loop through keys and add them and their values to main object
      for(let key in arguments[i]){
        obj[key] = arguments[i][key]
      }
    }
    return obj
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    for(let i =1; i<arguments.length; i++){
      //loop through keys and add them and their values to main object
      for(let key in arguments[i]){
        if(obj[key]===undefined){
          obj[key] = arguments[i][key]
        }
      }
    }
    return obj
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);


        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  /*********************************
  *
  *  research closure scope
  *
  ******************************/

  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    //console.log(func)

    //1)check if func is already stored
    //2)store the func & func arguments if not
    //3) retrieve result if so
    //4) return result

      //data? 
      /*results {
        func: [{arguments:result},...]}
        //
      }*/
      //values: 
    var values = {};
    var result;

      return function() {
          
          //how i solved this
          //console.log(arguments)

          var args = JSON.stringify(arguments)

          //check if func is stored
          if(values[func] === undefined){

            result = func.apply(this, arguments);
            values[func] = {}   //create array before setting value
            values[func][args] = result   
          }
           else {
            //check if arguments are stored
            if(values[func][args] === undefined){
              result = func.apply(this, arguments);
              values[func][args]= result
            } 
            //return stored result
            else{
              result = values[func][args]
            }
          }
      
        // The new function always returns the originally computed result.
        return result;
      };

  };  //=> well this took awhile for no reason.

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {

    //no extra args
    if(arguments.length < 3){
          setTimeout(func, wait);
    }
    //extra args
    else{
      //build arguments object from extra args -> the tricky but still easy part
      var args = []
      for (let i=2; i<arguments.length;i++){
        args.push(arguments[i])
      }

      //SELF NOTE: you need .apply so you can pass the arguments instead of passing a single array
      setTimeout(func.apply(this,args), wait); 
    }

  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {

    let arr = array.slice(0)

    for (let i = arr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

//* end required here *


  /**
   * ADVANCED
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
  		//get passed in values
  		var args = arguments

  		//idk
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
  };
}());

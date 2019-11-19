/* globals window, _ */
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
    //방법1
    return n === undefined ? array[array.length - 1] : n ? array.slice(-n) : [];
    //방법2
    //return n === undefined ? array[ array.length-1] : array.slice(array.length-n<0?0:array.length-n);
  };

  // Call iterator(value, key, collection) for each element of collection
  // Accepts both arrays and objects.

  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    //   collection 이 array
    if (Array.isArray(collection)) {
      for (var n = 0; n < collection.length; n++) {
        iterator(collection[n], n, collection);
      }
    } else {
      var keys = Object.keys(collection);
      for (var n = 0; n < keys.length; n++) {
        iterator(collection[keys[n]], keys[n], collection);
      }
    }
  };
  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target) {
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  //방법 1:  reject 구현에 파라 미터 이용
  _.filter = function(collection, test, reject) {
    var result = [];
    var rejectResult = [];

    _.each(collection, function(item) {
      test(item) ? result.push(item) : rejectResult.push(item);
    });
    return reject ? rejectResult : result;
  };
  //〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓
  //방법2: reject 고려 않고 짠 filter 2
  //   _.filter = function(collection, test) {
  //     if(Array.isArray(collection)){
  //       var result=[];
  //     }else {
  //        result={};
  //     }
  //     var newIndex=0;
  //   _.each(collection, function(item, index, collection) {
  //       if(test(item)){if(Array.isArray(collection)){
  //           result[newIndex] = item ;
  //           newIndex++;
  //       }else{
  //           result[index]=item;
  //       }
  //   }});
  //   return result;
  // };

  // Return all elements of an array that don't pass a truth test.

  //방법1: filter 방법1( 파라미터 적용 )을 활용함
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    return _.filter(collection, test, true);
  };
  //〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓
  //방법2 : 파라미터 없이 구현하는 방법
  //   _.reject = function(collection, test) {
  //     // TIP: see if you can re-use _.filter() here, without simply
  //     // copying code in and modifying it
  //     var accepted=_.filter(collection,test);
  //     var result;
  //     result=  _.filter(collection,function(item){
  //                     if(accepted.includes(item)){
  //                         return false;
  //                     }else{
  //                         return true;
  //                     }
  //             });
  //      return result;
  //   };
  // 방법3
  // _.reject = function(collection, test) {
  //     // TIP: see if you can re-use _.filter() here, without simply
  //     // copying code in and modifying it
  //     var result;
  //     result = _.filter(collection, function(item) {
  //       if (test(item)) {
  //         return false;
  //       } else {
  //         return true;
  //       }
  //     });
  //     return result;
  //   };

  // Produce a duplicate-free version of the array.

  // 방법1
  _.uniq = function(array) {
    var uniqArr = [];
    for (var i = 0; i < array.length; i++) {
      if (!uniqArr.includes(array[i])) {
        uniqArr.push(array[i]);
      }
    }
    return uniqArr;
  };
  //〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓
  // 방법 2 : each 를 쓰면 아주 쉽네 ... 오 좋은것
  // _.uniq = function(array) {
  //     var uniq=[];
  //     _.each(array,function(item){
  //         if(!uniq.includes(item)){
  //           uniq.push(item);
  //         }
  //     });
  //     return uniq;
  // };

  // Return the results of applying an iterator to each element.
  //
  // 방법1:
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    var result;
    if (Array.isArray(collection)) {
      result = [];
      for (var n = 0; n < collection.length; n++) {
        result[n] = iterator(collection[n], n, collection);
      }
    } else {
      result = {};
      var keys = Object.keys(collection);
      for (var n = 0; n < keys.length; n++) {
        result[keys[n]] = iterator(collection[keys[n]], keys[n], collection);
      }
    }
    return result;
  };
  //〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓
  //방법2:
  //   _.map = function(collection, iterator) {
  //     // map() is a useful primitive iteration function that works a lot
  //     // like each(), but in addition to running the operation on all
  //     // the members, it also maintains an array of results.
  //     var result = newCollection(collection);
  //     _.each(collection, function(item, index) {
  //       result[index] = iterator(item);
  //     });
  //     return result;
  //   };
  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item) {
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

  // 방법 1 : for 문을 사용
  _.reduce = function(collection, iterator, accumulator) {
    var accumulator = accumulator;
    var n = 0;
    if (Array.isArray(collection)) {
      if (accumulator === undefined) {
        n = 1;
        accumulator = collection[0];
      }
      for (var i = n; i < collection.length; i++) {
        accumulator = iterator(accumulator, collection[i]);
      }
    } else {
      var keys = Object.keys(collection);
      if (accumulator === undefined) {
        n = 1;
        accumulator = collection[keys[0]];
      }
      for (var i = 0; i < keys.length; i++) {
        accumulator = iterator(accumulator, collection[keys[i]]);
      }
    }
    return accumulator;
  };
  //〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓
  // 방법 2 each를 사용하였다. 이제 each 쓰는게 좀 익숙해진듯하다.
  //   _.reduce = function(collection, iterator, accumulator) {
  //     if(accumulator!==undefined){
  //       var final=accumulator;
  //     }
  //   _.each(collection,function(item,index){
  //           if(accumulator!==undefined){
  //               final=iterator(final,item);
  //               }else{
  //                  if(!index){
  //                   final=item;
  //                  }else{
  //                   final=iterator(final,item);
  //                  }
  //               }
  //   });
  //   return final;
  // };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(
      collection,
      function(wasFound, item) {
        if (wasFound) {
          return true;
        }
        return item === target;
      },
      false
    );
  };

  // Determine whether all of the elements match a truth test.

  // 방법 1
  _.every = function(collection, iterator, checksome) {
    // TIP: Try re-using reduce() here.
    var acc = true;
    if (checksome) {
      acc = false;
    }
    return _.reduce(
      collection,
      function(isEvery, item) {
        if (checksome) {
          //통과된게 하나라도있으면
          if (isEvery) {
            return true;
          }
        } else {
          if (!isEvery) {
            return false;
          }
        }

        if (iterator) {
          // console.log('iterator:'+item+"//"+Boolean(iterator(item)));
          return Boolean(iterator(item));
        } else {
          // console.log('no iterator'+item+"//"+Boolean(iterator(item)));
          return Boolean(item);
        }
      },
      acc
    );
  };
  //〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓
  //방법2 :
  //   _.every = function(collection, iterator) {
  //     // TIP: Try re-using reduce() here.
  //     return _.reduce(collection,function(isEvery,item){
  //         if (!isEvery){
  //             return false;
  //         }
  //         if(!iterator){
  //             return item? true : false;
  //         }
  //         return iterator(item)? true: false;
  //     },true);
  //   };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  //방법 1
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    if (_.every(collection, iterator, true)) {
      return true;
    } else {
      return false;
    }
  };
  //〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓
  //방법2
  //   _.some = function(collection, iterator) {
  //     // TIP: There's a very clever way to re-use every() here.

  //     return _.every(collection,function(item){
  //     if(!iterator){
  //         return item? false : true ;
  //     }
  //     if(iterator(item)){  // 아이템이 하나라도 통과하면 false 로 돌리기
  //         return false ;
  //     }else{
  //         return true;
  //     }
  //     }) ? false   : true ;
  //   };

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

  // 방법1 :
  _.extend = function(obj) {
    var obj = obj;
    for (var i = 0; i < arguments.length; i++) {
      var keys = Object.keys(arguments[i]);
      for (var j = 0; j < keys.length; j++) {
        obj[keys[j]] = arguments[i][keys[j]];
      }
    }
    return obj;
  };
  //〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓
  // 방법2 :
  //   _.extend = function(obj) {
  //     for(var i=1;i<arguments.length ;i++){
  //       _.each(arguments[i],function(item,key){
  //           obj[key]=item;
  //       });
  //     }
  //     return obj;
  // };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj

  //방법1
  _.defaults = function(obj) {
    var obj = obj;
    for (var i = 0; i < arguments.length; i++) {
      var keys = Object.keys(arguments[i]);
      for (var j = 0; j < keys.length; j++) {
        if (!(keys[j] in obj)) {
          obj[keys[j]] = arguments[i][keys[j]];
        }
      }
    }
    return obj;
  };
  //〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓
  //방법2 : for 를 없애 보았습니다.
  //   _.defaults = function(obj) {
  //     for(var i=1;i<arguments.length ;i++){
  //         _.each(arguments[i],function(item,key){
  //             if(!(key in obj)){
  //             obj[key]=item;
  //             }
  //         });
  //       }
  //       return obj;
  //   };

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

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms

  //방법1
  _.delay = function(func, wait, ...arg) {
    // FIXME : 더 좋은 방법이 분명 있을것같은데
    setTimeout(function() {
      return func.apply(this, arg);
    }, wait);
  };
  //〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓
  //방법2
  //   _.delay = function(func, wait) {
  //     var arg=[...arguments].slice(2);
  //       setTimeout(function(){return func.apply(this,arg)},wait);
  // };

  /**
   * ADVANCED
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
    // console.log(collection);
    for (var repeat = collection.length; repeat > 1; repeat--) {
      for (var i = 0; i < repeat - 1; i++) {
        var currItem = collection[i];
        var nextItem = collection[i + 1];
        var curr;
        var next;
        if (typeof iterator === 'function') {
          curr = iterator(collection[i]);
          next = iterator(collection[i + 1]);
        } else {
          curr = currItem[iterator];
          next = nextItem[iterator];
          // console.log(curr,next)
        }

        if (curr > next || curr === undefined) {
          collection[i] = nextItem;
          collection[i + 1] = currItem;
        }
      }
    }
    return collection;
  };
  //〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓
  //   방법2
  //   _.sortBy = function(collection, iterator) {
  //     //   console.log(iterator);
  //       var undefinedArr=[];
  //       var sortArr=[];
  //       var pin =0;
  //       var swap;

  //         undefinedArr=_.filter(collection,function(item){
  //             if(typeof iterator ==='function'){
  //                 return iterator(item)===undefined? true : false;
  //             }else if(typeof iterator ==='string'){
  //                 return item[iterator]===undefined? true : false;
  //             }
  //           });
  //           sortArr=_.filter(collection,function(item){
  //             if(typeof iterator ==='function'){
  //                 return iterator(item)===undefined? false : true;
  //             }else if(typeof iterator ==='string'){
  //                 return item[iterator]===undefined? false : true;
  //             }  });

  //     // 가장 첫번쨰 아이템 부터 비교를 해서 자기보다 작으면 바꾸기 그리고는
  //     while(pin<sortArr.length-1){
  //         swap=false;
  //         _.each(sortArr,function(item,index){
  //             if(index > pin && !swap){
  //                 if(iterator===undefined){
  //                     if(sortArr[pin]>item){
  //                         var temp=sortArr[pin];
  //                          sortArr[pin]=item;
  //                          sortArr[index]=temp;
  //                          swap=true;
  //                      }
  //                 }else if(typeof iterator==='string'){
  //                     if(sortArr[pin][iterator]>item[iterator]){
  //                         var temp=sortArr[pin];
  //                          sortArr[pin]=item;
  //                          sortArr[index]=temp;
  //                          swap=true;
  //                      }
  //                 }else{
  //                     if(iterator(sortArr[pin])>iterator(item)){
  //                         var temp=sortArr[pin];
  //                          sortArr[pin]=item;
  //                          sortArr[index]=temp;
  //                          swap=true;
  //                      }
  //                 }
  //             }
  //         }
  //         );
  //         if(!swap){ //바꿀것이 없소 다음핀으로
  //             pin++;
  //         }
  //     }
  //     _.each(undefinedArr,function(item){
  //         sortArr.push(item);
  //     });
  //     return sortArr;
  // };
  //〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓〓
  //   방법3
  //   _.sortBy = function(collection, iterator) {
  //     console.log('정렬전:'+collection);
  //     if(typeof iterator==='function'){
  //     console.log('함수 iterator');
  //     collection.sort((a,b)=>(iterator(a)>iterator(b)? 1:iterator(a)===iterator(b)?0:-1));

  //     }else if(typeof iterator==='string'){
  //     console.log('string iterator')
  //     collection.sort((a,b)=>(a[iterator]>b[iterator]? 1:a[iterator]===b[iterator]?0:-1));
  //     }
  // console.log('정렬후:'+collection);
  // return collection;
  // };
  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
    var triggered = false;
    var result;
    return function() {
      if (!triggered) {
        // 트리거가 안되어있으면 실행
        result = func.apply(this, arguments);
        triggered = true; // 트리거가 되었다.
        setTimeout(triggerOff, wait);
        function triggerOff() {
          triggered = false;
        }
      }
      return result;
    };
  };
})();

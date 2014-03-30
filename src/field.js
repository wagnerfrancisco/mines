var mines = mines || {};

mines.field = function(specs) {
   var that = {},
       value = 0,
       isBomb = false,

       initialize = function() {
          if (!specs || !specs.fromString) {
             return;
          }

          if (specs.fromString === 'B') {
             that.makeMeBomb();
             return;
          }

          value = parseInt(specs.fromString, 10);
       };

   that.isIndicator = function() {
      return !isBomb;
   };

   that.isBomb = function() {
      return isBomb;
   };

   that.value = function() {
      return value;
   };

   that.makeMeBomb = function() {
      isBomb = true;
      value = undefined;
   };

   that.increaseValue = function() {
      value += 1;
   };

   that.toString = function() {
      return isBomb ? 'B' : value.toString();
   };

   initialize();

   return that;
};
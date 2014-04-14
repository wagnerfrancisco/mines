var mines = mines || {};

mines.field = function(specs) {
   var that = {},
       value = 0,
       turned = false,
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

   that.isTurned = function() {
      return turned;
   };

   that.isZeroIndicator = function() {
      return that.isIndicator() &&
             that.value() === 0;
   };

   that.turn = function() {
      turned = !turned;
      if (that.isBomb()) {
         throw 'BOMB_EXPLODED';
      }      
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
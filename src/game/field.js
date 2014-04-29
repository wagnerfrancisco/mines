var mines = mines || {};

mines.field = function(specs) {
   var that = {},
       value = 0,
       flagged = false,
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
      if (that.isFlagged()) {
         return;
      }

      turned = true;
      if (that.isBomb()) {
         throw 'BOMB_EXPLODED';
      }
   };

   that.flag = function() {
      if (that.isTurned()) {
         return;
      }
      
      flagged = !flagged;
   };

   that.isFlagged = function() {
      return flagged;
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
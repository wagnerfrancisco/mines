var mines = mines || {};

mines.game = function(randomNumbers) {

   var that = {},

       availableStatus = {
          playing: 'PLAYING',
          gameOver: 'GAME_OVER'
       },

       currentStatus,

       insertBombs = function(specs) {
          var numbers = randomNumbers.giveMe({
                quantity: specs.bombs,
                max: that.grid.fieldsNum()
              }),
              grid = that.grid;

          _.each(numbers, function(value) {
             var i = Math.floor(value / specs.columns),
                 j = value % specs.columns;

             grid[i][j].makeMeBomb();
          });          
       },

       calculateMinesIndicators = function() {
          var i, j, row,
              grid = that.grid;

          for (i = 0; i < grid.length; i++) {
             row = grid[i];

             for (j = 0; j < row.length; j++) {
                if (row[j].isBomb()) {
                    grid.increaseIndicatorsAround(i, j);
                }
             }
          }
       },

       restrictState = function(o, m, status) {
          var originalFn = o[m];

          o[m] = function() {
             if (currentStatus !== status) {
                throw 'NOT_ALLOWED';
             }

             return originalFn.apply(this, arguments);
          };
       },

       initialize = function() {
          restrictState(that, 'turnField', availableStatus.playing);
       };

   that.start = function(specs) {
      currentStatus = availableStatus.playing;
      that.grid = mines.grid(specs);

      insertBombs(specs);
      calculateMinesIndicators();
   };

   that.turnField = function(field) {
      try {
        that.grid.turnField(field);
      } catch(e) {
        if (e === 'BOMB_EXPLODED') {
           currentStatus = availableStatus.gameOver;
        }
      }
   };

   that.status = function() {
      return currentStatus;
   }; 

   initialize();

   return that;
};
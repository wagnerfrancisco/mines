var mines = mines || {};

mines.game = function(randomNumbers) {

   var that = {},

       specs,

       availableStatus = {
          playing: 'PLAYING',
          gameOver: 'GAME_OVER',
          victory: 'VICTORY'
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
          var grid = that.grid;

          _.each(grid, function(row, i) {
             _.each(row, function(column, j) {
               if (column.isBomb()) {
                  grid.increaseIndicatorsAround(i, j);
               }
             });
          });
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

       checkVictory = function() {
          var grid = that.grid,
              fields = _.flatten(grid),
              turnedFieldsNum = _.reduce(fields, function(memo, field) {
                 return memo + field.isTurned();
              }, 0),
              totalIndicators = specs.rows * specs.columns - specs.bombs;

          if (turnedFieldsNum === totalIndicators) {
             currentStatus = availableStatus.victory;
          }
       },

       initialize = function() {
          restrictState(that, 'turnField', availableStatus.playing);
       };

   that.start = function(_specs) {
      specs = _specs;
      currentStatus = availableStatus.playing;
      that.grid = mines.grid(_specs);

      insertBombs(_specs);
      calculateMinesIndicators();
   };

   that.turnField = function(field) {
      try {
        that.grid.turnField(field);
        checkVictory();
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
var mines = mines || {};

mines.game = function(randomNumbers) {

   var that = {},

       // buildGrid = function(specs) {
       //    var i, j,
       //        grid = [];

       //    grid = [];

       //    for (i = 0; i < specs.rows; i++) {
       //       grid[i] = [];  

       //       for (j = 0; j < specs.columns; j++) {
       //          grid[i][j] = 0;
       //       }
       //    }

       //    return grid;
       // },

       insertBombs = function(specs) {
          var numbers = randomNumbers.giveMe(specs.bombs),
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
       };

   that.start = function(specs) {
      that.grid = mines.grid(specs);
      insertBombs(specs);
      calculateMinesIndicators();
   };
   
   return that;
};
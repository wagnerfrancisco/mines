$(function() {
   var game,

       gameDiv,

       initialize = function() {
         gameDiv = $('#game');

         if (!gameDiv.length) {
            throw 'game div not found';
         }

         game = mines.game(mines.defaultRandomNumbers());

         game.start({
            rows: 20,
            columns: 20,
            bombs: 50
         });

         render();
       },

       fieldClickHandler = function(field) {
          return function(e) {
             game.turnField(field);
             reRender();
          };
       },

       render = function() {
          var grid = game.grid,
              table = $('<table>');

          _.each(grid, function(row) {
             var tr = $('<tr>');
             
             _.each(row, function(column) {
                var td = $('<td>').text(column);
                td.click(fieldClickHandler(column));
                tr.append(td);
             });

             table.append(tr);
          });

          gameDiv.append(table);
       },

       reRender = function() {
          var grid = game.grid,
              trs = $('tr', gameDiv);

          _.each(trs, function(tr, i) {
             var tds = $('td', tr);
             _.each(tds, function(td, j) {
                var field = grid[i][j];

                if (field.isTurned()) {
                   $(td).addClass('visible');
                }
             });
          });
       };

   initialize();
});
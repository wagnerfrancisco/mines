$(function() {
   var game,

       gameDiv,

       initialize = function() {
         gameDiv = $('#game');
         gameDiv.empty();

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
             updateSmiley();
          };
       },

       updateSmiley = function() {
          var smiley = $('.smiley', gameDiv),
              gameStatus = game.status();

          if (gameStatus === 'GAME_OVER') {
             smiley.addClass('gameover');
             return;
          }

          smiley.addClass('pressed');
          setTimeout(function() {
             smiley.removeClass('pressed');
          }, 200);
       },

       statusBar = function() {
          var statusBar = $('<div class="status"><div class="smiley"></div></div>');
          statusBar.find('.smiley').click(function() {
             initialize();
          });
          return statusBar;
       },

       render = function() {
          var grid = game.grid,
              table = $('<table>');

          _.each(grid, function(row) {
             var tr = $('<tr>');
             
             _.each(row, function(column) {
                var td = $('<td>').text(column == '0' ? ' ' : column);
                td.click(fieldClickHandler(column));
                tr.append(td);
             });

             table.append(tr);
          });

          gameDiv.append(statusBar());
          gameDiv.append(table);

          setTimeout(function() {
             gameDiv.width($('table', gameDiv).width());
          });
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
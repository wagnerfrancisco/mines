$(function() {
   var game,

       gameDiv,

       initialize = function() {
         gameDiv = $('#game');
         gameDiv.empty();

         disableContextMenu();

         if (!gameDiv.length) {
            throw 'game div not found';
         }

         game = mines.game(mines.defaultRandomNumbers());

         game.start({
            rows: 20,
            columns: 20,
            bombs: 100
         });

         render();
       },

       disableContextMenu = function() {
          document.oncontextmenu = function() {
             return false;
          };
       },

       fieldMouseDownHandler = function(field) {
          return function(e) {
             if (e.button === 2) {
                field.flag();
             } else {
                game.turnField(field);   
             }             
             reRender();
             updateSmiley();
          };
       },

       updateSmiley = function() {
          var gameStatus = game.status(),
              smiley = $('.smiley', gameDiv),
              statusToSmiley = {
                 GAME_OVER: 'gameover',
                 VICTORY: 'victory'
              };

          if (statusToSmiley.hasOwnProperty(gameStatus)) {
             smiley.addClass(statusToSmiley[gameStatus]);
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
                var td = $('<td>').attr('class', 'field_' + column);
                td.mousedown(fieldMouseDownHandler(column));
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

                if (field.isFlagged()) {
                   $(td).addClass('flagged');
                } else {
                   $(td).removeClass('flagged');
                }
                
                if (field.isTurned()) {
                   $(td).addClass('visible');
                }
             });
          });
       };

   initialize();
});
describe('game', function() {
   describe('game starting', function() {
      var g,

          fakeRandomNumbers = {
             giveMe: function(specs) {
                var quantity = specs.quantity,
                    max = specs.max;

                if (quantity === 2) {
                   return [1, 3];                  
                }                
             }
          };

      beforeEach(function() {
         g = mines.game(fakeRandomNumbers);
         g.start({
            rows: 2,
            columns: 3,
            bombs: 2
         });
      });

      it('should create a grid according to the specs', function() {
         expect(g.grid.length).toBe(2);
         expect(g.grid[0].length).toBe(3);
      });

      it('should populate the grid', function() {
         expect(g.grid.toString()).toBe('2 B 1\nB 2 1');
      });

      it('should set playing status', function() {
         expect(g.status()).toBe('PLAYING');
      });

      it('should initialize with all fields turned back', function() {
         expect(g.grid[0][0].isTurned()).toBe(false);
         expect(g.grid[0][1].isTurned()).toBe(false);
         expect(g.grid[0][2].isTurned()).toBe(false);
         expect(g.grid[1][0].isTurned()).toBe(false);
         expect(g.grid[1][0].isTurned()).toBe(false);
         expect(g.grid[1][0].isTurned()).toBe(false);
      });

      it('should keep playing status after turning indicator field', function() {
         var field = g.grid[0][0];
         
         g.turnField(field);
         expect(field.isTurned()).toBe(true);
         expect(g.status()).toBe('PLAYING');
      });

      it('should lose the game after turning a bomb field', function() {
         var field = g.grid[0][1];

         g.turnField(field);
         expect(field.isTurned()).toBe(true);
         expect(g.status()).toBe('GAME_OVER');
      });

      it('should not allow to turn field if the game is over', function() {
         var indicator = g.grid[0][0],
             bomb = g.grid[0][1];

         g.turnField(bomb);
         expect(function() {
            g.turnField(indicator);
         }).toThrow('NOT_ALLOWED');
      });

      it('should change status to victory if all the indicators were turned', function() {
         g.turnField(g.grid[0][0]);
         g.turnField(g.grid[0][2]);
         g.turnField(g.grid[1][1]);
         g.turnField(g.grid[1][2]);
         
         expect(g.status()).toBe('VICTORY');
      });
   });
});
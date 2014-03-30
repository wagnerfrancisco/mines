describe('game', function() {
   describe('game starting', function() {
      var g,

          fakeRandomNumbers = {
             giveMe: function(quantity) {
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
   });
});
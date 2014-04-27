describe('grid', function() {

   describe('grid creation', function() {
      it('should build grid according to the specs', function() {
         var g = mines.grid({
            rows: 2,
            columns: 3
         });

         expect(g.length).toBe(2);
         expect(g[0].length).toBe(3);
         expect(g.fieldsNum()).toBe(6);
      });

      it('should build grid according to the specs', function() {
         var g = mines.grid({
            rows: 2,
            columns: 3
         });

         expect(g.length).toBe(2);
         expect(g[0].length).toBe(3);
      });

      it('should build grid from the string repr', function() {
         var g = mines.grid({
            fromString: '1 B 1\n1 1 1'
         });

         expect(g.toString()).toBe('1 B 1\n1 1 1');
      });

      it('should convert grid to string', function() {
         var g = mines.grid({
            rows: 2,
            columns: 3
         });

         expect(g.toString()).toBe('0 0 0\n0 0 0');
         expect(g.fieldsNum()).toBe(6);
      });
   });

   describe('number of fields', function() {
      it('should return the number of fields - grid from string', function() {
         var g = mines.grid({
            fromString: '1 B 1\n1 1 1'
         });

         expect(g.fieldsNum()).toBe(6);
      });

      it('should return the number of fields - grid from specs', function() {
         var g = mines.grid({
            rows: 3,
            columns: 3
         });

         expect(g.fieldsNum()).toBe(9);
      });
   });

   describe('grid indicators', function() {
      var grid;

      beforeEach(function() {
         grid = mines.grid({
            fromString: 'B 0 B\n0 B 0\nB 0 B'
         });
      });

      it('should increase the indicators around a bomb', function() {
         var expected = 'B 1 B\n1 B 1\nB 1 B';
         grid.increaseIndicatorsAround(1, 1);
         expect(grid.toString()).toEqual(expected);
      });

      it('should handle left-superior corners', function() {
         var expected = 'B 1 B\n1 B 0\nB 0 B';
         grid.increaseIndicatorsAround(0, 0);
         expect(grid.toString()).toBe(expected);
      });

      it('should handle right-inferior corners', function() {
         var expected = 'B 0 B\n0 B 1\nB 1 B';
         grid.increaseIndicatorsAround(2, 2);
         expect(grid.toString()).toEqual(expected);
      });
   });

   describe('field turning', function() {
      var grid;

      beforeEach(function() {
         grid = mines.grid({
            fromString: 'B 2 0 0\n' +
                        'B 2 0 0\n' +
                        '1 1 0 0\n'
         });
      });

      it('should initialize all fields unturned', function() {
         _.each(grid, function(row) {
            _.each(row, function(field) {
               expect(field.isTurned()).toBe(false);
            });
         });
      });

      it('should turn field', function() {
         var field = grid[0][1];
         
         grid.turnField(field);
         expect(field.isTurned()).toBe(true);
      });

      it('should expand all fields around a zero indicator', function() {
         var field = grid[1][2];

         grid.turnField(field);
         expect(grid[0][1].isTurned()).toBe(true);
         expect(grid[0][2].isTurned()).toBe(true);
         expect(grid[0][3].isTurned()).toBe(true);
         expect(grid[1][1].isTurned()).toBe(true);
         expect(grid[1][2].isTurned()).toBe(true);
         expect(grid[1][3].isTurned()).toBe(true);
         expect(grid[2][1].isTurned()).toBe(true);
         expect(grid[2][2].isTurned()).toBe(true);
         expect(grid[2][3].isTurned()).toBe(true);
      });

      it('should expand all 0 indicators when clicking on a 0 indicator', function() {
         var field = grid[0][2];
         
         grid.turnField(field);
         expect(grid[0][2].isTurned()).toBe(true);
         expect(grid[0][3].isTurned()).toBe(true);
         expect(grid[1][2].isTurned()).toBe(true);
         expect(grid[1][3].isTurned()).toBe(true);
         expect(grid[2][2].isTurned()).toBe(true);
         expect(grid[2][3].isTurned()).toBe(true);
      });
   });
});
describe('grid', function() {

   describe('grid creation', function() {
      it('should build grid according to the specs', function() {
         var g = mines.grid({
            rows: 2,
            columns: 3
         });

         expect(g.length).toBe(2);
         expect(g[0].length).toBe(3);
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
});
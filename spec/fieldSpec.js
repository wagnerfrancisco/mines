describe('field', function() {
   it('should initialize a field as an indicator', function() {
      var f = mines.field();
      expect(f.isIndicator()).toBe(true);
      expect(f.value()).toBe(0);
      expect(f.isBomb()).toBe(false);
      expect(f.isTurned()).toBe(false);
      expect(f.toString()).toBe('0');
      expect(f.isFlagged()).toBe(false);
   });

   it('should transform a field into a bomb', function() {
      var f = mines.field();

      f.makeMeBomb();

      expect(f.isIndicator()).toBe(false);
      expect(f.value()).toBe(undefined);
      expect(f.isBomb()).toBe(true);
      expect(f.isTurned()).toBe(false);
      expect(f.toString()).toBe('B');
   });

   it('should create indicator field from string', function() {
      var f = mines.field({
         fromString: '1'
      });

      expect(f.isIndicator()).toBe(true);
      expect(f.value()).toBe(1);
   });

   it('should create bomb field from string', function() {
      var f = mines.field({
         fromString: 'B'
      });

      expect(f.isBomb()).toBe(true);
   });

   it('should flag and unflag field', function() {
      var f = mines.field({
         fromString: 'B'
      });

      f.flag();

      expect(f.isFlagged()).toBe(true);

      f.flag();

      expect(f.isFlagged()).toBe(false);
   });

   it('should increase indicator value', function() {
      var f = mines.field();
      expect(f.value()).toBe(0);

      f.increaseValue();
      expect(f.value()).toBe(1);

      f.increaseValue();
      expect(f.value()).toBe(2);
   });

   it('should turn the unturned card', function() {
      var f = mines.field();
      expect(f.isTurned()).toBe(false);

      f.turn();
      expect(f.isTurned()).toBe(true);

      f.turn();
      expect(f.isTurned()).toBe(true);
   });

   it('should not be possible to turn a flagged field', function() {
      var f = mines.field();
      expect(f.isTurned()).toBe(false);

      f.flag();
      f.turn();
      expect(f.isTurned()).toBe(false);
   });

   it('should not be possible to flag a turned field', function() {
      var f = mines.field();

      f.turn();
      expect(f.isTurned()).toBe(true);
      expect(f.isFlagged()).toBe(false);

      f.flag();

      expect(f.isFlagged()).toBe(false);
   });

   it('should throw gameOver when turning a bomb field', function() {
      var bomb = mines.field({
         fromString: 'B'
      });

      expect(function() {
         bomb.turn();
      }).toThrow('BOMB_EXPLODED');
   });

   describe('zero indicator', function() {
      it('should return true if field is zeroIndicator', function() {
         var f = mines.field({
            fromString: '0'
         });

         expect(f.isZeroIndicator()).toBe(true);
      });

      it('should return false if field an indicator != 0', function() {
         var f = mines.field({
            fromString: '1'
         });

         expect(f.isZeroIndicator()).toBe(false);
      });

      it('should return false if field is a bomb', function() {
         var f = mines.field({
            fromString: 'B'
         });

         expect(f.isZeroIndicator()).toBe(false);
      });
   });
});
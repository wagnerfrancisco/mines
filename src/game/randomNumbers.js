mines.defaultRandomNumbers = function() {
   var random = function(max) {
      return Math.floor(Math.random() * max);
   };

   return {
      giveMe: function(specs) {
         var max = specs.max,
             quantity = specs.quantity,
             numbers = [],
             current;

         console.log('quantity', quantity);

         while (numbers.length < quantity) {
            current = random(max);
            if (numbers.indexOf(current) === -1) {
               numbers.push(current);
            }
         }

         return numbers;
      }
   };
};
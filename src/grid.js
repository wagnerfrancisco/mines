var mines = mines || {};

mines.grid = function(specs) {   
   var that = [],

       buildFromSpecs = function() {
          var i, j;

          for (i = 0; i < specs.rows; i++) {
             that[i] = [];   

             for (j = 0; j < specs.columns; j++) {
                that[i][j] = mines.field();
             }
          }
       },

       buildFromString = function() {
          var str = specs.fromString,
              strRows = str.split('\n');

          _.each(strRows, function(value) {
             var row = [],
                 strColumns = value.split(' ');

             _.each(strColumns, function(value) {
                var field = mines.field({
                  fromString: value
                });
                row.push(field);
             });

             that.push(row);
          });
       },

       initialize = function() {
         if (specs.columns && specs.rows) {
            buildFromSpecs();
         } else if (specs.fromString) {
            buildFromString();
         }
       };

    that.increaseIndicatorsAround = function(i, j) {
      var p, q;

      for (p = (i-1); p <= i+1; p += 1) {
         if (p < 0 || p >= that.length) {
            continue;
         }

         for (q = (j-1); q <= (j+1); q += 1) {
            if (q < 0 || q >= that[p].length) {
               continue;
            }

            if (that[p][q].isIndicator()) {
               that[p][q].increaseValue();
            }
         }
      }
   };

   that.toString = function() {
      var i, j,
          result = '';

      for (i = 0; i < that.length; i++) {
         for (j = 0; j < that[i].length; j++) {
            result += that[i][j].toString();
            if (j !== that[i].length - 1) {
               result += ' ';
            }
         }
         if (i !== that.length - 1) {
            result += '\n';
         }
      }

      return result;
   };

   initialize();

   return that;
};
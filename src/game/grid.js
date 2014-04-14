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

       getFieldPosition = function(field) {
          var i, j;

          for (i = 0; i < that.length; i++) {
             for (j = 0; j < that[i].length; j++) {
                if (that[i][j] === field) {
                   return {
                      i: i,
                      j: j
                   };
                }
             }
          }
       },

       expandZeroIndicators = function(position) {
          var field = that[position.i] && that[position.i][position.j];

          if (!field ||
              !field.isZeroIndicator() ||
              field.isTurned()) {
             return;
          }

          field.turn();
          
          for (var i = position.i - 1; i <= position.i + 1; i++) {
             for (var j = position.j - 1; j <= position.j + 1; j++) {
                expandZeroIndicators({
                   i: i,
                   j: j
                });
             }
          }
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

   that.fieldsNum = function() {
      return that.length * that[0].length;
   };

   that.turnField = function(field) {
      var fieldPosition;

      if (field.isZeroIndicator()) {
         fieldPosition = getFieldPosition(field);
         expandZeroIndicators(fieldPosition);
      } else {
         field.turn();  
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
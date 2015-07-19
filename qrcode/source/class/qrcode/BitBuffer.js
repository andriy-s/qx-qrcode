qx.Class.define("qrcode.BitBuffer",
{
  extend : qx.core.Object,

  construct : function(len)
  {
    this.base(arguments);

    if(len) {
      len = Math.ceil(len / 8);
    }

    this.__data = new Array(/*len*/);
    this.__bitsLeft = 0;
  },

  statics :
  {
    __masks : [ 0x00, 0x01, 0x03, 0x07, 0x0f, 0x1f, 0x3f, 0x7f, 0xff ]
  },

  members :
  {
    __data : null,
    __bitsLeft : null,

    append : function(val, numBits, valLen) {
      var idx, n;

      if(valLen == undefined) {
        valLen = numBits;
      }

      idx = this.__data.length - 1;

      while(numBits > 0) {
        if(this.__bitsLeft == 0) {
          this.__data.push(0);
          this.__bitsLeft = 8;
          idx++;
        }

        n = Math.min(numBits, this.__bitsLeft);
        this.__data[idx] |= ((val >> (valLen - n)) & qrcode.BitBuffer.__masks[n]) << (this.__bitsLeft - n);
        this.__bitsLeft -= n;
        numBits -= n;
        valLen -= n;
      }
    },

    getLength : function() {
      return 8 * this.__data.length - this.__bitsLeft;
    },

    getDataArray : function() {
      return this.__data;
    }
  }
});

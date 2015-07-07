qx.Class.define("demo.Application",
{
  extend : qx.application.Standalone,

  members :
  {
    main : function()
    {
      this.base(arguments);

      if (qx.core.Environment.get("qx.debug"))
      {
        qx.log.appender.Native;
        qx.log.appender.Console;
      }

      var canvas = new qx.ui.embed.Canvas().set({
        width: 114,
        height: 114,
        syncDimension: true
      });

      var qr = new qrcode.QRCode(
        "otpauth://totp/example:Корп.%20Монстров?secret=GEZDGNBVGY3TQOJQMFRGGZDFMZTWQ2LK&issuer=Корп.%20Монстров");

      canvas.addListener("redraw", function(e) {
        qr.draw(e.getData().context);
      });

      var doc = this.getRoot();
      doc.add(canvas, {left: 400, top: 50});
    }
  }
});

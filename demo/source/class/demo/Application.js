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

      var text = new qx.ui.form.TextArea("Sample QR Symbol.").set({
        width: 300,
        height: 150
      });

      var label = new qx.ui.basic.Label("Error correction level: ");
      var ecLevel = new qx.ui.form.SelectBox().set({ width: 80 });
      label.setBuddy(ecLevel);
      ecLevel.add(new qx.ui.form.ListItem("L (7%)", null, "L"));
      ecLevel.add(new qx.ui.form.ListItem("M (15%)", null, "M"));
      ecLevel.add(new qx.ui.form.ListItem("Q (25%)", null, "Q"));
      ecLevel.add(new qx.ui.form.ListItem("H (30%)", null, "H"));
      ecLevel.setSelection([ ecLevel.getSelectables()[1] ]);

      var button = new qx.ui.form.Button("Update Symbol").set({ width: 100 });

      var canvas = new qx.ui.embed.Canvas().set({
        syncDimension: true
      });

      var qr = new qrcode.QRCode();

      var updateSymbol = function() {
        qr.clear();
        qr.addSegment(text.getValue());
        qr.setEcLevel(ecLevel.getSelection()[0].getModel());
        canvas.set({
          width: qr.getImageSize(),
          height: qr.getImageSize()
        });
        canvas.update();
      };

      canvas.addListener("redraw", function(e) {
        qr.draw(e.getData().context);
      });

      button.addListener("execute", updateSymbol);

      var doc = this.getRoot();
      doc.add(text, {left: 20, top: 20});
      doc.add(label, {left: 20, top: 180});
      doc.add(ecLevel, {left: 130, top: 175});
      doc.add(button, {left: 220, top: 175});
      doc.add(canvas, {left: 340, top: 20});

      updateSymbol();
    }
  }
});

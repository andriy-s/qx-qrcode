/* ************************************************************************

   QR Code Generator Library

   Copyright:
     2015 Andriy Syrovenko

   This project is dual-licensed under the terms of either:

     * GNU Lesser General Public License (LGPL) version 2.1

     * Eclipse Public License (EPL)

     See the license.txt file in the project's top-level directory for details.

   Authors:
     Andriy Syrovenko

************************************************************************ */

/**
 * This module makes {@link qrcode.QRCode} available for use in web pages and
 * applications that do not use qooxdoo SDK.
 */
qx.Bootstrap.define("qrcode.module.QRCode", {
  statics :
  {
    /**
     * Creates an instance of the {@link qrcode.QRCode}.
     * See {@link qrcode.QRCode#construct} for details.
     *
     * @param str {String?} Data to be encoded in the QR symbol.
     * @param ecLevel {String?"M"} Error correction level.
     * @return {qrcode.QRCode}
     */
    qrcode : function(str, ecLevel) {
      return new qrcode.QRCode(str, ecLevel);
    }
  },

  defer : function(statics) {
    qxWeb.$attachAll(this, "qrcode");
  }
});

/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Adblock Plus.
 *
 * The Initial Developer of the Original Code is
 * Wladimir Palant.
 * Portions created by the Initial Developer are Copyright (C) 2006-2009
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *
 *   Yifan Wu (patwonder@163.com)
 *
 * ***** END LICENSE BLOCK ***** */

Cu.import("resource://gre/modules/XPCOMUtils.jsm");

/**
 * Fake browser implementation to make findbar widget happy - searches in
 * the filter list.
 */
let fastFindBrowser =
{
  fastFind: {
    searchString: null,
    foundLink: null,
    foundEditable: null,
    caseSensitive: false,
    get currentWindow() { return fastFindBrowser.contentWindow; },

    find: function(searchString, linksOnly)
    {
      this.searchString = searchString;
      return treeView.find(this.searchString, 0, false, this.caseSensitive);
    },

    findAgain: function(findBackwards, linksOnly)
    {
      return treeView.find(this.searchString, findBackwards ? -1 : 1, false, this.caseSensitive);
    },

    // Irrelevant for us
    init: function() {},
    setDocShell: function() {},
    setSelectionModeAndRepaint: function() {},
    collapseSelection: function() {},
    // compatibility with Nightly 26+
    addResultListener: function() {},
    removeResultListener: function() {},
    highlight: function() {},
    focusContent: function () {},
    removeSelection: function () {},
    requestMatchesCount: function() {},
    enableSelection: function() {},
    // compatibility with Nightly 38+
    getInitialSelection: function() {},
  },
  currentURI: aup.makeURL("http://example.com/"),
  contentWindow: {
    focus: function()
    {
      E("list").focus();
    },
    scrollByLines: function(num)
    {
      E("list").boxObject.scrollByLines(num);
    },
    scrollByPages: function(num)
    {
      E("list").boxObject.scrollByPages(num);
    },
    QueryInterface: XPCOMUtils.generateQI([Ci.nsIInterfaceRequestor]),
    getInterface: function(aIID) {
      if (aIID.equals(Ci.nsIDOMWindowUtils))
        return this;
      throw Cr.NS_NOINTERFACE;
    },
    get screenPixelsPerCSSPixel() {
      return 1.0;
    }
  },

  addEventListener: function(type, handler, capture, wantsUntrusted)
  {
    E("list").addEventListener(type, handler, capture, wantsUntrusted);
  },
  removeEventListener: function(type, handler, capture)
  {
    E("list").removeEventListener(type, handler, capture);
  },
  dispatchEvent: function(event)
  {
    return E("list").dispatchEvent(event);
  },
  QueryInterface: XPCOMUtils.generateQI([Ci.nsIDOMEventTarget]),
};

// compatibility with Nightly 26+
fastFindBrowser.finder = fastFindBrowser.fastFind;
fastFindBrowser.finder.fastFind = fastFindBrowser.fastFind.find;


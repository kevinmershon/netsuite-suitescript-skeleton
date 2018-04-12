// ==UserScript==
// @name         NetSuite Browserlink
// @namespace    NetSuiteLink
// @include      *
// @description  Vim BrowserLink remote debugging of NetSuite
// @match        https://*.netsuite.com/app/common/scripting/scriptdebugger.nl*
// @author       Kevin Mershon
// ==/UserScript==

var socketSrc = document.createElement("script");
socketSrc.src = "http://127.0.0.1:9001/js/socket.js";
socketSrc.async = true;
document.head.appendChild(socketSrc);

var netSuiteSrc = document.createElement("script");
netSuiteSrc.src = "http://127.0.0.1:9001/js/netsuite.js";
netSuiteSrc.async = true;
document.head.appendChild(netSuiteSrc);

console.log('%c -> NetSuite Browserlink enabled', 'color: red; font-weight: bold');

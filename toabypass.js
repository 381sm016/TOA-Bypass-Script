// ==UserScript==
// @name         TOA Test - Disable Tab Detection
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Laat TOA denken dat hij altijd openstaat doormiddel van de webkitvisibilitychange en visibilitychange events te blokkeren
// @author       381sm016
// @match        https://toa.toets.nl/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';
    
    console.log('TOA Tab Detection Bypass: Active');
    
    // overrides API
    Object.defineProperty(document, 'hidden', {
        configurable: false,
        get: function() { return false; }
    });
    
    Object.defineProperty(document, 'visibilityState', {
        configurable: false,
        get: function() { return 'visible'; }
    });
    
    // block visibilitychange events
    document.addEventListener('visibilitychange', function(e) {
        console.log('Blocked visibilitychange event');
        e.stopImmediatePropagation();
    }, true);
    
    document.addEventListener('webkitvisibilitychange', function(e) {
        console.log('Blocked webkitvisibilitychange event');
        e.stopImmediatePropagation();
    }, true);
    
    // blurevent block
    window.addEventListener('blur', function(e) {
        console.log('Blocked blur event');
        e.stopImmediatePropagation();
    }, true);
    
    // Keep focus events working normally
    window.addEventListener('focus', function(e) {
        console.log('Focus event (normal)');
    }, true);
    
    console.log('TOA Tab Detection Bypass: Setup Complete');
})();
# jsreport-phantom-image
[![Build Status](https://travis-ci.org/jsreport/jsreport-phantom-image.png?branch=master)](https://travis-ci.org/jsreport/jsreport-phantom-image)

> jsreport recipe which is rendering images from html using phantomjs

##Installation

> npm install jsreport-phantom-image

##Configurations

- imageType:  png, gif or jpeg, default png
- quality - quality (1-100) of output image, default 100
-  printDelay - number of ms to wait before printing starts
- blockJavaScript - block running js on the page
- waitForJS - see [phantom-html-to-pdf](https://github.com/pofider/phantom-html-to-pdf)

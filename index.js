﻿var    Sandbox;// polyfill of the ECMAScript 5 Function bind() methodif (!Function.prototype.hasOwnProperty("bind")) {    Function.prototype.bind = function (context) {            "use strict";        var            argsAsArray,            slice,            functionToBind,            boundFunction;        function Nop() {}        if (typeof this !== "function") {            throw new TypeError("Bind must be called on a function");        }        functionToBind = this;        Nop.prototype = this.prototype;        slice = Array.prototype.slice;        argsAsArray = slice.call(arguments, 1);        boundFunction = function boundFunction() {            var                result;                        return functionToBind.apply(                this instanceof Nop && context ? this : context,                argsAsArray.concat(                    slice.call(arguments)                )            );        };        boundFunction.prototype = new Nop();        return boundFunction;    };}Sandbox = (function SandBoxScope() {    // create the Sandbox constructor in a specific scope not accessible by its run() method    // it prevents from closure scope pollution 	var	    ECMASCRIPT_PROPERTIES;	function accessRestricted() {	    return 'Access Restricted';	}	// a instance must be created to have "this" not bound to the global object	function Sandbox(globalObject, allowedProperties) {		"use strict";		var	        filteredProperties,	        sandbox;		function filterProperties(propName) {			var				property,				propertyDescriptor;			property = globalObject[propName];			propertyDescriptor = Object.getOwnPropertyDescriptor(globalObject, propName);			if (property === globalObject) {				// global object reccursive reference				sandbox[propName] = sandbox;			} else if (typeof property === 'function') {				// Handle methods				if (!allowedProperties.hasOwnProperty(propName) && !ECMASCRIPT_PROPERTIES.hasOwnProperty(propName)) {					// unallowed method replaced by an invokable function					filteredProperties[propName] = {						value: accessRestricted,						writable: false,						configurable: false,						enumerable: propertyDescriptor.enumerable					};				} else if (propName[0] !== propName[0].toUpperCase()) {					// if not itself a constructor, it might require the original application context					sandbox[propName] = property.bind(application);				} else {					Object.defineProperty(sandbox, propName, propertyDescriptor);				}			} else {				// Handle properties				if (!allowedProperties.hasOwnProperty(propName) && !ECMASCRIPT_PROPERTIES.hasOwnProperty(propName)) {					// unallowed properties replaced by one with getter and setter returning "access restricted"					filteredProperties[propName] = {						get: accessRestricted,						set: accessRestricted,						configurable: false,						enumerable: propertyDescriptor.enumerable					};				} else {					Object.defineProperty(sandbox, propName, propertyDescriptor);				}			}		}		// this object that will replace the orriginal global application object		sandbox = this;		if (typeof allowedProperties === "undefined") {			allowedProperties = {};		}		// set the property filter		filteredProperties = {};		Object.getOwnPropertyNames(globalObject)		      .forEach(filterProperties);		// apply the property filter to the global object mask		Object.defineProperties(			sandbox,			filteredProperties		);	}	// declare ECMAScript 5.1 accessible global properties	ECMASCRIPT_PROPERTIES = {		'Array': true,		'Boolean': true,		'Date': true,		'Error': true,		'EvalError': true,		'Function': true,		'Infinity': true,		'JSON': true,		'Math': true,		'NaN': true,		'Number': true,		'Object': true,		'RangeError': true,		'ReferenceError': true,		'RegExp': true,		'String': true,		'SyntaxError': true,		'TypeError': true,		'URIError': true,		'decodeURI': true,		'decodeURIComponent': true,		'encodeURI': true,		'encodeURIComponent': true,		'escape': true,		'eval': true,		'isFinite': true,		'isNaN': true,		'parseFloat': true,		'parseInt': true,		'undefined': true,		'unescape': true	};	return Sandbox;}());Object.defineProperty(	Sandbox.prototype,	"run",	{		value: function runSandboxed() {			// no variable used to prevent local scope pollution			// handle specific case when try executing an empty string			return (arguments.length === 0 || arguments[0] === '') ? undefined : eval('with (this) {\n' + arguments[0] + '\n}');		},		writable: false,		configurable: false,		enumerable: false	});//Object.freeze(Sandbox);Object.defineProperty(    exports,    'Sandbox',    {        value: Sandbox,	    writable: false,	    configurable: false,	    enumerable: true    });//Object.freeze(exports);
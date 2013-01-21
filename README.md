# jsSandbox CommonJS module #This module provides an ECMAScript execution sandbox.It creates a proxy over the global object allowing by default only access to the native ECMAScript API.It allows to open more the sandbox with whitelisted APIs.All unauthorized property/method return "access restricted".eval() is still usable but it can only access to the whitelisted APIs.## Getting Started #####1. Create a Sandbox instance
The module provides the `Sandbox` constructor which expects 2 parameters:
- `globalObject`: the global object to sandbox (window, application, ...)
- `allowedProperties`: the APIs you want to let accessible
Note that you can propose your own object references to replace the properties originaly accessible through the global scope.

###2. Call the `runOnServer()` method

It can receive 2 parameters:

- `jsCode` (string): the JavaScript code to execute - `timeout` (number): a timeout to prevent from evil usage with infinite loopsThe result of this method is the value of the last expression.
If the timeout expires, an exception is thrown```javascript    var        Sandbox,        sandbox,        timeout;    // on node.js and some compliant platforms, "/index" is not mandatory
    timeout = 4242;    Sandbox = require('jsSandbox/index').Sandbox;    sandbox = new Sandbox(        globalObject,        {            // some HTML5 properties            'Blob': true,            'XMLHttpRequest': true,            'sessionStorage': true,            // some specific API            'sensibleAPI': sandboxedAPI        }    );    result = sandbox.run(jsCode, timeout);    ```## License (MIT License) ##Copyright (c) 2012 Alexandre MorgautPermission is hereby granted, free of charge, to any person obtaining a copyof this software and associated documentation files (the "Software"), to dealin the Software without restriction, including without limitation the rightsto use, copy, modify, merge, publish, distribute, sublicense, and/or sellcopies of the Software, and to permit persons to whom the Software isfurnished to do so, subject to the following conditions:The above copyright notice and this permission notice shall be included inall copies or substantial portions of the Software.THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS ORIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THEAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHERLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS INTHE SOFTWARE.
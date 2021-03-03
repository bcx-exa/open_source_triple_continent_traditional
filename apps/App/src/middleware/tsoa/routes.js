"use strict";
exports.__esModule = true;
exports.RegisterRoutes = void 0;
/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
var runtime_1 = require("@tsoa/runtime");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
var patient_1 = require("./../../controllers/patient");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
var models = {
    "PatientCheckup": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "string", "required": true },
            "type": { "dataType": "string", "required": true },
            "bloodPressure": { "dataType": "string", "required": true },
            "cholestrol": { "dataType": "string", "required": true },
            "glucose": { "dataType": "string", "required": true },
            "height": { "dataType": "double", "required": true },
            "weight": { "dataType": "double", "required": true },
            "doctor": { "dataType": "double", "required": true }
        },
        "additionalProperties": false
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PatientBase": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "string", "required": true },
            "type": { "dataType": "string", "required": true }
        },
        "additionalProperties": false
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PatientInfo": {
        "dataType": "refObject",
        "properties": {
            "id": { "dataType": "string", "required": true },
            "type": { "dataType": "string", "required": true },
            "firstName": { "dataType": "string", "required": true },
            "lastName": { "dataType": "string", "required": true },
            "bloodType": { "dataType": "string", "required": true },
            "gender": { "dataType": "string", "required": true },
            "age": { "dataType": "double", "required": true },
            "race": { "dataType": "string", "required": true }
        },
        "additionalProperties": false
    }
};
var validationService = new runtime_1.ValidationService(models);
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
function RegisterRoutes(app) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
    app.post('/patient/initialize', function (request, response, next) {
        var args = {};
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        var validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
        }
        catch (err) {
            return next(err);
        }
        var controller = new patient_1.PatientController();
        var promise = controller.Initialize.apply(controller, validatedArgs);
        promiseHandler(controller, promise, response, undefined, next);
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.get('/patient', function (request, response, next) {
        var args = {
            id: { "in": "query", "name": "id", "required": true, "dataType": "string" },
            type: { "in": "query", "name": "type", "required": true, "dataType": "string" }
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        var validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
        }
        catch (err) {
            return next(err);
        }
        var controller = new patient_1.PatientController();
        var promise = controller.Get.apply(controller, validatedArgs);
        promiseHandler(controller, promise, response, undefined, next);
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    app.post('/patient', function (request, response, next) {
        var args = {
            body: { "in": "body", "name": "body", "required": true, "dataType": "union", "subSchemas": [{ "ref": "PatientCheckup" }, { "ref": "PatientBase" }, { "ref": "PatientInfo" }] }
        };
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        var validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
        }
        catch (err) {
            return next(err);
        }
        var controller = new patient_1.PatientController();
        var promise = controller.Post.apply(controller, validatedArgs);
        promiseHandler(controller, promise, response, undefined, next);
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    function isController(object) {
        return 'getHeaders' in object && 'getStatus' in object && 'setStatus' in object;
    }
    function promiseHandler(controllerObj, promise, response, successStatus, next) {
        return Promise.resolve(promise)
            .then(function (data) {
            var statusCode = successStatus;
            var headers;
            if (isController(controllerObj)) {
                headers = controllerObj.getHeaders();
                statusCode = controllerObj.getStatus();
            }
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            returnHandler(response, statusCode, data, headers);
        })["catch"](function (error) { return next(error); });
    }
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    function returnHandler(response, statusCode, data, headers) {
        if (headers === void 0) { headers = {}; }
        Object.keys(headers).forEach(function (name) {
            response.set(name, headers[name]);
        });
        if (data && typeof data.pipe === 'function' && data.readable && typeof data._read === 'function') {
            data.pipe(response);
        }
        else if (data !== null && data !== undefined) {
            response.status(statusCode || 200).json(data);
        }
        else {
            response.status(statusCode || 204).end();
        }
    }
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    function responder(response) {
        return function (status, data, headers) {
            returnHandler(response, status, data, headers);
        };
    }
    ;
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    function getValidatedArgs(args, request, response) {
        var fieldErrors = {};
        var values = Object.keys(args).map(function (key) {
            var name = args[key].name;
            switch (args[key]["in"]) {
                case 'request':
                    return request;
                case 'query':
                    return validationService.ValidateParam(args[key], request.query[name], name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "throw-on-extras" });
                case 'path':
                    return validationService.ValidateParam(args[key], request.params[name], name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "throw-on-extras" });
                case 'header':
                    return validationService.ValidateParam(args[key], request.header(name), name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "throw-on-extras" });
                case 'body':
                    return validationService.ValidateParam(args[key], request.body, name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "throw-on-extras" });
                case 'body-prop':
                    return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, 'body.', { "noImplicitAdditionalProperties": "throw-on-extras" });
                case 'res':
                    return responder(response);
            }
        });
        if (Object.keys(fieldErrors).length > 0) {
            throw new runtime_1.ValidateError(fieldErrors, '');
        }
        return values;
    }
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}
exports.RegisterRoutes = RegisterRoutes;
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

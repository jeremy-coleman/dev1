module.exports = { contents: "\"use strict\";\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst tslib_1 = require(\"tslib\");\r\nvar _a;\r\nconst _ = require(\"lodash\");\r\nvar AJV = require('ajv');\r\nconst ajv_1 = require(\"ajv\");\r\nconst mobx_1 = require(\"mobx\");\r\nclass CoreStore {\r\n    constructor() {\r\n        this.ajv = new AJV({ allErrors: true, jsonPointers: true, errorDataPath: 'property' });\r\n        this.errorAt = (instancePath) => {\r\n            return _.filter(this.errors, (error) => error.dataPath === instancePath);\r\n        };\r\n        this.subErrorsAt = (instancePath) => {\r\n            const path = `${instancePath}.`;\r\n            return _.filter(this.errors, (error) => error.dataPath.startsWith(path));\r\n        };\r\n        this.setData = (data) => {\r\n            this.data = data;\r\n        };\r\n        this.initialize = (data, schema, uischema) => {\r\n            debugger;\r\n            this.data = data;\r\n            this.schema = schema;\r\n            this.uischema = uischema;\r\n            this.validator = this.ajv.compile(schema);\r\n            this.errors = this.sanitizeErrors(this.validator, data);\r\n        };\r\n        this.updateData = (path, updater) => {\r\n            debugger;\r\n            if (path === undefined || path === null) {\r\n            }\r\n            else if (path === '') {\r\n                const result = updater(this.data);\r\n                if (result === undefined || result === null) {\r\n                }\r\n                const sanitizedErrors = this.sanitizeErrors(this.validator, result);\r\n                this.data = result;\r\n                this.errors = sanitizedErrors;\r\n            }\r\n            else {\r\n                const oldData = _.get(this.data, path);\r\n                const newData = updater(oldData);\r\n                const newState = _.set(_.cloneDeep(this.data), path, newData);\r\n                const sanitizedErrors = this.sanitizeErrors(this.validator, newState);\r\n                this.data = newState;\r\n                this.errors = sanitizedErrors;\r\n            }\r\n        };\r\n        this.data = {};\r\n        this.schema = {};\r\n        this.uischema = {};\r\n        this.errors = [];\r\n        this.validator = () => true;\r\n        this.init();\r\n    }\r\n    init() {\r\n        this.ajv.addFormat('time', '^([0-1][0-9]|2[0-3]):[0-5][0-9]$');\r\n    }\r\n    validate(validator, data) {\r\n        const valid = validator(data);\r\n        if (valid) {\r\n            return [];\r\n        }\r\n        return validator.errors;\r\n    }\r\n    ;\r\n    sanitizeErrors(validator, data) {\r\n        let sanitizedErrors = [];\r\n        sanitizedErrors = this.validate(validator, data).map(error => {\r\n            error.dataPath = error.dataPath.replace(/\\//g, '.').substr(1);\r\n            return error;\r\n        });\r\n        return sanitizedErrors;\r\n    }\r\n    get extractData() {\r\n        return this.data;\r\n    }\r\n    get extractSchema() {\r\n        return this.schema;\r\n    }\r\n    get extractUiSchema() {\r\n        return this.uischema;\r\n    }\r\n}\r\ntslib_1.__decorate([\r\n    mobx_1.observable,\r\n    tslib_1.__metadata(\"design:type\", Object)\r\n], CoreStore.prototype, \"data\", void 0);\r\ntslib_1.__decorate([\r\n    mobx_1.observable,\r\n    tslib_1.__metadata(\"design:type\", Object)\r\n], CoreStore.prototype, \"schema\", void 0);\r\ntslib_1.__decorate([\r\n    mobx_1.observable,\r\n    tslib_1.__metadata(\"design:type\", Object)\r\n], CoreStore.prototype, \"uischema\", void 0);\r\ntslib_1.__decorate([\r\n    mobx_1.observable,\r\n    tslib_1.__metadata(\"design:type\", Array)\r\n], CoreStore.prototype, \"errors\", void 0);\r\ntslib_1.__decorate([\r\n    mobx_1.observable,\r\n    tslib_1.__metadata(\"design:type\", typeof (_a = typeof ajv_1.ValidateFunction !== \"undefined\" && ajv_1.ValidateFunction) === \"function\" ? _a : Object)\r\n], CoreStore.prototype, \"validator\", void 0);\r\ntslib_1.__decorate([\r\n    mobx_1.computed,\r\n    tslib_1.__metadata(\"design:type\", Object),\r\n    tslib_1.__metadata(\"design:paramtypes\", [])\r\n], CoreStore.prototype, \"extractData\", null);\r\ntslib_1.__decorate([\r\n    mobx_1.computed,\r\n    tslib_1.__metadata(\"design:type\", Object),\r\n    tslib_1.__metadata(\"design:paramtypes\", [])\r\n], CoreStore.prototype, \"extractSchema\", null);\r\ntslib_1.__decorate([\r\n    mobx_1.computed,\r\n    tslib_1.__metadata(\"design:type\", Object),\r\n    tslib_1.__metadata(\"design:paramtypes\", [])\r\n], CoreStore.prototype, \"extractUiSchema\", null);\r\ntslib_1.__decorate([\r\n    mobx_1.action,\r\n    tslib_1.__metadata(\"design:type\", Object)\r\n], CoreStore.prototype, \"setData\", void 0);\r\ntslib_1.__decorate([\r\n    mobx_1.action,\r\n    tslib_1.__metadata(\"design:type\", Object)\r\n], CoreStore.prototype, \"initialize\", void 0);\r\ntslib_1.__decorate([\r\n    mobx_1.action,\r\n    tslib_1.__metadata(\"design:type\", Object)\r\n], CoreStore.prototype, \"updateData\", void 0);\r\nexports.CoreStore = CoreStore;\r\n",
dependencies: ["tslib","lodash","ajv","ajv","mobx"],
sourceMap: {},
headerContent: undefined,
mtime: 1535400689382,
devLibsRequired : undefined,
ac : undefined,
_ : {}
}

module.exports = { contents: "\"use strict\";\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst tslib_1 = require(\"tslib\");\r\nconst core_1 = require(\"@material-ui/core\");\r\nconst mobx_react_1 = require(\"mobx-react\");\r\nconst React = require(\"react\");\r\nconst core_2 = require(\"../../core\");\r\nconst react_1 = require(\"../../react\");\r\nconst MaterialNumberFormatField = (props) => {\r\n    const { className, id, enabled, uischema, isValid, path, handleChange, scopedSchema } = props;\r\n    const maxLength = scopedSchema.maxLength;\r\n    let config;\r\n    if (uischema.options && uischema.options.restrict) {\r\n        config = { 'maxLength': maxLength };\r\n    }\r\n    else {\r\n        config = {};\r\n    }\r\n    const trim = uischema.options && uischema.options.trim;\r\n    const formattedNumber = props.toFormatted(props.data);\r\n    const onChange = ev => {\r\n        const validStringNumber = props.fromFormatted(ev.currentTarget.value);\r\n        handleChange(path, validStringNumber);\r\n    };\r\n    return (React.createElement(core_1.Input, { type: 'text', value: formattedNumber, onChange: onChange, className: className, id: id, disabled: !enabled, autoFocus: uischema.options && uischema.options.focus, multiline: uischema.options && uischema.options.multi, fullWidth: !trim || maxLength === undefined, inputProps: config, error: !isValid }));\r\n};\r\nexports.materialNumberFormatFieldTester = core_2.rankWith(4, core_2.isNumberFormatControl);\r\nlet MaterializedNumberFormatField = class MaterializedNumberFormatField extends React.Component {\r\n    render() {\r\n        const effectiveProps = react_1.createPropsForItem(this.props, core_2.mapStoreValuesToFieldProps, core_2.mapUpdateActionToFieldProps);\r\n        return (React.createElement(MaterialNumberFormatField, Object.assign({}, effectiveProps)));\r\n    }\r\n};\r\nMaterializedNumberFormatField = tslib_1.__decorate([\r\n    mobx_react_1.inject(\"jsonFormsStore\"),\r\n    mobx_react_1.observer\r\n], MaterializedNumberFormatField);\r\nexports.default = MaterializedNumberFormatField;\r\n",
dependencies: ["tslib","@material-ui/core","mobx-react","react","../../core","../../react"],
sourceMap: {},
headerContent: undefined,
mtime: 1535400689602,
devLibsRequired : undefined,
ac : undefined,
_ : {}
}

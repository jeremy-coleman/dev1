module.exports = { contents: "\"use strict\";\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst tslib_1 = require(\"tslib\");\r\nvar _a;\r\nconst React = require(\"react\");\r\nconst mobx_1 = require(\"mobx\");\r\nconst mobx_react_1 = require(\"mobx-react\");\r\nlet injectSheet = require('react-jss').default;\r\nconst step_type_select_1 = require(\"../step-type-select\");\r\nconst simple_step_editor_1 = require(\"./simple-step-editor\");\r\nconst centered_content_1 = require(\"../../util/centered-content\");\r\nconst react_1 = require(\"react\");\r\nconst validating_react_component_1 = require(\"../react-forms/validating-react-component\");\r\nconst style_1 = require(\"../../style\");\r\nconst translation_service_1 = require(\"../../services/translation-service\");\r\nconst error_panel_1 = require(\"../../components/error-panel\");\r\n;\r\nconst styles = (theme) => {\r\n    return {\r\n        form: {\r\n            composes: theme.ide ? '' : 'pure-form',\r\n        },\r\n        formInner: {\r\n            minWidth: '100%'\r\n        },\r\n        stepNameDiv: {\r\n            composes: 'pure-g pure-u-1 pure-u-lg-1-2 block-md',\r\n            position: 'relative',\r\n            [style_1.mediaQueries.lg]: {\r\n                marginBottom: '0px'\r\n            }\r\n        },\r\n        stepNameLabel: {\r\n            composes: 'pure-u-1-4 pure-u-md-1-6 pure-u-lg-1-3',\r\n            fontSize: theme.ide ? '2em' : '26px',\r\n            paddingRight: '10px',\r\n            height: '100%',\r\n            textAlign: 'right',\r\n            '& > label': {\r\n                height: '100%'\r\n            }\r\n        },\r\n        stepNameInputDiv: {\r\n            composes: 'pure-u-3-4 pure-u-md-5-6 pure-u-lg-2-3',\r\n            height: '100%'\r\n        },\r\n        stepNameInput: {\r\n            composes: 'pure-u-1 input-text native-key-bindings',\r\n            height: '100%',\r\n            margin: '0 !important',\r\n            fontSize: theme.ide ? '2em' : '26px',\r\n        },\r\n        stepTypeInputDiv: {\r\n            composes: 'pure-u-1 pure-u-lg-1-2 step-type-input',\r\n            [style_1.mediaQueries.lg]: {\r\n                paddingLeft: '10px'\r\n            }\r\n        }\r\n    };\r\n};\r\nlet StepEditor = class StepEditor extends validating_react_component_1.FormReactComponent {\r\n    constructor(props) {\r\n        super(props);\r\n        this.onTypeChange = (type) => {\r\n            this.props.state.changeCurrentStepType(type);\r\n        };\r\n        this.nameField = this.createField('props.step.name', value => {\r\n            let errors = [], stepFoundPos = this.props.workflow.findStep(step => step.name === value);\r\n            if (!value || value.length === 0) {\r\n                errors.push('requiredField');\r\n            }\r\n            if (stepFoundPos && stepFoundPos.parent.steps[stepFoundPos.index] !== this.props.step) {\r\n                errors.push('nameConflict');\r\n            }\r\n            return errors;\r\n        });\r\n    }\r\n    dismissErrors() {\r\n        this.props.step.transient.errorsDismissed = true;\r\n    }\r\n    render() {\r\n        let classes = this.props.classes;\r\n        return (React.createElement(\"form\", { className: classes.form },\r\n            React.createElement(\"fieldset\", { className: classes.formInner },\r\n                this.props.step.transient.parseError.length > 0 && !this.props.step.transient.errorsDismissed &&\r\n                    React.createElement(error_panel_1.ErrorPanel, { message: translation_service_1.translate('STEP_HAS_ERRORS', this.props.step.transient.parseError.join(', ')), onClose: () => this.dismissErrors() }),\r\n                React.createElement(\"div\", { className: \"pure-g block\" },\r\n                    React.createElement(\"div\", { className: classes.stepNameDiv },\r\n                        React.createElement(\"div\", { className: classes.stepNameLabel },\r\n                            React.createElement(centered_content_1.CenteredContent, null, \"Step:\")),\r\n                        React.createElement(\"div\", { className: classes.stepNameInputDiv },\r\n                            React.createElement(\"input\", { type: \"text\", className: classes.stepNameInput, name: \"name\", value: this.nameField.fieldVal || '', onChange: e => this.onNameChange(e) }))),\r\n                    React.createElement(\"div\", { className: classes.stepTypeInputDiv },\r\n                        React.createElement(step_type_select_1.StepTypeSelect, { type: (this.props.step && this.props.step.type || 'sequential'), onChange: this.onTypeChange }))),\r\n                this.props.step && this.props.step.type === 'compound' ?\r\n                    null :\r\n                    (React.createElement(simple_step_editor_1.SimpleStepEditor, { sfLinkFactory: this.props.sfLinkFactory, scriptEditorFactory: this.props.scriptEditorFactory, workflow: this.props.workflow, ide: this.props.ide, allowCalls: this.props.state.allowCalls, catalog: this.props.catalog, step: this.props.step })))));\r\n    }\r\n    onNameChange(event) {\r\n        this.updateField(this.nameField, event.target.value);\r\n    }\r\n};\r\ntslib_1.__decorate([\r\n    mobx_1.action,\r\n    tslib_1.__metadata(\"design:type\", Function),\r\n    tslib_1.__metadata(\"design:paramtypes\", []),\r\n    tslib_1.__metadata(\"design:returntype\", void 0)\r\n], StepEditor.prototype, \"dismissErrors\", null);\r\ntslib_1.__decorate([\r\n    mobx_1.action,\r\n    tslib_1.__metadata(\"design:type\", Function),\r\n    tslib_1.__metadata(\"design:paramtypes\", [typeof (_a = typeof react_1.ChangeEvent !== \"undefined\" && react_1.ChangeEvent) === \"function\" ? _a : Object]),\r\n    tslib_1.__metadata(\"design:returntype\", void 0)\r\n], StepEditor.prototype, \"onNameChange\", null);\r\nStepEditor = tslib_1.__decorate([\r\n    injectSheet(styles),\r\n    mobx_react_1.observer,\r\n    tslib_1.__metadata(\"design:paramtypes\", [Object])\r\n], StepEditor);\r\nexports.StepEditor = StepEditor;\r\n",
dependencies: ["tslib","react","mobx","mobx-react","react-jss","../step-type-select","./simple-step-editor","../../util/centered-content","react","../react-forms/validating-react-component","../../style","../../services/translation-service","../../components/error-panel"],
sourceMap: {},
headerContent: undefined,
mtime: 1535400689943,
devLibsRequired : undefined,
ac : undefined,
_ : {}
}

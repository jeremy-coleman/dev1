module.exports = { contents: "\"use strict\";\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst tslib_1 = require(\"tslib\");\r\nvar _a;\r\nconst React = require(\"react\");\r\nconst mobx_1 = require(\"mobx\");\r\nconst mobx_react_1 = require(\"mobx-react\");\r\nconst workflow_1 = require(\"../../models/workflow\");\r\nconst options_1 = require(\"../options\");\r\nconst translation_service_1 = require(\"../../services/translation-service\");\r\nconst script_step_editor_1 = require(\"./script-step-editor\");\r\nconst dockerfile_step_editor_1 = require(\"./dockerfile-step-editor\");\r\nconst ext_workflow_step_editor_1 = require(\"./ext-workflow-step-editor\");\r\nlet injectSheet = require('react-jss').default;\r\nconst styles = (theme) => {\r\n    return {\r\n        labelContainer: {\r\n            composes: 'pure-u-1-4 pure-u-md-1-6',\r\n            textAlign: 'right'\r\n        },\r\n        label: {\r\n            paddingRight: '5px'\r\n        }\r\n    };\r\n};\r\nlet SimpleStepEditor = class SimpleStepEditor extends React.Component {\r\n    constructor(props) {\r\n        super(props);\r\n    }\r\n    get action() {\r\n        if (this.props.step) {\r\n            return this.props.step.action;\r\n        }\r\n        return 'script';\r\n    }\r\n    setAction(action) {\r\n        if (!this.props.step.transient) {\r\n            this.props.step.transient = new workflow_1.StepTransientState();\r\n        }\r\n        this.props.step.transient.action = action;\r\n    }\r\n    actionOption(action) {\r\n        return {\r\n            value: action,\r\n            display: (React.createElement(\"span\", null, translation_service_1.translate('RUN_' + action.toUpperCase())))\r\n        };\r\n    }\r\n    options() {\r\n        return this.props.allowCalls ?\r\n            [\r\n                this.actionOption('script'),\r\n                this.actionOption('call'),\r\n                this.actionOption('generated'),\r\n                this.actionOption('dockerfile')\r\n            ] :\r\n            [\r\n                this.actionOption('script'),\r\n                this.actionOption('dockerfile')\r\n            ];\r\n    }\r\n    selectedEditor() {\r\n        if (this.action == 'script') {\r\n            return (React.createElement(script_step_editor_1.ScriptStepEditor, { scriptEditorFactory: this.props.scriptEditorFactory, sfLinkFactory: this.props.sfLinkFactory, scriptField: 'script', workflow: this.props.workflow, ide: this.props.ide, catalog: this.props.catalog, step: this.props.step }));\r\n        }\r\n        else if (this.action == 'generated') {\r\n            return (React.createElement(script_step_editor_1.ScriptStepEditor, { scriptEditorFactory: this.props.scriptEditorFactory, sfLinkFactory: this.props.sfLinkFactory, includeWorkflowVariables: true, scriptField: 'generator', workflow: this.props.workflow, ide: this.props.ide, catalog: this.props.catalog, step: this.props.step }));\r\n        }\r\n        else if (this.action == 'dockerfile') {\r\n            return (React.createElement(dockerfile_step_editor_1.DockerfileStepEditor, { step: this.props.step }));\r\n        }\r\n        else if (this.action == 'call') {\r\n            return (React.createElement(ext_workflow_step_editor_1.ExtWorkflowStepEditor, { step: this.props.step }));\r\n        }\r\n        else\r\n            return console.log('incomplete coniditional chain in simple-stepeditor.tsx');\r\n    }\r\n    render() {\r\n        return (React.createElement(\"div\", null,\r\n            React.createElement(options_1.Options, { ide: this.props.ide, fill: true, options: this.options(), onChange: a => this.setAction(a.value), selected: this.action }),\r\n            this.selectedEditor()));\r\n    }\r\n};\r\ntslib_1.__decorate([\r\n    mobx_1.action,\r\n    tslib_1.__metadata(\"design:type\", Function),\r\n    tslib_1.__metadata(\"design:paramtypes\", [typeof (_a = typeof workflow_1.ActionType !== \"undefined\" && workflow_1.ActionType) === \"function\" ? _a : Object]),\r\n    tslib_1.__metadata(\"design:returntype\", void 0)\r\n], SimpleStepEditor.prototype, \"setAction\", null);\r\nSimpleStepEditor = tslib_1.__decorate([\r\n    injectSheet(styles),\r\n    mobx_react_1.observer,\r\n    tslib_1.__metadata(\"design:paramtypes\", [Object])\r\n], SimpleStepEditor);\r\nexports.SimpleStepEditor = SimpleStepEditor;\r\n",
dependencies: ["tslib","react","mobx","mobx-react","../../models/workflow","../options","../../services/translation-service","./script-step-editor","./dockerfile-step-editor","./ext-workflow-step-editor","react-jss"],
sourceMap: {},
headerContent: undefined,
mtime: 1535400689921,
devLibsRequired : undefined,
ac : undefined,
_ : {}
}

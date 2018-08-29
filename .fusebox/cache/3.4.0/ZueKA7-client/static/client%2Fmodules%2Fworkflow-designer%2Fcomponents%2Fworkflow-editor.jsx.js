module.exports = { contents: "\"use strict\";\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst tslib_1 = require(\"tslib\");\r\nconst React = require(\"react\");\r\nconst mobx_react_1 = require(\"mobx-react\");\r\nconst fa_1 = require(\"react-icons/fa\");\r\nconst ReactTooltip = require('react-tooltip');\r\nrequire(\"../util/translations\");\r\nconst translation_service_1 = require(\"../services/translation-service\");\r\nconst step_editor_1 = require(\"./step-editor/step-editor\");\r\nconst step_list_1 = require(\"./step-list\");\r\nconst variables_editor_1 = require(\"../components/step-editor/variables-editor\");\r\nconst failure_options_1 = require(\"../components/step-editor/failure-options\");\r\nconst variable_editor_1 = require(\"../components/step-editor/variable-editor\");\r\nlet injectSheet = require('react-jss').default;\r\nconst style_1 = require(\"../style\");\r\nconst styles = (theme) => {\r\n    let list = style_1.listStyles(theme);\r\n    let section = style_1.sectionStyles(theme);\r\n    list.rootListTree.marginBottom = '0px';\r\n    list.listItem.fontSize = '1.2em';\r\n    list.listItem.paddingLeft = '0px';\r\n    list.listItem.fontWeight = 'bold';\r\n    list.listTitle.color = theme.ide ? undefined : '#666';\r\n    return Object.assign({\r\n        form: {\r\n            composes: theme.ide ? '' : 'pure-form',\r\n        },\r\n        editor: {\r\n            composes: `pure-g padded workflow-editor ${theme.ide ? 'base-ide-style' : 'base-web-style'}`,\r\n            [style_1.mediaQueries.md]: {\r\n                padding: theme.ide ? '' : '0px 15px',\r\n            },\r\n        },\r\n        tooltipWrapper: {\r\n            composes: 'pure-u-1',\r\n            position: 'absolute'\r\n        },\r\n        tooltip: {\r\n            composes: theme.ide ? 'ide-tooltip' : '',\r\n        },\r\n        listWrapper: {\r\n            composes: `pure-u-1 pure-u-md-1-4 ${theme.ide ? 'block' : ''}`,\r\n            padding: '10px',\r\n            position: 'relative',\r\n            margin: '10px 0px',\r\n            background: theme.ide ? undefined : '#eee',\r\n            [style_1.mediaQueries.md]: {\r\n                background: theme.ide ? undefined : 'transparent',\r\n                padding: '0px',\r\n                paddingRight: '10px',\r\n                margin: '0px',\r\n            },\r\n        },\r\n        listWrapperTopShadow: Object.assign({\r\n            [style_1.mediaQueries.md]: {\r\n                display: 'none',\r\n            },\r\n        }, style_1.shadows.top),\r\n        listWrapperBottomShadow: Object.assign({\r\n            [style_1.mediaQueries.md]: {\r\n                display: 'none',\r\n            },\r\n        }, style_1.shadows.bottom),\r\n        list: {\r\n            composes: theme.ide ? 'inset-panel padded' : '',\r\n            '&.closed': {\r\n                display: 'none',\r\n                [style_1.mediaQueries.md]: {\r\n                    display: 'block',\r\n                },\r\n            }\r\n        },\r\n        mainEditor: {\r\n            composes: `pure-u-1 pure-u-md-3-4 ${theme.ide ? 'block' : ''}`,\r\n            padding: '0px 10px',\r\n            [style_1.mediaQueries.md]: {\r\n                padding: '0px',\r\n            },\r\n        },\r\n        workflowVarsCount: theme.ide ? {\r\n            composes: 'badge badge-info',\r\n            marginRight: '5px',\r\n        } : {\r\n            marginRight: '5px',\r\n            padding: '0.375em 0.6em',\r\n            minWidth: '1.875em',\r\n            fontWeight: 'normal',\r\n            color: 'white',\r\n            borderRadius: '2em',\r\n            backgroundColor: style_1.themeColors.darkerGreen\r\n        },\r\n        listMobileHeader: {\r\n            textAlign: 'center',\r\n            '& > h3': {\r\n                marginTop: '10px',\r\n                marginBottom: '0px'\r\n            },\r\n            '& > hr': {\r\n                marginBottom: '0px'\r\n            },\r\n            [style_1.mediaQueries.md]: {\r\n                display: 'none',\r\n            }\r\n        },\r\n        listMobileSwitch: {\r\n            fontSize: '2em',\r\n            lineHeight: '0.5em',\r\n        }\r\n    }, list, section);\r\n};\r\nlet WorkflowEditor = class WorkflowEditor extends React.Component {\r\n    constructor(props) {\r\n        super(props);\r\n        this.state = {\r\n            section: 'workflow',\r\n            mobileMenuOpen: false\r\n        };\r\n    }\r\n    selectStep(step) {\r\n        this.setState({ section: 'step' });\r\n    }\r\n    componentWillMount() {\r\n        if (this.props.workflow.steps.length) {\r\n            this.props.state.selectInitialStep();\r\n            this.selectStep(this.props.workflow.steps[0]);\r\n        }\r\n        else {\r\n            this.selectSection('workflow');\r\n        }\r\n    }\r\n    componentWillReceiveProps(nextProps) {\r\n        if (nextProps.workflow !== this.props.workflow) {\r\n            if (nextProps.workflow.steps.length) {\r\n                this.props.state.selectInitialStep();\r\n                this.selectStep(nextProps.workflow.steps[0]);\r\n            }\r\n            else {\r\n                this.selectSection('workflow');\r\n            }\r\n        }\r\n    }\r\n    selectSection(section) {\r\n        this.setState({ section });\r\n        this.props.state.clearSelectedStep();\r\n    }\r\n    get selectedItemDescription() {\r\n        if (this.state.section === 'workflow') {\r\n            return translation_service_1.translate('TITLE_WORKFLOW_VARIABLES');\r\n        }\r\n        else {\r\n            return 'Step - ' + this.props.state.currentStep.name;\r\n        }\r\n    }\r\n    render() {\r\n        let classes = this.props.classes || {}, workflowVarCount = this.props.workflow ? this.props.workflow.workflowVariables.length : 0;\r\n        return (React.createElement(\"div\", { className: classes.editor },\r\n            React.createElement(\"div\", { className: classes.tooltipWrapper },\r\n                React.createElement(ReactTooltip, { id: \"workflowEditor\", effect: \"solid\", class: classes.tooltip, html: true })),\r\n            React.createElement(\"div\", { className: classes.listWrapper },\r\n                React.createElement(\"div\", { className: classes.listMobileHeader, onClick: () => this.setState({ mobileMenuOpen: !this.state.mobileMenuOpen }) },\r\n                    React.createElement(\"h3\", null, this.selectedItemDescription),\r\n                    React.createElement(\"hr\", null),\r\n                    React.createElement(\"span\", { className: classes.listMobileSwitch }, this.state.mobileMenuOpen ? React.createElement(fa_1.FaAngleUp, null) : React.createElement(fa_1.FaAngleDown, null))),\r\n                React.createElement(\"div\", { className: classes.listWrapperTopShadow }),\r\n                React.createElement(\"div\", { className: classes.listWrapperBottomShadow }),\r\n                React.createElement(\"div\", { className: [classes.list, this.state.mobileMenuOpen ? 'open' : 'closed'].join(' ') },\r\n                    React.createElement(\"ul\", { className: classes.rootListTree },\r\n                        React.createElement(\"li\", { className: [classes.listItem, this.state.section === 'workflow' ? classes.listItemSelected : ''].join(' '), onClick: e => this.selectSection('workflow') },\r\n                            React.createElement(\"span\", null,\r\n                                React.createElement(\"span\", null, translation_service_1.translate('TITLE_WORKFLOW'))))),\r\n                    React.createElement(\"h3\", { className: [classes.listTitle, this.state.section === 'step' ? classes.listItemSelected : ''].join(' ') }, translation_service_1.translate('TITLE_STEPS')),\r\n                    React.createElement(step_list_1.StepList, { state: this.props.state, onStepSelect: step => this.selectStep(step) }),\r\n                    this.props.children)),\r\n            React.createElement(\"div\", { className: classes.mainEditor },\r\n                this.state.section === 'step' &&\r\n                    React.createElement(step_editor_1.StepEditor, { state: this.props.state, ide: this.props.state.ide, scriptEditorFactory: this.props.state.scriptEditorFactory, sfLinkFactory: this.props.state.sfLinkFactory, catalog: this.props.state.catalog, workflow: this.props.workflow, step: this.props.state.currentStep }),\r\n                this.state.section === 'workflow' &&\r\n                    React.createElement(\"form\", { className: classes.form },\r\n                        React.createElement(\"div\", { className: [classes.section, workflowVarCount.toString()].join(' ') },\r\n                            React.createElement(\"div\", { className: classes.sectionTitle }, translation_service_1.translate('TITLE_WORKFLOW_VARIABLES')),\r\n                            React.createElement(\"div\", { className: classes.sectionBody },\r\n                                React.createElement(variables_editor_1.VariablesEditor, { variables: this.props.workflow ? this.props.workflow.workflowVariables : [], ide: this.props.state.ide, sourceEditorFactory: variable_editor_1.variableEditorFactory, sourceFactory: variable_editor_1.variableSourceFactory }))),\r\n                        React.createElement(\"div\", { className: classes.section },\r\n                            React.createElement(\"div\", { className: classes.sectionTitle }, translation_service_1.translate('TITLE_WORKFLOW_FAILURE')),\r\n                            React.createElement(\"div\", { className: classes.sectionBody },\r\n                                React.createElement(failure_options_1.FailureOptions, { obj: this.props.workflow })))))));\r\n    }\r\n};\r\nWorkflowEditor = tslib_1.__decorate([\r\n    injectSheet(styles),\r\n    mobx_react_1.observer,\r\n    tslib_1.__metadata(\"design:paramtypes\", [Object])\r\n], WorkflowEditor);\r\nexports.WorkflowEditor = WorkflowEditor;\r\n",
dependencies: ["tslib","react","mobx-react","react-icons/fa","react-tooltip","../util/translations","../services/translation-service","./step-editor/step-editor","./step-list","../components/step-editor/variables-editor","../components/step-editor/failure-options","../components/step-editor/variable-editor","react-jss","../style"],
sourceMap: {},
headerContent: undefined,
mtime: 1535400690031,
devLibsRequired : undefined,
ac : undefined,
_ : {}
}

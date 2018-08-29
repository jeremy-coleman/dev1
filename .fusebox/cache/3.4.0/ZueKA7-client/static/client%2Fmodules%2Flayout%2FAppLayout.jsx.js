module.exports = { contents: "\"use strict\";\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nconst tslib_1 = require(\"tslib\");\r\nconst React = require(\"react\");\r\nconst mobx_react_1 = require(\"mobx-react\");\r\nconst mobx_1 = require(\"mobx\");\r\nconst dimensions_1 = require(\"./dimensions\");\r\nconst Footer_1 = require(\"./Footer\");\r\nconst IconNavigation_1 = require(\"./IconNavigation\");\r\nconst Workspace_1 = require(\"./Workspace\");\r\nconst CommandBar_1 = require(\"./CommandBar\");\r\nconst ThemeChangeModal_1 = require(\"../../components/modals/ThemeChangeModal\");\r\nlet AppLayout = class AppLayout extends React.Component {\r\n    constructor() {\r\n        super(...arguments);\r\n        this.hasError = false;\r\n        this.displayError = () => this.hasError = true;\r\n        this.handleThemeDialogClose = (selectedOption, action) => {\r\n            const uiStore = this.props.store.uiStore;\r\n            if (action === \"ok\") {\r\n                uiStore.updateTheme(selectedOption);\r\n            }\r\n            uiStore.themeDialogToggle.openDrawer(false);\r\n        };\r\n    }\r\n    componentDidCatch(error, errorInfo) {\r\n        this.displayError();\r\n    }\r\n    render() {\r\n        const { children } = this.props;\r\n        return (React.createElement(dimensions_1.FillFlex, null,\r\n            React.createElement(dimensions_1.Row, null,\r\n                React.createElement(dimensions_1.VerticalStretch, null,\r\n                    React.createElement(CommandBar_1.CommandBar, null),\r\n                    React.createElement(dimensions_1.VerticalStretch, null,\r\n                        React.createElement(dimensions_1.Row, null,\r\n                            React.createElement(IconNavigation_1.IconNavBar, null),\r\n                            React.createElement(dimensions_1.Row, null,\r\n                                React.createElement(Workspace_1.MiddlePanel, null, this.hasError ? (React.createElement(ErrorDisplay, null)) : (children)),\r\n                                React.createElement(\"div\", { style: { width: '0px' } }, \"same as above. set width to 100px or something to see\")))),\r\n                    React.createElement(Footer_1.StatusFooter, null)),\r\n                React.createElement(\"div\", { style: { width: '0px' } }, \"same as above. set width to 100px or something to see\")),\r\n            React.createElement(ThemeChangeModal_1.ThemeChangeModal, { style: { width: \"80%\", maxHeight: 435 }, open: this.props.store.uiStore.themeDialogToggle.open, onOptionDialogClose: this.handleThemeDialogClose, selectedOption: this.props.store.uiStore.themeId, options: [\"myriad\", \"velocity\", \"ranger\"], dialogOptions: { dialogTitle: \"Choose Theme\", cancelText: \"Cancel\", okText: \"Update\" } })));\r\n    }\r\n};\r\ntslib_1.__decorate([\r\n    mobx_1.observable,\r\n    tslib_1.__metadata(\"design:type\", Object)\r\n], AppLayout.prototype, \"hasError\", void 0);\r\ntslib_1.__decorate([\r\n    mobx_1.action,\r\n    tslib_1.__metadata(\"design:type\", Object)\r\n], AppLayout.prototype, \"displayError\", void 0);\r\nAppLayout = tslib_1.__decorate([\r\n    mobx_react_1.inject('nav', 'store'),\r\n    mobx_react_1.observer\r\n], AppLayout);\r\nexports.AppLayout = AppLayout;\r\nconst ErrorDisplay = mobx_react_1.observer((props) => React.createElement(\"div\", { style: { textAlign: 'center', paddingTop: 25, paddingBottom: 25 } },\r\n    React.createElement(\"h1\", null, \"An unknown error occurred\"),\r\n    React.createElement(\"h1\", null, props.error),\r\n    React.createElement(\"h1\", null, props.errorInfo)));\r\n",
dependencies: ["tslib","react","mobx-react","mobx","./dimensions","./Footer","./IconNavigation","./Workspace","./CommandBar","../../components/modals/ThemeChangeModal"],
sourceMap: {},
headerContent: undefined,
mtime: 1535400689078,
devLibsRequired : undefined,
ac : undefined,
_ : {}
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ux_1 = require("@coglite/common/ux");
const mobx_react_1 = require("mobx-react");
const React = require("react");
let DashboardListClearDialog = mobx_react_1.observer((props) => {
    const _onClickCancel = () => props.supplier.clearValue();
    const _onClickSave = () => Promise.all([
        props.supplier.value.clear(),
        props.supplier.clearValue()
    ]);
    const _onDismissed = () => props.supplier.clearValue();
    return (React.createElement(ux_1.Modal, { showModal: props.supplier.value ? true : false, handleClose: _onDismissed },
        React.createElement("span", { style: { margin: 'auto', padding: 25 } },
            React.createElement("div", null, "Are you sure you want to remove all Dashboards?"),
            React.createElement("div", null, "Remove all Dashboards"),
            React.createElement("div", null,
                React.createElement("button", { onClick: _onClickCancel }, "Cancel"),
                React.createElement("button", { onClick: _onClickSave }, "OK")))));
});
exports.DashboardListClearDialog = DashboardListClearDialog;

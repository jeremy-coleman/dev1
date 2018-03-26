import { FormControl, FormHelperText } from 'material-ui/Form';
import { InputLabel } from 'material-ui/Input';
import { inject, observer } from 'mobx-react';
import * as React from 'react';

import {
  computeLabel,
  ControlProps,
  ControlState,
  formatErrorMessage,
  isControl,
  isDescriptionHidden,
  isPlainLabel,
  mapStateToControlProps,
  RankedTester,
  rankWith,
} from '../lib/core';
import { Control, DispatchField, mergeTransformProps } from '../lib/react';


export class MaterialInputControl extends Control<ControlProps, ControlState> {
  render() {
    const {
      id,
      description,
      errors,
      label,
      uischema,
      schema,
      visible,
      required,
      parentPath,
      config
    } = this.props;
    const isValid = errors.length === 0;
    const trim = config.trim;
    const style: {[x: string]: any} = {};
    if (!visible) {
      style.display = 'none';
    }
    const showDescription = !isDescriptionHidden(visible, description, this.state.isFocused);

    return (
      <FormControl
        style={style}
        fullWidth={!trim}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
      >
        <InputLabel htmlFor={id} error={!isValid}>
          {computeLabel(isPlainLabel(label) ? label : label.default, required)}
        </InputLabel>
        <DispatchField uischema={uischema} schema={schema} path={parentPath} />
        <FormHelperText error={!isValid}>
          {!isValid ? formatErrorMessage(errors) : showDescription ? description : null}
        </FormHelperText>
      </FormControl>
    );
  }
}
export const materialInputControlTester: RankedTester = rankWith(1, isControl);

@inject("jsonFormsStore")
@observer
export default class MaterializedInputControl extends React.Component<any, null>  {
  render() {
    const {jsonFormsStore, ...ownProps} = this.props
    const effectiveFromStateProps = mergeTransformProps(jsonFormsStore, ownProps, mapStateToControlProps)
    //Merge the dispatch prop here
    const effectiveProps = Object.assign({}, effectiveFromStateProps, {})
    return (
      <MaterialInputControl {...effectiveProps}/>
    )
  }
}

//export default connectToJsonForms(mapStateToControlProps)(MaterialInputControl);

import AccessTimeIcon from '@material-ui/icons/AccessTime';
import DateRangeIcon from '@material-ui/icons/DateRange';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { DateTimePicker } from 'material-ui-pickers';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { computeLabel, ControlProps, ControlState, isDateTimeControl, isPlainLabel, mapStoreValuesToControlProps, mapUpdateActionToControlProps, RankedTester, rankWith } from '../../core';
import { Control, createPropsForItem } from '../../react';

export class MaterialDateTimeControl extends Control<ControlProps, ControlState> {
  render() {
    const {
      id,
      description,
      errors,
      label,
      uischema,
      visible,
      enabled,
      required,
      path,
      handleChange,
      data,
      config
    } = this.props;
    const isValid = errors.length === 0;
    const trim = config.trim;
    let style = {};
    if (!visible) {
      style = {display: 'none'};
    }
    const inputProps = {};

    return (
      <DateTimePicker
        id={id}
        label={computeLabel(isPlainLabel(label) ? label : label.default, required)}
        error={!isValid}
        style={style}
        fullWidth={!trim}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        helperText={!isValid ? errors : description}
        InputLabelProps={{shrink: true, }}
        value={data || null}
        onChange={ datetime =>
          handleChange(path, datetime ? datetime : '')
        }
        format='MM/DD/YYYY h:mm a'
        clearable={true}
        disabled={!enabled}
        autoFocus={uischema.options && uischema.options.focus}
        leftArrowIcon={<KeyboardArrowLeftIcon />}
        rightArrowIcon={<KeyboardArrowRightIcon />}
        dateRangeIcon={<DateRangeIcon />}
        timeIcon={<AccessTimeIcon />}
        onClear={() => handleChange(path, '')}
        InputProps={inputProps}
      />
    );
  }
}
export const materialDateTimeControlTester: RankedTester = rankWith(2, isDateTimeControl);

@inject("jsonFormsStore")
@observer
export default class MaterializedDateTimeControl extends React.Component<any, null>  {
  render() {
    const effectiveProps = createPropsForItem(this.props, mapStoreValuesToControlProps, mapUpdateActionToControlProps)
    return (
      <MaterialDateTimeControl {...effectiveProps}/>
    )
  }
}
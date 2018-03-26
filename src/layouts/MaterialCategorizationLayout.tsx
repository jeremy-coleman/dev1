import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import { inject, observer } from 'mobx-react';
import * as React from 'react';

import {
    and,
    Categorization,
    mapStateToLayoutProps,
    RankedTester,
    rankWith,
    RendererProps,
    Tester,
    UISchemaElement,
    uiTypeIs,
} from '../lib/core';
import { mergeTransformProps, RendererComponent } from '../lib/react';
import { MaterialLayoutRenderer, MaterialLayoutRendererProps } from '../util/layout';


const isSingleLevelCategorization: Tester = and(
    uiTypeIs('Categorization'),
    (uischema: UISchemaElement): boolean => {
      const categorization = uischema as Categorization;

      return categorization.elements.reduce((acc, e) => acc && e.type === 'Category', true);
    }
);

export const materialCategorizationTester: RankedTester = rankWith(1, isSingleLevelCategorization);
export interface CategorizationState {
    value: number;
  }

export class MaterialCategorizationLayoutRenderer
    extends RendererComponent<RendererProps, CategorizationState> {
    constructor(props) {
      super(props);

      this.state = {
        value: 0
      };
    }

    render() {
        const { uischema, schema, path, visible } = this.props;
        const { value } = this.state;

        const categorization = uischema as Categorization;

        const childProps: MaterialLayoutRendererProps = {
            elements: categorization.elements[value].elements,
            schema,
            path,
            direction: 'column',
            visible
        };
        const style: {[x: string]: any} = { marginBottom: '10px' };
        if (!visible) {
            style.display = 'none';
        }

        return (
            <div style={style}>
                <AppBar position='static'>
                <Tabs value={value} onChange={this.handleChange}>
                    {categorization.elements.map((e, idx) => <Tab  key={idx} label={e.label} />)}
                </Tabs>
                </AppBar>
                <div style={{ marginTop: '0.5em' }}>
                    <MaterialLayoutRenderer {...childProps}/>
                </div>
            </div>
        );
    }
    private handleChange = (_event, value) => {
        this.setState({ value });
    }
}

@inject("jsonFormsStore")
@observer
export default class MaterialCategorizationLayout extends React.Component<any, null>  {
  render() {
    const {jsonFormsStore, ...ownProps} = this.props
    const effectiveFromStateProps = mergeTransformProps(jsonFormsStore, ownProps, mapStateToLayoutProps)
    //Merge the dispatch prop here
    const effectiveProps = Object.assign({}, effectiveFromStateProps, {})
    return (
      <MaterialCategorizationLayoutRenderer {...effectiveProps}/>
    )
  }
}

/* export default connectToJsonForms(
  mapStateToLayoutProps
)(MaterialCategorizationLayoutRenderer);
 */
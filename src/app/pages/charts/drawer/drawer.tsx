import { observer, inject } from 'mobx-react';
import * as React from 'react';
import { Route, RouteComponentProps, Switch, withRouter, HashRouter, Router } from 'react-router-dom';
import styled from 'styled-jss';
import { Toolbar, Button } from '@material-ui/core';
import Menu from '@material-ui/icons/Menu'
import { DashboardPage, DatasetsPage, NotebookPage, ChartsPage } from './routes';


export const Drawer = styled('div')({
    width: props => {props.width || '360px'},
    flexDirection: 'column',
    alignItems: 'central',
    border: '3px solid black',
    right: 0
})

export const IconNavBar  = observer(props => (               
            <Toolbar>
                <Button>{<Menu/>}</Button>
                <Button>{<Menu/>}</Button>
                <Button>{<Menu/>}</Button>
            </Toolbar >
          
        ))


const _WorkDrawer = props => (
<Drawer width={props.width}>
<IconNavBar/>
{<WorkDrawerRoutes/>}
</Drawer>
)

export const WorkDrawer = observer(_WorkDrawer)


type WorkDrawerRouteProps = any & RouteComponentProps<any, any>;



@inject('navigation')
@observer
export class WorkDrawerRoutes extends React.Component<WorkDrawerRouteProps, any> {
 render() {
const {navigation} = this.props
  return(
    <Router history={navigation.history}>
    <Switch>
          <Route path='/nbdrawer/dashboard' render={() => DashboardPage} />
          <Route path='/nbdrawer/notebook' component={NotebookPage} />
          <Route path='/nbdrawer/datasets' component={DatasetsPage} />
          <Route path='/nbdrawer/charts' component={ChartsPage} />
    </Switch>
   </Router>
  )}}





//const LeftNav = withStyles(styles, {withTheme: true})(_LeftNav);
//export {LeftNav as default, LeftNav}


// add "label" if you want to use text ie: <NavIcon label="Portfolio" route="/" icon={<Dashboard />} />

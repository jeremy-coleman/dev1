import * as React from 'react'
import {observer} from 'mobx-react'
import {withTheme} from 'theming'
import styled from 'styled-jss'


export let ChartsPage = withTheme(observer((props) =>
<div>Charts
    <Button/>
</div>
))



const Button = withTheme(styled('button')(({theme}) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
})))
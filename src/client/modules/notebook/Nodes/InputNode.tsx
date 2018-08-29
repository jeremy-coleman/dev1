import * as React from "react"
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core"
import Input from "@material-ui/icons/Input"
import { observer } from "mobx-react"

@observer
export class InputNode extends React.Component<any, any> {
  render() {
    const { classes } = this.props

    const inputNode = (
      <ListItem
        classes={classes}
        component="div"
        draggable={true}
        onDragStart={event => {
          event.dataTransfer.setData("storm-diagram-node", JSON.stringify({ type: "cogliteInput" }))
        }}
      >
        <ListItemIcon>
          <Input />
        </ListItemIcon>
        <ListItemText primary="Input" />
      </ListItem>
    )

    return inputNode
  }
}
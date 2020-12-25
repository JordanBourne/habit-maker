import React from 'react';
import {
  List,
  ListItem,
  ListItemIcon,
  Checkbox,
  ListItemText,
  ListItemSecondaryAction,
  IconButton
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import CommentIcon from '@material-ui/icons/Comment';
import AddIcon from '@material-ui/icons/Add';
import { navigate } from '@reach/router';

const useStyles = makeStyles({
  container: {
    width: '75%',
    margin: 'auto'
  },
  addItem: {
    margin: 'auto',
    display: 'flex'
  },
  addItemIcon: {
    paddingTop: '2px'
  }
});

export const ToDoList = () => {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const goToAddNewItem = (event) => {
    const destination = '/new-item';
    if (event.metaKey || event.ctrlKey) {
      window.open(destination);
    } else {
      navigate(destination);
    }
  };

  return (
    <List className={classes.container}>
      {[0, 1, 2, 3].map((value) => {
        const labelId = `checkbox-list-label-${value}`;

        return (
          <ListItem key={value} role={undefined} dense button onClick={handleToggle(value)}>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={checked.indexOf(value) !== -1}
                tabIndex={-1}
              />
            </ListItemIcon>
            <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="comments">
                <CommentIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
      <ListItem key={'Add New'} role={undefined} dense button onClick={goToAddNewItem}>
        <div className={classes.addItem}>
          <ListItemIcon className={classes.addItemIcon}>
            <AddIcon
              edge="start"
              tabIndex={-1}
            />
          </ListItemIcon>
          <ListItemText> Add New Item </ListItemText>
        </div>
      </ListItem>
    </List>
  )
}
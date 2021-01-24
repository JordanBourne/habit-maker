import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemIcon,
  Checkbox,
  ListItemText,
  ListItemSecondaryAction,
  IconButton
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CommentIcon from '@material-ui/icons/Comment';
import AddIcon from '@material-ui/icons/Add';
import { navigate } from '@reach/router';
import axios from 'axios';

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
  },
  subHeader: {
    color: 'rgba(0,0,0,.6)',
    textAlign: 'center',
    marginTop: '5px',
    fontSize: '1.2em',
    flexBasis: '100%'
  }
});

export const ToDoList = () => {
  const classes = useStyles();
  const [ checked, setChecked ] = useState([0]);
  const [ tasks, setTasks ] = useState([]);

  // Move these to state
  const numCompleted = 0;
  const numToDo = 5;

  useState(() => {
    axios.get('http://localhost:5000/tasks/get').then(res => {
    console.log(res)  
    setTasks(res.data)});
  }, []);

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
    <>
      <h2 className={classes.subHeader}>{numCompleted} / {numToDo}</h2>
      <List className={classes.container}>
        {tasks.map((task) => {
          const labelId = `checkbox-${task.name}`;

          return (
            <ListItem key={task.taskId} role={undefined} dense button onClick={() => handleToggle(task.taskId)}>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(task.taskId) !== -1}
                  tabIndex={-1}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={task.name} />
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
    </>
  )
}
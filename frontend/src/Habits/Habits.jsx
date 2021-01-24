import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { navigate } from '@reach/router';
import {
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import { PageContainer } from '../Common/PageContainer';
import { axiosWrapper } from '../util/axios';

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
  },
  backButton: {
    width: '40%',
    margin: '10px auto',
  }
});

export const Habits = () => {
  const classes = useStyles();
  const [ habits, setTasks ] = useState([]);

  useState(() => {
    axiosWrapper.get('http://localhost:5000/habits/get').then(res => {
    console.log(res)  
    setTasks(res.data)});
  }, []);

  const goToAddNewItem = (event) => {
    const destination = '/new-item';
    if (event.metaKey || event.ctrlKey) {
      window.open(destination);
    } else {
      navigate(destination);
    }
  };

  const viewHabit = (habitId) => {
    navigate(`/habit/${habitId}`);
  }

  const goBack = () => {
    navigate('/');
  };

  return (
    <PageContainer>
      <h2 className={classes.subHeader}>Habits</h2>
      <List className={classes.container}>
        {habits.map((habit) => {
          const labelId = `checkbox-${habit.name}`;

          return (
            <ListItem key={habit.habitId} dense button onClick={() => viewHabit(habit.habitId)}>
              <ListItemText id={labelId} primary={habit.name} />
            </ListItem>
          );
        })}
        <ListItem key={'Add New'} dense button onClick={goToAddNewItem}>
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
      <Button className={classes.backButton} variant="outlined" onClick={goBack}>Back</Button>
    </PageContainer>
  )
}
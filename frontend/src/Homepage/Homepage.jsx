import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ToDoList } from './ToDoList';
import { PageContainer } from '../Common/PageContainer';

const useStyles = makeStyles({
  header: {
    color: 'rgba(0,0,0,.7)',
    textAlign: 'center',
    marginBottom: '5px',
    flexBasis: '100%'
  },
  subHeader: {
    color: 'rgba(0,0,0,.6)',
    textAlign: 'center',
    marginTop: '5px',
    fontSize: '1.2em',
    flexBasis: '100%'
  },
  divider: {
    width: '60%',
    height: '1px',
    border: 'none',
    color: 'rgba(0,0,0,.8)',
    backgroundColor: 'rgba(0,0,0,.3)'
  }
});

export const Homepage = () => {
  const classes = useStyles();
  const numCompleted = 0;
  const numToDo = 5;
  return (
    <PageContainer>
      <h1 className={classes.header}>To Do</h1>
      <hr className={classes.divider}/>
      <h2 className={classes.subHeader}>{numCompleted} / {numToDo}</h2>
      <ToDoList />
    </PageContainer>
  )
};
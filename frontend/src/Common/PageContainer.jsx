import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  container: {
    margin: 'auto',
    width: '70%',
    maxWidth: '600px',
    marginTop: '40px',
    borderRadius: '5px',
    padding: '10px',
    display: 'flex',
    flexWrap: 'wrap'
  }
});

export const PageContainer = ({ children }) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      {children}
    </div>
  )
};
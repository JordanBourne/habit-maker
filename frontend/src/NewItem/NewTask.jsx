import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField } from '@material-ui/core';
import axios from 'axios';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  header: {
    width: '100%',
    textAlign: 'center',
    color: 'rgba(0,0,0,.7)'
  },
  description: {
    color: 'rgba(0,0,0,.6)',
    fontSize: '.8em',
    flexBasis: '100%',
    textAlign: 'center',
    margin: '10px 0px 10px 0px'
  },
  form: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  inputBox: {
    width: '75%',
    margin: 'auto',
    marginTop: '10px',
    marginBottom: '10px'
  },
  submitButton: {
    width: '35%',
    margin: '10px auto'
  }
})

export const NewTask = () => {
  const classes = useStyles();
  const [ name, setName ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ taskDate, setTaskDate ] = useState('');
  const [ formValid, setFormValid ] = useState(false);
  const [ submitting, setSubmitting ] = useState(false);
  
  useEffect(() => {
    setFormValid(!!(name && description && taskDate && !submitting));
  }, [name, description, taskDate, submitting]);

  const handleSubmit = (e) => {
    setSubmitting(true);
    const taskDetails = {
      name,
      description,
      taskDate
    };

    axios.post('http://localhost:5000/tasks/new-task', taskDetails)
      .then(res => {
        // handle success
        setName('');
        setDescription('');
        setTaskDate('');
        setSubmitting(false);
      })
      .catch(err => {
      })
  };

  return (
    <div className={classes.container}>
      <h2 className={classes.header}>New Task</h2>
      <div className={classes.description}>Create a new one off task.</div>
      <div onSubmit={handleSubmit} className={classes.form}>
        <TextField
          value={name}
          variant="outlined"
          label="Task Name"
          id="name"
          aria-describedby="task-name"
          size="small"
          className={classes.inputBox}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          value={description}
          variant="outlined"
          label="Description"
          id="description"
          aria-describedby="task-name"
          size="small"
          className={classes.inputBox}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          id="date"
          label="Date"
          type="date"
          variant="outlined"
          className={classes.inputBox}
          value={taskDate}
          onChange={(e) => setTaskDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button className={[classes.inputBox, classes.submitButton].join(' ')} variant="outlined" onClick={handleSubmit} disabled={!formValid}>Create</Button>
      </div>
    </div>
  )
};
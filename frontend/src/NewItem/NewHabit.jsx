import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField } from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { navigate } from '@reach/router';
import { axiosWrapper } from '../util/axios';

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
  frequencyButtons: {
    display: 'flex',
    justifyContent: 'center'
  },
  inputBox: {
    width: '75%',
    margin: 'auto',
    marginTop: '10px',
    marginBottom: '10px'
  },
  buttonBox: {
    width: '75%',
    margin: 'auto',
    display: 'flex',
    justifyContent: 'center'
  },
  submitButton: {
    width: '50%',
    margin: '10px auto',
  },
  dateValue: {
    width: '35px',
    borderRadius: '0',
    margin: '0'
  },
  lastDay: {
    width: '105px',
    borderRadius: '0',
    margin: '0'
  },
  calendar: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    justifyContent: 'center'
  },
  calendarRow: {
    margin: '0px auto',
    width: '245px',
    borderRadius: 'none'
  },
  calendarFirst: {
    marginTop: '10px'
  },
  calendarLast: {
    marginBottom: '10px'
  }
})

export const NewHabit = () => {
  const classes = useStyles();
  const [ frequency, setFrequency ] = useState('');
  const [ formValid, setFormValid ] = useState(false);
  const [ name, setName ] = useState('');
  const [ description, setDescription ] = useState('');
  const [ scheduleType, setScheduleType ] = useState('');
  const [ numDays, setNumDays ] = useState(0);
  const [ onDaysWeekly, setOnDaysWeekly ] = useState([]);
  const [ onDaysMonthly, setOnDaysMonthly ] = useState([]);

  useEffect(() => {
    const validOnDaysWeekly = scheduleType === 'onDays' && onDaysWeekly.length >= 1;
    const validOnDaysMonthly = scheduleType === 'onDays' && onDaysMonthly.length >= 1;
    const validDayCount = scheduleType === 'numDays' && numDays >= 1;
    const validDaily = frequency === 'daily';
    const validWeekly = (validOnDaysWeekly || validDayCount) && frequency === 'weekly';
    const validMonthly = (validOnDaysMonthly || validDayCount) && frequency === 'monthly';
    setFormValid(!!(frequency && name && description && (validDaily || validWeekly || validMonthly)));
  }, [frequency, formValid, name, description, scheduleType, numDays, onDaysWeekly, onDaysMonthly]);

  const handleSubmit = (e) => {
    const habitDetails = {
      name,
      description,
      frequency,
      scheduleType,
      numDays,
      onDaysWeekly,
      onDaysMonthly
    };

    axiosWrapper.post('http://localhost:5000/tasks/new-habit', habitDetails)
      .then(res => {
        // handle success
      })
      .catch(err => {
        console.log('Error: ', err);
      })
  };

  const goBack = () => {
    navigate('/');
  };

  const updateFrequency = (e, newFrequency) => setFrequency(newFrequency);

  const updateScheduleType = (e, newScheduleType) => setScheduleType(newScheduleType);

  const updateOnDaysWeekly = (e, newOnDays) => setOnDaysWeekly(newOnDays);

  const updateOnDaysMonthly = (e, newOnDays) => setOnDaysMonthly(newOnDays);

  const updateNumDays = (e) => {
    const dayCount = (e.target.value || '').replace(/[^0-9]/g, '');
    if (frequency === 'weekly' && parseInt(dayCount) > 7) {
      setNumDays(7)
    } else if (frequency === 'monthly' && parseInt(dayCount) > 31) {
      setNumDays(31);
    } else {
      setNumDays(dayCount);
    }
  }

  const scheduleOptions = (onDaysSelection) => {
    return (
      <>
        <ToggleButtonGroup
          value={scheduleType}
          id="schedule"
          exclusive
          onChange={updateScheduleType}
          aria-label="habit scheduling"
          className={[classes.frequencyButtons, classes.inputBox].join(' ')}
          size="small"
        >
          <ToggleButton value="numDays" aria-label="Number of Days">
            Number of Days
          </ToggleButton>
          <ToggleButton value="onDays" aria-label="Specifc Days">
            Specific Days
          </ToggleButton>
        </ToggleButtonGroup>
        {scheduleType === 'numDays' && 
          <TextField 
            value={numDays}
            variant="outlined"
            label="Number of Days"
            id="numDays"
            aria-describedby="number-of-days"
            size="small"
            className={classes.inputBox}
            onChange={updateNumDays}
          />
        }
        {scheduleType === 'onDays' && onDaysSelection}
      </>
    );
  };
  
  const weeklyExtraOptions = () => {
    const onDaysSelection = (
      <ToggleButtonGroup
        value={onDaysWeekly}
        id="onDaysWeekly"
        onChange={updateOnDaysWeekly}
        aria-label="days of week"
        className={[classes.frequencyButtons, classes.inputBox].join(' ')}
        size="small"
      >
        <ToggleButton value="sunday" aria-label="Sunday">
          SUN
        </ToggleButton>
        <ToggleButton value="monday" aria-label="Monday">
          MON
        </ToggleButton>
        <ToggleButton value="tuesday" aria-label="Tuesday">
          TUE
        </ToggleButton>
        <ToggleButton value="wednesday" aria-label="Wednesday">
          WED
        </ToggleButton>
        <ToggleButton value="thursday" aria-label="Thursday">
          THU
        </ToggleButton>
        <ToggleButton value="friday" aria-label="Friday">
          FRI
        </ToggleButton>
        <ToggleButton value="saturday" aria-label="Saturday">
          SAT
        </ToggleButton>
      </ToggleButtonGroup>
    );
    return scheduleOptions(onDaysSelection);
  };

  const monthlyExtraOptions = () => {
    const onDaysSelection = (
      <div className={classes.calendar}>
        <ToggleButtonGroup
          value={onDaysMonthly}
          id="onDaysMonthly"
          onChange={updateOnDaysMonthly}
          aria-label="days of month"
          className={[classes.calendarRow, classes.calendarFirst].join(' ')}
          size="small"
        >
          {[1,2,3,4,5,6,7].map((day) => (<ToggleButton className={classes.dateValue} key={day} value={day} aria-label={day}>{day}</ToggleButton>))}
        </ToggleButtonGroup>
        <ToggleButtonGroup
          value={onDaysMonthly}
          id="onDaysMonthly"
          onChange={updateOnDaysMonthly}
          aria-label="days of month"
          className={[classes.calendarRow].join(' ')}
          size="small"
        >
          {[8,9,10,11,12,13,14].map((day) => (<ToggleButton className={classes.dateValue} key={day} value={day} aria-label={day}>{day}</ToggleButton>))}
        </ToggleButtonGroup>
        <ToggleButtonGroup
          value={onDaysMonthly}
          id="onDaysMonthly"
          onChange={updateOnDaysMonthly}
          aria-label="days of month"
          className={[classes.calendarRow].join(' ')}
          size="small"
        >
          {[15,16,17,18,19,20,21].map((day) => (<ToggleButton className={classes.dateValue} key={day} value={day} aria-label={day}>{day}</ToggleButton>))}
        </ToggleButtonGroup>
        <ToggleButtonGroup
          value={onDaysMonthly}
          id="onDaysMonthly"
          onChange={updateOnDaysMonthly}
          aria-label="days of month"
          className={[classes.calendarRow].join(' ')}
          size="small"
        >
          {[22,23,24,25,26,27,28].map((day) => (<ToggleButton className={classes.dateValue} key={day} value={day} aria-label={day}>{day}</ToggleButton>))}
        </ToggleButtonGroup>
        <ToggleButtonGroup
          value={onDaysMonthly}
          id="onDaysMonthly"
          onChange={updateOnDaysMonthly}
          aria-label="days of month"
          className={[classes.calendarRow, classes.calendarLast].join(' ')}
          size="small"
        >
          {[29,30,31].map((day) => (<ToggleButton className={classes.dateValue} key={day} value={day} aria-label={day}>{day}</ToggleButton>))}
          <ToggleButton className={classes.lastDay} key="Last Day" value="last" aria-label="Last day of month">Last Day</ToggleButton>
        </ToggleButtonGroup>
      </div>
    );
    return scheduleOptions(onDaysSelection);
  };

  return (
    <div className={classes.container}>
      <h2 className={classes.header}>New Habit</h2>
      <div className={classes.description}>Create a new habit. This will be something you do on a regular basis, such as brushing your teeth every night or a weekly cleanup routine.</div>
      <div onSubmit={handleSubmit} className={classes.form}>
        <TextField
          value={name}
          variant="outlined"
          label="Habit Name"
          id="name"
          aria-describedby="habit-name"
          size="small"
          className={classes.inputBox}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          value={description}
          variant="outlined"
          label="Description"
          id="description"
          aria-describedby="habit-name"
          size="small"
          className={classes.inputBox}
          onChange={(e) => setDescription(e.target.value)}
        />
        <ToggleButtonGroup
          value={frequency}
          id="frequency"
          exclusive
          onChange={updateFrequency}
          aria-label="habit frequency"
          className={[classes.frequencyButtons, classes.inputBox].join(' ')}
          size="small"
        >
          <ToggleButton value="daily" aria-label="Daily">
            Daily
          </ToggleButton>
          <ToggleButton value="weekly" aria-label="Weekly">
            Weekly
          </ToggleButton>
          <ToggleButton value="monthly" aria-label="Monthly">
            Monthly
          </ToggleButton>
        </ToggleButtonGroup>
        {frequency === 'daily' && <div className={classes.description}>You will be reminded to do this task every day.</div>}
        {frequency === 'weekly' && weeklyExtraOptions()}
        {frequency === 'monthly' && monthlyExtraOptions()}
        <div className={classes.buttonBox}><Button className={[classes.submitButton].join(' ')} variant="outlined" onClick={handleSubmit} disabled={!formValid}>Create</Button></div>
        <div className={classes.buttonBox}><Button className={[classes.submitButton].join(' ')} variant="outlined" onClick={goBack}>Back</Button></div>
      </div>
    </div>
  )
};
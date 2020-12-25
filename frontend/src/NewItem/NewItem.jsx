import React from 'react';
import { PageContainer } from '../Common/PageContainer';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import { NewHabit } from './NewHabit';

const useStyles = makeStyles({
  buttonGroup: {
    justifyContent: 'center',
    margin: 'auto',
    flexBasis: '100%'
  }
});

export const NewItem = () => {
  const classes = useStyles();
  const [ itemType, setItemType ] = React.useState('newTask');

  const handleItemType = (event, newItemType) => {
    if (itemType !== newItemType) {
      setItemType(newItemType);
    }
  };

  return (
    <PageContainer>
      <ToggleButtonGroup
        value={itemType}
        exclusive
        onChange={handleItemType}
        aria-label="item type"
        className={classes.buttonGroup}
      >
        <ToggleButton value="newTask" aria-label="New Task">
          New Task
        </ToggleButton>
        <ToggleButton value="newGoal" aria-label="New Goal">
          New Goal
        </ToggleButton>
        <ToggleButton value="newHabit" aria-label="New Habit">
          New Habit
        </ToggleButton>
      </ToggleButtonGroup>
      {itemType === 'newTask' && <div>New Task</div>}
      {itemType === 'newGoal' && <div>New Goal</div>}
      {itemType === 'newHabit' && <NewHabit />}
    </PageContainer>
  );
};
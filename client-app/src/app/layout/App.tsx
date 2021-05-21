import React, { Fragment, useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';

function App() {
  const {activityStore} = useStore();

  const [activities, setActivties] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    agent.Activities.list().then(response => {
      let actvities = [];
      response.forEach(activty => {
        activty.date = activty.date.split('T')[0];
        activities.push(activty);
      });
      setActivties(response);
      setLoading(false);
    });
  }, []);

  function handleSelectActivity(id: string) {
    setSelectedActivity(activities.find(x => x.id === id));
  }

  function handleCancelSelectActivity() {
    setSelectedActivity(undefined);
  }

  function handleOpenForm(id?: string) {
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  }

  function handleCloseForm() {
    setEditMode(false);
  }

  function editOrCreateActivity(activity: Activity) {
    setSubmitting(true);
    
    if(activity.id) {
      agent.Activities.update(activity).then(() => {
        setActivties([...activities.filter(x => x.id !== activity.id), activity]);
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      })
    } else {
      activity.id = uuid();
      setActivties([...activities, activity]);
      setSelectedActivity(activity);
      setEditMode(false);
      setSubmitting(false);
    }
  }

  function handleDeleteActivty(id: string) {
    setSubmitting(true);
    agent.Activities.delete(id).then(() => {
      setActivties([...activities.filter(x => x.id !== id)]);
      setSubmitting(false);
    })
  }

  if (loading) return <LoadingComponent content='Loading app' />

  return (
    <>
      <NavBar handleOpenForm={handleOpenForm} />
      <Container style={{marginTop: '7em'}}>
        <h2>{activityStore.title}</h2>
        <ActivityDashboard 
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          editMode={editMode}
          handleOpenForm={handleOpenForm}
          handleCloseForm={handleCloseForm}
          editOrCreate={editOrCreateActivity}
          deleteActivity={handleDeleteActivty}
          submitting = {submitting}
        />
      </Container>  
    </>
  );
}

export default App;

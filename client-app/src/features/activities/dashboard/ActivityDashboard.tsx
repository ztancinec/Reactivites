import React from 'react';
import { Grid} from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import ActivityDetails from '../details/ActivityDeatils';
import ActivityForm from '../form/ActivityForm';
import ActivityList from './ActivityList';

interface Props {
    activities: Activity[];
    selectedActivity: Activity | undefined;
    selectActivity: (id: string) => void;
    cancelSelectActivity: () => void;
    editMode: Boolean;
    handleOpenForm: (id: string) => void;
    handleCloseForm: () => void;
    editOrCreate: (activity: Activity) => void;
    deleteActivity: (id: string) => void;
    submitting: boolean;
}

export default function ActivityDashboard({activities, selectedActivity, selectActivity, cancelSelectActivity, editMode, handleOpenForm, handleCloseForm,
     editOrCreate, deleteActivity, submitting}: Props) {
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList activities={activities} selectActivity={selectActivity} deleteActivity={deleteActivity} submitting={submitting}/>
            </Grid.Column>
            <Grid.Column width="6">
                {selectedActivity &&
                <ActivityDetails activity={selectedActivity} cancelSelectActivity={cancelSelectActivity} handleOpenForm={handleOpenForm}/>}
                {editMode &&
                <ActivityForm submitting={submitting} handleCloseForm={handleCloseForm} selectedActivity={selectedActivity} editOrCreate={editOrCreate}/>}
            </Grid.Column>
        </Grid>
    );
}
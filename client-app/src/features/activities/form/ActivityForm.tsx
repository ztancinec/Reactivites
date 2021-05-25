import { create } from 'domain';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { ChangeEvent } from 'react';
import { useHistory, useParams } from 'react-router';
import { Button, Form, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import {v4 as uuid} from "uuid";
import { Link } from 'react-router-dom';

export default observer( function ActivityForm() {
    const history = useHistory();
    const {activityStore} = useStore();
    const {id} = useParams<{id: string}>();

    const[acitivty, setActivity] = useState({
        id: '',
        title: '',
        description: '',
        category: '',
        date: '',
        city: '',
        venue: ''
    });

    useEffect(() => {
        if(id) activityStore.loadAcitivity(id).then(activity => setActivity(activity!));
    }, [id, activityStore.loadAcitivity]);

    function handleSubmit() {
        if(acitivty.id.length <= 0) {
            let newActivity = {
                ...acitivty,
                id: uuid()
            };
            activityStore.createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`))
        } else {
            activityStore.updateActivity(acitivty).then(() => history.push(`/activities/${acitivty.id}`));
        }
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;
        setActivity({...acitivty, [name]: value});    
    }

    if (activityStore.loadingInitial) return <LoadingComponent content='Loading activity...' />
    
    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete="off">
                <Form.Input placeholder='Title' name="title" value={acitivty.title} onChange={handleInputChange}/>
                <Form.TextArea placeholder='Description' name="description" value={acitivty.description} onChange={handleInputChange}/>
                <Form.Input placeholder='Category' name="category" value={acitivty.category} onChange={handleInputChange}/>
                <Form.Input type="date" placeholder='Date' name="date" value={acitivty.date} onChange={handleInputChange}/>
                <Form.Input placeholder='City' name="city" value={acitivty.city} onChange={handleInputChange}/>
                <Form.Input placeholder='Venue' name="venue" value={acitivty.venue} onChange={handleInputChange}/>
                <Button loading={activityStore.loading} floated='right' positive type='submit' content="Submit" />
                <Button as={Link} to='/activities' floated='right' positive type='button' content="Cancel" />
            </Form>
        </Segment>
    )
})
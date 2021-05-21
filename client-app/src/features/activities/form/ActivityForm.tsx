import React, { useState } from 'react';
import { ChangeEvent } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';

interface Props {
    selectedActivity: Activity | undefined;
    handleCloseForm: () => void;
    editOrCreate: (activity: Activity) => void;
    submitting: boolean;
}

export default function ActivityForm({handleCloseForm, selectedActivity, editOrCreate, submitting}: Props) {
    
    const initialState = selectedActivity ?? {
        id: '',
        title: '',
        description: '',
        category: '',
        date: '',
        city: '',
        venue: ''
    }

    const[acitivty, setActivity] = useState(initialState);

    function handleSubmit() {
        editOrCreate(acitivty);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;
        setActivity({...acitivty, [name]: value});    
    }
    
    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete="off">
                <Form.Input placeholder='Title' name="title" value={acitivty.title} onChange={handleInputChange}/>
                <Form.TextArea placeholder='Description' name="description" value={acitivty.description} onChange={handleInputChange}/>
                <Form.Input placeholder='Category' name="category" value={acitivty.category} onChange={handleInputChange}/>
                <Form.Input type="date" placeholder='Date' name="date" value={acitivty.date} onChange={handleInputChange}/>
                <Form.Input placeholder='City' name="city" value={acitivty.city} onChange={handleInputChange}/>
                <Form.Input placeholder='Venue' name="venue" value={acitivty.venue} onChange={handleInputChange}/>
                <Button loading={submitting} floated='right' positive type='submit' content="Submit" />
                <Button onClick={() => handleCloseForm()} floated='right' positive type='button' content="Cancel" />
            </Form>
        </Segment>
    )
}
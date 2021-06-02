import { create } from 'domain';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { ChangeEvent } from 'react';
import { useHistory, useParams } from 'react-router';
import { Button, FormField, Header, Label, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import {v4 as uuid} from "uuid";
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import MySelectionInput from '../../../app/common/form/MySelectionInput';
import { categoryOptions } from '../../../app/common/options/categoryOptions';
import MyDateInput from '../../../app/common/form/MyDateInput';
import { Activity } from '../../../app/models/activity';

export default observer( function ActivityForm() {
    const history = useHistory();
    const {activityStore} = useStore();
    const {id} = useParams<{id: string}>();

    const[acitivty, setActivity] = useState<Activity>({
        id: '',
        title: '',
        description: '',
        category: '',
        date: null,
        city: '',
        venue: ''
    });

    const validationSchema = Yup.object({
        title: Yup.string().required('The activity title is required'),
        description: Yup.string().required('The activity description is required'),
        category: Yup.string().required(),
        date: Yup.string().required('Date is required').nullable(),
        venue: Yup.string().required(),
        city: Yup.string().required(),
    });

    useEffect(() => {
        if(id) activityStore.loadAcitivity(id).then(activity => setActivity(activity!));
    }, [id, activityStore.loadAcitivity]);

    function handleFormSubmit(activity: Activity) {
        if(acitivty.id.length <= 0) {
            let newActivity = {
                ...activity,
                id: uuid()
            };
            activityStore.createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`))
        } else {
            activityStore.updateActivity(acitivty).then(() => history.push(`/activities/${acitivty.id}`));
        }
    }

    if (activityStore.loadingInitial) return <LoadingComponent content='Loading activity...' />
    
    return (
        <Segment clearing>
            <Header content='Activity Details' sub color='teal'/>
            <Formik 
                validationSchema={validationSchema}
                enableReinitialize 
                initialValues={acitivty} 
                onSubmit={values => handleFormSubmit(values)}>
                {({handleSubmit, isValid, isSubmitting, dirty}) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete="off">
                    <MyTextInput name='title' placeholder='Title'/>

                    
                    <MyTextArea rows={3} placeholder='Description' name="description"/>
                    <MySelectionInput options={categoryOptions} placeholder='Category' name="category"/>
                    <MyDateInput 
                        name="date"
                        placeholderText='Date'
                        showTimeSelect
                        timeCaption='time'
                        dateFormat='MMMM d, yyyy h:mm aa'
                        />
                    <Header content='Location Details' sub color='teal'/>
                    <MyTextInput placeholder='City' name="city"/>
                    <MyTextInput placeholder='Venue' name="venue" />
                    <Button 
                        loading={activityStore.loading} 
                        floated='right' 
                        positive 
                        type='submit' 
                        content="Submit" 
                        disabled={isSubmitting || !dirty || !isValid}/>
                    <Button as={Link} to='/activities' floated='right' positive type='button' content="Cancel" />
                </Form>
                )}
            </Formik>
            
        </Segment>
    )
})
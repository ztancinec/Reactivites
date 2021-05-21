import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';

interface Props {
    activity: Activity;
    cancelSelectActivity: () => void;
    handleOpenForm: (id: string) => void;
}

export default function ActivityDetails({activity, cancelSelectActivity, handleOpenForm}: Props) {
    return(
        <Card fluid>
            <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
            <Card.Content>
                <Card.Header>{activity.title}</Card.Header>
                <Card.Meta>
                    <span>{activity.date}</span>
                </Card.Meta>
                <Card.Description>
                    {activity.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button onClick={() => handleOpenForm(activity.id)} basic color='blue' content="Edit" />
                <Button onClick={() => cancelSelectActivity()} basic color='grey' content="Cancel" />
            </Card.Content>
        </Card>
    );
}
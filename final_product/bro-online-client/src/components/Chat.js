import React, {useState, useEffect} from 'react';
import './Chat.css';
import {useParams} from 'react-router-dom';
import {InfoOutlined, StarBorderOutlined} from "@material-ui/icons";
import Message from "./Message";
import ChatInput from "./ChatInput";
import db from '../firebase';


function Chat({imgUrl, name}) {
    const {docId} = useParams();
    const [groupMessages, setGroupMessages] = useState([]);

    useEffect(() => {
        db
            .collection('groups')
            .doc(docId)
            .collection('messages')
            .orderBy('timestamp', 'asc')
            .onSnapshot(
                snapshot => setGroupMessages(
                    snapshot.docs.map(doc => doc.data())
                )
            )
    }, [docId]);

    return (
        <div className={`chat`}>
            <div className={`chat__header`}>
                <div className={`chat__headerLeft`}>
                    <h4 className={`chat__channelName`}>
                        <strong>
                            Title
                        </strong>
                        <StarBorderOutlined/>
                    </h4>
                </div>
                <div className={`chat__headerRight`}>
                    <p>
                        <InfoOutlined /> Details
                    </p>
                </div>
            </div>
            <div className={`chat__messages`}>
                {groupMessages.map(({message, timestamp, user, userImage}) => (
                    <Message
                        message={message}
                        timestamp={timestamp}
                        user={user}
                        userImage={userImage}
                    />
                ))}
            </div>
            <ChatInput groupDocId={docId} users_name={name} users_imgUrl={imgUrl}/>
        </div>
    );
}

export default Chat;
import React, {useState} from 'react';
import './ChatInput.css';
import db from '../firebase';
//import {useStateValue} from "./StateProvider";
import firebase from 'firebase';

function ChatInput({groupDocId, users_name, users_imgUrl}) {
    const [input, setInput] = useState('');

    const sendMessage = e => {
        e.preventDefault();

        if (groupDocId) {
            db
                .collection('groups').doc(groupDocId).collection('messages').add({
                message: input,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                user: users_name,
                userImage: users_imgUrl,
            })
        }
    }

    return (
        <div className={`chatInput`}>
            <form>
                <input value={input} onChange={e => setInput(e.target.value)} placeholder={`Type your msg and press ENTER`}/>
                <button type={`submit`} onClick={sendMessage}>SEND</button>
            </form>
        </div>
    );
}

export default ChatInput;
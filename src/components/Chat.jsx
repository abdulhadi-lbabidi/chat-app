import { useEffect, useState } from "react";
import { addDoc, collection, serverTimestamp, onSnapshot, query, where, orderBy } from 'firebase/firestore'
import { auth, db } from "../firebase-config";
import '../styles/chat.css'

export const Chat = (props) => {
    const { room } = props;
    const [newMessage, setNewMessage] = useState("");
    const [messages, setMessages] = useState([]);

    const messagesRef = collection(db, "messages");


    useEffect(() => {
        const queryMessages = query(messagesRef, where("room", "==", room), orderBy("createdAt"))

        const unsubscibe = onSnapshot(queryMessages, (snapshot) => {
            let messages = [];
            snapshot.forEach((doc) => {
                messages.push({ ...doc.data(), id: doc.id });
            });
            setMessages(messages);
        });
        return () => unsubscibe();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newMessage === "") return;

        await addDoc(messagesRef, {
            text: newMessage,
            createdAt: serverTimestamp(),
            user: auth.currentUser.displayName,
            room: room,
        });

        setNewMessage("")
    }
    return <div className="chat-app">
        <div className="header">
            <h1>welcome to: {room} </h1>
        </div>
        <div className="messages" >
            {messages.map((message) => (
                <div className="message" key={message.id}>
                    <span className="user">{message.user}</span>
                    {message.text}
                </div>
            ))}
        </div>
        <form onSubmit={handleSubmit} className="new-message-form">
            <input
                className="new-message-input"
                placeholder="type your message here"
                onChange={(e) => setNewMessage(e.target.value)}
                value={newMessage}
            />
            <button className="send-button" type="submit">send </button>
        </form>
    </div>;
}
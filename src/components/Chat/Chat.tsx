import React, {FC, useEffect, useRef, useState} from 'react';
import {getAuth} from "firebase/auth";
import {useAuthState} from "react-firebase-hooks/auth";
import {getFirestore, addDoc, collection, query, orderBy, serverTimestamp} from "firebase/firestore";
import {Avatar, Button, Container, Grid, TextField} from "@mui/material";
import {useCollectionData} from "react-firebase-hooks/firestore";
import Loader from "../Lodaer";

type ChatProps = {
	children?: React.ReactElement[] | React.ReactNode[];
}

const Chat: FC<ChatProps> = ({ children }) => {
	const auth = getAuth();
	const firestore = getFirestore();
	const [user] = useAuthState(auth);
	const [messages, loading] = useCollectionData(query(collection(firestore, 'messages'), orderBy('createdAt')));

	const [message, setMessage] = useState<string>('');
	const chatContainer = useRef<HTMLDivElement>(null);

	const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setMessage(e.target.value);
	}

	const sendMessage = async () => {
		await addDoc(collection(firestore, 'messages'), {
			uid: user?.uid,
			displayName: user?.displayName,
			photoURL: user?.photoURL,
			text: message,
			createdAt: serverTimestamp()
		});
		setMessage('');
	}

	useEffect(() => {
		if (chatContainer.current) {
			chatContainer.current.scrollTop = chatContainer.current.scrollHeight;
		}
	}, [messages]);

	if (loading) {
		return <Loader />
	}

	return (
		<Container>
			<Grid
				container
				style={{ height: window.innerHeight - 70, marginTop: 20 }}
				justifyContent="center"
				direction="column"
				alignItems="center"
			>
				<div
					style={{ width: '80%', height: '50vh', border: '1px solid gray', overflowY: 'auto' }}
					ref={chatContainer}
				>
					{messages?.map(message =>
						<div
							key={message.createdAt}
							style={{
								margin: 10,
								border: user?.uid === message.uid ? '2px solid green' : '2px dashed red',
								marginLeft: user?.uid === message.uid ? 'auto' : '10px',
								width: 'fit-content',
								padding: 5
						}}
						>
							<Grid container>
								<Avatar src={message.photoURL} />
								<div>{message.displayName}</div>
							</Grid>
							<div>{message.text}</div>
						</div>
					)}
				</div>
				<Grid
					container
					direction="column"
					alignItems="flex-end"
					style={{ width: '80%', marginTop: 20 }}
				>
					<TextField
						variant="outlined"
						fullWidth
						maxRows={2}
						value={message}
						onChange={handleTextFieldChange}
					/>
					<Button
						style={{ marginTop: 20 }}
						variant="outlined"
						onClick={sendMessage}
					>
						Отправить
					</Button>
				</Grid>
			</Grid>
		</Container>
	);
};

export default Chat;

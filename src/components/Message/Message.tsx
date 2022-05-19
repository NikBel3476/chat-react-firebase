import React, {FC} from 'react';
import styles from './Message.module.css';

type MessageProps = {
	children?: React.ReactElement[] | React.ReactNode[];
}

const Message: FC<MessageProps> = ({ children }) => {
	return (
		<div>
			children
		</div>
	);
};

export default Message;

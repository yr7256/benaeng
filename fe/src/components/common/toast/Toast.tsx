import React from 'react';
import './Toast.css';

interface Message {
	id: number;
	message: string;
}

interface Props {
	messageList: Message[];
}

function Toast({ messageList }: Props) {
	return (
		<div className="z-[10000] pointer-events-none h-full bottom-0 w-full fixed center justify-end flex-col-reverse overflow-hidden pt-10">
			{messageList.map(item => (
				<div key={`${item.id}`} className="min-h-[2.5rem] toast rounded-lg bg-red text-white px-6 center shadow-lg">
					{item.message}
				</div>
			))}
		</div>
	);
}

export default Toast;

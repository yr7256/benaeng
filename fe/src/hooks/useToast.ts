import { useRef, useState } from 'react';

interface Message {
	id: number;
	message: string;
}

function useToast(): [Message[], (message: string) => void] {
	const [messageList, setMessageList] = useState<Message[]>([]);
	const countRef = useRef<number>(0);

	const addMessage = (message: string) => {
		setMessageList(pre => {
			countRef.current = (countRef.current + 1) % 1000;
			return [...pre, { id: countRef.current, message }];
		});
		setTimeout(() => setMessageList(_pre => [..._pre.slice(1)]), 2500);
	};

	return [messageList, addMessage];
}

export default useToast;

import React from 'react';

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	purchaseItems: number[];
	cycleItems: number[];
}

function CalendarModal({ isOpen, onClose, purchaseItems, cycleItems }: ModalProps) {
	if (!isOpen) return null;

	return (
		<div onClick={onClose}>
			<div onClick={e => e.stopPropagation()}>
				<h3>구매기록</h3>
				{purchaseItems.map(id => (
					<p key={id}>{id}</p>
				))}
				<h3>구매 주기일</h3>
				{cycleItems.map(id => (
					<p key={id}>{id}</p>
				))}
				<button type="button" onClick={onClose}>
					Close
				</button>
			</div>
		</div>
	);
}

export default CalendarModal;

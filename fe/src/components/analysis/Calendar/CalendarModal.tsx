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
		<div className="component stroke border" onClick={onClose}>
			<div onClick={e => e.stopPropagation()}>
				{purchaseItems.length !== 0 ? <h3 className="p-2">구매기록</h3> : ''}
				{purchaseItems.map(id => (
					<p key={id} className="pl-2 mb-2">
						{id}
					</p>
				))}
				{cycleItems.length !== 0 ? <h3 className="p-2">구매 주기일</h3> : ''}
				{cycleItems.map(id => (
					<p key={id} className="pl-2 mb-2">
						{id}
					</p>
				))}
				<button type="button" onClick={onClose} className="absolute top-2 right-2">
					X
				</button>
			</div>
		</div>
	);
}

export default CalendarModal;

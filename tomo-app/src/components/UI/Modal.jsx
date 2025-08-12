import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ onClose, onDelete }) {
	const dialog = useRef();

	useEffect(() => {
		const modal = dialog.current;
		modal.showModal();

		return () => {
			modal.close(); 
		};
	}, []);

	return createPortal(
		<dialog className="modal" ref={dialog} onClose={onClose}>
			<h2>Do you really want to delete this book?</h2>
            <div>
                <button onClick={onClose}>Cancel</button>
                <button onClick={onDelete}>Delete</button>
            </div>
		</dialog>,
		document.getElementById("modal")
	);
}

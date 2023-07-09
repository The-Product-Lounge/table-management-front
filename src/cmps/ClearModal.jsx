export const ClearModal = ({ onToggleModal, onClearEvent }) => {
  return (
    <div className="screen" onClick={onToggleModal}>
      <section
        className="clear-modal"
        onClick={(event) => event.stopPropagation()}
      >
        <h2>Are you sure?</h2>
        <p>Are you sure you want to clear the event details?</p>
        <button onClick={onClearEvent} className="red">
          Yes, Clear
        </button>
        <button onClick={onToggleModal} className="white">
          No, Cancel
        </button>
      </section>
    </div>
  );
};

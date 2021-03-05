// Components
import styles from '../styles/Commands.module.css';

export default function Commands({
  selectedTask, complete, setComplete, handleSubmit, handleUpdate, handleDelete,
}) {
  return (

    <div className={styles.container}>
      {selectedTask
        ? (
          <>
            <div
              className={styles.status}
              onClick={() => setComplete(!complete)}
            >
              {complete ? "It's completed!" : "It's still pending"}
            </div>
            <button type="submit" onClick={handleDelete}>
              <img src="eraser.svg" alt="erase" />
            </button>
            <button type="submit" onClick={handleUpdate}>
              <img src="edit.svg" alt="edit" />
            </button>
          </>
        )
        : (
          <button
            type="submit"
            onClick={handleSubmit}
            style={
                    {
                      margin: '0',
                      width: '100%',
                    }
                }
          >
            <img src="edit.svg" alt="edit" />
          </button>
        )}
    </div>
  );
}

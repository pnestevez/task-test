// Components
import formStyles from '../styles/Form.module.css';

export default function Form({
  title, color, description, handleSubmit,
}) {
  return (
    <form
      className={formStyles.container}
      onSubmit={handleSubmit}
    >
      <section className={formStyles.title}>
        <input
          className={formStyles.text}
          type="text"
          placeholder="Title"
          value={title.value}
          onChange={title.handleChange}
        />
        <input
          className={formStyles.color}
          type="color"
          value={color.value}
          onChange={color.handleChange}
        />
      </section>
      <textarea
        className={formStyles.text}
        placeholder="Description"
        value={description.value}
        onChange={description.handleChange}
      />
    </form>
  );
}

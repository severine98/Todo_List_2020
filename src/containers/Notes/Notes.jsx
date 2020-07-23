import React, { Component } from "react";
import { firestore } from "../../firebase";
import styles from "./Notes.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

class Notes extends Component {
  state = {
    todo: "",
    todos: [
      {
        text: "A new todo name",
        done: false,
      },
    ],
  };

  componentDidMount = () => {
    if (this.props.user != null) this.getAllFromFirebase();
  };

  handleChange = (event) => {
    if (event.currentTarget.value.length > 12) {
      alert("Your todo can't me more than 12 characters long.");
    }
    this.setState({
      todo: event.currentTarget.value,
    });
  };

  handleCheckbox = (index) => {
    const { todos } = this.state;
    todos[index].done = !todos[index].done;
    this.setState({
      todos,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.addToFirebase();
  };

  addToFirebase = () => {
    firestore
      .collection(this.props.user.uid)
      .doc()
      .set({ todo: this.state.todo })
      .then((res) => {
        this.getAllFromFirebase();
      })
      .catch((err) => console.log(err));
  };

  getAllFromFirebase = () => {
    firestore
      .collection(this.props.user.uid)
      .get()
      .then((res) => {
        this.setState({
          todos: res.docs.map((doc) => {
            return { ...doc.data(), id: doc.id };
          }),
        });
      })
      .catch((err) => console.log(err));
  };

  handleRemove = (index) => {
    const { todos } = this.state;
    this.setState({
      todo: "",
      todos: [...todos.slice(0, index), ...todos.slice(index + 1)],
    });
  };

  // remove from database

  removeFromDatabase = (i) => {
    firestore
      .collection(this.props.user.uid)
      .doc(i.id)
      .delete()
      // .then((res) => this.getAllFromFirebase())
      .then((res) => console.log("item deleted from Firebase!"))
      .catch((err) => console.log(err));
  };

  render() {
    const { todo, todos } = this.state;
    return (
      <div className={styles.notes}>
        <h1 className={styles.title}>My To-Do list:</h1>
        <div className={styles.form}>
          <form onSubmit={this.handleSubmit}>
            <input
              className={styles.enter}
              onChange={this.handleChange}
              value={todo}
              name="todo"
              type="text"
              placeholder="Enter todo here...[Press Enter]"
              autoComplete="off"
            />
          </form>
          <ul>
            {todos.length === 0 ? (
              <li className="todo list-group-item">No todos yet</li>
            ) : (
              todos.map((item, key) => (
                <>
                  <li checked={item.done} key={`list-${key + 1}`}>
                    <input
                      className={styles.checkbox}
                      type="checkbox"
                      onChange={() => this.handleCheckbox(key)}
                      checked={item.done}
                    />
                    <span
                      className={styles.text}
                      style={{
                        textDecoration: item.done ? "line-through" : "none",
                      }}
                    >
                      {item.todo}
                    </span>
                    <button
                      onClick={() => {
                        this.handleRemove(key);
                        this.removeFromDatabase(item);
                      }}
                      className={styles.delete}
                    >
                      <FontAwesomeIcon icon={faTrash} className={styles.icon} />
                    </button>
                  </li>
                </>
              ))
            )}
          </ul>
        </div>
      </div>
    );
  }
}

export default Notes;

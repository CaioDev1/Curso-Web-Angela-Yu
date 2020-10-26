import React from "react";

function CreateArea(props) {

  return (
    <div>
      <form onSubmit={props.addItem}>
        <input name="title" placeholder="Title" onChange={props.onChange} value={props.value.title} autoComplete="off"/>
        <textarea name="content" placeholder="Take a note..." rows="3" onChange={props.onChange} value={props.value.content} autoComplete="off" />
        <button type='submit'>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;

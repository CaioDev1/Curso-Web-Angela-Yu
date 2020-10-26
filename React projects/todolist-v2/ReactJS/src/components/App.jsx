import React, {useState} from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [inputText, setInputText] = useState({
    title: '',
    content: ''
  })

  function updateText(event) {
    let {value, name} = event.target
    
    setInputText(preValue => {
      return {
        ...preValue,
        [name]: value
      }
    })
  }

  const [item, setItem] = useState([])

  function addItem(event) {
    setItem(() => {
      return ([
        ...item,
        inputText
      ])
    })
    event.preventDefault()
  }

  function deleteItem(id) {
    setItem(preValue => {
      return (
        preValue.filter((item, index) => {
          return (
            index !== id
          )
        })
      )
    })
  }

  return (
    <div>
      <Header />
      <CreateArea addItem={addItem} value={inputText} onChange={updateText} />
      {item.map((item, index) => (<Note key={index} id={index} title={item.title} content={item.content} delete={deleteItem} />))}
      <Footer />
    </div>
  );
}

export default App;

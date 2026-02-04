import { useEffect, useState } from "react";
import "./App.css";
import axios, { formToJSON } from "axios";
function App() {
  const [notes, Setnotes] = useState([]);
  const [editid,setEditId] =useState('');
  const [description,setEditdescription]=useState('');
  
  async function apicall() {
    await axios.get("http://localhost:3000/post").then((res) => {
      Setnotes(res.data.notes);
    });
  }

  async function submithandler(e) {
    e.preventDefault();
    const formdata = new FormData(e.target);
    const title = formdata.get("title");
    const description = formdata.get("description");

    await axios.post("http://localhost:3000/post", {
      title,
      description,
    });

    title=''
    description=''

    apicall();
  }

  async function deletehandler(id) {

    await axios.delete("http://localhost:3000/post/"+id)
    apicall()
  }

  async function updatehandler(id){
   
   await  axios.patch('http://localhost:3000/post/'+id,{
          description: description
    })
    setEditId(null)
    setEditdescription('')
    apicall()
  }
  useEffect(() => {
    apicall();
  }, []);
  return (
    <>
      <form action="" method="post" onSubmit={submithandler}>
        <input name="title" type="text" placeholder="Enter your title" />
        <input
          name="description"
          type="text"
          placeholder="Enter your description"
        />
        <button>Sumbit</button>
      </form>
      <div className="note container">
        {notes.map((e, indx) => {
          return (
            <div className="note" key={e._id}>
              <h1>{e.title}</h1>
              <p>{e.description}</p>
              <button
                onClick={() => {
                  deletehandler(e._id);
                }}
              >
                Delete
              </button>

              <button onClick={()=>{
                setEditId(e._id)
                setEditdescription(e.description)
              }}>update</button>
  
              {e._id === editid && (
                <>
                <input type="text" placeholder="update description" 
                  value={description} 
                  onChange={(e)=>{
                    setEditdescription(e.target.value)
                  }}         
                />
                <button onClick={()=>{
                  updatehandler(e._id)
                }}>done</button>
                
                </>
              )}
     </div>
          );
        })}
      </div>
    </>
  );
}

export default App;

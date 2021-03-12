import React, {useEffect} from 'react';
import { useHistory } from "react-router-dom";
import style from './inputTable.module.css'


const AddInput = () => {
  const history = useHistory();

  const api = 'https://back-retention.herokuapp.com';


  const [inputList, setInputList] = React.useState([
    { userId:"", dateRegistration: "",  dateLastActivity: "", },
    // { firstName: "",  lastName: "", },
  ])
  const [result, setResult] = React.useState()

  const handleChange = (e, index) => {
    const {name, value} = e.target;

    const list = [...inputList];
    list[index][name] = value;
    
    setInputList(list)

    // setInputList({
    //   ...inputList,
    //   [name]: value
    // });
  }

  const handleAddInput = () => {
    setInputList([...inputList, {userId:"", dateRegistration: "", dateLastActivity: ""}]) 
  }
  
  const handleRemoveInput = (i) => {
    const list = [...inputList];
    list.splice(i, 1);
    setInputList(list);
  }
  
  const saveFunc = (e) => {
    fetch(`${api}/api/users`, {
        method: "POST",
        headers:{ 
          "Content-Type": "application/json" ,
          'Accept': 'application/json'
        },
        body:JSON.stringify({inputList})
      })
      .then(res => {
        if(res.ok) {
          console.log('eee');
          history.push('/')
        }
      })
      .then(data => console.log(data))
  }

  const calculate = () => {
    fetch(`${api}/api/retention`)
    .then(res => res.json())
    .then(data => setResult(data.answer))
  }

  return (
    <div className={`${style.main}`}>
    <div className={`${style.mr}`}>
      <div>
        <b>AB TEST REAL</b> <br />
      </div>
      

    {inputList.map((item, i) => {
      return (
        <div className={`${style.main} ${style.mr}`} key={i}>
          <div className={`${style.line}`}>
        <input
          type="text"
          name="userId"
          placeholder="User ID"
          value={item.userId}
          onChange={ (e) => handleChange(e, i)}
        />
        </div>
        <div className={`${style.line}`}>
        <input
          type="text"
          name="dateRegistration"
          placeholder="Registration (dd.mm.yyyy)"
          value={item.dateRegistration}
          onChange={ (e) => handleChange(e, i)}
        />
        </div>
        <div className={`${style.line}`}>
        <input
          type="text"
          name="dateLastActivity"
          placeholder="Last Activity (dd.mm.yyyy)"
          value={item.dateLastActivity}
          onChange={(e) => handleChange(e, i)}
        />
        </div>
        <div className={`${style.line}`}>
        {inputList.length !== 1 && <input
          type="button"
          value="remove"
          onClick={() => handleRemoveInput(i)}
        />}
        </div>
        <div className={`${style.line}`}>
        {inputList.length - 1 === i && <input
          type="button"
          value="new line"
          onClick={handleAddInput}
        />}
        </div>
      </div>
      )
    })}
    <div>
      <div className={style.butt}>
        <button onClick={calculate}>Calculate rolling retention 7 days</button>
      </div>
      <div className={style.butt} style={{}}>
        <form onSubmit={ () => saveFunc() }>
          <button>SAVE</button>
        </form>
      </div>
    </div>

    </div>
    Rolling Retention of 7 days: {result}
    
    </div>
    
  )
}

export default AddInput;

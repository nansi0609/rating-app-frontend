import React, { useState }  from "react";
import TextField from '@material-ui/core/TextField';
import  './App.css';
import Rating from 'react-rating';
import axios from 'axios';



const App =() =>{
  // const url = "http://localhost:4000/submit"
    const [user, setUser] = useState({
      fname: "",
      date_time: "",
      communication: 0,
      technical_skills: 0,
      attitude: 0,
      team_player: 0,
      remarks: ""
    });
    
   const handleChange = (e)=> {
     const name = e.target.name;
     const value = e.target.value;
     console.log(value,name);
    setUser({...user,[name]:value});
    }
   const handleInput=(name,value)=>{
    console.log(value,name);    
    setUser ({...user ,[name]: value});
  } 
    
  const handleReset = () => {
    setUser({
      ...user,
      fname: "",
      date_time: "",
      communication: 0,
      technical_skills: 0,
      attitude: 0,
      team_player: 0,
      remarks: "",
      activo:true

    });
  };

  const postdata = (e) => {
    e.preventDefault();
     const newRecord = {...user};
     console.log(newRecord);
    
    axios.post(`http://localhost:4000`, user)
    .then(res => {
       console.log(res);
       console.log(res.data); 
       alert("Your data submitted successfully")
       if(res.status===200){
        handleReset();
       }
     
    })
   
    
   
  }
               
                 return(
                    <div align="center">         
                      <h1 align="center" >CANDIDATE RATING</h1><br/>
                      <br/>
                      <form align="center">
                      <label>Candidate Name:  </label>
                      <input type="text" onChange={(e)=>handleChange(e)} name="fname" value={user.fname} placeholder="FullName" /><br/><br/>
                      <label>Interview Date/Time : </label>
                      <TextField
                        onChange={(e)=>handleChange(e)}
                        id="outlined-basic" 
                        variant="outlined"
                        type="datetime-local"           
                        className= "textField"
                        name="date_time"
                        value={user.date_time}
                        InputLabelProps={{
                        shrink: true,
                        }}
                      /><br/>
                        <br/>
                      <label align="left">Communication: </label>&nbsp;&nbsp;&nbsp;
                      <Rating
                      initialRating={user.communication}
                      onChange={(e)=>handleInput("communication",e)}        
                        emptySymbol="fa fa-star-o fa-2x"
                        fullSymbol="fa fa-star fa-2x"
                        fractions={2}
                        name="communication"
                      /><br/>
                      <br/>
                      <label>Technical Skills: </label>&nbsp;&nbsp;&nbsp;
                      <Rating
                        onChange={(e)=>handleInput("technical_skills",e)}
                        initialRating={user.technical_skills}
                        emptySymbol="fa fa-star-o fa-2x"
                        fullSymbol="fa fa-star fa-2x"
                        fractions={2}
                        name="technical_skills"
                      /><br/>
                      <br/>
                      <label>Attitude: </label>&nbsp;&nbsp;&nbsp;
                      <Rating
                          onChange={(e)=>handleInput("attitude",e)}
                          initialRating={user.attitude}
                          emptySymbol="fa fa-star-o fa-2x"
                          fullSymbol="fa fa-star fa-2x"
                          fractions={2}
                          id="attitude"
                          name="attitude"                    
                      
                      /><br/>
                        <br/>
                       <label>Team Player :</label>&nbsp;&nbsp;&nbsp;
                      
                      <Rating
                          onChange={(e)=>handleInput("team_player",e)}
                          initialRating={user.team_player}
                          emptySymbol="fa fa-star-o fa-2x"
                          fullSymbol="fa fa-star fa-2x"
                          fractions={2}
                          name="team_player"
                      /><br/>
                      <br/>
                      <label>Remarks: </label>
                      <input type="textarea"onChange={(e)=>handleChange(e)} name="remarks"  placeholder="Remarks" autoComplete="off" value={user.remarks}/><br/><br/><br/>
                      <input type="submit" id="submit" value="Submit"  onClick={postdata}/>&nbsp;
                      <input type="reset" id="clear" onClick={handleReset} value="Clear"/>
                      </form>
                      </div>
   );
        }  
        

export default App
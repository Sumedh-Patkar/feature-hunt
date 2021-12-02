import React from 'react';
import { ReactSession } from "react-client-session";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import Service from "../Service";
import {useHistory} from "react-router-dom";


const Styles = styled.div`
 background: #218888;
 padding: 20px;

 h3 {
   border-bottom: 1px solid white;
   color: #6f6f6f;
   font-family: sans-serif;
   font-size: 20px;
   font-weight: 600;
   line-height: 24px;
   padding: 10px;
   text-align: center;
 }

 form {
   background: white;
   border: 1px solid #dedede;
   display: flex;
   flex-direction: column;
   justify-content: space-around;
   margin: 0 auto;
   padding: 50px 150px;
 }

 .input {
   

   margin: 10px 10px;
   width: 500px;
 }

 label {
   color: #6f6f6f;
   display: block;
   font-family: sans-serif;
   font-size: 14px;
   font-weight: 500;
   margin-bottom: 5px;
 }

 .error {
   color: red;
   font-family: sans-serif;
   font-size: 12px;
   height: 30px;
 }

 .submitButton {
   background-color: #218888;
   color: white;
   font-family: sans-serif;
   font-size: 14px;
   margin: 20px 0px;
   padding: 20px 10px;
   border: none;
`;

//
//       Component: ProjectFrom
//       Description: This component displays the form for a user to submit a new project
//
//       Inputs:
//           - NA
//       Outputs:
//          - NA
function ProjectForm() {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [imageURL, setImageURL] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [user, setUser] = React.useState([""]);
  const [tags, setTags] = React.useState("");
  const [contributors, setContributors] = React.useState("");
  const [date, setDate] = React.useState("");
  const history = useHistory();

/*
  const goTo = (page) => () => {
    history.push('/' + page);
  };
*/
  React.useEffect(() => {
    setUser(ReactSession.get("username"));
  }, []);

  const handleNameChange = (e) => {
    setName(e.target.value);
  }

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  }

  const handleImageURLChange = (e) => {
    setImageURL(e.target.value);
  }

  const handleTagsChange = (e) => {
    setTags(e.target.value);
  }

  const handleContributorsChange = (e) => {
    setContributors(e.target.value);
  }

  const handleDateChange = (e) => {
    setDate(e.target.value);
  }


  const handleSubmit = (event) => {
    const form = new FormData();


    form.append("productName", name);
    form.append("productDescription", description);
    form.append("imageUrl", imageURL);
    form.append("email", user);
    form.append("tags", tags);
    Service.post("addProduct", form)
      .then((data) =>
        {setMessage(data.message);
          console.log(data.code);

       /*   if (data.code > 200) {
            console.log(message)
          }
          else{
                history.push('/');
          }*/
        }).catch(function(err){
          setMessage("There was a problem submitting your product. Please try again later.")
      });
       history.push('/dashboard');
   }

  return (
    <div className="container">

        <div className="product-title">

        </div>
      
          <form data-testid="submit_form">
               <h3>PROJECT FORM</h3>
              
                <TextField
                  data-testid="form_name"
                  id="name"
                  className="input"
                  label="Name"
                  multiline
                  maxRows={1}
                  inputProps={{ "data-testid": "form-inputName" }}
                  value={name}
                  onChange={handleNameChange}
                  fullWidth
                />

                <TextField
                  id="description"
                  className="input"
                  label="Description"
                  multiline
                  rows={3}
                  inputProps={{ "data-testid": "form-Desc" }}
                  value={description}
                  onChange={handleDescriptionChange}
                  fullWidth
                />
                
                <TextField
                  id="imageURL"
                  label="Add Image URL"
                  className="input"
                  multiline
                  maxRows={1}
                  inputProps={{ "data-testid": "form-Img" }}
                  value={imageURL}
                  onChange={handleImageURLChange}
                  fullWidth
                />
              
                <TextField
                  id="tags"
                  label="Tags"
                  className="input"
                  multiline
                  maxRows={1}
                  inputProps={{ "data-testid": "form-Tags" }}
                  value={tags}
                  onChange={handleTagsChange}
                  fullWidth
                />
                
                <TextField
                  id="contributors"
                  label="Contributors"
                  className="input"
                  multiline
                  rows={5}
                  inputProps={{ "data-testid": "form-Contributors" }}
                  value={contributors}
                  onChange={handleContributorsChange}
                  fullWidth
                />
                
                <TextField
                  id="date"
                  label="Date"
                  type="date"
                  className="input"
                  multiline
                  maxRows={1}
                  inputProps={{ "data-testid": "form-Date" }}
                  value={date}
                  onChange={handleDateChange}
                  fullWidth
                />
              <br/>
            
            <button data-testid="submit_button" onClick={handleSubmit} className = "submitButton">Submit</button>
          </form>
    </div>
  );
}

export default function ProjectSubmittal() {
    return (
        <Styles>
            <ProjectForm/>
        </Styles>
    );
}
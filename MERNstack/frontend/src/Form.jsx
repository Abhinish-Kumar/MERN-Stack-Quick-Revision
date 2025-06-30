import { useState } from "react";

const Form = () => {
  const [data, setData] = useState({
    name: "",
    bio: "",
    email: "",
    number: "",
  });
  const [profilePicture, setProfilePicture] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    let formData = new FormData();
    
    // Append all text fields
    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    });
    
    // Append the file if it exists
    if (profilePicture) {
      formData.append("profilePicture", profilePicture);
    }

    let resp = await fetch("http://localhost:3000/", {
      method: "POST",
      body: formData
      // Don't set Content-Type header - the browser will set it automatically with the correct boundary
    });
    console.log(await resp.json());
  }

  function handleChange(e) {
    setData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  }

  function handleFileChange(e) {
    setProfilePicture(e.target.files[0]);
  }

  return (
    <div style={{ border: "2px solid", padding: "1rem" }}>
      <h1>This is a form component</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={data.name}
          onChange={handleChange}
          placeholder="Enter name"
        />
        <input
          type="email"
          name="email"
          value={data.email}
          onChange={handleChange}
          placeholder="enter email"
        />
        <input
          type="text"
          name="bio"
          value={data.bio}
          onChange={handleChange}
          placeholder="enter bio"
        />
        <input
          type="number"
          name="number"
          value={data.number}
          onChange={handleChange}
          placeholder="enter number"
        />
        <input
          type="file"
          name="profilePicture"
          onChange={handleFileChange}
        />
        <button type="submit">Submit</button>
       
      </form>
    </div>
  );
};

export default Form;
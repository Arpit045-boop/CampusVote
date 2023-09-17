import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
// import CandidatePost from '../Components/CandidatePost';
import PostCard from '../Components/PostCard';
import axios from 'axios';

function CandidatePage() {
  const userEmail = localStorage.getItem("UserEmail");
  const authToken = localStorage.getItem("authToken");

  const [name, setName] = useState("");
  
  const [userData, setUserData] = useState(null);
  const [postData, setPostData] = useState(null);
  const [partyName, setPartyName] = useState("");
  const [slogan, setslogan] = useState("");
  const [img, setImg] = useState(null);
  const [desc, setdesc] = useState("");
  const [loading, setLoading] = useState(true);
  const [isCandidate,setIsCandidate] = useState(false);
  const [postImage, setPostImage] = useState({ myImg: "" });
  const [isImage, setIsImage] = useState(false);

  const getResponse = async () => {
    try {
      const fetch_userData = await fetch("http://localhost:8000/api/getUserData");
      const fetch_postData = await fetch("http://localhost:8000/api/getPost");
      // console.log(img);
      setPostData(await fetch_postData.json());
      setUserData(await fetch_userData.json());
      
      setLoading(false);
    }
    catch (error) {
      console.error(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (img) {
      if (img.length !== 0) {
        setIsImage(true);
      }
    }

  }, [])


  const handleClick = async (e) => {
    e.preventDefault();
    const addPost = await fetch("http://localhost:8000/api/createPost", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          candidateName: name,
          partyName: partyName,
          slogan: slogan,
          email:userEmail,
          description: desc,
          img:postImage
        }
      )
    });
    const resp = await addPost.json();
    if (resp) {
      alert("Post added successfully");
    }

  }

  useEffect(()=>{
    // console.log("saasas");
    if (userEmail) {
      const userObj = userData && userData.find(obj => obj.email === userEmail);
      // console.log(userObj);
      if (userObj) {
        console.log(userObj);
        setName(userObj.name);
        if(userObj.isCandidate === true){
          console.log(userObj[0]);
          setIsCandidate(true)
        }
      }
      else{
        setName("")
      }
    }
  },[userEmail,userData])

  
  useEffect(() => {
    getResponse();
    // console.log(img);
  }, [])

  if (loading) {
    return <p>Loading...</p>;
  }
  return (

    isCandidate ?
      <div>
        <Navbar />
        <h1 className='mt-3 my-3'>
          Welcome {userEmail ? name : ""}
        </h1>
        {/* <!-- Button trigger modal --> */}
        <button type="button" className="btn btn-success btn-lg" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Post Anything
        </button>

        {/* <!-- Modal --> */}
        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Post Something...</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">

                <div className='candidatePost'>
                  <form onSubmit={handleClick}>
                    <div className='container'>
                      
                      <label for="exampleInputEmail1" className="form-label my-3">Slogan</label>
                      <input type="text" className="form-control" style={{}} name='slogan' value={slogan} placeholder='Slogan'
                        onChange={(e) => setslogan(e.target.value)}
                      />
                      <label for="exampleInputEmail1" className="form-label my-3">Upload Image</label>
                      <input
                        type="file"
                        className="form-control"
                        style={{}} name='img'
                        onChange={async (e) => {
                          const file = e.target.files[0];
                          const base64 = await convertToBase64(file);
                          setPostImage({ ...postImage, myFile: base64 });
                        }}  
                      />

                      <label for="exampleInputEmail1" className="form-label my-3">Description</label>
                      <textarea className="form-control my-3" id="paragraphInput" rows="4" placeholder='Write some Description about post'
                        name='desc' value={desc} onChange={(e) => setdesc(e.target.value)}

                      ></textarea>
                    </div>
                    <div className="modal-footer">
                      <button type="submit" className="btn btn-outline-success" style={{ marginRight: "200px" }}>Post</button>
                    </div>
                  </form>

                </div>
              </div>

            </div>
          </div>
        </div>

        <div>
          {postData && postData.map((item, index) => {
            var Finalimage;
            Finalimage = isImage ? img[0].myFile : "";
            // const Finalimage = ""
            return (
              <PostCard key={item._id} name={item.candidate} slogan={item.slogan} desc={item.desc} img={item.img} isUpvote={true} />
            )

          })}

        </div>


      </div>
      : 
      <div>

        <Navbar />

        <h1 className='my-3'>Please Login as a Candidate</h1>


      </div>
  )
}

export default CandidatePage


function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result)
    };
    fileReader.onerror = (error) => {
      reject(error)
    }

  })
}


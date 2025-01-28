import { useEffect, useState } from "react";

function Data(URL){
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [auth,SetAuthers] = useState([])
  const [posts,setposts] = useState([])
  const [likes,setLikes] = useState([])
  const [comments,setComments] = useState([])
  useEffect(() => {
    fetch(URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        SetAuthers(data)
        setLikes(data)
        setposts(data)
        setComments(data)
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [URL]);
  if(error){
    return <div>error</div>
  }
  if(loading){
    return <div style={{fontSize:'larger',fontWeight:'bold',color:'gray'}}>thoda or intezar.... &#128640</div>
  }
  return {auth,likes,posts,comments, error, loading};
};

export default Data;

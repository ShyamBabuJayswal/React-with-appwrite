import React,{useState,useEffect} from 'react'
import appwriteSerivce from '../appwrite/config'
import { Container, PostCard } from '../components'

function AllPost() {
    const[posts,setPosts] = useState([])
    useEffect(()=>{},[])
    appwriteSerivce.getPosts([]).then((posts)=>{
        if(posts){
            setPosts(posts.documents)
        }
    })
  return (
    <div className='w-full py-8'
    ><Container>
      
        <div  className='flex flex-wrap'
        >
            {posts.map((post)=>(
                <div key={post.$id}>
                    
               <PostCard post={post} />
                </div>
            ))}
        </div>

            
        
      
    </Container></div>
  )
}

export default AllPost
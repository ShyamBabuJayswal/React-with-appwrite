import React,{useCallback} from 'react'

import { useForm } from 'react-hook-form'
import {Button, Input, Select,RTE } from '../index'
import appwriteService from '../../appwrite/config'
import { Navigate, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
function PostForm({post}) {
    const {register, handleSubmit, watch, setValue, control,getValues} = useForm({
        defaultValues:{
            title: post?.title || '',
            slug: post?.slug  || '',
            content : post?.content ||'',
            status:post?.status  || 'active',

        }
    })
     const useNavigate =useNavigate()
     const userData = useSelector(state => state.user.userData)
     const submit=async(data)=>{
        if(post){
        const file = data.image[0] ? appwriteService.uploadFile(data.image[0]): null
        if(file){
            appwriteService.deletefile(post.featuredIamge)
        }
        const dbPost=await appwriteService.updatePost(post.$id,{
            ...data,
            featuredImage:file? file.$id : undefined,
        })
            if(dbPost){
               Navigate(`/post/$(dbPost.$id)`)
            
        }
        else{
           const file = await appwriteService.uploadFile(data.image[0])

           if(file){
           const fileId=file.$id
           data.featuredIamge=fileId
          const dbPost= await appwriteService.createPost({
            ...data,
            userId:userData.$id
           })
           if(dbPost){
            navigate(`/post/${dbPost.$id}`)
           }
           }
        }
    

        }
     }


     const slugTransform = useCallback((value) =>{
        if(value && typeof(value) === 'string'){
            return value
            .trim()
            .toLowerCase()
            .replace(/[a-zA-Z\d\s]+/g,'-') 
            .replace(/\s/g,'-')
        }
        return ''
     },[])

  return (
    <div>PostForm</div>
  )
}

export default PostForm
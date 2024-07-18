import conf from "../conf/conf.js";

import { Client,ID, Databases, Storage,Query } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title, slug, content, featuredImage,status, userId}){
        return await this.databases.createDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug,
            {
                title,
                content,
                featuredImage,
                status,
                userId,
            }
        ) 

    }

    async updatePost(slug,{title, content, featuredImage,status}){
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,{
title, content, featuredImage, status, 
        })
    } 

    async deletePost(slug){
        await this.databases.deleteDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug
        )
        return true ;
    }

    async getPost(slug){
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      ) 
    }

    async getPosts(queries = [Query.equal("status","active")]){
        return await this.databases.listDocuments(conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            queries,
            

        )
    }


    // file upload service
    async uploadFile(file){
      return await this.bucket.createFile(conf.appwriteBucketId,
        ID.unique(),
        file
      )
        
    }

    //file delete service

    async deletefile(fileId){
        await this.bucket.deleteFile(conf.appwriteBucketId,
            fileId
        )
        return true;
    }


   //file preview

   getFilePreview(fileId){
    return this.bucket.getFilePreview(conf.appwriteBucketId
        ,fileId
    )
   }

 

}
 const service = new Service()
export default service;


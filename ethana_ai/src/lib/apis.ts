import axios from 'axios';

import { toast } from 'react-toastify';


import { baseURL } from './urls';


const instance = axios.create({
    baseURL:baseURL,
    withCredentials: true

  });


const Api = {
    get: ({ url, contentType = "application/json", show = 1 }:any) => {
        console.log(show)
    
        return instance({
            method: "GET",
            url,
            withCredentials: true,
            headers: {
                'Content-Type': contentType
            }
        });
    },
    post: ({ data={}, url='',contentType = "application/json", show = 1, cb = () => { } ,msg=null}:any) => {
       
        return instance({
            method: "POST",
            data,
            url,
            headers: {
                'Content-Type': contentType
            },
            withCredentials:true
           
        }).then(res => {
             
            if (show){

                toast.success(msg?msg:'Data added successfully', {
                    position: 'top-center',
                    theme: "colored"
                });
               
            }

            cb();
            return res;
        }).catch(err => {
            console.log("ther me, dcekjesbfc k",err?.response?.data?.msg)
            toast.error(err?.response?.data?.msg, {
                position: 'top-center',
                theme: "colored"
            });
           
            return err;
        })
        .finally(() => {
            // console.log('Experiment completed');

          });
    },
    delete: ({ data, url, contentType = "application/json", show = 1 }:any) => {
        console.log(show)
        return instance({
            method: "DELETE",
            data,
            url,
            headers: {
                'Content-Type': contentType
            }
        });
    },
    patch: ({ data={}, url="", contentType = "application/json", show = 1, upload = false, cb = () => { } }) => {
        console.log(show)
        console.log(upload)
        return instance({
            method: "PATCH",
            data,
            url,
            headers: {
                'Content-Type': contentType
            },
           
        }).then(res => {
             
            if (show){

                toast.success('Data updated successfully', {
                    position: 'top-center',
                    theme: "colored"
                });
            }
            
            cb();
            return res;
        }).catch(err => {
            //console.log("ther me, dcekjesbfc k",err)
            toast.info(err?.response?.data?.msg, {
                position: 'top-center',
                theme: "colored"
            });
          
            return err;
        })
    },
    
};

export default Api;
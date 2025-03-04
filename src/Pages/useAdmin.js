import axios from "axios"
import { useMutation, useQuery } from "react-query"

// post user //
const addAdmins=(data)=>{
    return axios.post("http://localhost:2000/user",data)
}

export const useAddAdmins=()=>{
    return useMutation(addAdmins,{
        onSuccess:()=>console.log("data added"),
        onError:()=>console.log("Error"),
    })
}

// fetch user //
const fetchAdmin=()=>{
    return axios.get("http://localhost:2000/user")
}
export const useFetchAdmin=()=>{
    return useQuery("users",fetchAdmin)
}

// delete //
const deleteAdmin=(id)=>{
     return axios.delete(`http://localhost:2000/user/${id}`);
}
export const useDeleteAdmins=()=>{
    return useMutation(deleteAdmin,{
        onSuccess:()=>console.log("data deleted"),
        onError:()=>console.log("Error"),
    })
}

// edit //
const editUser = ({ id, data }) => {
    return axios.put(`http://localhost:2000/user/${id}`, data);
};
export const useUpdateUser = () => {
    return useMutation(editUser, {
        onSuccess: () => console.log("Data updated"),
        onError: () => console.log("Error"),
    });
};


  
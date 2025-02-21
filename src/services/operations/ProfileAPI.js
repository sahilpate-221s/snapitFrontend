import axios from "axios";
import {profileEndpoints} from "../apis";
import { toast } from "react-toastify";

const {
    MY_PROFILE_API
} = profileEndpoints;

export function myProfile(navigate)
{
    return async (dispatch)=>
    {
        try{
            const response = await axios.get(MY_PROFILE_API,
                {
                    withCredentials: true,
                }
            );
            if(!response.data.success)
            {
                console.log(response.data.message || "Error while fetching user profile");
            }
            
        }
        catch(error)
        {
            console.log(error);
           console.log("error while fetching profile")
           toast.error("failed to fetch profile");
        }
    }
}
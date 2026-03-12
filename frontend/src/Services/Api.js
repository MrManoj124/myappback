

const API_URL=process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const apicall = async (endpoint, options ={})=>{
    try{
        const response = await fetch(`${API_URL}${endpoint}`,{
            headers:{
                'Content-Type':'appication/json',
                ...options.headers,
            },
            ...options,
        });

        const data=await response.json();
        if(!response.ok){
            throw new Error(data.message || 'Something went wrong');
        }

        return {success : true, ...data};
    }
    catch(error){
        return {success : false, message:error.message};
    }
};

export const registerUser = async (userData) => {
  try {
    const response = await fetch("http://localhost:5000/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    return await response.json();
  } catch (error) {
    console.error("Register API Error:", error);
  }
};


export const loginUser = async (credentials)=>{
    return apicall('/login',{
        method:'POST',
        body:JSON.stringify(credentials),
    });
};

export const getUserProfile = async (token)=>{
    return apicall('/user',{
        method:'GET',
        headers:{Authorization:`Bearer ${token}`,},
    });
};

export const verifyEmail = async(token)=>{
    return apicall('/verify-email/confirm',{
        method:'POST',
        body:JSON.stringify({token}),
    });
};

export const senderVerificationEmail=async(email)=>{
    return apicall('/verify-email/send',{
        method:'POST',
        body:JSON.stringify({email}),
    });
};

export const requestPasswordReset = async(email)=>{
    return apicall('/password/reset-request',{
        method:'POST',
        body:JSON.stringify({email}),
    });
};

export const resetPassword = async(token, newPassword)=>{
    return apicall('/password/reset',{
        method:'POST',
        body:JSON.stringify({token, password:newPassword}),
    });
};

export const googleLogin = async()=>{
    window.location.href=`${API_URL}/auth/google`;
    return{success:true};
};

export const facebookLogin=async()=>{
    window.location.href=`${API_URL}/auth/facebook`;
    return{success:true};
}
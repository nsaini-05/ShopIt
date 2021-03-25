import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  CLEAR_ERRORS,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,  
  LOAD_USER_FAIL,  
LOGOUT_USER_SUCCESS ,
LOGOUT_USER_FAIL,

UPDATE_PROFILE_FAIL,
UPDATE_PROFILE_REQUEST,
UPDATE_PROFILE_SUCCESS,
UPDATE_PROFILE_RESET,

UPDATE_PASSWORD_REQUEST,
UPDATE_PASSWORD_SUCCESS,
UPDATE_PASSWORD_FAIL,  
UPDATE_PASSWORD_RESET  ,


FORGOT_PASSWORD_REQUEST,
FORGOT_PASSWORD_SUCCESS,
FORGOT_PASSWORD_FAIL ,

NEW_PASSWORD_REQUEST,
NEW_PASSWORD_SUCCESS,
NEW_PASSWORD_FAIL,
ALL_USER_REQUEST,
ALL_USER_SUCCESS,
ALL_USER_FAIL,

UPDATE_USER_FAIL,
UPDATE_USER_REQUEST,
UPDATE_USER_SUCCESS,
USER_DETAILS_REQUEST,
USER_DETAILS_FAIL,
USER_DETAILS_SUCCESS,

DELETE_USER_FAIL,
DELETE_USER_SUCCESS,
DELETE_USER_REQUEST








} from "../constants/userConstants";

import axios from "axios";

export const login = (email, password) => async (dispatch) => {
  try {



    dispatch({ type: LOGIN_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/v1/user/login",
      { email, password },
      config
    );

    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data.Message,
    });
  }
};


export const register = (userData) => async (dispatch) => {
    try {  
      dispatch({ type: REGISTER_USER_REQUEST });
      const config = {
        headers: {
          "Content-Type": 'multipart/form-data',
        },
      };
      const { data } = await axios.post(
        "/api/v1/user/register",
       userData,
        config
      );
  
      dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
    } catch (error) {
      dispatch({
        type: REGISTER_USER_FAIL,
        payload: error.response.data.message,
      });
    }
  };



  
export const loadUser = () => async (dispatch) => {
  try {  
    dispatch({ type: LOAD_USER_REQUEST });

    const { data } = await axios.get("/api/v1/me");

    dispatch({ type:  LOAD_USER_SUCCESS, payload: data.user });

  } catch (error) {
    dispatch({
      type: LOAD_USER_FAIL,
      payload: error.response.data.Message
    });
  }
};









export const logout = () => async (dispatch) => {
  try {  

    const { data } = await axios.get("/api/v1/user/logout");

    dispatch({ type:  LOGOUT_USER_SUCCESS});

  } catch (error) {
    dispatch({
      type: LOGOUT_USER_FAIL,
      payload: error.response.data.Message,
    });
  }
};




export const updateProfile = (userData) => async(dispatch) =>{
  try
  {

    dispatch({ type: UPDATE_PROFILE_REQUEST });
      const config = {
        headers: {
          "Content-Type": 'multipart/form-data',
        },
      };
      const { data } = await axios.put('/api/v1/me/update',userData,config)


      dispatch({type : UPDATE_PROFILE_SUCCESS , payload :  data.success})
      //dispatch({type : UPDATE_PROFILE_RESET})
  }
  catch(error)
  {
    dispatch({type :  UPDATE_PROFILE_FAIL,
    payload : error.response.data.Message})
  }

}





//UPDATE PASSWORD
export const updatePassword = (passwords) => async(dispatch) =>{
  try
  {

    dispatch({ type: UPDATE_PASSWORD_REQUEST });
      const config = {
        headers: { 
          "Content-Type": 'multipart/form-data',
        },
      };
      const { data } = await axios.put('/api/v1/password/update',passwords,config)


      dispatch({type : UPDATE_PASSWORD_SUCCESS , payload :  data.success})
  }
  catch(error)
  {
    dispatch({type :  UPDATE_PASSWORD_FAIL,
    payload : error.response.data.Message})
  }

}




//Forgot PASSWORD
export const forgotPassword = (email) => async(dispatch) =>{
  try
  {

    dispatch({ type: FORGOT_PASSWORD_REQUEST });
      const config = {
        headers: { 
          "Content-Type": 'multipart/form-data',
        },
      };
      const { data } = await axios.post('/api/v1/user/password/forgot',email,config)


      dispatch({type :FORGOT_PASSWORD_SUCCESS , payload :  data.message})
  }
  catch(error)
  { 
    
    dispatch({type :  FORGOT_PASSWORD_FAIL,    
    payload : error.response.data.Message})
  }

}






//New PASSWORD
export const resetPassword = (token, passwords) => async(dispatch) =>{
  try
  {

    dispatch({ type: NEW_PASSWORD_REQUEST });
      const config = {
        headers: { 
          "Content-Type": 'multipart/form-data',
        },
      };
      const { data } = await axios.put(`/api/v1/password/reset/${token}`,passwords,config)


      dispatch({type :NEW_PASSWORD_SUCCESS , payload :  data.success})
  }
  catch(error)
  { 
    
    dispatch({type : NEW_PASSWORD_FAIL,    
    payload : error.response.data.Message})
  }

}



//Admin Routes

export const getAllUsers = () => async(dispatch) =>{
  try{
    dispatch({type : ALL_USER_REQUEST});
    const {data}  = await axios.get('/api/v1/admin/users');


    console.log(data)
    dispatch({type :  ALL_USER_SUCCESS , payload : data.users});
    
  }
  catch(error)
  {
    dispatch({type : ALL_USER_FAIL , 
    payload : error.response.data.Message})
  }
}









//Update USER for the ADMIN

export const updateUser = (id , userData) => async(dispatch) =>{


 console.log(id);
  try
  {

    dispatch({ type: UPDATE_USER_REQUEST });
      const config = {
        headers: {
          "Content-Type": 'multipart/form-data',
        },
      };
      const { data } = await axios.put(`/api/v1/admin/user/${id}`,userData,config)


      dispatch({type : UPDATE_USER_SUCCESS , payload :  data.success})
      //dispatch({type : UPDATE_USER_RESET})
  }
  catch(error)
  {
    dispatch({type :  UPDATE_USER_FAIL,
    payload : error.response.data.Message})
  }

}


export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};








export const getUserDetails = (id) => async(dispatch) =>{

  try
  {

    dispatch({ type: USER_DETAILS_REQUEST });      
    const { data } = await axios.get(`/api/v1/admin/user/${id}`) 


    console.log(data)
    dispatch({type : USER_DETAILS_SUCCESS , payload :  data.user})
      //dispatch({type : UPDATE_USER_RESET})
  }
  catch(error)
  {
    dispatch({type :  UPDATE_USER_FAIL,
    payload : error.response.data.Message})
  }

}




export const deleteUser = (id) => async(dispatch) =>{

  try
  {

    dispatch({ type: DELETE_USER_REQUEST });      
    const { data } = await axios.delete(`/api/v1/admin/user/${id}`) 


    dispatch({type : DELETE_USER_SUCCESS , payload :  data.success})
      //dispatch({type : UPDATE_USER_RESET})
  }
  catch(error)
  {
    dispatch({type :  DELETE_USER_FAIL,
    payload : error.response.data.Message})
  }

}







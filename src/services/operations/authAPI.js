import axios from "axios"; // Import axios
import { endpoints } from "../apis"; // Ensure your endpoints are correct
import { setLoading, setToken, setSignupData, clearToken } from "../../slices/authSlice";
import { setUser } from "../../slices/profileSlice";
import { toast } from "react-toastify";

const {
  REGISTER_API,
  LOGIN_API,
  LOGOUT_API,
  CHANGE_PASSWORD_API,
  DELETE_ACCOUNT_API,
} = endpoints;

export function register(name, email, password, confirmPassword, navigate) {
  return async (dispatch) => {
    dispatch(setLoading(true)); // Indicate that the process has started

    try {
      const response = await axios.post(
        REGISTER_API,
        { name, email, password, confirmPassword },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message || "Signup failed");
      }

      // Show success toast
      toast.success("Registration Successful");

      // Update Redux state if needed
      dispatch(setSignupData(response.data.user));
      dispatch(setToken(response.data.token));

      navigate("/"); // Redirect after successful registration
    } catch (error) {
      // Show error toast
      const errorMessage =
        error?.response?.data?.message || error.message || "Registration Failed";
      toast.error(errorMessage);
    } finally {
      dispatch(setLoading(false)); // Indicate that the process has ended
    }
  };
}


export function login(email, password, navigate) {
  return async (dispatch) => {
    dispatch(setLoading(true)); // Indicate that the process has started

    try {
      const response = await axios.post(
        LOGIN_API,
        { email, password },
        { withCredentials: true }
      );

      if (!response.data.success) {
        throw new Error(response.data.message || "Login failed");
      }

      
      // Update Redux state and localStorage
      dispatch(setToken(response.data.token));
      dispatch(setUser(response.data.user));
      
      localStorage.setItem("token", JSON.stringify(response.data.token));
      localStorage.setItem("user", JSON.stringify(response.data.user));
      
      // Show success toast
      toast.success("Login Successful");
      navigate("/"); // Redirect after login
    } catch (error) {
      // Show error toast
      const errorMessage =
        error?.response?.data?.message || error.message || "Login Failed";
      toast.error(errorMessage);
    } finally {
      dispatch(setLoading(false)); // Indicate that the process has ended
    }
  };
}


export function logout(navigate) {
  return async (dispatch) => {
    dispatch(setLoading(true)); // Indicate that the process has started

    try {
      const response = await axios.get(LOGOUT_API, { withCredentials: true });

      if (!response.data.success) {
        throw new Error(response.data.message || "Logout failed");
      }

      // Show success toast
      toast.success("Logout Successful");

      // Clear Redux state and localStorage
      dispatch(clearToken()); // Clear the token with the clearToken action
      dispatch(setUser(null)); // Reset the user state
      localStorage.removeItem("token"); // Remove token from localStorage
      localStorage.removeItem("user"); // Remove user from localStorage

      navigate("/"); // Redirect to login page
    } catch (error) {
      // Show error toast
      const errorMessage =
        error?.response?.data?.message || error.message || "Logout Failed";
      toast.error(errorMessage);
    } finally {
      dispatch(setLoading(false)); // Indicate that the process has ended
    }
  };
}



export function changePassword(currentPassword, newPassword, navigate) {
  return async (dispatch) => {
    dispatch(setLoading(true)); // Indicate that the process has started

    try {
      const response = await axios.post(CHANGE_PASSWORD_API, {
        currentPassword,
        newPassword,
      });

      if (!response.data.success) {
        throw new Error(response.data.message || "Change Password failed");
      }

      // Show success toast
      toast.success("Password Changed Successfully");

      navigate("/profile"); // Redirect after password change
    } catch (error) {
      // Show error toast
      const errorMessage =
        error?.response?.data?.message ||
        error.message ||
        "Change Password Failed";
      toast.error(errorMessage);
    } finally {
      dispatch(setLoading(false)); // Indicate that the process has ended
    }
  };
}


export function deleteAccount(navigate) {
  return async (dispatch) => {
    dispatch(setLoading(true)); // Indicate that the process has started

    try {
      const response = await axios.delete(DELETE_ACCOUNT_API);

      if (!response.data.success) {
        throw new Error(response.data.message || "Delete Account failed");
      }

      // Show success toast
      toast.success("Account Deleted Successfully");

      // Clear Redux state and localStorage
      dispatch(setToken(null));
      dispatch(setUser(null));

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      navigate("/register"); // Redirect to registration page
    } catch (error) {
      // Show error toast
      const errorMessage =
        error?.response?.data?.message ||
        error.message ||
        "Delete Account Failed";
      toast.error(errorMessage);
    } finally {
      dispatch(setLoading(false)); // Indicate that the process has ended
    }
  };
}


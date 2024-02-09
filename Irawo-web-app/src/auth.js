import axios from "axios";

export async function createUserWithEmailAndPassword(
  email,
  password,
  username
) {
  try {
    const req = await axios.post(
      "https://irawo-backend.onrender.com/api/auth/register",
      {
        email: email,
        password: password,
        username: username,
      }
    );
    console.log(req.data);
    return req.data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      // Handle 400 Bad Request error
      console.log("Error 400: Bad Request");
      console.log("Message from server:", error.response.data.message);
      return error.response.data.message; // or handle as needed
    } else {
      // Handle other errors
      console.error("An error occurred:", error.message);
      return error.message; // or handle as needed
    }
  }
  
}

export async function signInUserWithEmailAndPasword(email, password) {
  try {
    const req = await axios.post(
      "https://irawo-backend.onrender.com/api/auth/login",
      {
        email: email,
        password: password,
      }
    );
    console.log(req);
    return req.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      // Handle 400 Bad Request error
      console.log("Error 400: Bad Request");
      console.log("Message from server:", error.response.data.message);
      return error.response.data.message; // or handle as needed
    } else {
      // Handle other errors
      console.error("An error occurred:", error.message);
      return error.message; // or handle as needed
    }
  }
}

// export async function createUserWithEmailAndPassword(
//   email,
//   password,
//   username
// ) {
//   try {
//     const response = await fetch(
//       "https://irawo-wpgk.onrender.com/api/auth/register",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           email: email,
//           password: password,
//           username: username,
//         }),
//       }
//     );

//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     const data = await response.json();
//     console.log(data);
//     return data;
//   } catch (error) {
//     console.error("Error:", error);
//     return error;
//   }
// }

// export async function signInUserWithEmailAndPasword(email, password) {
//   try {
//     const response = await fetch(
//       "https://irawo-wpgk.onrender.com/api/auth/login",
//       {
//         method: "POST",
//         headers: {
//           "Content-type": "application/json; charset=UTF-8",
//         },
//         body: JSON.stringify({
//           email: email,
//           password: password,
//         }),
//       }
//     );

//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Error:", error);
//     return error;
//   }
// }

export async function refreshToken(token) {
  try {
    const req = await axios.post(
      "https://irawo-backend.onrender.com/api/auth/refresh",
      {
        token: token,
      }
    );
    console.log(req);
    return req;
  } catch (error) {
    return error;
  }
}

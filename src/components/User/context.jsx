import { createContext, useContext  } from "react";

export const UserContext = createContext({
    logged : false,
    userData : {}
});
// export const UserLoginContext = createContext(undefined);

if(localStorage.getItem('userLogged')){
  console.log('halo user zalogowany');
  let user = localStorage.getItem('user')
  // UserContext = {
  //   logged: true,
  //   userData : user
  // }
  console.log('UserContext');
  console.log(UserContext);
}


export function useUserContext() {
    const user = useContext(UserContext);
  
    if (user === undefined) {
      return false
    }
    return user;
}
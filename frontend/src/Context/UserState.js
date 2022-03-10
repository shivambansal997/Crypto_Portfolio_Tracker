import React, {createContext, useMemo, useState} from 'react'


export const UserContext = createContext(null)


const UserState = props => {
    const [authUser, setAuthUser] = useState({
        isAuth: false,
        username: '',
        first_name: '',
        profile_picture: '',
    })

    const value = useMemo(() => ({
            authUser, setAuthUser,
        }),
        [authUser, setAuthUser])

    return (
        <UserContext.Provider value={value}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState
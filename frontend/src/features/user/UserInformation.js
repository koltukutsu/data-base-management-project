import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { login, logout } from './userSlice'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom';

export function UserInformation() {
    const user = useSelector((state) => state.userLogger.value)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const handleSubmit = () => {
        navigate("/")
        dispatch(logout())
    }
    return (
        <div>
            <div>
                {/* <Button
                    aria-label="Login User"
                    onClick={() => dispatch(login())}
                >
                    Login User
                </Button> */}
                <span>Kullanıcı Adı: {user}</span>
                <Button
                    aria-label="Logout User"
                    onClick={handleSubmit}
                >
                    Çıkış Yap
                </Button>
            </div>
        </div>
    )
}

export function LoginUserForm() {
    const dispatch = useDispatch()
    // const handleSubmit = () => {

    // }
    return (
        <div>
            <Button
                aria-label="Login User"
                onClick={() => dispatch(login())}
            >
                Login User
            </Button>
        </div>
    )
}
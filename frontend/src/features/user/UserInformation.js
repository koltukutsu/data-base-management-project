import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { login, logout, deleteAccount } from './userSlice'
import { Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom';

export function UserInformation() {
    const user = useSelector((state) => state.userLogger.username)
    const wallet = useSelector((state) => state.userLogger.wallet)
    const acceptedOffers = useSelector((state) => state.userLogger.acceptedOffers)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const handleSubmit = () => {
        dispatch(logout())
        navigate("/")
    }

    const handleDelete = () => {
        const isConfirmed = window.confirm('Are you sure you want to delete your account?');
        if (isConfirmed) {
            dispatch(deleteAccount())
            dispatch(logout())
            alert("Hesabınız silindi.")
            navigate("/")
        }
    }
    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '20px' }}>Kullanıcı Adı: {user}</span>
            <Typography variant="subtitle1" style={{ marginRight: '20px' }}>
                Cüzdan Para: {wallet} TL
            </Typography>
            <Typography variant="subtitle1" style={{ marginRight: '20px' }}>
                Kabul Edilen Teklifler: {acceptedOffers}
            </Typography>
            <Button
                aria-label="Logout User"
                onClick={handleSubmit}
            >
                Çıkış Yap
            </Button>
            <Button
                aria-label="Delete User"
                onClick={handleDelete}
                className='text-red-500'
            >
                Hesabı Sil
            </Button>
        </div>
    );

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
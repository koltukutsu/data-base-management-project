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
        <div
            className='border rounded-bg'
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between', // Align items to the start and end of the container
                marginBottom: '20px',
                padding: '10px'
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ marginRight: '20px', fontWeight: 'bold' }}>Kullanıcı Adı: </span>
                <span>{user}</span>
                <Typography variant="subtitle1" style={{ marginRight: '20px', fontWeight: 'bold', marginLeft: "20px" }}>
                    Cüzdan Para: </Typography>
                <Typography variant="subtitle1">{wallet} TL</Typography>
                <Typography variant="subtitle1" style={{ marginLeft: "20px", marginRight: '20px', fontWeight: 'bold' }}>
                    Kabul Edilen Teklifler: </Typography>
                <Typography variant="subtitle1">{acceptedOffers}</Typography>
            </div>
            <div>
                <Button
                    aria-label="Logout User"
                    onClick={handleSubmit}
                    variant='contained'
                >
                    Çıkış Yap
                </Button>
                <Button
                    aria-label="Delete User"
                    onClick={handleDelete}
                    style={{ backgroundColor: 'red', color: 'white', marginLeft: '10px' }}
                >
                    Hesabı Sil
                </Button>
            </div>
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
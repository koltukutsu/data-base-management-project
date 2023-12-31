import { Route, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ProtectedRoute({ path, element }) {
    const user = useSelector((state) => state.userLogger.value);
    const isAuthenticated = user !== 'none'; // Replace this with your actual authentication check
    const navigate = useNavigate();

    if (!isAuthenticated) {
        navigate('/login');
    }

    return isAuthenticated ? <Route path={path} element={element} /> : null;
}

export default ProtectedRoute;
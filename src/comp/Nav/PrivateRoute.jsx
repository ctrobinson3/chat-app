import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStatus } from '../../hooks/useAuthStatus';

const PrivateRoute = () => {
	const { loggedIn, loading } = useAuthStatus();

	if (loading) {
		return <h3>loading...</h3>;
	}

	return loggedIn ? <Outlet /> : <Navigate to='/signin' />;
};

export default PrivateRoute;

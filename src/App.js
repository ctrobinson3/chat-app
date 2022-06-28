//router
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//pages
import { SignIn, SignUp, ForgotPassword } from './user/userIndex';
import { Home, Profile } from './pages/pageIndex';

//components
import { Navbar, PrivateRoute } from './comp/compIndex';

function App() {
	return (
		<div className='app-wrap'>
			<Router>
				<Navbar />
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/profile' element={<PrivateRoute />}>
						<Route path='/profile' element={<Profile />} />
					</Route>
					<Route path='/signin' element={<SignIn />} />
					<Route path='/signup' element={<SignUp />} />
					<Route path='/forgotpassword' element={<ForgotPassword />} />
				</Routes>
			</Router>

			<ToastContainer />
		</div>
	);
}

export default App;

import { useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import OAth from '../comp/OAth';

const SignIn = () => {
	const navigate = useNavigate();

	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	const { email, password } = formData;

	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.id]: e.target.value,
		}));
	};

	const onSubmit = async (e) => {
		e.preventDefault();

		try {
			const auth = getAuth();

			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);

			if (userCredential.user) {
				navigate('/');
			}
		} catch (error) {
			toast.error('Bad User Credentials');
		}
	};

	return (
		<div className='user-page'>
			<div className='user-container'>
				<div className='user-header'>
					<header>
						<h1>Welcome Back!</h1>
					</header>
				</div>
				<div className='user-content'>
					<form onSubmit={onSubmit}>
						<input
							type='email'
							className='email-input'
							placeholder='Email'
							id='email'
							value={email}
							onChange={onChange}
						/>

						<div className='password-div'>
							<input
								type={showPassword ? 'text' : 'password'}
								className='password-input'
								placeholder='Password'
								id='password'
								value={password}
								onChange={onChange}
							/>

							<button
								className='showpass-btn'
								onClick={() => setShowPassword((prevState) => !prevState)}
							>
								Show Password
							</button>
						</div>

						<Link to='/forgotpassword' className='forgotpass-link'>
							Forgot Password?
						</Link>

						<div className='signin-bar'>
							<button className='signin-btn'>Sign In</button>
						</div>
					</form>

					<OAth />

					<Link to='/signup' className='register-link'>
						Sign Up Instead
					</Link>
				</div>
			</div>
		</div>
	);
};

export default SignIn;

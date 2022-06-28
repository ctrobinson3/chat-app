import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
	getAuth,
	createUserWithEmailAndPassword,
	updateProfile,
} from 'firebase/auth';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase.config';
import OAth from '../comp/OAth';

const SignUp = () => {
	const navigate = useNavigate();

	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
	});
	const { name, email, password } = formData;

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

			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);

			const user = userCredential.user;
			updateProfile(auth.currentUser, {
				displayName: name,
			});

			const formDataCopy = { ...formData };
			delete formDataCopy.password;
			formDataCopy.timestamp = serverTimestamp();

			await setDoc(doc(db, 'users', user.uid), formDataCopy);

			navigate('/');
		} catch (error) {
			toast.error('Something went wrong.');
		}
	};

	return (
		<div>
			<header>
				<h1>Please Enter Info</h1>
			</header>

			<form onSubmit={onSubmit}>
				<input
					type='text'
					className='name-input'
					placeholder='Name'
					id='name'
					value={name}
					onChange={onChange}
				/>

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

				<div className='signup-bar'>
					<button className='signup-btn'>Sign Up</button>
				</div>
			</form>

			<OAth />

			<Link to='/signin' className='register-link'>
				Sign In Instead
			</Link>
		</div>
	);
};

export default SignUp;

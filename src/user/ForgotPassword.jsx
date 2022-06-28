import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
	const [email, setEmail] = useState('');

	const onChange = (e) => {
		setEmail(e.target.value);
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		try {
			const auth = getAuth();
			await sendPasswordResetEmail(auth, email);
			toast.success('Email was sent');
		} catch (error) {
			toast.error('Could not send email');
		}
	};

	return (
		<div className='page-container'>
			<header>
				<h1 className='page-header'>Forgot Password</h1>
			</header>

			<main>
				<form onSubmit={onSubmit}>
					<input
						type='email'
						className='email-input'
						placeholder='Email'
						id='email'
						value={email}
						onChange={onChange}
					/>
					<Link className='forgot-password-link' to='/signin'>
						Sign In
					</Link>

					<div className='reset-bar'>
						<button className='reset-btn'>Send Reset Email</button>
					</div>
				</form>
			</main>
		</div>
	);
};

export default ForgotPassword;

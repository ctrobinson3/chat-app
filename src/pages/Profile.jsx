//base
import { useEffect, useState } from 'react';
import './pagesCss.css';

//router
import { useNavigate, Link } from 'react-router-dom';

//firebase
import { getAuth, updateProfile } from 'firebase/auth';
import { db } from '../firebase.config';
import { updateDoc, doc } from 'firebase/firestore';

//toastify
import { toast } from 'react-toastify';

const Profile = () => {
	const auth = getAuth();
	const navigate = useNavigate();

	const [changeDetails, setChangeDetails] = useState(false);

	const [formData, setFormData] = useState({
		name: auth.currentUser.displayName,
		email: auth.currentUser.email,
	});

	const { name, email } = formData;

	const onLogout = () => {
		auth.signOut();
		navigate('/');
	};

	const onSubmit = async () => {
		try {
			if (auth.currentUser.displayName !== name) {
				//update name
				await updateProfile(auth.currentUser, {
					displayName: name,
				});
				//update in firestore
				const userRef = doc(db, 'users', auth.currentUser.uid);
				await updateDoc(userRef, {
					name,
				});
			}
		} catch (error) {}
	};

	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.id]: e.target.value,
		}));
	};

	return (
		<div className='profile-wrap'>
			<header className='profile-header'>
				<h1 className='profile-h1'>My Profile</h1>
				<button type='button' className='logout-btn' onClick={onLogout}>
					Logout
				</button>
			</header>

			<main>
				<div className='prof-detail-header'>
					<h2 className='profile-h2'>Personal Details</h2>
					<p
						className='change-details-text link-text'
						onClick={() => {
							changeDetails && onSubmit();
							setChangeDetails((prevState) => !prevState);
						}}
					>
						{changeDetails ? 'done' : 'change'}
					</p>
				</div>

				<div className='profile-card'>
					<form>
						<input
							type='text'
							id='name'
							className={!changeDetails ? 'prof-name' : 'prof-name-active'}
							disabled={!changeDetails}
							value={name}
							onChange={onChange}
						/>
						<p
							type='text'
							id='email'
							className='prof-email'
							value={email}
							onChange={onChange}
						>
							{email}
						</p>
					</form>
				</div>
			</main>
		</div>
	);
};

export default Profile;

import { NavLink } from 'react-router-dom';

const Navbar = () => {
	return (
		<div className='navbar-container'>
			<nav className='navbar-nav'>
				<ul className='navbar-ul'>
					<li className='navbar-li'>
						<NavLink to=''>Home</NavLink>
					</li>
					<li className='navbar-li'>
						<NavLink to='profile'>Profile</NavLink>
					</li>
					<li className='navbar-li'>
						<NavLink to='signin'>Sign In</NavLink>
					</li>
					<li className='navbar-li'>
						<NavLink to='signup'>Sign Up</NavLink>
					</li>
				</ul>
			</nav>
		</div>
	);
};

export default Navbar;

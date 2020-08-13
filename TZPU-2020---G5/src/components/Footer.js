import React from 'react';

class Footer extends React.Component {
	render() {
		return (
			<footer>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
						backgroundColor: 'light'
					}}>
					<small style={{ color: 'black' }}>
						Tehnologije za podrsku ucenju emailijic@elfak.rs
						andrej.rakic@elfak.rs
					</small>
					<p style={{ color: 'black' }}>Built 2020.</p>
				</div>
			</footer>
		);
	}
}

export default Footer;

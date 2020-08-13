import React from 'react';
import WelcomeForm from 'react-welcome-page'
import '../styles/WelcomeScreenStyle.css'
import Login from './Login';

export default function Welcome() {
	return (
		<div id='my-container'>
			<WelcomeForm
				loopDuration={1100}
				data={[
				{
				image: require('./puzzleicon.png'),
				text: 'Welcome to Tricky Games',
				fontWeight: 'bold',
				imageAnimation: 'flipInX',
				textAnimation: 'bounce',
				backgroundColor: '#228B22',
				textColor: '#002134',
				},
				{
				image: require('./puzzleicon.png'),
				text: 'Welcome to Tricky Games',
				backgroundColor: '#228B22',
				fontWeight: 'bold',
				}
				]}
		    />
			<div className="container-fluid vh-100" style={{backgroundColor: '#F7F7F7'}}>
				<div className="row justify-content-end pt-2 pr-4">
					<div className="col-0"> 
						<img
							className='rotate'
							style={{width:70, height:70}}
							src={require('./puzzleicon.png')}
							alt='puzzle icon'
						/>
					</div>
				</div>
				<div className="row justify-content-end pt-1 pr-2">
					<div className="col-0">
						<h6>Tricky games</h6>
					</div> 
				</div> 
				<div className="row">
					<div className="col-12 col-md-6">
					<img className="w-100 h-100" src={require('./preschool.jpg')} alt="preschool" /> 
					</div>
					<div className="col-12 col-md-6">
						<div className="row">
							<div className="col-12 pt-5">
								<h1>Welcome Back,  <br />  please Login to your account</h1>
							</div>
						</div>
						<div className="row mt-4">
							<div className="col-12 col-md-6 pt-3">
								<Login />
							</div>
						</div>	
					</div>
				</div>
			</div>
		</div>
		
	);
}

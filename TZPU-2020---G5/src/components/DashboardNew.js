import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Card, OverlayTrigger, Tooltip, Toast } from 'react-bootstrap';
import StarRatings from 'react-star-ratings';
import '../styles/WelcomeScreenStyle.css';
import '../styles/BorderStyle.scss';
import Profile from './Profile';
import Leaderboard from './Leaderboard';
import NavBar from './NavBar';
import Footer from './Footer';
import RegistrationModal from './RegistrationModal';
import MoneyBagModal from './MoneyBagModal';

export default function Dashboard(props) {
	const history = useHistory();
	const [loading, setLoading] = useState(true);
	const [loggedUser, setLoggedUser] = useState({});
	const [rating, setRating] = useState(0.5);
	const [quizzes, setQuizzes] = useState([]);
	const [position, setPosition] = useState(0);
	const [maxPoints, setMaxPoints] = useState(0);
	const [numOfUsers, setNumOfUsers] = useState([]);
	const [pointsToNextLevel, setPointsToNextLevel] = useState(0);
	const [show, setShow] = useState(true);
	const [name, setName] = useState("");
	const [modalShow, setModalShow] = useState(false);
	const [moneyBagModalShow, setMoneyBagModalShow] = useState(false);
	useEffect(() => {
		getDataFromDb();
		if (props.history.location.state.fromRegister) setModalShow(true);
	}, []);

	let leaderboardCallback = (_position, maxPoints, pointsToNextLevel) => {
		setPosition(_position);
		setMaxPoints(maxPoints);
		setPointsToNextLevel(pointsToNextLevel);
	};

	let choosePicture = (name) => {
		if (name.includes("5"))
		setName("./babydragon.png")
		else if (name.includes("6"))
		setName("./teendragon.png");
		else if (name.includes("7"))
		setName ("./dragon.png")
		else
		setName ("./download.jfif");
	}

	let getDataFromDb = async () => {
		if (props.history.location.state.xp)
			setRating(rating + props.history.location.state.xp);
		await fetch(
			`http://localhost:3001/users/${props.history.location.state.id}`
		)
			.then(res => res.json())
			.then(async data => {
				const user = await data;
				user.achievments.map(achievment =>
					achievment.isAchieved === true
						? console.log(true)
						: console.log(false)
				);
				setLoggedUser(user);
				setMoneyBagModalShow(user.averageGrade>6);
			});

		await fetch(`http://localhost:3001/quizzes`)
			.then(res => res.json())
			.then(data => data.map(quiz => quizzes.push(quiz)));

		const res = await fetch(`http://localhost:3001/users`);
		const data = await res.json();
		setNumOfUsers(data.length);		
		setLoading(false);
	};
	return (
		<div>
			{loading ? (
				<h1>Loading...</h1>
			) : (
				<div>
					<RegistrationModal
						show={modalShow}
						onHide={() => setModalShow(false)}
					/>
					<MoneyBagModal
						show={moneyBagModalShow}
						onHide={() => setMoneyBagModalShow(false)}
					/>
					<NavBar />
					<div className='container'>
						<div className='row'>
							<div className='col-12'>
								<img className='img-fluid w-100' src={require('./kids.jpg')} />
							</div>
						</div>
					</div>
					<div
						className='container frame'
						style={{ backgroundColor: '#18530b' }}>
						<div className='row'>
							<div className='col-12 col-md-4 pt-5'>
								<Profile loggedUser={loggedUser} />
								<div style={{ paddingTop: 30, marginLeft: 20 }}>
									{rating < 1 ? (
										<Toast
											show={show}
											delay={25000}
											onClose={() => setShow(false)}
											autohide>
											<Toast.Header>
												<img
													src={require('./starr.png')}
													style={{ width: 30, height: 30 }}
													className='rounded mr-2 rotate'
													alt=''
												/>
												<strong className='mr-auto'>Tip</strong>
											</Toast.Header>
											<Toast.Body>
												Your activities today are little bit descreased. Do some
												test in order to gain more points. Remember that every
												effort is worth it. Maybe exactly you get a present
												today!
											</Toast.Body>
										</Toast>
									) : null}
								</div>
							</div>
							<div className='col-12 col-md-8'>
								<div className='row'>
									<div className='col-12 text-center pt-5'>
										<OverlayTrigger
											key={'top'}
											placement={'top'}
											overlay={
												<Tooltip id={`tooltip`}>
													Click here to start doing tests
												</Tooltip>
											}>
											<Button
												className='btn btn-warning w-50 vh-50'
												onClick={() =>
													history.push({
														pathname: '/listOfQuizes',
														state: { id: loggedUser.id }
													})
												}>
												PLAY
											</Button>
										</OverlayTrigger>
									</div>
								</div>
								<div className='row mt-4'>
									<div className='col-12 col-md-6 pt-3'>
										<div className='card mb-3 text-center'>
											<img
												style={{ height: 200, width: 'auto' }}
												src='https://media.giphy.com/media/5xtDarEWbFEH1JUC424/giphy.gif'
												className='card-img-top'
												alt='Completed tests'
											/>
											<div className='card-body w-100 p-0 mb-3 mt-3'>
												<h5 className='card-title'>Completed tests</h5>
												<p className='card-text' style={{ fontSize: 30 }}>
													{loggedUser.completedTests <= loggedUser.achievments.length-1 ? loggedUser.completedTests : loggedUser.achievments.length-1}
												</p>
												<OverlayTrigger
													key={'top'}
													placement={'top'}
													overlay={
														<Tooltip id={`tooltip`}>
															List of all your completed tests
														</Tooltip>
													}>
													<Button
														className='btn btn-warning w-75 mt-2'
														onClick={() =>
															history.push({
																pathname: '/completedTests',
																state: {
																	tests: loggedUser.achievments,
																	completedTests: loggedUser.completedTests,
																	
																}
															})
														}>
														Show
													</Button>
												</OverlayTrigger>
												<p className='card-text'>
													<small className='text-muted'>
														Tricky Games
													</small>
												</p>
											</div>
										</div>
									</div>
									<div className='col-12 col-md-6 pt-3'>
										<div className='card mb-3 text-center'>
											<img
												style={{ height: 246, width: 'auto' }}
												src={require('./score.png')}
												className='card-img-top'
												alt='Average note'
											/>
											<div className='card-body w-100 p-0 mb-3 mt-3'>
												<h5 className='card-title'>Average note</h5>
												<p className='card-text' style={{ fontSize: 30 }}>
													{loggedUser.averageGrade.toFixed(2)}
												</p>
												<p className='card-text'>
													<small className='text-muted'>
														Tricky Games
													</small>
												</p>
											</div>
										</div>
									</div>
									<div className='col-12 col-md-6 pt-3'>
										<div className='card mb-3 text-center'>
											<div className='card-body w-100 p-0 mb-3 mt-3'>
												<h5 className='card-title'>XP Progress</h5>
												<StarRatings
													rating={rating}
													starRatedColor='#FFD700'
													numberOfStars={5}
													name='rating'
												/>
												<p className='card-text'>
													<small className='text-muted'>
														Tricky Games
													</small>
												</p>
											</div>
										</div>
										<div className='card mb-3 text-center'>
											<img
												style={{ height: 250, width: 'auto' }}
												src={require('./leaderboardslika.jpg')}
												className='card-img-top'
												alt='Completed tests'
											/>
											<div className='card-body w-100 p-0 mb-3 mt-3'>
												<h5 className='card-title'>
													Current place on Leaderboard
												</h5>
												<p className='card-text' style={{ fontSize: 30 }}>
													{position}.
												</p>
												<p className='card-text'>
													<small className='text-muted'>
														Tricky Games
													</small>
												</p>
											</div>
										</div>
										{pointsToNextLevel ? (
											<Toast
												show={show}
												delay={30000}
												onClose={() => setShow(false)}
												autohide>
												<Toast.Header>
													{position === 2 ? (
														<img
															src={require('./medal.jfif')}
															style={{ width: 30, height: 30 }}
															className='rounded mr-2'
															alt='goldmedal'
														/>
													) : (
														<img
															src={require('./arrow.png')}
															style={{ width: 30, height: 30 }}
															className='rounded mr-2'
															alt='arrow'
														/>
													)}
													<strong className='mr-auto'>Tip</strong>
												</Toast.Header>
												{position === 2 ? (
													<Toast.Body>
														Try your best, gain {pointsToNextLevel.toFixed(2)}{' '}
														more points and gold medal for first place is yours!
													</Toast.Body>
												) : (
													<Toast.Body>
														Try your best and gain{' '}
														{pointsToNextLevel.toFixed(2)} more points in order
														to have better score on leaderboard!
													</Toast.Body>
												)}
											</Toast>
										) : null}
									</div>
									<div className='col-12 col-md-6 pt-3'>
										<div className='card mb-3 text-center'>
											<img
												style={{ height: 250, width: 'auto' }}
												src={require('./achievements.jpg')}
												className='card-img-top'
												alt='Average note'
											/>
											<div className='card-body w-100 p-0 mb-3 mt-3'>
												<div className='container'>
													<div className='row pt-4'>
														{loggedUser.achievments.map(achievment =>
															achievment.name !== 'createdProfile' ? (
																null
															) : (
																<OverlayTrigger
																key={"top"}
																placement={"top"}
																overlay={<Tooltip id={`tooltip`}>Creating profile done</Tooltip>}
															  >
																<Card.Img
																	style={{
																		height: '7rem',
																		width: '8rem',
																		marginLeft: 35,
																		filter:
																			achievment.isAchieved === false
																				? 'grayscale(100%)'
																				: null
																	}}
																	src={require('./puzla.jpg')}
																/>
																</OverlayTrigger>
															)
														)}
													
												
												<div className='col-12 col-md-6 pt-3'>
												<OverlayTrigger
													key={"top"}
													placement={"top"}
													overlay={<Tooltip id={`tooltip`}>Average grade greater than</Tooltip>}
												>
													<Card.Img
														style={{
															height: '7rem',
															width: '7rem',
															filter:
																loggedUser.averageGrade < 6
																	? 'grayscale(100%)'
																	: null
														}}
														src={require('./moneybag.jpg')}
													/>
												</OverlayTrigger>
												</div>
												<div className='col-12 col-md-6 pt-3'>
												<OverlayTrigger
													key={"top"}
													placement={"top"}
													overlay={<Tooltip id={`tooltip`}>First position on leaderboard</Tooltip>}
												>
													<Card.Img
														style={{
															height: '6rem',
															width: '6rem',
															filter: position !== 1 ? 'grayscale(100%)' : null
														}}
														src={require('./medal.jfif')}
													/>
												</OverlayTrigger>
												</div>
												<div className='col-12 col-md-6 pt-3'>
												<OverlayTrigger
													key={"top"}
													placement={"top"}
													overlay={<Tooltip id={`tooltip`}>All tests done</Tooltip>}
												>
													<Card.Img
														style={{
															height: '6rem',
															width: '6rem',
															filter:
															loggedUser.completedTests*100/(loggedUser.achievments.length-1) !==
																100
																	? 'grayscale(100%)'
																	: null
														}}
														src={require('./gitboxx.png')}
													/>
													</OverlayTrigger>
												</div>
												<div className='col-12 col-md-6 pt-3'>
												<OverlayTrigger
													key={"top"}
													placement={"top"}
													overlay={<Tooltip id={`tooltip`}>Three completed tests</Tooltip>}
												>
													<Card.Img
														style={{
															height: '6rem',
															width: '6rem',
															 filter:
															   loggedUser.completedTests === 3
															     ? "grayscale(100%)"
															     : null
														}}
														src={require('./marioaward.png')}
													/>
													</OverlayTrigger>
												</div>
												</div>
												</div>
											</div>
										</div>
									</div>
									<div className='col-12 pt-3'>
										<Leaderboard
											loggedUser={loggedUser}
											leaderboardCallback={leaderboardCallback}
											limit={position > 7 ? numOfUsers : 7}
										/>
									</div>
								</div>
							</div>
						</div>
					</div>

					<Footer />
				</div>
			)}
		</div>
	);
}

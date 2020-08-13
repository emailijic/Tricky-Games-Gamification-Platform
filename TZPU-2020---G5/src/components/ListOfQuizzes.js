import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Toast, Modal, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import NavBar from './NavBar';
import Footer from './Footer';
import '../styles/RegisterSuccessfulStyle.css';
import '../styles/TextStyle.css';
import '../styles/BorderStyle.scss';

export default function ListOfQuizes() {
	const history = useHistory();
	const [loading, setLoading] = useState(true);
	const [quizzes] = useState([]);
	const [show, setShow] = useState(true);
	const [modalShow, setModalShow] = useState(false);
	const [quiz, setQuiz] = useState({});
	useEffect(() => {
		fetchDataFromDB();
	}, []);

	let fetchDataFromDB = async () => {
		await fetch(`http://localhost:3001/quizzes`)
			.then(res => res.json())
			.then(data => data.map(quiz => quizzes.push(quiz)));
		setLoading(false);
	};

	function MyVerticallyCenteredModal(props) {
		return (
			<Modal
				{...props}
				size='lg'
				aria-labelledby='contained-modal-title-vcenter'
				centered>
				<Modal.Header style={{ backgroundColor: "#FFFDD0" }} closeButton>
					<Modal.Title  style={{
            fontSize: 50,
            fontColor: "white",
            borderColor: "#18530b"
          }} id='contained-modal-title-vcenter'>
						Choose level 
					</Modal.Title>
				</Modal.Header>
				<Modal.Body style={{ backgroundColor: "#FFFDD0" }}>
				<div className="container justify-content-center">
					<div className="col-12 col-8 offset-md-4">
					<OverlayTrigger
						key={'top'}
						placement={'top'}
						overlay={
							<Tooltip id={`tooltip`}>
								Pass all tests from begginers' level in order to pass to another level.
							</Tooltip>
						}>
					<Button
						disabled={false}
						className="btn btn-success w-25 mt-4"
						//	disabled={!props.quiz.levels.beginner}
						onClick={() =>
							history.push({
								pathname: '/test',
								state: {
									name: props.quiz.name,
									subject: props.quiz.subject,
									questions: props.quiz.questions,
									id: history.location.state.id
								}
							})
						}>
						Beginner
					</Button>
					</OverlayTrigger>
					</div>
					<div className="col-12 col-8 offset-md-4">
					<OverlayTrigger
						key={'top'}
						placement={'top'}
						overlay={
							<Tooltip id={`tooltip`}>
								If you want to do the test from intermediate level, you have to pass exam from previous level.
							</Tooltip>
						}>
					<Button
						disabled={true}
						className="btn btn-success w-25 mt-4"
						//	disabled={!props.quiz.levels.intermediate}
						onClick={() =>
							history.push({
								pathname: '/test',
								state: {
									name: props.quiz.name,
									subject: props.quiz.subject,
									questions: props.quiz.questions,
									id: history.location.state.id
								}
							})
						}>
						Intermediate
					</Button>
					</OverlayTrigger>
					</div>
					<div className="col-12 col-8 offset-md-4">
					<OverlayTrigger
						key={'top'}
						placement={'top'}
						overlay={
							<Tooltip id={`tooltip`}>
								If you want to do the test from advanced level, you have to pass exam from previous level.
							</Tooltip>
						}>
					<Button
						disabled={true}
						className="btn btn-success w-25 mt-4"
						//disabled={!props.quiz.levels.advanced}
						onClick={() =>
							history.push({
								pathname: '/test',
								state: {
									name: props.quiz.name,
									subject: props.quiz.subject,
									questions: props.quiz.questions,
									id: history.location.state.id
								}
							})
						}>
						Advanced
					</Button>
					</OverlayTrigger>
					</div>
					</div>
				</Modal.Body>
				<Modal.Footer style={{ backgroundColor: "#FFFDD0" }}>
					<Button
						type="button"
						className="btn btn-success w-25 mt-4"
						onClick={props.onHide}
						>
						Close
					</Button>
			</Modal.Footer>
			</Modal>
		);
	}

	return (
		<div>
			{loading ? (
				<h1>Loading...</h1>
			) : (
				<div>
					<MyVerticallyCenteredModal
						quiz={quiz}
						show={modalShow}
						onHide={() => setModalShow(false)}
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
							<div className='col-12 col-md-8 pt-3'>
								<div className='col-md-4 offset-md-6'>
									<img
										src={require('./quizzes.jpg')}
										alt='Avatar'
										style={{ width: 300, height: 200 }}
									/>
								</div>
							</div>
							<div className='col-12 col-md-4 pt-3'>
								<Toast
									show={show}
									delay={3000}
									onClose={() => setShow(false)}
									autohide>
									<Toast.Header>
										{/* <img
											src="holder.js/20x20?text=%20"
											className="rounded mr-2"
											alt=""
											/> */}
										<strong className='mr-auto'>Tip</strong>
									</Toast.Header>
									<Toast.Body>
										Woohoo, it's time to do a test. Choose the subject and go.
										Have fun!
									</Toast.Body>
								</Toast>
							</div>
						</div>
						{/* <div className="text-center pt-5">
                            {/* <h1 
                           className="title"
                            >Quizzes</h1> */}
						<div className='row'>
							<div className='col pt-5'>
								<div className='flip-card'>
									<div className='flip-card-inner'>
										<div className='flip-card-front'>
											<img
												src={require('./maath.jpg')}
												alt='Avatar'
												style={{ width: 400, height: 400 }}
											/>
										</div>
										<div className='flip-card-back'>
											{quizzes
												.filter(quiz => quiz.subject === 'Matematika')
												.map(quiz => (
													<h1
														style={{ cursor: 'pointer' }}
														key={quiz.name}
														onClick={() =>
															// history.push({
															// 	pathname: '/test',
															// 	state: {
															// 		name: quiz.name,
															// 		subject: quiz.subject,
															// 		questions: quiz.questions,
															// 		id: history.location.state.id
															// 	}
															// })
															{
																setQuiz(quiz);
																setModalShow(true);
															}
														}>
														{quiz.name}
													</h1>
												))}
										</div>
									</div>
								</div>
							</div>
							<div className='col pt-5'>
								<div className='flip-card'>
									<div className='flip-card-inner'>
										<div className='flip-card-front'>
											<img
												src={require('./bioology.jpg')}
												alt='Avatar'
												style={{ width: 400, height: 400, marginTop: 20 }}
											/>
										</div>
										<div className='flip-card-back'>
											{quizzes
												.filter(quiz => quiz.subject === 'Biologija')
												.map(quiz => (
													<h1
														style={{ cursor: 'pointer' }}
														key={quiz.name}
														onClick={() => {
															setQuiz(quiz);
															setModalShow(true);
														}}>
														{quiz.name}
													</h1>
												))}
										</div>
									</div>
								</div>
							</div>
							<div className='col pt-4'>
								<div className='flip-card'>
									<div className='flip-card-inner'>
										<div className='flip-card-front'>
											<img
												src={require('./geoography.jpg')}
												alt='Avatar'
												style={{ width: 400, height: 400 }}
											/>
										</div>
										<div className='flip-card-back'>
											{quizzes
												.filter(quiz => quiz.subject === 'Geografija')
												.map(quiz => (
													<h1
														style={{ cursor: 'pointer' }}
														key={quiz.name}
														onClick={() => {
															setQuiz(quiz);
															setModalShow(true);
														}}>
														{quiz.name}
													</h1>
												))}
										</div>
									</div>
								</div>
							</div>
							<div className='col pt-5'>
								<div className='item'>
									<div className='flip-card'>
										<div className='flip-card-inner'>
											<div className='flip-card-front'>
												<img
													src={require('./englishh.jpg')}
													alt='Avatar'
													style={{ width: 400, height: 400 }}
												/>
											</div>
											<div className='flip-card-back'>
												{quizzes
													.filter(quiz => quiz.subject === 'Engleski')
													.map(quiz => (
														<h1
															style={{ cursor: 'pointer' }}
															key={quiz.name}
															onClick={() => {
																setQuiz(quiz);
																setModalShow(true);
															}}>
															{quiz.name}
														</h1>
													))}
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className='col pt-5'>
								<div className='flip-card'>
									<div className='flip-card-inner'>
										<div className='flip-card-front'>
											<img
												src={require('./hisstory.jpg')}
												alt='Avatar'
												style={{ width: 400, height: 400 }}
											/>
										</div>
										<div className='flip-card-back'>
											{quizzes
												.filter(quiz => quiz.subject === 'Istorija')
												.map(quiz => (
													<h1
														style={{ cursor: 'pointer' }}
														key={quiz.name}
														onClick={() => {
															setQuiz(quiz);
															setModalShow(true);
														}}>
														{quiz.name}
													</h1>
												))}
										</div>
									</div>
								</div>
							</div>
							<div className='col pt-5'>
								<div className='flip-card'>
									<div className='flip-card-inner'>
										<div className='flip-card-front'>
											<img
												src={require('./serbian.jpg')}
												alt='Avatar'
												style={{ width: 400, height: 400 }}
											/>
										</div>
										<div className='flip-card-back'>
											{quizzes
												.filter(quiz => quiz.subject === 'Srpski')
												.map(quiz => (
													<h1
														style={{ cursor: 'pointer' }}
														key={quiz.name}
														onClick={() => {
															setQuiz(quiz);
															setModalShow(true);
														}}>
														{quiz.name}
													</h1>
												))}
										</div>
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

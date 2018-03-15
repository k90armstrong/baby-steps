import React from 'react';
import { Link } from 'react-router-dom';
import BAppBar from './BAppBar';
import Event from '../child/components/Event';
import styles from '../components/styles/bootstrap.3.3.7.css'
import moment from 'moment';
import style from '../components/styles/singleChildProfile.css';
import {Timeline, TimelineEvent} from 'react-event-timeline'


const imgYep = {
  height: "200px"
}

const grayLord = {
  background: 'gray'
}

const smallYep = {
  height: "100px"
}


class SingleChildProfile extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
	}
	handleAddEvent=()=>{
		
	}

	printButton = (child) => {
		if (!child || !child.Images ||  child.Images.length < 1) {
			return null;
		}

		const canvasPopAPIKey = "0e524556d32c94abbef0d0b058c58a1c";
		const imageUrl = child.Images[0].url;

		const printableUrl = "https://store.canvaspop.com/api/pull?image_url=" + imageUrl + "&access_key=" + canvasPopAPIKey;
	
		return <a href={printableUrl} target="_blank"><button id="" type="button" className="btn btn-default big-btn btn-info btn-lg SharePrintBtn btnColorSize" data-toggle="modal"
		 data-target="">Print</button></a>
	}

  render() {
    return (
      <div>

       

<div className="wrapper">
		<div className="container">

			{/* <!-- Trigger the modal with a button --> */}
			<button onClick={this.props.handleAddEventClick} id="add-event-btn" type="button" className="btn btn-default big-btn btn-info btn-lg addEvent" data-toggle="modal" data-target="#addModal">+ ADD EVENT</button>

			{/* <!-- Modal --> */}
			<div className="modal fade" id="addModal" role="dialog">
				<div className="modal-dialog modal-lg">
					<div className="modal-content">
						<div className="modal-header">
							<button type="button" className="close" data-dismiss="modal">&times;</button>
							<h4 className="modal-title">Modal Header</h4>
						</div>
						<div className="modal-body">
						


							<form id='eventForm' method="post" enctype="multipart/form-data">
								<input type='file' name='sampleFile'/>


								<label for="title">TITLE</label>
								<input type="text" id="title" className="form-control" name="title" placeholder="specify the title of the EVENT"/>

								<label for="date ">DATE OF BIRTH</label>
								<input type="date" id="date" className="form-control" name="date" placeholder="birthdate of the baby.."/>

								
								<label for="description">SHORT EVENT DISCRIPTION</label>
								<input type="text" id="description" className="form-control" name="description" placeholder="EVENT"/>

								<label for="story">STORY</label>
								<textarea id="story" name="story" className="form-control" placeholder="Write something.." style={imgYep}></textarea>

								<input type="submit"/>

							</form>

						</div>
						<div className="modal-footer">
							<button id="closeModal" type="button" className="btn btn-default" data-dismiss="modal">Close</button>
						</div>
					</div>
				</div>
			</div>
		</div>

		{this.printButton(this.props.child)}
		<button id="" type="button" className="btn btn-default big-btn btn-info btn-lg btnColorSize" data-toggle="modal" data-target="">Share</button>

	</div>


	<div className="container">
		{/* <!-- this is the childs profile --> */}
		<div className="container aboutWidth">
			<div className="col col-md-2" style={grayLord}>
				<div>
					<div className="card">
						<h1 id="kidsName">Name</h1>
						<div className="fakeimg" style={smallYep}>Image</div>
						<p>Some text about me in culpa qui officia deserunt mollit anim..</p>
					</div>
					<div className="card">
						<span>Weight: </span>
						<span id="weight"></span>
						<span>Length: </span>
						<span id="length"></span>
						<span>Birthday: </span>
						<span id="birthday"></span>
					</div>
				</div>
			</div>


			{/* <!-- this is the timeline --> */}
			<div className="col col-md-9" style={grayLord}>
				<div className="container">

					<section id="cd-timeline" className="cd-container containerTimeline">
						{/* <!-- ALL TIMELINE STUFF GETS ADDED HERE DYNAMICALLY --> */}
						<Timeline>
						{this.props.child.Events && this.props.child.Events.map(event=>{
							return (
								<TimelineEvent
									title={event.title}
									icon={<i />}
									iconColor="#6fba1c"
									createdAt={moment(event.date).format("MMM Do YY")}
								>
									<div style={{ display: 'flex' }}>
										<img style={{ height: '300px', width: 'auto', margin: 10 }} src={event.Images[0] ? event.Images[0].url : ''}/>
										<p style={{ margin: 10, fontSize: 20 }}>{event.story}</p>
									</div>
								</TimelineEvent>
							);
							})}
						</Timeline>
						
					</section>
					{/* <!-- cd-timeline --> */}
				</div>
			</div>


		</div>
	</div>

      </div>



    );
  }
}

export default SingleChildProfile;
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

const canvasPopAPIKey = "0e524556d32c94abbef0d0b058c58a1c";
const getCanvasUrl = (imageUrl) => {
	const printableUrl = "https://store.canvaspop.com/api/pull?image_url=" + imageUrl + "&access_key=" + canvasPopAPIKey;
	return printableUrl;
}

const timelineIcons = [
	"fas fa-child", 
	"fas fa-tree", 
	"fas fa-truck", 
	"fas fa-car", 
	"fas fa-trophy",
	"fas fa-phone",
	"fas fa-puzzle-piece",
	"fas fa-baseball-ball",
	"fas fa-baseball",
	"fas fa-basketball-ball",
	"fas fa-bicycle",
	"fas fa-bug",
	"fas fa-bus",
	"fas fa-camera",
	"fas fa-fighter-jet",
	"fas fa-futbol",
	"fas fa-qq",
	"fas fa-rocket"
]

const getIcon = () => {
	let index = Math.floor((Math.random() * timelineIcons.length)) + 1;
	return timelineIcons[index]
}


class SingleChildProfile extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
	}
	handleAddEvent=()=>{
		
	}

  render() {
		var end = moment();
		var duration = moment.duration(end.diff(moment(this.props.child.birthdate)));
			let age = duration.asMonths();
			age = Math.floor(age);
			let ageDisplay;
			if (age > 24) {
				age = duration.asYears();
				ageDisplay = age + ' years';
			} else {
				ageDisplay = age + ' months';
			}
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
	</div>


	<div className="container">
		{/* <!-- this is the childs profile --> */}
		<div style={{width: '100%'}} className="container aboutWidth">
			<div className="col col-md-2" style={grayLord}>
				<div>
					<div className="card">
						<h1 id="kidsName">{this.props.child.firstname}</h1>
						<div className="fakeimg">
							<img src={this.props.child.Images ? this.props.child.Images[0].url : ''}/>
						</div>
					</div>
					<div className="card">
						<div>Weight: {this.props.child.weight}</div>
						<div>Length: {this.props.child.height}</div>
						<div>Age: {ageDisplay}</div>
					</div>
				</div>
			</div>


			{/* <!-- this is the timeline --> */}
			<div className="col col-md-9" style={grayLord}>
				<div style={{ width: '100%' }} className="container">

						{/* <!-- ALL TIMELINE STUFF GETS ADDED HERE DYNAMICALLY --> */}
						<Timeline>
						{this.props.child.Events && this.props.child.Events.map(event=>{
							return (
								<TimelineEvent
									title={event.title}
									icon={<i style={{width:18, height: 18}} className={getIcon()}/>}
									iconColor="#6fba1c"
									createdAt={moment(event.date).format("MMM Do YY")}
									titleStyle={{fontWeight: "bold", fontSize: 18}}
									subtitleStyle={{fontWeight: "bold", fontSize: 18}}
									container={'card'}
									cardHeaderStyle={{backgroundColor: "#00BCD4", color: "white"}}
									createdAtStyle={{fontWeight: "bold", fontSize: 18}}
								>
									<div style={{ display: 'flex' }}>
										<img style={{ height: '300px', width: 'auto', margin: 10 }} src={event.Images[0] ? event.Images[0].url : ''}/>
										<div style={{display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between'}}>
											<p style={{ margin: 10, fontSize: 20 }}>{event.story}</p>
											<a href={getCanvasUrl(event.Images[0] ? event.Images[0].url : '')} target="_blank"><button id="" type="button" className="btn btn-default big-btn btn-info btn-lg" data-toggle="modal"
		 									data-target="">Print!</button></a>
										 </div>
									</div>
								</TimelineEvent>
							);
							})}
						</Timeline>
						
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
import React from "react";

export default class About extends React.Component {
	render() {
		const style = {
			paddingLeft: '70px'
		}
		return (
			<div class="container">
				<div class="row" style={style}>
					<div class="col-xs-12 col-sm-12">
						<h3>The Story Behind Our Story</h3>
						<p>Do you ever feel frustrated that when you’re doing group/team brainstorming,
						there’s no progress at the end of the meeting or even after weeks? 
						Many may have reached the point of 
						thinking why do we meet up (either real-life or online) 
						when at the end of the discussion, there’s no improvement shown in the work. 
						Ideas also can be messy and not recorded during discussions resulting in 
						potentially good ideas being lost in the conversations.</p>

						<p>Our group realised this problem when we’re trying to come up ideas for orbital project. 
						Whenever we meet up through Skype or in-school, 
						our project progress doesn’t seems to have any difference from the pre-meeting. 
						After a few meetings, we started to think-through what’s the problem with our discussion, 
						and we realised that we didn’t further discuss one idea and keep jumping to another idea, 
						and thus, leading the meeting to confusion and demoralising state. </p>
						
						<p>Therefore, we decided to do a web application that is able generate an ideal 
						tree which allows each group/team member to come up with an idea and 
						branch it out to the tree. Other group/team member will look at the idea 
						and either vote like or dislike of the idea. They also can branch it out 
						from other people’s idea to further improve the idea.</p>
					</div>
					<div class="col-xs-12 col-sm-12">
						<h3>Contributors</h3>
							<ul>
								<li>Quek Kai Yu</li>
								<li>Kaiser Tan QR</li>
							</ul>
					</div>
				</div>
			</div>
		);
	}
}
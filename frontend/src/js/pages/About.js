import React from "react";

export default class About extends React.Component {
	render() {
		const style = {
			paddingLeft: '0px'
		}
		return (
			<div id="about-page">
			<div class="container">
				<div class="row" style={style}>
					<div class="col-xs-12 col-sm-12">
						<div id="about-essay">
						<h1> Hello there! </h1>
						<p> Cobbie is a free for all web application targeted towards project groups among students and corporate users.
						Starting out any kind of project, and especially in the early stages of brainstorming,
						ideas from your team tend to be in abundance and may be turn out incoherent.
						Cobbie then acts as a "GitHub" for ideas; recording down all ideas and the ideas that are built upon others.
						We make sure your team is able to see all suggestions and consider all options before you go ahead.
						</p>
						<br />
						<br />
						<div class="line"></div>
						<br />
						<br />
						<h1>Our Motivation</h1>
						<p> This project is collaboration between Quek Kai Yu and Kaiser Tan as a software development project
						under NUS Orbital Programme. The motivation to create this application resulted from the early stages of
						brainstorming for the programme itself. This is our story: </p>

						<p>Do you ever feel frustrated that when you’re doing group/team brainstorming,
						we cannot decide what to do for your project? Even after weeks of meeting up (either real-life or online), there may be no progress or conclusion to the matter.
						This could be because our ideas are too messy and not recorded during discussions and resulting in
						potentially good ideas being lost in the conversations.</p>

						<p>Our group realised this problem when we were trying to decide what we would do a software development project.
						Whenever we meet up through Skype or physically, we had no progress. However, we started to think through what was the problem with
						our approach, and we realised that we had many good ideas, yet they were very shallow and didnt go
						in-depth to work on it further. We kept switching ideas which resulted in many feasible options yet there was no one choice that we were
						confident of. The meetings led to confusion and was demoralising for us. </p>
						<p>We pinned point this issue, hence decided to design a web application to solve this problem. </p>
					</div>
					<br />
					<br />
					<div class="line"></div>
					<br />
					<br />
					<div id="features">
						<h1> Our features </h1>
						<p id="para"> Currently, our web application focuses on three main features </p>
							<div id="features-one">
								<h3> Brainstorm Tree </h3>
								<p>The main feature of our app is the using a tree to illustrate all your recorded ideas. Having a tree helps you to keep track of
								how many ideas you have and see whether a certain idea is a new one or has it been built upon an existing idea.</p>
							</div>
							<div id="features-two">
								<h3>Voting System</h3>
								<p> The voting system helps to keep track of sentiments among your team. Each idea can be given a thumbs-up by
								each team member. If an idea is greatly supported, you can identify it through the number of votes and that
								should be the idea that your team should start building on.</p>
							</div>
							<div id="features-three">
								<h3>Statistics Output</h3>
								<p>A summary report can be access anytime to better understand the progress of your brainstorm. The report
								includes the number of ideas, the most liked idea and many more. This information can help you to decide which
								direction your team is heading and allow you facilitate if necessary. </p>
							</div>
					</div>
					</div>
				</div>
				</div>
			</div>
		);
	}
}

import React from "react";
import { Link } from 'react-router-dom';

import g1 from '../static/img/g1.jpg';
import g2 from '../static/img/g2.jpg';
import g3 from '../static/img/g3.jpg';
import g4 from '../static/img/g4.jpg';
import g5 from '../static/img/g5.jpg';
import g6 from '../static/img/g6.jpg';
import g7 from '../static/img/g7.jpg';
import g8 from '../static/img/g8.jpg';
import g9 from '../static/img/g9.jpg';
import g10 from '../static/img/g10.jpg';
import g11 from '../static/img/g11.jpg';
import add from '../static/img/add.jpg';
import team from '../static/img/team.jpg';

import { ROOT_URL } from '../util/backend';

export default class Guide extends React.Component {
	render() {
		return (
			<div id="guide-page">
						<div id="top-seg">
								<h1> Getting started</h1>
								<p> A guide on how to start using Cobbie. </p>
							</div>
						<div id="regis-seg">
								<h1> Step 1: Registration </h1>
								<p> Click on <img class="p-one" src={g1} /> at the top right corner.</p>
								<p> Fill in your account details and sign up for an account. </p>
								<br />
								<h1> Step 2: Create a new project </h1>
								<p> When you have logged in, click on <img class="p-one" src={g2} /> to view your workspace. </p>
								<p> Start by creating a new project by clicking on the <img src={add} /> button. </p>
								<p> Fill in the project title and description. Remember to set a date and time for your deadline.
								Next, fill in what you think your main idea/direction should be and its description.</p>
								<br />
								<img class="middle" src={g3} /> <img class="middle" src={g4} />
								<br />
								<h1> Step 3: Adding team members </h1>
								<p> Select on the project you want to work on. </p>
								<img class="middle" src={g5} />
								<p> And start adding your team members to collaborate by clicking on the <img src={add} /> button. </p>
								<img class="middle" src={g6} />
								<p> After adding them, you should see all your collaborators listed under the Team section. </p>
								<img class="middle" src={team} />
								<br />
								<h1> Step 4: Building ideas </h1>
								<p> All your team members should be able to access the project </p>
								<p> Start branching out ideas by clicking on the <img src={add} /> button under the Nodes section. </p>
								<p> Fill in the idea title and description then pick the existing idea that you wish branch off in "Which Inspiration?".</p>
								<img class="middle" src={g7} />
								<br />
								<p> After adding the idea, you should see it displayed on your workspace. </p>
								<p> You can always edit <img src={g8} /> or delete <img src={g9} /> an idea that you have created by clicking on the respective icons. </p>
								<br />
								<h1> Step 5: Vote your favourite idea and view statistics. </h1>
								<p> You can vote for your favourite idea by clicking on the <img src={g10} /> icon beside each idea. </p>
								<br />
								<p> View statistics on the most voted idea by clicking the <img src={g11} /> on the top left hand corner of your workspace.</p>
						</div>
			</div>
		);
	}
}

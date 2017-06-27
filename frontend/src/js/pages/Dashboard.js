import React from "react";
import SortableTree from 'react-sortable-tree';

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            treeData: [{ title: 'Orbital', children: [ { title: 'Website', children: [{ title: 'React'}], expanded: true}, 
            										{ title: 'Mobile App', children: [
            										{ title: 'Android'}, { title: 'iOS'}
            										], expanded: true
            										}], expanded: true  
            		}]
        };
    }
 
    render() {
    	const containerStyle = {
			 padding: '80px 15px',
		}
		const navSideBarStyle = {
			marginRight: '-21px',
			marginBottom: '20px',
			marginLeft: '-20px',
			paddingRight: '20px',
			paddingLeft: '20px',
	
		}
		const sideBarStyle = {
			position: 'fixed',
			top: '51px',
			bottom: '0',
			left: '0',
			zIndex: '1000',
			display: 'block',
			//padding: '20px',
			overflowX: 'hidden',
			overflowY: 'auto',
			backgroundColor: '#f5f5f5',
			borderRight: '1px solid #eee'
		}
        return (
        	<div class="container-fluid">
        		<div class="row">
			        <div class="col-sm-3 col-sm-2 sidebar">
			          <ul class="nav nav-sidebar" style={navSideBarStyle}>
			            <li><h3>Projects</h3></li>
			            <li>Orbital</li>
			            <li>Cyberart</li>
			          </ul>
			          <ul class="nav nav-sidebar" style={navSideBarStyle}>
			            <li><h3>Team Members</h3></li>
			            <li>Kai Yu</li>
			            <li>Kaiser</li>
			          </ul>
			        </div>
        			<div class="col-xs-9 col-sm-10">
        				<h1 class="page-header">Orbital</h1>
			            <div style={{ height: 400 }}>
			                <SortableTree
			                    treeData={this.state.treeData}
			                    onChange={treeData => this.setState({ treeData })}
			                />
			            </div>
		            </div>
	            </div>
            </div>
        );
    }
}
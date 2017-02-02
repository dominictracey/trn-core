import React, {PropTypes, Component} from 'react';
import {Components, registerComponent} from 'meteor/nova:core';

class TrnSbFixturesAndResults extends Component {
	constructor() {
		super()

		this.state = {}
	}

	render() {


		return (
			<div className="sidebar-container">
				<div className="sidebar-card">
					<div className='sidebar-card-header'>Fixtures and Results</div>
					<div className='sidebar-card-body'>

					</div>
				</div>
			</div>
		)
	}
}

TrnSbFixturesAndResults.displayName = "TrnSbFixturesAndResults";

registerComponent('TrnSbFixturesAndResults', TrnSbFixturesAndResults);

import React, {PropTypes, Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import { Button } from 'react-bootstrap'
import {getActions, Components, registerComponent} from 'meteor/nova:core'
import { Utils } from 'meteor/nova:lib'

class TrnSbFixturesAndResults extends Component {
	constructor() {
		super()

		this.changeUro = this.changeUro.bind(this);
		this.resultsForComp = this.resultsForComp.bind(this);

		this.state = {
			dispUro: 0
		}
	}

	async componentWillReceiveProps(next) {
		try {
			const {loadConfiguration, universalRoundFnR, category, config, loadFixturesAndResults} = next

			if(Object.keys(config).length == 0) {
				await loadConfiguration()
				return
			}
			if(this.state.dispUro == 0 || this.props.category.trnId != next.category.trnId){
				this.setState({dispUro: config[Object.keys(config)[0]].currentUROrdinal})
			}

			let fNRKey = this.state.dispUro + category.trnId
			if(!universalRoundFnR || !universalRoundFnR[fNRKey] ) {
				await loadFixturesAndResults(this.state.dispUro, category.trnId)
			}

		} catch(e) {
			console.error('will receive props error', e);
		}
	}

	resultsForComp(uro, catId, rawResults) {
		const { category } = this.props
		const key = uro+catId

		if(rawResults && Object.keys(rawResults).length > 0){
			if(rawResults[key] && rawResults[key].compFandRs) {
				return (rawResults[key].compFandRs.map((comp, index) => {
					return <Components.TrnSingleFnR comp={comp} key={comp.compId} category={category}/>
					})
				)
			}
			else{
				return <div className="FnR-matchData">No results for this week.</div>
			}
		}
		else {
			return null
		}
	}

	async changeUro(change, trnId){
		try {
			const { loadFixturesAndResults, universalRoundFnR, config } = this.props

			let uro = 0
			if(Object.keys(config)[0]){
				uro = this.state.dispUro
				let cur	= config[Object.keys(config)[0]].currentUROrdinal
				if(uro+change >= cur-1 && uro+change <= cur+1 ){
					uro += change
					this.setState({dispUro: uro})
				}
			}
			let key = uro+trnId
			if (universalRoundFnR && !universalRoundFnR[key]) {
				await loadFixturesAndResults(uro, trnId)
			}

		} catch(e) {
			console.error('change uro', e);
		}
		//console.log('New fixtures');
	}

	render() {
		const {universalRoundFnR, config, category} = this.props

		let currentURO = Object.keys(config)[0] ? config[Object.keys(config)[0]].currentUROrdinal : null
		let dispUro = 0
		let fixAndRes = null

		if(this.state.dispUro != 0){
			dispUro = this.state.dispUro
		}
		if(universalRoundFnR && category && Object.keys(config)[0]){
			//console.log("I have the Fixtures and Results.")
			if(dispUro == currentURO){
				fixAndRes = this.resultsForComp(config[Object.keys(config)[0]].currentUROrdinal, category.trnId,  universalRoundFnR)
		}
			else if(dispUro == currentURO-1){
				fixAndRes = this.resultsForComp(dispUro, category.trnId,  universalRoundFnR)
			}
			else if(dispUro == currentURO+1){
				fixAndRes = this.resultsForComp(dispUro, category.trnId,  universalRoundFnR)
			}
		}


		return (
			<div className="sidebar-container">
				<div className="sidebar-card">
					<span className="FnR-headerWarrows sidebar-card-header">
						{currentURO && category ? <div className='FnR-arrow' onClick={() => this.changeUro(-1, category.trnId)}><Components.Icon name='angle-left'/></div> : null}
						<div className='sidebar-card-header'>
							Fixtures and Results
							<Components.WiresNewButton prefilledProps={{context: "fixtures sidebar"}} />
						</div>
						{currentURO && category ? <div className='FnR-arrow' onClick={() => this.changeUro(+1, category.trnId)}><Components.Icon name='angle-right'/></div> : null}
					</span>
					<div >
						{
							fixAndRes ? fixAndRes : <Components.Loading/>
						}
					</div>
				</div>
			</div>
		)
	}
}

TrnSbFixturesAndResults.displayName = "TrnSbFixturesAndResults";

const mapStateToProps = ({entities: {universalRoundFnR, config}}) => ({universalRoundFnR, config})
const {loadFixturesAndResults, loadConfiguration} = getActions()
const mapDispatchToProps = dispatch => bindActionCreators({loadFixturesAndResults, loadConfiguration}, dispatch);

registerComponent('TrnSbFixturesAndResults', TrnSbFixturesAndResults, connect(mapStateToProps, mapDispatchToProps));

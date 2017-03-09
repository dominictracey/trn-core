import React, {PropTypes, Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import { Button } from 'react-bootstrap'
import _ from 'lodash'
import {getActions, Components, registerComponent, getFragment, withList} from 'meteor/nova:core'
import { Utils } from 'meteor/nova:lib'
import Categories from 'meteor/nova:categories'

class TrnSbFixturesAndResults extends Component {
	constructor(props) {
		super(props)

		const { loadConfiguration, config } = props

		this.changeUro = this.changeUro.bind(this);
		this.resultsForComp = this.resultsForComp.bind(this);

		this.state = {
			dispUro: 0
		}

		try {
			if (Object.keys(config).length == 0) {
				loadConfiguration()
			}
		} catch (e) {
			console.error('Constructor error', e)
		}
	}

	async componentWillReceiveProps(next) {
		try {
			const {loadConfiguration, universalRoundFnR, category, config, loadFixturesAndResults} = next

			if(Object.keys(config).length == 0) {
				await loadConfiguration()
				return
			}
			if(this.state.dispUro == 0 || (next.category && this.props.category && this.props.category != "all" && this.props.category.trnId != next.category.trnId)){
				this.state = {dispUro: config[Object.keys(config)[0]].currentUROrdinal}
			}

			let fNRKey = null
			if(this.state.dispUro != 0 && category && category == 'all'){
				fNRKey = this.state.dispUro + config[Object.keys(config)[0]].compsForClient.join()
			}
			else if(this.state.dispUro != 0 && category && category != 'all'){
				fNRKey = this.state.dispUro + category.trnId
			}

			if((!universalRoundFnR || !universalRoundFnR[fNRKey]) && fNRKey) {
				category && category != 'all'
					? await loadFixturesAndResults(this.state.dispUro, category.trnId)
					: await loadFixturesAndResults(this.state.dispUro, config[Object.keys(config)[0]].compsForClient.join())
			}

		} catch(e) {
			console.error('will receive props error', e);
		}
	}

	resultsForComp(uro, catId, rawResults) {
		const { category, results: categories = [] } = this.props
		const key = uro+catId

		const availComps = categories.filter((cat) => cat.type == 'comp')

		if(rawResults && Object.keys(rawResults).length > 0){
			if(rawResults[key] && rawResults[key].compFandRs) {
				return (rawResults[key].compFandRs.map((comp, index) => {
					if(_.find(availComps, (cat) => cat.trnId == comp.compId)){
						return (
						<div className="FnR-body" key={index}>
							{
								category!='all'
									? <Components.TrnSingleFnR comp={comp} key={comp.compId} category={category}/>
									: <Components.TrnSingleFnR comp={comp} key={comp.compId} category={availComps}/>
							}
						</div>
						)
					}
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
		let leftArr
		let rightArr

		if(this.state.dispUro != 0){
			dispUro = this.state.dispUro
		}
		if(universalRoundFnR && category && category != 'all' && Object.keys(config)[0]){
			//console.log("I have the Fixtures and Results.")
			if(dispUro == currentURO){
				fixAndRes = this.resultsForComp(config[Object.keys(config)[0]].currentUROrdinal, category.trnId,  universalRoundFnR)
			}
			else if(dispUro == currentURO-1 || dispUro == currentURO+1){
				fixAndRes = this.resultsForComp(dispUro, category.trnId,  universalRoundFnR)
			}

			// else if(dispUro == currentURO+1){
			// 	fixAndRes = this.resultsForComp(dispUro, category.trnId,  universalRoundFnR)
			// }
			leftArr = <div className='FnR-arrow' onClick={() => this.changeUro(-1, category.trnId)}><Components.Icon name='angle-left'/></div>
			rightArr = <div className='FnR-arrow' onClick={() => this.changeUro(+1, category.trnId)}><Components.Icon name='angle-right'/></div>
		}
		else if(universalRoundFnR && category && category == 'all' && Object.keys(config)[0]){
			if(dispUro == currentURO){
				fixAndRes = this.resultsForComp(config[Object.keys(config)[0]].currentUROrdinal, config[Object.keys(config)[0]].compsForClient.join(),  universalRoundFnR)
			}
			else if(dispUro == currentURO-1 || dispUro == currentURO+1){
				fixAndRes = this.resultsForComp(dispUro, config[Object.keys(config)[0]].compsForClient.join(),  universalRoundFnR)
			}
			// else if(dispUro == currentURO+1){
			// 	fixAndRes = this.resultsForComp(dispUro, config[Object.keys(config)[0]].compsForClient.join(),  universalRoundFnR)
			// }
			leftArr = <div className='FnR-arrow' onClick={() => this.changeUro(-1, config[Object.keys(config)[0]].compsForClient.join())}><Components.Icon name='angle-left'/></div>
			rightArr = <div className='FnR-arrow' onClick={() => this.changeUro(+1, config[Object.keys(config)[0]].compsForClient.join())}><Components.Icon name='angle-right'/></div>
		}


		return (
			<div className="sidebar-container">
				<div className="sidebar-card">
					<span className="FnR-headerWarrows sidebar-card-header">
						{currentURO && category  && leftArr ? leftArr : null}
						<div className='sidebar-card-header'>
							Fixtures and Results
							<Components.WiresNewButton prefilledProps={{context: "fixtures sidebar"}} />
						</div>
						{currentURO && category && rightArr ? rightArr : null}
					</span>
					<div className='sidebar-card-body'>
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

const options = {
	collection: Categories,
	queryName: 'categoriesSingleQueryTnR',
	fragment: getFragment('CategoriesList'),
};

const mapStateToProps = ({entities: {universalRoundFnR, config}}) => ({universalRoundFnR, config})
const {loadFixturesAndResults, loadConfiguration} = getActions()
const mapDispatchToProps = dispatch => bindActionCreators({loadFixturesAndResults, loadConfiguration}, dispatch);

registerComponent('TrnSbFixturesAndResults', TrnSbFixturesAndResults, withList(options), connect(mapStateToProps, mapDispatchToProps));

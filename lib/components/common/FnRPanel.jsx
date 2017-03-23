import React, {PropTypes, Component} from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import _ from 'lodash'
import {getActions, Components, registerComponent, getFragment, withList} from 'meteor/vulcan:core'
import Categories from 'meteor/vulcan:categories'

// This component maintains in it's state the universal round ordinal (uro is the number of weeks since the first wednesday in 1970)
//	the forward and backward arrows modify the state key 'dispUro'
class FnRPanel extends Component {
	constructor(props) {
		super(props)

		this.changeUro = this.changeUro.bind(this)
		this.resultsForComp = this.resultsForComp.bind(this)

		this.state = {
			dispUro: 0
		}
	}

	// best practice is to load data once the component has mounted
  componentDidMount() {
    this.props.loadConfiguration([]);
  }

	async componentWillReceiveProps(next) {
		try {
			const { config, universalRoundFnR, category, loadFixturesAndResults} = next

			const conf = config[Object.keys(config)[0]]

			if (!conf) return;  // still waiting for config to load -- hmmm

			// initialize the uro we are going to display from the configuration's current URO field if we are just starting up or switching comps
			if(this.state.dispUro == 0 || (next.category && this.props.category && this.props.category != "all" && this.props.category.trnId != next.category.trnId)){
				this.state = {dispUro: conf.currentUROrdinal}
			}

			// the store key for the fixtures and results is in the form URO COMPID [...,COMPID]
			let fNRKey = null
			if(this.state.dispUro != 0 && category && category == 'all'){
				fNRKey = this.state.dispUro + conf.compsForClient.join() // use the complete list of comps if we are showing on the homepage (category is "all")
			} else if(this.state.dispUro != 0 && category && category != 'all'){
				fNRKey = this.state.dispUro + category.trnId
			}

			// now we can check the store for the data we need and call the action creator loadFixturesAndResults if it's not there
			if((!universalRoundFnR || !universalRoundFnR[fNRKey]) && fNRKey) {
				category && category != 'all'
					? await loadFixturesAndResults(this.state.dispUro, category.trnId)
					: await loadFixturesAndResults(this.state.dispUro, conf.compsForClient.join())
			}

		} catch(e) {
			console.error('will receive props error', e);
		}
	}

	// this returns a component that represents the results for one or more competitions
	// uro: Universal Round Ordinal to displayName
	// compId: the TRN compId being sought
	// rawResults: the destructured store data returned from the REST call
	resultsForComp(uro, compId, rawResults) {

		// category: either the string "all" or the category representing the current competition
		// categories: an array of all our categories (type <= [comp, team, normal]
		const { category, results: categories = [], compFandRs } = this.props
		const key = uro+compId

		// we need just the comp categories
		// @REX should also filter by visible
		const availCompCats = categories.filter((cat) => cat.type == 'comp')

		if(rawResults && Object.keys(rawResults).length > 0){  // if we have FnRs in the store
			if(rawResults[key] && rawResults[key].compFandRs && compFandRs && Object.keys(compFandRs).length > 0) {  // if the FNRs for the correct compId and URO is in the store
				return (rawResults[key].compFandRs.map((compFnRiD, index) => { // for each comp in our FnRs structure
					const compId = compFandRs[compFnRiD].compId
					if(_.find(availCompCats, (cat) => cat.trnId == compId)) { // if we have a category for that comp, build a section for it in the panel
						return (
						<div className="FnR-body" key={index}>
							{
								category!='all'
									? <Components.FnRComp comp={compFandRs[compFnRiD]} key={compId} category={category}/>
									: <Components.FnRComp comp={compFandRs[compFnRiD]} key={compId} category={availCompCats}/>
							}
						</div>
						)
					}
					})
				)
			}
			else if(rawResults[key] && !rawResults[key].compFandRs) {
				return <div className="FnR-noData">No results for this week.</div>
			}
			else{
				return <Components.Loading />
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
			} else if(dispUro == currentURO-1 || dispUro == currentURO+1){
				fixAndRes = this.resultsForComp(dispUro, category.trnId,  universalRoundFnR)
			}

			leftArr = <div className='FnR-arrow' onClick={() => this.changeUro(-1, category.trnId)}><Components.Icon name='angle-left'/></div>
			rightArr = <div className='FnR-arrow' onClick={() => this.changeUro(+1, category.trnId)}><Components.Icon name='angle-right'/></div>
		} else if(universalRoundFnR && category && category == 'all' && Object.keys(config)[0]){
			if(dispUro == currentURO){
				fixAndRes = this.resultsForComp(config[Object.keys(config)[0]].currentUROrdinal, config[Object.keys(config)[0]].compsForClient.join(),  universalRoundFnR)
			}
			else if(dispUro == currentURO-1 || dispUro == currentURO+1){
				fixAndRes = this.resultsForComp(dispUro, config[Object.keys(config)[0]].compsForClient.join(),  universalRoundFnR)
			}

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

FnRPanel.displayName = "FnRPanel";

const options = {
	collection: Categories,
	queryName: 'categoriesSingleQueryFnR',
	fragment: getFragment('CategoriesList'),
};

const mapStateToProps = ({entities: {universalRoundFnR, config, compFandRs}}) => ({universalRoundFnR, config, compFandRs})
const {loadFixturesAndResults, loadConfiguration} = getActions()
const mapDispatchToProps = dispatch => bindActionCreators({loadFixturesAndResults, loadConfiguration}, dispatch);

registerComponent('FnRPanel', FnRPanel, withList(options), connect(mapStateToProps, mapDispatchToProps));

import React, {PropTypes, Component} from 'react';
import {withRouter} from 'react-router';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {getActions, Components, registerComponent, withDocument, getFragment} from 'meteor/nova:core'
import Categories from 'meteor/nova:categories'

class TrnSbFixturesAndResults extends Component {
	constructor() {
		super()
		
		this.changeUro = this.changeUro.bind(this);
		this.resultsForComp = this.resultsForComp.bind(this);

		this.state = {
			loading: false,
			trnId: -1,
			config: null,
			currentUro: -1,
			dispUro: 0
		}
	}

	componentDidMount() {
		const {loadConfiguration, config} = this.props

		//this.state = {loading: true, config: null, trnId: -1}
		// await loadConfiguration()
		
		// use this.setState
		const newState = Object.keys(config) > 0
			? {loading: false,
				config: config,
				trnId: -1
			}
			: {loading: false,
				trnId: -1,
				config: null,
				currentUro: -1,
			};
			
		this.setState(newState);
	}

	async componentWillReceiveProps(next) {
		try {
			const {universalRoundFnR, document: category, slug, catType, config, loadFixturesAndResults} = this.props
			var thisConfId
			
			// use deepEqual comparison, you are trying to compare huge objects
			
			// if (next.config && next.config != this.state.config) {
			// 	thisConfId = Object.getOwnPropertyNames(next.config).length > 0 ? Object.getOwnPropertyNames(next.config)[0] : null
			// 	Object.getOwnPropertyNames(next.config).length > 0
			// 	? this.setState({currentUro: next.config[thisConfId].currentUROrdinal, dispUro: next.config[thisConfId].currentUROrdinal})
			// 	: null
			// }
			
			const cat = category || next.category ? category || next.category : null
			cat && this.state.trnId == -1 ? this.setState({trnId: cat.trnId}) : null
			
			const callApi = catType == "c" && cat && thisConfId && config.hasOwnProperty(thisConfId) && !universalRoundFnR && this.state.currentUro !=-1 ? await loadFixturesAndResults(this.state.currentUro, category.trnId) : null
			
		} catch(e) {
			console.error('will receive props error', e);
		}
	}

	resultsForComp(rawResults) {
		//const rawResults = raw.universalRoundFnR

		// Object.keys(rawResults).map((compIdUro) => {
		// 	return (rawResults[compIdUro].compFandRs.map((comp) => {
		// 		return <Component.TrnSingleFnR comp={comp} key={comp.compId} />
		// 	}))
		// })
		
		if(Object.keys(rawResults) > 0){
			for ( const compIdUro in rawResults){
				if(rawResults.hasOwnProperty(compIdUro)) {
					if(rawResults[compIdUro].universalRoundOrdinal == this.state.dispUro) {
					return (rawResults[compIdUro].compFandRs.map((comp, index) => {
							return <Components.TrnSingleFnR comp={comp} key={comp.compId}/>
						})
					)
				}
				}
			}
		}
		else {
			return null;
		}
	}

	async changeUro(uro){
		// try {
		// 	const { document: category, loadFixturesAndResults } = this.props
		// 	
		// 	if (uro != -1 && category) {
		// 		await loadFixturesAndResults(uro, category.trnId)
		// 		this.setState({dispUro: uro})
		// 	} 
		// 	
		// } catch(e) {
		// 	console.error('change uro', e);
		// }
		console.log('should do something');
	}

	render() {
		const {universalRoundFnR} = this.props
		
		const fixAndRes = universalRoundFnR ? this.resultsForComp(universalRoundFnR) : null
		const currentURO = this.state.currentUro != -1 ? this.state.currentUro : null

		return (
			<div className="sidebar-container">
				<div className="sidebar-card">
					<span className="FnR-headerWarrows">
						{currentURO ? <div className='FnR-arrow' onClick={ this.changeUro(currentURO-1)}>&lt;</div> : null}
						<div className='sidebar-card-header'>
							Fixtures and Results
							<Components.WiresNewButton prefilledProps={{context: "fixtures sidebar"}} />
						</div>
						{currentURO ? <div className='FnR-arrow' onClick={ this.changeUro(currentURO+1)}>&gt;</div> : null}
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

const options = {
	collection: Categories,
	queryName: 'categoriesSingleQuery',
	fragment: getFragment('CategoriesList'),

};

TrnSbFixturesAndResults.displayName = "TrnSbFixturesAndResults";

const mapStateToProps = ({entities: {universalRoundFnR, config}}) => ({universalRoundFnR, config})
const {loadFixturesAndResults, loadConfiguration} = getActions()
const mapDispatchToProps = dispatch => bindActionCreators({loadFixturesAndResults, loadConfiguration}, dispatch);

registerComponent('TrnSbFixturesAndResults', TrnSbFixturesAndResults, withRouter, withDocument(options), connect(mapStateToProps, mapDispatchToProps));

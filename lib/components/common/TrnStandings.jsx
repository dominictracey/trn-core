import React, {PropTypes, Component} from 'react'
import {withRouter} from 'react-router'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {getActions, Components, registerComponent, withDocument, getFragment} from 'meteor/nova:core'
import Categories from 'meteor/nova:categories'

class TrnStandings extends Component {

	constructor() {
		super();
		//this.getStandings = this.getStandings.bind(this);

		// always define an inital state!
		this.state = {
			trnId: -1,
			showStandings: false,
			teams : null,
		};
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.document && this.props.document.slug != nextProps.document.slug) {
			this.setState({showStandings: false})
			this.getStandings(nextProps.document.trnId)
		}
		else if (nextProps.document && !this.props.document) {
			this.getStandings(nextProps.document.trnId)
		}
	}

	async componentDidMount() {
		const {document: category} = this.props

		category ? await this.getStandings(category.trnId) : null
	}

	async getStandings(categoryId) {
		const {loadCompStandings} = this.props

		console.log("Loading Standings") // eslint-disable-line
		await loadCompStandings(categoryId)
		//await loadCompetition(trnId)
		console.log("Load complete") // eslint-disable-line
		this.setState({trnId: categoryId, showStandings: true, teams: this.props.document.attachedTeams})
	}

	getPools(standingsArr) {
		var pools = {}
		pools[standingsArr[0].pool] = []
		standingsArr.map((standing, index) => {
			if (!pools[standing.pool]) {
				pools[standing.pool] = []
			}
			pools[standing.pool].push(standing)
		})

		return pools
	}

	render() {
		const { compStandingsById } = this.props


		var trnId = this.state.trnId != -1 ? this.state.trnId : null
		const standingsArr = trnId && compStandingsById && this.state.teams && compStandingsById[trnId].standings ? compStandingsById[trnId].standings : null
		var retval = null;
		if (this.state.showStandings && standingsArr) {
			retval = -1
		}
		else if (this.state.showStandings && !standingsArr) {
			retval = <div>No Standings for this Competition</div>
		}
		else {
			retval = <Components.Loading />
		}

		const pools = standingsArr && standingsArr[0] && standingsArr[0].pool ? this.getPools(standingsArr) : null
		const poolNames = pools && this.state.showStandings ? Object.getOwnPropertyNames(pools).sort() : null


		return (
			<div className='sidebar-card standings-container'>
				<div className='sidebar-card-header'>
					<span>Standings</span>
					<Components.WiresNewButton
						prefilledProps={{context: "standings"}}
					/>
				</div>
				<div className='standings-data sidebar-card-body'>
					<div className='standings-row standings-leg'>
						<div className='standings-col standings-col-ordinal standings-leg'>Rank</div>
						<div className="standings-col"></div>
						<div className="standings-col standings-col-name standings-leg">Name</div>
						<div className="standings-col standings-col-stats standings-leg">Win</div>
						<div className="standings-col standings-col-stats standings-leg">Loss</div>
						<div className="standings-col standings-col-stats standings-leg">Draw</div>
						<div className="standings-col standings-col-stats standings-leg">Points</div>
					</div>

					{!poolNames
						?
						retval && retval == -1 ? standingsArr.map((standing, index) => {
								return (
									<Components.TrnStandingsRow key={standing.id.toString()} standing={standing}
									                            teams={this.state.teams}/>
								)
							}) : retval
						:
						poolNames.map((name, index) => {
							return (
								<Components.TrnStandingsPool key={index} pool={pools[name]} name={name} teams={this.state.teams}/>
							)
						})
					}

				</div>
			</div>
		)
	}
}

const options = {
	collection: Categories,
	queryName: 'categoriesSingleQuery',
	fragment: getFragment('CategoriesList'),
	limit: 0,
};

// TrnStandings.propTypes = {
//   // post: React.PropTypes.object.isRequired
// };

TrnStandings.displayName = "TrnStandings"

const mapStateToProps = ({entities: {teams, compStandingsById}}) => ({teams, compStandingsById})
const {loadCompStandings, loadCompetition} = getActions();
const mapDispatchToProps = dispatch => bindActionCreators({loadCompStandings}, dispatch);

registerComponent('TrnStandings', TrnStandings, withRouter, withDocument(options), connect(mapStateToProps, mapDispatchToProps))

import React, {PropTypes, Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {getActions, Components, registerComponent} from 'meteor/nova:core'

class TrnStandings extends Component {

	constructor() {
		super();
		this.getStandings = this.getStandings.bind(this)
		this.getPools = this.getPools.bind(this)
	}

	componentWillReceiveProps(next) {
		try {
			const {category : {trnId}, compStandingsById} = next
			if (trnId && (!compStandingsById || !compStandingsById[trnId])) {
				this.getStandings(trnId);
			}

		} catch(e) {
			console.error('error on did mount:', e);
		}
	}

	async getStandings(categoryId) {
		try {
			const { loadCompStandings } = this.props

			console.log("Loading Standings") // eslint-disable-line
			await loadCompStandings(categoryId)
			console.log("Load complete") // eslint-disable-line
		} catch(e) {
			console.error('error loading standings', e);
		}
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
		const { compStandingsById, category } = this.props

		if (!category || !compStandingsById || !compStandingsById[category.trnId]) {
			return <Components.Loading />
		}

		if (!compStandingsById[category.trnId].standings) {
			return (<div>No Standings for this Competition</div>)
		}

		const pools = compStandingsById[category.trnId].standings[0].pool ? this.getPools(compStandingsById[category.trnId].standings) : null
		const poolNames = pools ? Object.getOwnPropertyNames(pools).sort() : null

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

					{!poolNames ? compStandingsById[category.trnId].standings.map((standing, index) => {
								return (
									<Components.TrnStandingsRow key={standing.id.toString()} standing={standing} teams={category.attachedTeams}/>
								)
							})
						:
						poolNames.map((name, index) => {
							return (
								<Components.TrnStandingsPool key={index} pool={pools[name]} name={name} teams={category.attachedTeams}/>
							)
						})
					}

				</div>
			</div>
		)
	}
}

TrnStandings.displayName = "TrnStandings"

const mapStateToProps = ({entities: {teams, compStandingsById}}) => ({teams, compStandingsById})
const {loadCompStandings} = getActions();
const mapDispatchToProps = dispatch => bindActionCreators({loadCompStandings}, dispatch);

registerComponent('TrnStandings', TrnStandings, connect(mapStateToProps, mapDispatchToProps))

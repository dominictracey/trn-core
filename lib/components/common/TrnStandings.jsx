import React, {PropTypes, Component} from 'react'
import { withRouter } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getActions, Components, registerComponent, getRawComponent, withList } from 'meteor/nova:core'
import Categories from 'meteor/nova:categories'
import gql from 'graphql-tag';


class TrnStandings extends Component {

	constructor() {
		super();
		//this.getStandings = this.getStandings.bind(this);

		// always define an inital state!
		this.state = {
			trnId: -1,
			loadingComp: false,
			showStandings: false
		};
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.params.slug != nextProps.params.slug) {
			this.props.params.slug = nextProps.params.slug
			this.getStandings(this.props.results)
		}
		else if (nextProps.results && !this.props.results){
			this.getStandings(nextProps.results)
		}
	}

	async componentDidMount() {
		const {results: categories = []} = this.props

		categories.length > 0 ? await this.getStandings(cats) : null
	}

	async getStandings(categories) {
		const {loadCompStandings, loadCompetition} = this.props
		var trnId;

		const results = categories ? categories.filter(cat => this.props.params.slug == cat.slug) : null
		if (results != null && results.length > 0) {
			trnId = results[0].trnId
		}
		console.log("Loading Standings")
		await loadCompStandings(trnId)
		await loadCompetition(trnId)
		console.log("Load complete")
		this.setState({trnId: trnId, showStandings: true})
	}

	render() {
		const {compStandingsById, teams} = this.props


		var trnId = this.state.trnId != -1 ? this.state.trnId : null
		const standingsArr = trnId && compStandingsById && teams && compStandingsById[trnId].standings ? compStandingsById[trnId].standings : null
		var retval = null;
		if(this.state.showStandings && standingsArr){
			retval = -1
		}
		else if(this.state.showStandings && !standingsArr){
			retval = <div>No Standings for this Competition</div>
		}
		else{
			retval = <Components.Loading />
		}

		return (
			<div className='standings-container card'>
				<div className='standings-head'>Standings</div>
				<div className='standings-data'>
				<div className='standings-row standings-leg'>
					<div className='standings-col standings-col-ordinal standings-leg'>Rank</div>
					<div className="standings-col"></div>
					<div className="standings-col standings-col-name standings-leg">Name</div>
					<div className="standings-col standings-col-stats standings-leg">Win</div>
					<div className="standings-col standings-col-stats standings-leg">Loss</div>
					<div className="standings-col standings-col-stats standings-leg">Draw</div>
					<div className="standings-col standings-col-stats standings-leg">Points</div>
				</div>
				{
					retval && retval == -1 ? standingsArr.map((standing, index) => {
						return  (
							<Components.TrnStandingsRow key={standing.id.toString()} standing={standing} team={teams[standing.teamId]} />
						)
					}): retval
				}
				</div>
			</div>
		)
	}
}

TrnStandings.fragment = gql`
  fragment standingFragment on Category {
    _id
    slug
    trnId
  }
`

const options = {
	collection: Categories,
	queryName: 'categoriesSingleQuery',
	fragment: TrnStandings.fragment,
	limit: 0,
};

// TrnStandings.propTypes = {
//   // post: React.PropTypes.object.isRequired
// };

TrnStandings.displayName = "TrnStandings"

const mapStateToProps = ({entities: {teams, compStandingsById}}) => ({teams, compStandingsById})
const {loadCompStandings, loadCompetition} = getActions();
const mapDispatchToProps = dispatch => bindActionCreators({loadCompStandings, loadCompetition}, dispatch);

registerComponent('TrnStandings', TrnStandings, withRouter, withList(options), connect(mapStateToProps, mapDispatchToProps))

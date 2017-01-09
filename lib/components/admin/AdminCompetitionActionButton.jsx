import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { intlShape } from 'react-intl';
import { Button } from 'react-bootstrap';

import { Components, registerComponent, withEdit, withMessages, Actions } from 'meteor/nova:core';
import Categories from 'meteor/nova:categories';

class AdminCompetitionActionButton extends Component {
  constructor(props) {
    super(props);
    this.fetchComp = this.fetchComp.bind(this);
    this.updateCategory = this.updateCategory.bind(this);
    
    this.state = {
      loading: false,
    }
  }
  
  componentWillReceiveProps(nextProps, nextContext) {
    const { category, comp } = this.props;
    
    if (nextProps.comp[category.trnId] && !comp[category.trnId]) {
      const currentComp = nextProps.comp[category.trnId];
      
      this.updateCategory(currentComp);
    }
  }
  
  async fetchComp() {
    const { category, loadCompetition, flash } = this.props;
    
    try {
      // console.log('fetch start');
      this.setState({loading: true});
      
      await loadCompetition(category.trnId, []);
      
      // console.log('fetch end');
      this.setState({loading: false});
      
      flash(`Competition "${category.name}" fetched!`, 'success');
    } catch(e) {
      flash(`Error fetching comp: ${e}`, "error");
    }
  }
  
  async updateCategory(comp) {
    const { category, editMutation, flash } = this.props;
    
    try {
      const { weightingFactor, abbr } = comp;
      
      const mutationParams = {
        documentId: category._id,
        set: { 
          name: category.name, // needed even if we don't change it (category type definition)
          order: weightingFactor * 100,
          abbr,
          image: `http://www.rugby.net/resources/comps/${abbr}/200.png`,
        },
        unset: {}, // needed even if we don't "unset" anything (mutation utils process)
      };
      
      // console.log('mutation start');
      
      await editMutation(mutationParams);
      
      // console.log('mutation end');
      
      flash(`Competition "${category.name}" updated!`, 'success');
    } catch(e) {
      flash(`Error updating category: ${e}`, "error");
    }
  }
  
  render() {
    const { category, openCategoryEditModal } = this.props;
    
    const label = category.order ? 'Edit' : 'Init fetch';
    const onClick = category.order && category.abbr ? openCategoryEditModal : this.fetchComp;
    
    if(!category || !category.trnId) {
      return <span>Error defining button</span>;
    }
      
    return (
      <Button className="posts-new-button" bsStyle="primary" disabled={this.state.loading} onClick={onClick}>
        {this.state.loading ? <Components.Loading /> : <span>{label}</span>}
      </Button>
    );
  }
}

AdminCompetitionActionButton.displayName = "AdminCompetitionActionButton";

AdminCompetitionActionButton.defaultProps = {
  comp: {}, // will avoid errors of undefined propagation!
}

AdminCompetitionActionButton.contextTypes = {
  intl: intlShape,
}

const options = {
  collection: Categories,
  fragment: Components.AdminPage.rawComponent.fragment,
};

const mapStateToProps = ({entities: { comp }}) => ({ comp });
const mapDispatchToProps = dispatch => bindActionCreators({loadCompetition: Actions.loadCompetition}, dispatch);

registerComponent('AdminCompetitionActionButton', AdminCompetitionActionButton, withMessages, withEdit(options), connect(mapStateToProps, mapDispatchToProps));

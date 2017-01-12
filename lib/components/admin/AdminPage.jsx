import React, { PropTypes, Component }from 'react';
import gql from 'graphql-tag';

import { Components, registerComponent, withList } from 'meteor/nova:core';
import Categories from 'meteor/nova:categories';

class AdminPage extends Component {

  constructor(props) {
    super(props);
  }
  
  renderNormalCategories() {
    const {results: categories} = this.props;
    
    return <Components.AdminCategoriesList
              showNewCategoryButton={true}
              type="normal"
              categories={categories.filter(c => c.type === 'normal')}
              prefilledNewCategory={{order: 1, type: 'normal'}}
            />;
  }
  
  renderTeamCategories() {
    const {results: categories} = this.props;
    
    return <Components.AdminCategoriesList
              showNewCategoryButton={false}
              type="team"
              categories={categories.filter(c => c.type === 'team')}
            />;
  }

  renderCompetitionsCategories() {
    const {results: categories} = this.props;
    
    return <Components.AdminCategoriesList
              showNewCategoryButton={false}
              type="comp"
              categories={categories.filter(c => c.type === 'comp')}
              specificActionButton={Components.CategoriesCompetitionsEditButton}
            />;
  }
  
  renderRemoteCompetitions() {
    
    const { results: categories = [] } = this.props;
    
    // the logic to filter the categories is done directly in the component thanks to the remote results of the TRN API
    return <Components.AdminCategoriesRemoteList
              categories={categories}
            />;
  }

  render() {
    
    const {results: categories} = this.props;
    
    return (
      <div>
        <h1>Admin Page</h1>
        
        <h3>Normal categories</h3>
        {categories ? this.renderNormalCategories() : <Components.Loading />}
        
        <h3>Teams categories</h3>
        {categories ? this.renderTeamCategories() : <Components.Loading />}
        
        <h3>Competitions categories</h3>
        {categories ? this.renderCompetitionsCategories() : <Components.Loading />}
        
        <h3>Competitions from TRN API</h3>
        {categories ? this.renderRemoteCompetitions() : <Components.Loading />}

      </div>
    )
  }
}

AdminPage.propTypes = {
  results: PropTypes.array,
};

AdminPage.fragment = gql`
  fragment adminPageCategoriesFragment on Category {
    _id
    name
    description
    order
    slug
    image
    type
    visible
    trnId
    abbr
    attachedTeams {
      _id
      name
      description
      order
      slug
      image
      type
      visible
      trnId
      abbr
    }
  }
`;

const options = {
  collection: Categories,
  queryName: 'adminPageCategoriesListQuery',
  fragment: AdminPage.fragment,
  limit: 0,
};

registerComponent('AdminPage', AdminPage, withList(options));

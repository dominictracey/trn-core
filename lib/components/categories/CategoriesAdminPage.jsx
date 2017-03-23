import React, { PropTypes, Component }from 'react';
import { Components, registerComponent, withList, withCurrentUser, getFragment } from 'meteor/vulcan:core';
import Categories from 'meteor/vulcan:categories';
import Users from 'meteor/vulcan:users';

class CategoriesAdminPage extends Component {

  constructor(props) {
    super(props);
  }

  renderNormalCategories() {
    const {results: categories} = this.props;

    return <Components.CategoriesAdminList
              showNewCategoryButton={true}
              type="normal"
              categories={categories.filter(c => c.type === 'normal')}
              prefilledNewCategory={{order: 1, type: 'normal', visible: true}}
            />;
  }

  renderTeamCategories() {
    const {results: categories} = this.props;

    return <Components.CategoriesAdminList
              showNewCategoryButton={false}
              type="team"
              categories={categories.filter(c => c.type === 'team')}
            />;
  }

  renderCompetitionsCategories() {
    const {results: categories} = this.props;

    return <Components.CategoriesAdminList
              showNewCategoryButton={false}
              type="comp"
              categories={categories.filter(c => c.type === 'comp')}
              specificActionButton={Components.CategoriesCompetitionsEditButton}
            />;
  }

  renderRemoteCompetitions() {

    const { results: categories = [] } = this.props;

    // the logic to filter the categories is done directly in the component thanks to the remote results of the TRN API
    return <Components.CategoriesAdminRemoteList
              categories={categories}
            />;
  }

  render() {

    const {results: categories, currentUser} = this.props;

    // user not allowed to access the content
    if(!Users.canDo(currentUser, 'categories.edit.all')) {
      return <Components.UsersAccountForm />;
    }

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
    );
  }
}

CategoriesAdminPage.propTypes = {
  results: PropTypes.array,
};


const options = {
  collection: Categories,
  queryName: 'adminPageCategoriesListQuery',
  fragment: getFragment('CategoriesList'),
  limit: 0,
};

registerComponent('CategoriesAdminPage', CategoriesAdminPage, withCurrentUser, withList(options));

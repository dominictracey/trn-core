/**
 * Created by Scott on 12/2/2016.
 */
import Telescope from 'meteor/nova:lib';
import Users from 'meteor/nova:users';
//import Category from 'meteor/nova:base-components'
import React, { PropTypes, Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { withRouter } from 'react-router'
import { /* Button, DropdownButton, */ MenuItem } from 'react-bootstrap';

class CompetitionCategory extends Telescope.components.Category {
  
  renderEdit() {
    return (
      <Telescope.components.CanDo action="categories.edit.all">
        <a onClick={this.props.openModal} className="edit-category-link"><Telescope.components.Icon name="edit"/></a>
      </Telescope.components.CanDo>
    );
    // return (
    //   <ModalTrigger title="Edit Category" component={<a className="edit-category-link"><Telescope.components.Icon name="edit"/></a>}>
    //     <Telescope.componentsCategoriesEditForm category={this.props.category}/>
    //   </ModalTrigger>
    // )
  }

  render() {

    const {category, index, router} = this.props;

    const currentCategorySlug = router.location.query.cat;
    const newQuery = _.clone(router.location.query);
    newQuery.cat = category.slug;

    return (
      <div className="competitionBar competition-item">
        <LinkContainer to={{pathname:"/", query: newQuery}}>
           <MenuItem
             eventKey={index+1}
             key={category._id}
           >
           {currentCategorySlug === category.slug ? <Telescope.components.Icon name="voted"/> :  null}
            {category.name}
          </MenuItem>
        </LinkContainer>
        {Users.canDo(this.context.currentUser, "categories.edit.all") ? this.renderEdit() : null}
      </div>
    )
  }
}

CompetitionCategory.propTypes = {
  category: React.PropTypes.object,
  index: React.PropTypes.number,
  currentCategorySlug: React.PropTypes.string,
  openModal: React.PropTypes.func
}

CompetitionCategory.contextTypes = {
  currentUser: React.PropTypes.object
};

module.exports = withRouter(CompetitionCategory);
export default withRouter(CompetitionCategory);

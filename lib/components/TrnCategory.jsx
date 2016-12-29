/**
 * Created by Scott on 12/2/2016.
 */
//import Telescope from 'meteor/nova:lib';
import { Components, getRawComponent, replaceComponent } from 'meteor/nova:core';
import Users from 'meteor/nova:users';
//import Category from 'meteor/nova:base-components'
import React, { PropTypes, Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { withRouter } from 'react-router'
import { /* Button, DropdownButton, */ MenuItem } from 'react-bootstrap';

class TrnCategory extends getRawComponent('Category') {

  renderEdit() {
    return (
      <Components.CanDo action="categories.edit.all">
        <a onClick={this.props.openModal} className="edit-category-link"><Components.Icon name="edit"/></a>
      </Components.CanDo>
    );
    // return (
    //   <ModalTrigger title="Edit Category" component={<a className="edit-category-link"><Components.Icon name="edit"/></a>}>
    //     <ComponentsCategoriesEditForm category={this.props.category}/>
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
        <Link to={{pathname:"/", query: newQuery}}>

             eventKey={index+1}
             key={category._id}
           >
           {/* {currentCategorySlug === category.slug ? <Components.Icon name="voted"/> :  null} */}
            {category.name}
        </Link>
        {Users.canDo(this.context.currentUser, "categories.edit.all") ? this.renderEdit() : null}
      </div>
    )
  }
}

TrnCategory.propTypes = {
  category: React.PropTypes.object,
  index: React.PropTypes.number,
  currentCategorySlug: React.PropTypes.string,
  openModal: React.PropTypes.func
}

TrnCategory.contextTypes = {
  currentUser: React.PropTypes.object
};

replaceComponent('Category', TrnCategory)

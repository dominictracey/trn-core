import { Components, getRawComponent, registerComponent, withList } from 'meteor/nova:core';
import React, { PropTypes, Component } from 'react';
import Categories from 'meteor/nova:categories'
import { connect } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap';
import { Actions } from 'meteor/trn:rest-redux';
import { CompList } from './CompList'
import { withRouter } from 'react-router'
import { FormattedMessage } from 'react-intl';
import { Button, DropdownButton, MenuItem, Modal } from 'react-bootstrap';
import { /* ModalTrigger, */ ContextPasser } from "meteor/nova:core";
import gql from 'graphql-tag';

// const loadData = props => {
//   if (Actions.loadConfiguration) {
//     props.dispatch(Actions.loadConfiguration([]))
//   }
// }
// import { withRouter } from 'react-router'

class TrnCategoriesList extends getRawComponent('CategoriesList') {
  constructor() {
    super();
    this.openCategoryEditModal = this.openCategoryEditModal.bind(this);
    this.openCategoryNewModal = this.openCategoryNewModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.state = {
      openModal: false
    }
  }

  openCategoryNewModal() {
    // new category modal has number 0
    this.setState({openModal: 0});
  }

  openCategoryEditModal(index) {
    // edit category modals are numbered from 1 to n
    this.setState({openModal: index+1});
  }

  closeModal() {
    this.setState({openModal: false});
  }

  renderCategoryEditModal(category, index) {

    return (
      <Modal key={index} show={this.state.openModal === index+1} onHide={this.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title><FormattedMessage id="categories.edit"/></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ContextPasser currentUser={this.context.currentUser} messages={this.context.messages} actions={this.context.actions} closeCallback={this.closeModal}>
            <Components.CategoriesEditForm category={category}/>
          </ContextPasser>
        </Modal.Body>
      </Modal>
    )
  }

  renderCategoryNewModal() {

    return (
      <Modal show={this.state.openModal === 0} onHide={this.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title><FormattedMessage id="categories.new"/></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ContextPasser currentUser={this.context.currentUser} messages={this.context.messages} closeCallback={this.closeModal}>
            <Components.CategoriesNewForm/>
          </ContextPasser>
        </Modal.Body>
      </Modal>
    )
  }

  renderCategoryNewButton() {
    return (
      <Components.CanDo action="categories.new">
        <div className="category-menu-item dropdown-item"><MenuItem><Button bsStyle="primary" onClick={this.openCategoryNewModal}><FormattedMessage id="categories.new"/></Button></MenuItem></div>
      </Components.CanDo>
    );
    // const CategoriesNewForm = Components.CategoriesNewForm;
    // return (
    //   <ModalTrigger title="New Category" component={<MenuItem className="dropdown-item post-category"><Button bsStyle="primary">New Category</Button></MenuItem>}>
    //     <CategoriesNewForm/>
    //   </ModalTrigger>
    // )
  }

  // componentWillMount() {
  //   loadData(this.props)
  //   this.fetchComp = this.fetchComp.bind(this);
  // }
  // 
  // fetchComp() {
  //   const {dispatch} = this.props
  //   dispatch(Actions.loadCompetition(4978889122119680))
  // }

  render() {
    const { config } = this.props
    const categories = this.props.results;

    const currentQuery = _.clone(this.props.router.location.query);
    delete currentQuery.cat;


    const compList = config && Object.keys(config) && Object.keys(config).length > 0
      ? <CompList config={config[Object.keys(config)[0]]} fetchComp={this.fetchComp}/>
      : <div></div>

    return (
      <div className="competitionBar">
          {/* {compList} */}
          {/* <LinkContainer
            to={{pathname:"/", query: currentQuery}}
            className="TrnCategoriesList competition-item">
            <MenuItem
              eventKey={0}
              // key={0}
            >
            Home
            </MenuItem>
          </LinkContainer> */}

          {categories && categories.length > 0 ? categories.map((category, index) =>
            <Components.Category
              className=" competition-item"
              key={index+1}
              category={category}
              index={index+1}
              openModal={_.partial(this.openCategoryEditModal, index+1)}/>) : null}
          {/* {this.renderCategoryNewButton()} */}

        {/* <div>
          {categories && categories.length > 0 ? categories.map((category, index) => super.renderCategoryEditModal) : null}
          {super.renderCategoryNewModal}
        </div> */}
      </div>
    )

  }
}


TrnCategoriesList.propTypes = {
  config: React.PropTypes.object,
  comp: React.PropTypes.object,
  dispatch: React.PropTypes.func,
}

const mapStateToProps = state => {
  const { entities = {} } = state
  const { config, comp } = entities

  return {
    config,
    comp
  }
}


TrnCategoriesList.fragment = gql`
  fragment trnCategoriesListFragment on Category {
    _id
    name
    description
    order
    slug
    image
    categoryType
    active
    trnId
  }
`;

const options = {
  collection: Categories,
  queryName: 'categoriesListQuery',
  fragment: TrnCategoriesList.fragment,
  limit: 0,
};

// registerComponent('CategoriesList', TrnCategoriesList, withRouter, connect(mapStateToProps), withList(options))

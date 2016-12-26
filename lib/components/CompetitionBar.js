/**
 * Created by Scott on 12/2/2016.
 */
import Telescope from 'meteor/nova:lib';
// import Users from 'meteor/nova:users';
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap';
import { actions } from 'meteor/trn:rest-redux';
import { CompList } from './CompList'
import { withRouter } from 'react-router'
import { FormattedMessage } from 'react-intl';
import { Button, DropdownButton, MenuItem, Modal } from 'react-bootstrap';
import { /* ModalTrigger, */ ContextPasser } from "meteor/nova:core";

const loadData = props => {
  if (actions.loadConfiguration) {
    props.dispatch(actions.loadConfiguration([]))
  }
}
// import { withRouter } from 'react-router'

class CompetitionBar extends Telescope.components.CategoriesList {
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
            <Telescope.components.CategoriesEditForm category={category}/>
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
            <Telescope.components.CategoriesNewForm/>
          </ContextPasser>
        </Modal.Body>
      </Modal>
    )
  }

  renderCategoryNewButton() {
    return (
      <Telescope.components.CanDo action="categories.new">
        <div className="category-menu-item dropdown-item"><MenuItem><Button bsStyle="primary" onClick={this.openCategoryNewModal}><FormattedMessage id="categories.new"/></Button></MenuItem></div>
      </Telescope.components.CanDo>
    );
    // const CategoriesNewForm = Telescope.components.CategoriesNewForm;
    // return (
    //   <ModalTrigger title="New Category" component={<MenuItem className="dropdown-item post-category"><Button bsStyle="primary">New Category</Button></MenuItem>}>
    //     <CategoriesNewForm/>
    //   </ModalTrigger>
    // )
  }

  componentWillMount() {
    loadData(this.props)
    this.fetchComp = this.fetchComp.bind(this);
  }

  fetchComp() {
    const {dispatch} = this.props
    dispatch(actions.loadCompetition(4978889122119680))
  }

  render() {
    const { config } = this.props
    const categories = this.props.categories;
    // const context = this.context;
    const currentQuery = _.clone(this.context.router.location.query);
    delete currentQuery.cat;

    // const compList = config && Object.keys(config) && Object.keys(config).length > 0
    //   ? <CompList config={config[Object.keys(config)[0]]} fetchComp={this.fetchComp}/>
    //   : <div></div>

    return (
      <div className="competitionBar">
          {/* {compList} */}
          <LinkContainer
            to={{pathname:"/", query: currentQuery}}
            className="competitionBar competition-item">
            <MenuItem
              eventKey={0}
              // key={0}
            >
            Home
            </MenuItem>
          </LinkContainer>

          {categories && categories.length > 0 ? categories.map((category, index) =>
            <Telescope.components.Category
              className="competitionBar competition-item"
              key={index+1}
              category={category}
              index={index+1}
              openModal={_.partial(this.openCategoryEditModal, index+1)}/>) : null}
          {this.renderCategoryNewButton()}

        <div>
          {/* modals cannot be inside DropdownButton component (see GH issue) */}
          {categories && categories.length > 0 ? categories.map((category, index) => super.renderCategoryEditModal) : null}
          {super.renderCategoryNewModal}
        </div>
      </div>
    )

  }
}


CompetitionBar.propTypes = {
  config: React.PropTypes.object,
  comp: React.PropTypes.object,
}

const mapStateToProps = state => {
  const { entities } = state
  const { config, comp } = entities

  return {
    config,
    comp
  }
}

//module.exports = withRouter(CompetitionBar);
export default connect(mapStateToProps)(CompetitionBar)

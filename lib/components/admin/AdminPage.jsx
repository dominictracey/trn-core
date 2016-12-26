/*
A new custom page just for our app.
Browse to http://localhost:3000/my-custom-route to see it.
*/
import Telescope from 'meteor/nova:lib';
import React, { PropTypes, Component }from 'react'
import { actions } from 'meteor/trn:rest-redux'
import { connect } from 'react-redux'
import AdminCategoryFromCompButton from './AdminCategoryFromCompButton'
import { FormattedMessage } from 'react-intl';
import { Button, Modal, Grid, Row, Col } from 'react-bootstrap';
import { /* ModalTrigger, */ ContextPasser } from "meteor/nova:core";

const loadData = props => {
  if (actions.loadConfiguration) {
    props.dispatch(actions.loadConfiguration([]))
  }
}

class AdminPage extends Component {

  constructor() {
    super();
    // this.openCategoryEditModal = this.openCategoryEditModal.bind(this);
    this.openCategoryNewModal = this.openCategoryNewModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.state = {
      openModal: false
    }
  }

  componentWillMount() {
    loadData(this.props)
  }

  openCategoryNewModal(compId, name) {
    // new category modal has number 0
    //this.prefilled = new Telescope.components.Category()
    // this.prefilled.name = name
    // this.prefilled.slug = Telescope.utils.slugify(name)
    // this.prefilled.trnId = compId
    this.setState({openModal: 0});
  }

  closeModal() {
    this.setState({openModal: false});
  }

  //
  // clickComp = (compId) => {
  //
  // }

  renderCategoryNewModal(prefilled) {

    return (
      <Modal show={this.state.openModal === 0} onHide={this.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title><FormattedMessage id="categories.new"/></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ContextPasser currentUser={this.context.currentUser} messages={this.context.messages} closeCallback={this.closeModal} category={prefilled}>
            <Telescope.components.CategoriesNewForm/>
          </ContextPasser>
        </Modal.Body>
      </Modal>
    )
  }

  render() {
    const { config } = this.props

    if (!config || !Object.keys(config)[0] || !config[Object.keys(config)[0]]) {
      const Loading = Telescope.components.Loading;
      return (
        <div className='wait'>
          <Loading/>
        </div>
      )
    }

    const c = config[Object.keys(config)[0]]

    return (
      <div>
        <h1>Admin Page</h1>
        <Grid>
            {c.compsForClient.map(compId =>
              <Row key={compId}>
                <Col xs={8} md={9}>
                  <span>{c.competitionMap[compId]} </span>
                </Col>
                <Col xs={4} md={3}>
                  <AdminCategoryFromCompButton name={c.competitionMap[compId]} compId={compId} onClick={this.openCategoryNewModal}/>
                </Col>
              </Row>
            )}
        </Grid>
        {this.renderCategoryNewModal()}
      </div>
    )
  }
}

AdminPage.propTypes = {
  config: React.PropTypes.object,
  comp: React.PropTypes.object,
}

AdminPage.contextTypes = {
  currentUser: React.PropTypes.object,
}

const mapStateToProps = state => {
  const { entities } = state
  const { config, comp } = entities

  return {
    config,
    comp
  }
}

export default connect(mapStateToProps)(AdminPage)

import React, { PropTypes, Component }from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Modal, Grid, Row, Col } from 'react-bootstrap';
import gql from 'graphql-tag';

import { Components, registerComponent, Utils, withList } from 'meteor/nova:core';
import Categories from 'meteor/nova:categories';
import { Actions } from 'meteor/nova:core';

class AdminPage extends Component {

  constructor() {
    super();
    this.openCategoryEditModal = this.openCategoryEditModal.bind(this);
    this.openCategoryNewModal = this.openCategoryNewModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.state = {
      openModal: false
    }
  }

  // best practice is to load data once the component has mounted
  componentDidMount() {
    this.props.loadConfiguration([]);
  }

  openCategoryNewModal(compId, name) {
    return e => this.setState({
      prefilled: {
        name: name,
        slug: Utils.slugify(name),
        trnId: compId,
        active: true,
      },
      // new category modal has number 0
      openModal: 0,
    });
  }
  
  openCategoryEditModal(index) {
    // edit category modals are numbered from 1 to 
    this.setState({openModal: index});
  }

  closeModal() {
    this.setState({openModal: false});
  }

  renderCategoryNewModal() {
    return (
      <Modal show={this.state.openModal === 0} onHide={this.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title><FormattedMessage id="categories.new"/></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Components.CategoriesNewForm prefilledProps={{...this.state.prefilled}} closeCallback={this.closeModal} />
        </Modal.Body>
      </Modal>
    );
  }
  
  renderCategoryEditModal(category, index) {
    return (
      <Modal key={index} show={this.state.openModal === index+1} onHide={this.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title><FormattedMessage id="categories.edit"/></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Components.CategoriesEditForm category={category} closeCallback={this.closeModal}/>
        </Modal.Body>
      </Modal>
    );
  }

  renderExistingCategories() {
    const {results: categories} = this.props;
    
    return !categories.length 
      ? <p>No categories</p> 
      : <Grid>
        {categories.map((cat, index) =>
          <Row key={cat._id}>
            <Col xs={6}>
              <span>{cat.name}</span>
            </Col>
            <Col xs={3}>
              <Components.AdminCompetitionActionButton
                openCategoryEditModal={_.partial(this.openCategoryEditModal, index+1)}
                category={cat}
              />
            </Col>
            <Col xs={3}>
              <Components.AdminCategoryActionButton category={cat} />
              {cat.active ? <Components.AdminCategoryVisibilityButton category={cat} /> : null}
            </Col>
          </Row>
        )}
      </Grid>
  }
  
  renderFetchedCompetitions() {
    
    const {results: categories, config} = this.props;
    
    if (_.isEmpty(config)) {
      return <div className='wait'><Components.Loading /></div>;
    }
    
    // config = { 12345: { compsForClient, competitionMap, ... } }, we want cFC & cM
    const { compsForClient, competitionMap } = config[Object.keys(config)[0]];
    
    // we don't want competitions which are already added as categories
    const filteredComps = compsForClient.filter(trnId => !categories.find(cat => cat.trnId === trnId));
    
    return !filteredComps.length 
      ? <p>No new competitions</p> 
      : (<Grid>
        {filteredComps.map(trnId =>
          <Row key={trnId}>
            <Col xs={8} md={9}>
              <span>{competitionMap[trnId]} </span>
            </Col>
            <Col xs={4} md={3}>
              <Components.AdminCategoryActionButton
                createCategory={this.openCategoryNewModal(trnId, competitionMap[trnId])}
              />
            </Col>
          </Row>
        )}
      </Grid>)
  }

  render() {
    
    const {results: categories} = this.props;
    
    return (
      <div>
        <h1>Admin Page</h1>
        
        <h3>Existing categories</h3>
        {this.renderExistingCategories()}
        
        <div>
          {categories && categories.length > 0 ?
            categories.map((category, index) => this.renderCategoryEditModal(category, index)) : null}
        </div>
        
        <h3>Competitions from TRN API</h3>
        {this.renderFetchedCompetitions()}

        {this.renderCategoryNewModal()}
      </div>
    )
  }
}

AdminPage.propTypes = {
  config: React.PropTypes.object,
  comp: React.PropTypes.object,
};

AdminPage.fragment = gql`
  fragment adminPageCategoriesFragment on Category {
    _id
    name
    description
    order
    slug
    image
    categoryType
    active
    visible
    trnId
    abbr
  }
`;

const options = {
  collection: Categories,
  queryName: 'adminPageCategoriesListQuery',
  fragment: AdminPage.fragment,
  limit: 0,
};

// extract `config` & `comps` from state.entities and pass it as props to `AdminPage`
const mapStateToProps = ({entities: { config, comps }}) => ({config, comps})
const mapDispatchToProps = dispatch => bindActionCreators({loadConfiguration: Actions.loadConfiguration}, dispatch);

registerComponent('AdminPage', AdminPage, withList(options), connect(mapStateToProps, mapDispatchToProps));

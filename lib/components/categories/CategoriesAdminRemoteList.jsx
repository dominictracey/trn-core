import React, { PropTypes, Component }from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Modal, Grid, Row, Col } from 'react-bootstrap';

import { Components, registerComponent, Utils, Actions } from 'meteor/nova:core';

class CategoriesAdminRemoteList extends Component {

  constructor() {
    super();
    this.openCategoryEditModal = this.openCategoryEditModal.bind(this);
    this.openCategoryNewModal = this.openCategoryNewModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.state = {
      openModal: false,
      prefilled: {}
    }
  }

  // best practice is to load data once the component has mounted
  componentDidMount() {
    this.props.loadConfiguration([]);
  }

  openCategoryNewModal({compId = '', name = '', ...rest}) {
    return e => this.setState({
      // new category modal has number 0
      openModal: 0,
      // update the prefilled data for the new category modal
      prefilled: {
        name: name,
        slug: Utils.slugify(name),
        trnId: compId,
        visible: true,
        ...rest,
      },
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
  
  renderRemoteCompetitions() {
    
    const { categories = [], config} = this.props;
    // console.log('results',results);
    // console.log('cat',categories);
    if (_.isEmpty(config)) {
      return <Components.Loading />;
    }
    
    // config = { 12345: { compsForClient, competitionMap, ... } }, we want cFC & cM
    const { compsForClient, competitionMap } = config[Object.keys(config)[0]];
    
    // we don't want competitions which are already added as categories
    const filteredComps = compsForClient.filter(trnId => !categories.find(cat => cat.trnId === trnId));
    
    return !filteredComps.length 
      ? <p>No new remote competitions</p> 
      : (<Grid>
        {filteredComps.map(trnId =>
          <Row key={trnId}>
            <Col xs={6}>
              <span>{competitionMap[trnId]} </span>
            </Col>
            <Col xs={6}>
              <Components.CategoriesCompetitionsNewButton
                createCategory={this.openCategoryNewModal({trnId, name: competitionMap[trnId], type: 'comp'})}
              />
            </Col>
          </Row>
        )}
      </Grid>)
  }

  render() {
    return (
      <div>
        {this.renderRemoteCompetitions()}

        {this.renderCategoryNewModal()}
      </div>
    )
  }
}

CategoriesAdminRemoteList.propTypes = {
  config: PropTypes.object,
  categories: PropTypes.array,
};

// extract `config` from state.entities and pass it as props to `CategoriesAdminRemoteList`
const mapStateToProps = ({entities: { config }}) => ({ config })
const mapDispatchToProps = dispatch => bindActionCreators({loadConfiguration: Actions.loadConfiguration}, dispatch);

registerComponent('CategoriesAdminRemoteList', CategoriesAdminRemoteList,  connect(mapStateToProps, mapDispatchToProps));

import React, { PropTypes, Component }from 'react';
import { FormattedMessage } from 'react-intl';
import { Modal, Grid, Row, Col, Button } from 'react-bootstrap';

import { Components, registerComponent } from 'meteor/nova:core';

class CategoriesAdminList extends Component {

  constructor() {
    super();
    this.openCategoryEditModal = this.openCategoryEditModal.bind(this);
    this.openCategoryNewModal = this.openCategoryNewModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.state = {
      openModal: false,
    }
  }

  openCategoryNewModal() {
    return e => this.setState({
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
          <Components.CategoriesNewForm prefilledProps={this.props.prefilledNewCategory} closeCallback={this.closeModal} />
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

  render() {
    
    const { categories, type, showNewCategoryButton, specificActionButton = null } = this.props;
    
    // to be refactored
    const ActionButton = specificActionButton || Button;
    
    return (
      <div>
      {!categories.length 
      ? <p>No {type} categories</p> 
      : <Grid>
          {categories.map((cat, index) =>
            <Row key={cat._id + index}>
              <Col xs={6}>
                <span>{cat.name}</span>
              </Col>
              <Col xs={2}>
                { specificActionButton 
                  ? <ActionButton
                      category={cat}
                      openCategoryEditModal={_.partial(this.openCategoryEditModal, index+1)}
                   />
                  : <ActionButton 
                      bsStyle="primary"
                      onClick={_.partial(this.openCategoryEditModal, index+1)}>
                      Edit
                    </ActionButton>
                }
              </Col>
              {
                // if the category is a competition, show the visibility toggle button
                cat.type === 'comp' ? <Col xs={2}><Components.CategoriesVisibilityButton category={cat} /></Col> : null
              }
            </Row>
          )}
        </Grid>
      }

      {showNewCategoryButton ? <Components.CategoriesCompetitionsNewButton createCategory={this.openCategoryNewModal()} /> : null}
      
      <div>
        {categories && categories.length > 0 ? categories.map((category, index) => this.renderCategoryEditModal(category, index)) : null}
      </div>
      
      {this.renderCategoryNewModal()}
      
      </div>
    )

  }

}

CategoriesAdminList.propTypes = {
  type: PropTypes.string,
  prefilledNewCategory: PropTypes.object,
  showNewCategoryButton: PropTypes.bool,
  categories: PropTypes.array,
};

registerComponent('CategoriesAdminList', CategoriesAdminList);

// import React, { PropTypes, Component }from 'react';
// import { FormattedMessage } from 'react-intl';
// import { Modal, Grid, Row, Col } from 'react-bootstrap';
// 
// import { Components, registerComponent, Utils } from 'meteor/nova:core';
// 
// class AdminCategoriesList extends Component {
// 
//   constructor() {
//     super();
//     this.openCategoryEditModal = this.openCategoryEditModal.bind(this);
//     this.openCategoryNewModal = this.openCategoryNewModal.bind(this);
//     this.closeModal = this.closeModal.bind(this);
//     this.state = {
//       openModal: false,
//     }
//   }
// 
//   // best practice is to load data once the component has mounted
//   componentDidMount() {
//     const { fetchData, fetchArgs } = this.props;
//     
//     if (typeof fetchData === 'function') {
//       fetchData(fetchArgs);
//     }
//     // this.props.loadConfiguration([]);
//   }
// 
//   openCategoryNewModal(compId, name) {
//     return e => this.setState({
//       // prefilled: {
//       //   name: name,
//       //   slug: Utils.slugify(name),
//       //   trnId: compId,
//       //   active: true,
//       //   type: 'comp'
//       // },
//       // new category modal has number 0
//       openModal: 0,
//     });
//   }
//   
//   openCategoryEditModal(index) {
//     // edit category modals are numbered from 1 to 
//     this.setState({openModal: index});
//   }
// 
//   closeModal() {
//     this.setState({openModal: false});
//   }
// 
//   renderCategoryNewModal() {
//     return (
//       <Modal show={this.state.openModal === 0} onHide={this.closeModal}>
//         <Modal.Header closeButton>
//           <Modal.Title><FormattedMessage id="categories.new"/></Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Components.CategoriesNewForm prefilledProps={this.props.prefilledNewCategory} closeCallback={this.closeModal} />
//         </Modal.Body>
//       </Modal>
//     );
//   }
//   
//   renderCategoryEditModal(category, index) {
//     return (
//       <Modal key={index} show={this.state.openModal === index+1} onHide={this.closeModal}>
//         <Modal.Header closeButton>
//           <Modal.Title><FormattedMessage id="categories.edit"/></Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Components.CategoriesEditForm category={category} closeCallback={this.closeModal}/>
//         </Modal.Body>
//       </Modal>
//     );
//   }
// 
//   render() {
//     
//     const {results: categories = [], type} = this.props;
//     
//     const {categories, type} = this.props;
//     
//     const filteredCategories = categories.filter(c => c.type === type);
//     
//     return (
//       <div>
//         <h3>{Utils.capitalize(type)}</h3>
//         
//         {!filteredCategories.length 
//           ? <p>No {type} category</p> 
//           : <Grid>
//             {filteredCategories.map((cat, index) =>
//               <Row key={cat._id}>
//                 <Col xs={6}>
//                   <span>{cat.name}</span>
//                 </Col>
//                 <Col xs={3}>
//                   <Components.CategoriesCompetitionsEditButton
//                     openCategoryEditModal={_.partial(this.openCategoryEditModal, index+1)}
//                     category={cat}
//                   />
//                   this.renderCategoryEditModal(category, index)
//                 </Col>
//                 <Col xs={3}>
//                   <Components.CategoriesCompetitionsNewButton category={cat} />
//                   {cat.active ? <Components.CategoriesVisibilityButton category={cat} /> : null}
//                 </Col>
//               </Row>
//             )}
//           </Grid>
//           
//         }
//           
//         <div>
//           {!filteredCategories.length ? filteredCategories.map((category, index) => ) : null}
//         </div>
// 
//         {this.renderCategoryNewModal()}
//       </div>
//     )
//   }
// }
// 
// AdminCategoriesList.propTypes = {
//   type: PropTypes.string,
//   prefilledNewCategory: PropTypes.object,
//   fetchData: PropTypes.func,
//   fetchArgs: PropTypes.any,
// };
// 
// registerComponent('AdminCategoriesList', AdminCategoriesList);

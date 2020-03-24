import React,{Component} from 'react';
import {v4 as uuid} from 'uuid';
import {Container,ListGroup,ListGroupItem,Button} from 'reactstrap';
import {CSSTransition,TransitionGroup} from 'react-transition-group';
import {connect} from 'react-redux';
import {getItems} from '../actions/itemAction';
import PropTypes from 'prop-types';
class ShoppingList extends Component{
    componentDidMount(){
        this.props.getItems();
    }
    render(){
        const items=this.props.item.items;
        return(
            <Container>
                <Button color="dark" style={{marginBottom:"2rem"}} onClick={()=>{
                    const name=prompt('Enter item')
                    if(name){
                        this.setState({
                            items:[...this.state.items,{id:uuid(),name:name}]
                        })
                    }

                }}>Add Item</Button>
                <ListGroup>
                <TransitionGroup>
                    {
                        items.map(({id,name})=>(
                            <CSSTransition key={id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                <Button className="remove-btn" color="danger" size="sm" onClick={()=>{
                                    this.setState(
                                        {
                                            items:this.state.items.filter(item=>item.id!==id)
                                        }
                                    )
                                }}>
                                X 
                                </Button>
                                {name}
                                </ListGroupItem>
                            </CSSTransition>
                        ))
                    }
                </TransitionGroup>
                </ListGroup>
            </Container>
        )
    }
}
ShoppingList.propTypes={
    getItems:PropTypes.func.isRequired,
    item:PropTypes.object.isRequired
}
const mapStateToProps=(state)=>({
    item:state.item
})
export default connect(mapStateToProps,{getItems})(ShoppingList);
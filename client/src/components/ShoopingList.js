import React,{Component} from 'react';
import {v4 as uuid} from 'uuid';
import {Container,ListGroup,ListGroupItem,Button} from 'reactstrap';
import {CSSTransition,TransitionGroup} from 'react-transition-group';

class ShoppingList extends Component{
    constructor(props){
        super(props);
        this.state={
            items:[
                {id:uuid(),name:"Eggs"},
                {id:uuid(),name:"Milk"},
                {id:uuid(),name:"Meat"}
            ]
        }
    }
    render(){
        const {items}=this.state;
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
export default ShoppingList;
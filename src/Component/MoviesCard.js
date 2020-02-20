import React, { Component } from 'react';
import { Card , Progress, Button,Icon, Statistic,Checkbox } from 'semantic-ui-react'
import '../App.css';
class MoviesCard extends Component {

    state = {
      like: false,
      dislike: false,
    }

    handleLike = () => //Changement d'état de like
    {
      if(this.state.dislike)
        this.handleDislike()
      this.setState((prevState) => ({ like: !prevState.like }),
        () => {
          if(this.state.like === false && this.state.dislike === false)
            this.props.neutre(this.props.film)
        }
      )
      
    }
      

    handleDislike = () => //Changement d'état de dislike
    {
      if(this.state.like)
        this.handleLike()
      this.setState((prevState) => ({ dislike: !prevState.dislike }),
        () => {
          if(this.state.like === false && this.state.dislike === false)
            this.props.neutre(this.props.film)
        }
      )
      
    }
    //0-->neutre 1-->like 2-->dislike
    componentDidMount() {
      if(this.props.film.status === 0)
      {
        this.setState({
          like : false,
          dislike : false,
        })
      }else if(this.props.film.status === 1)
      {
        this.setState({
          like : true,
          dislike : false,
        })
      }else if(this.props.film.status === 2)
      {
        this.setState({
          like : false,
          dislike : true,
        })
      }
      
    }  

    render() {
      
      const { like } = this.state
      const  dislike  = this.state.dislike
      return (
      <Card className="card">
          <Card.Content>
            <Card.Header>{this.props.film.title}</Card.Header>
            <Card.Meta>{this.props.film.category}</Card.Meta>
            <Card.Description>
              
              <Button.Group>
                <Button basic toggle active={like} onClick={() => {this.handleLike(); this.props.like(this.props.film);}}>{/*Like*/}
                  <Statistic size='mini'>
                    <Statistic.Value>
                      <Icon size='small' name='thumbs up outline' />
                        {this.props.film.likes}
                      </Statistic.Value>
                  </Statistic>
                </Button>

                <Button basic toggle active={dislike} onClick={() => {this.handleDislike(); this.props.dislike(this.props.film);}}>{/*Dislike*/}
                  <Statistic size='mini'>
                    <Statistic.Value>
                      <Icon size='small' name='thumbs down outline' />
                        {this.props.film.dislikes}
                      </Statistic.Value>
                  </Statistic>
                </Button>
                </Button.Group>  
              
              <Progress value={this.props.film.likes} total={this.props.film.likes + this.props.film.dislikes} progress='' color='blue'/>
              <Button icon='trash alternate' color='red' onClick={() => this.props.delete(this.props.film)}/>
            </Card.Description>
          </Card.Content>
      </Card>
        
      );
    }
  
  }
  
  
  export default MoviesCard;
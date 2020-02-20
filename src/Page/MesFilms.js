import React, { Component } from 'react';
import '../App.css';
import { Card, Segment, Menu, Pagination,Header,Icon,Dropdown } from 'semantic-ui-react';

import { connect } from 'react-redux';

import {movies$} from '../Data/movies'

import MoviesCard from '../Component/MoviesCard'


class MesFilms extends Component {

  constructor() {
    super();
    this.handleItemClick = this.handleItemClick.bind(this);
    this.handlePaginationChange = this.handlePaginationChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.setPageTotal = this.setPageTotal.bind(this);
    this._sousMovies = this._sousMovies.bind(this);
    this.newPagination = this.newPagination.bind(this);
    this.handleTag = this.handleTag.bind(this);
    //
    this._add_deleteMovie = this._add_deleteMovie.bind(this);
    this._add_deleteLike = this._add_deleteLike.bind(this);
    this._add_deleteDislike = this._add_deleteDislike.bind(this);
    this._add_deleteNeutre = this._add_deleteNeutre.bind(this);
    //
    this.HeaderBar = this.HeaderBar.bind(this);
    this.Segmentpart = this.Segmentpart.bind(this);
    this.DropdownMovies= this.DropdownMovies.bind(this);
    this.ShowCard= this.ShowCard.bind(this);
    //
    this.state = {
        activeItem: 'All',
        nbPerPage : 12,
        pageActuel : 1,
        _tag : [],
        numberOptions : [
          {
            key: 1,
            text: '4',
            value: 4,
          },
          {
            key: 2,
            text: '8',
            value:8,
          },
          {
            key: 3,
            text: '12',
            value: 12,
          },
          
        ]

    };
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });//Change d'onglet
  handlePaginationChange = (e, { activePage }) => {this.setState({pageActuel: activePage },//Change par la nouvelle valeur de la page actuelle
    () => this.newPagination()
    )}; 
  handleChange = (e, { value }) => {this.setState({ nbPerPage:value },//Change le nombre d'élements par page
    () => this.newPagination()
    )};
  handleTag = (e, { value }) => this.setState({ _tag : value },//Ajout des tags pour filtrer les films
    () => this.newPagination()
    ); 
  setPageTotal = ({value}) => this.setState({pageTotal:value});//Change par la nouvelle valeur du nombre total de page
  newPagination = () => this._sousMovies(this.state.nbPerPage, this.state.pageActuel, this.state._tag)
  
  async _firstTime()//Recupere les données du fichier movies.js
  {
    let temp = [];
    await movies$.then( (response) => {
      response.forEach(element => temp.push(
        {id: element.id,
        title: element.title,
        category: element.category,
        likes: element.likes,
        dislikes: element.dislikes,
        status : 0
      }))
      temp.forEach(element => this._add_deleteMovie(element))
      this._sousMovies(this.state.nbPerPage,this.state.pageActuel,this.state._tag);
    })
    .catch(function(error){
      console.log("Error");
      console.log(error);
    });
  }
  
  
   _add_deleteMovie(film) {//ACTION AJOUT ET SUPPRIME DE FILM
    const action = { type: "TOGGLE_MOVIE", value: {
      id: film.id,
      title: film.title,
      category: film.category,
      likes: film.likes,
      dislikes: film.dislikes,
      status: film.status
    }}
    this.props.dispatch(action)
  }

  _add_deleteLike(film) {//ACTION AJOUT ET SUPPRIME DE FILM AIME  
    const action = { type: "TOGGLE_LIKE", value: {
      id: film.id,
      title: film.title,
      category: film.category,
      likes: film.likes,
      dislikes: film.dislikes,
      status: film.status
    }}
    this.props.dispatch(action)
  }
  
  _add_deleteDislike(film) {//ACTION AJOUT ET SUPPRIME DE FILM DETESTE
    const action = { type: "TOGGLE_DISLIKE", value: {
      id: film.id,
      title: film.title,
      category: film.category,
      likes: film.likes,
      dislikes: film.dislikes,
      status: film.status
    }}
    this.props.dispatch(action)
  }
  
  _add_deleteNeutre(film) {//ACTION RETOUR A NEUTRE
    const action = { type: "TOGGLE_NEUTRE", value: {
      id: film.id,
      title: film.title,
      category: film.category,
      likes: film.likes,
      dislikes: film.dislikes,
      status: film.status
    }}
    this.props.dispatch(action)
  } 

  _sousMovies(nbPerPage,pageActuel,_tag) {//ACTION MIS A JOUT DU NOMBRE DE PAGE, PAGE ACTUELLE, TAG UTILISE
    const action = { type: "MOVIES_PER_PAGE", value: {
      nbPerPage : nbPerPage,
      pageActuel : pageActuel,
      _tag : _tag,
    }}
    this.props.dispatch(action)
  }
  
  

  
  HeaderBar()//Bar header avec l'onglet All, Like et Dislike
{
    return(
        <Menu attached='top' tabular>
          <Menu.Item
            name='All'
            active={this.state.activeItem === 'All'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='Like'
            active={this.state.activeItem === 'Like'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='Dislike'
            active={this.state.activeItem === 'Dislike'}
            onClick={this.handleItemClick}
          />
          
        </Menu>
    );
  }

  DropdownMovies(_Movies)//utlisation d'un filter
  {
    if(_Movies !== 'undefined')
    {
      let temp = _Movies.map((element) => element.category)
      temp = temp.filter(function(elem, index, self) {
        return index === self.indexOf(elem);
      })
      temp.sort()
      let options = temp.map((element, index) => ({
        key: index,
        text: element,
        value: element,

      }))
      return(
        <div className='_dropdown'>
          <Dropdown  placeholder='Category' fluid multiple selection options={options} value={this.state._tag} onChange={this.handleTag}/>
        </div>
        
      );
    }
  }

  ShowCard(_Movies)//Chargement des cartes en fonction des filtres
  {
      
      let _groupSize = this.props.partMovies;
    
      //ajout
      let i;
      let temp2 = [];   
      for(i=0; i<_groupSize.length; i++)
      {
        if(_Movies.includes(_groupSize[i]))
          temp2.push(_groupSize[i])
      }
      //
      _groupSize = [...temp2]
      let pageTotal = 0 ;
      let temp;
      if(this.state._tag.length !== 0)
        temp =_Movies.filter(films => this.state._tag.includes(films.category)).length
      else temp = [..._Movies].length
      
      if(this.state.nbPerPage <= temp)
      {
        
        pageTotal = temp/this.state.nbPerPage;
        pageTotal = Math.ceil(pageTotal);
       
      }else pageTotal = 1  

      let _groupSelection = this.DropdownMovies(_Movies);
      let _groupCard = _groupSize.map((element) =><MoviesCard film={element} delete={this._add_deleteMovie} like={this._add_deleteLike} dislike={this._add_deleteDislike} neutre={this._add_deleteNeutre}/>)
      return(
        <div className='segment_Body'>
          {_groupSelection}
          <div className='_dropdown'>
            <Dropdown
              placeholder='Number per Page'
              fluid
              selection
              onChange={this.handleChange}
              options={this.state.numberOptions}
            />
          </div>
          <Card.Group itemsPerRow={6} doubling stackable >
            {_groupCard}
          </Card.Group>
          <Pagination activePage={this.state.pageActuel} totalPages={pageTotal} onPageChange={this.handlePaginationChange}/>
        </div>
      );
  }

  
  Segmentpart(){//Affichage de chaque parti(All, like et dislike)
    
    if(this.state.activeItem === 'All')
    {
      let all = this.ShowCard(this.props.allMovies);
      return(all)

    }else if(this.state.activeItem === 'Like'){
      let _groupLike = this.props.allMovies.filter(element => element.status===1)
      console.log(_groupLike)
      if(_groupLike.length === 0)
      {
        return(
          <div>
            <p>
              Vous n'avez aimé aucun film
            </p>
          </div>
        );
      }else{
        let like = this.ShowCard(_groupLike);
        return(like)
      }
      
    }else if(this.state.activeItem === 'Dislike'){
      let _groupDislike = this.props.allMovies.filter(element => element.status===2)
      if(_groupDislike.length === 0)
      {
        return(
          <div>
            <p>
              Vous n'avez detesté aucun film
            </p>
          </div>
        );
      }else{
        let dislike = this.ShowCard(_groupDislike);
        return(dislike)
      }
    }else{
      return(
        <div>
          <p>
            Wait
          </p>
        </div>
      );
    }
  }
  
  

  componentDidMount(){
    this._firstTime();//chargement des données
  }
  

  render(){
    
    return (
      <div className='App-body'>
        <Header as='h1'>
          <Icon name='film' />
          <Header.Content>Mes films</Header.Content>
        </Header>
        <this.HeaderBar/>
        <Segment attached='bottom' >
          <this.Segmentpart/>
        </Segment>
          
      </div>
    );
  }
  
  
}

const mapStateToProps = (state) => {
  return {
    allMovies: state.allMovies,
    partMovies : state.partMovies,
  }
}

export default connect( mapStateToProps)(MesFilms)


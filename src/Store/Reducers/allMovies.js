const initialState = { 
  allMovies: [],
  partMovies: [],
  
}

function allMovies(state = initialState, action) {
  let nextState
  switch (action.type) {
    case 'MOVIES_PER_PAGE':
      nextState = {
        ...state,
        allMovies: state.allMovies,
        partMovies: [...state.allMovies]
      }
      if(action.value.pageActuel === 1)
        
      if(action.value._tag.length !== 0)
        nextState.partMovies = nextState.partMovies.filter(films => action.value._tag.includes(films.category))
        
        if(action.value.nbPerPage <=  nextState.partMovies.length)
      {
        
        let nb = action.value.nbPerPage * action.value.pageActuel;
        let temp = [];        
        let i;
        
        for(i=nb-action.value.nbPerPage; i<nb; i++)
        {
          if(i<nextState.partMovies.length)
          temp.push(nextState.partMovies[i])
        }
        nextState.partMovies = [...temp]
        
      }
      
      return nextState || state
    case 'TOGGLE_NEUTRE'://movie neutre
      const indexNeutre = state.allMovies.findIndex(movie => movie.id === action.value.id)
      if (indexNeutre !== -1) {
        nextState = state
        nextState.allMovies[indexNeutre].status = 0;
      }
      return nextState || state
    case 'TOGGLE_DISLIKE'://movie dislike
      const indexDisLike = state.allMovies.findIndex(movie => movie.id === action.value.id)
      if (indexDisLike !== -1) {
        
        nextState = state
        nextState.allMovies[indexDisLike].status = 2;
       
      }
      return nextState || state
    case 'TOGGLE_LIKE'://movie like
      const indexLike = state.allMovies.findIndex(movie => movie.id === action.value.id)
      if (indexLike !== -1) {
        
        nextState = state
        nextState.allMovies[indexLike].status = 1;
        
      }
      return nextState || state 
    case 'TOGGLE_MOVIE':
      const indexMovies = state.allMovies.findIndex(movie => movie.id === action.value.id)
      if (indexMovies !== -1) {
        nextState = {
          ...state,
          allMovies: state.allMovies.filter( (movie, index) => index !== indexMovies)
        }
      }
      else {//movie like
        nextState = {
          ...state,
          allMovies: [...state.allMovies, action.value]
        }
      }
      return nextState || state
  default:
    return state
  }
}

export default allMovies
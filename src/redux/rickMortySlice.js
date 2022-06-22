import { createSlice } from "@reduxjs/toolkit";

const rickMortySlice = createSlice({
  name: 'rickMorty',
  initialState: {
    page: 1,
    users: []
  },
  reducers: {
    flipPage: (state, action) => {
      state.page = state.page += action.payload
    },
    addUser: (state, { payload }) => {
      const user = {
        isLogged: payload.isLogged,
        name: payload.userName,
        userID: payload.userID,
        userEmail: payload.userEmail,
        userPicture: payload.userPicture,
        likedCharacters: []
      }
      state.users.push(user)
    },
    likedChar: (state, { payload }) => {
      const char = { 
        id: payload.id,
        name: payload.name, 
        image: payload.image,
        species: payload.species,
        gender: payload.gender,
        location: payload.location, 
        status: payload.status,
        episode: payload.episode,
        created: payload.created,  
        episodes: payload.episodes,
        title: payload.title,
        series: payload.series
      }
      let user = state.users.find(usr => usr.isLogged === true)
      let eqID = user.likedCharacters.find(chr => chr.id === payload.id)
      if (!eqID) {
        user.likedCharacters.push(char)
      }
    
    },
    disLikedChar: (state, {payload}) => {
      let user = state.users.find(usr => usr.isLogged === true)
      user.likedCharacters = user.likedCharacters.filter(char => char.id !== payload.charID)
    },
    logOut: (state, action) => {
      let user = state.users.find(usr => usr.isLogged === true)
      user.isLogged = false
    }
  }
})

export const { flipPage, addUser, likedChar, disLikedChar, filterChar } = rickMortySlice.actions;

export default rickMortySlice.reducer
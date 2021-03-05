import React, {useState, useEffect} from 'react';
import { Redirect, Switch, Route, BrowserRouter } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute.js';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import ImagePopup from './ImagePopup.js';
import Register from './Register.js';
import Login from './Login.js';
import InfoTooltip from './InfoTooltip.js';
import api from '../utils/api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import './App.css';



function App() {
  const [loggedIn, setLoggenIn] = useState(true);

  //контекст пользователя
  const [currentUser, setCurrentUser] = useState({});

  const [isEditProfilePopupOpen, setIsEditProfileOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isSubmitPopupOpen, setIsSubmitPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const [cards, setCards] = useState([]);

    useEffect(() => {
      const initialCards = api.getInitialCards();
      initialCards.then((cardsInfo) => {
        setCards(cardsInfo);
      })
      .catch((err) => console.log(err));
    }, []);


    function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        const newCards = cards.map(c => c._id === card._id ? newCard : c);
        setCards(newCards);
      })
      .catch((err) => console.log(err));
    }

    function handleCardDelete(deletedCard) {
      api.deleteCard(deletedCard._id)
        .then(() => {
          const newCards = cards.filter(currentCard => currentCard != deletedCard);
          setCards(newCards);
        })
        .catch((err) => console.log(err));
    }

  useEffect(() => {
    api.getProfileData()
      .then((userDara) => {
        setCurrentUser(userDara);
      })
      .catch((err) => console.log(err))
  }, []);

  function handleCardClick(cardData) {
    setIsImagePopupOpen(true);
    setSelectedCard(cardData);
  }

  function closeAllPopups() {
    setIsEditProfileOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsSubmitPopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard(null);
  }

  function handleUpdateUser(userInfo) {
    api.updateProfileData(userInfo.name, userInfo.about)
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(avatarInfo) {
    api.updateProfileAvatar(avatarInfo.avatar)
      .then((avatarInfo) => {
        setCurrentUser(avatarInfo);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(cardInfo) {
    api.addCard(cardInfo.name, cardInfo.link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleEditProfilePopupOpen() {
    setIsEditProfileOpen(true);
  }

  function handleAddPlacePopupOpen() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarPopupOpen() {
    setIsEditAvatarPopupOpen(true);
  }

  return (
<div className="App">
  <div className="page">
    <div className="page_content">

    <BrowserRouter>
      <Switch>
        <Route path="/sign-up">
          <Header>
            <button type="button" className="header__button header__button_place_sign-up">Войти</button>
          </Header>
          <Register></Register>
        </Route>
        <Route path="/sign-in">
          <Header>
            <button type="button" className="header__button header__button_place_sign-up">Регистрация</button>
          </Header>
          <Login></Login>

          <InfoTooltip></InfoTooltip>
        </Route>
        <CurrentUserContext.Provider value={currentUser}>
        <ProtectedRoute path="/"
                component={Main}

                onEditProfilePopup={handleEditProfilePopupOpen}
                onAddPlacePopup={handleAddPlacePopupOpen}
                onEditAvatarPopup={handleEditAvatarPopupOpen}
                cards={cards}
                selectedCard={selectedCard}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}

                isEditProfilePopupOpen={isEditProfilePopupOpen}
                isEditAvatarPopupOpen={isEditAvatarPopupOpen}
                isAddPlacePopupOpen={isAddPlacePopupOpen}
                isSubmitPopupOpen={isSubmitPopupOpen}
                isImagePopupOpen={isImagePopupOpen}

                onClose={closeAllPopups}
                onUpdateUser={handleUpdateUser}
                onUpdateAvatar={handleUpdateAvatar}
                onAddPlace={handleAddPlaceSubmit}
                >
        
        </ProtectedRoute>
        </CurrentUserContext.Provider> 
        
        <Route>
          {!loggedIn ? <Redirect to="/sign-in" /> : <Redirect to="/" />}
        </Route>
      </Switch>
    </BrowserRouter>
    </div>
        </div>
        </div>
  );
}

export default App;

// защита информации: дома DES алгоритм
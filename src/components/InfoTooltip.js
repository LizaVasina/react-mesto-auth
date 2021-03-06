import React from 'react';
import SuccessInfoImage from '../images/info-icons/success.svg';
import FailInfoImage from '../images/info-icons/fail.svg';

function InfoTooltip(props) {

    return (
        <div className="popup infotooltip">
            <div className="popup__container infotooltip__container">
                <button type="button" className="popup__close-button"></button>
                <img className="infotooltip__picture" src={SuccessInfoImage} alt="Информационная иконка"></img>
                <h2 className="popup__title infotooltip__title">
                    Вы успешно зарегистрировались!
                </h2>
            </div>
        </div>
    )
};

export default InfoTooltip;
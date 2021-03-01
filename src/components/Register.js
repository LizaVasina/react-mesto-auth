import React from 'react';

function Register(props) {
    return (
        <section className="sign sign-up">
            <h1 className="sign__title">Регистрация</h1>
            <form className="sign__form sign-up__form"
                    name="Sign-up-form" method="post"
                    noValidate>
                <input type="email" placeholder="Email"
                        name="email" className="sign__input"
                        required></input>
                <input type="password" placeholder="Пароль"
                    name="password" className="sign__input"
                    required></input>
                    <button type="submit" className="sign__submit-button sign-up__submit-button">Зарегистрироваться</button>     
            </form>
            <button type="button" className="sign__button sign-up__button">
                Уже зарегистрированы? Войти
            </button>
        </section>
    )
};

export default Register;
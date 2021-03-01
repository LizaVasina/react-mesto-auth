import React from 'react';

function Login(props) {
    return (
        <section className="sign sign-in">
            <h1 className="sign__title">Вход</h1>
            <form className="sign__form sign-in__form"
                    name="Sign-in-form" method="post"
                    noValidate>
                <input type="email" placeholder="Email"
                        name="email" className="sign__input"
                        required></input>
                <input type="password" placeholder="Пароль"
                    name="password" className="sign__input"
                    required></input>
                    <button type="submit" className="sign__submit-button sign-up__submit-button">Войти</button>     
            </form>
        </section>
    )
};

export default Login;
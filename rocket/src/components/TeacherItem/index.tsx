import React from 'react';
import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css'

function TeacherItem() {
    return (
        <article className="teacher-item">
            <header>
                <img src="https://avatars3.githubusercontent.com/u/47106171?s=460&v=4" alt="Joao Guilherme" />
                <div>
                    <strong>
                        Joao Guilherme
            </strong>
                    <span>
                        React
            </span>
                </div>

            </header>
            <p>
                Oi esse é meu texto
            <br /><br />
            Turo bom ?
        </p>
            <footer>
                <p>
                    Preço/hora
                <strong>R$ 20,00</strong>
                </p>
                <button type="button">
                    <img src={whatsappIcon} alt="whatsapp" />
                Entrar em contato
            </button>
            </footer>
        </article>
    )
}

export default TeacherItem;
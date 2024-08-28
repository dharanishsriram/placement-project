import { styled } from "styled-components"
import logo from "../images/miaudote-menu.svg"                      
import { Link } from "react-router-dom"

export default function Header(){
    return(
        <HeaderContainer>
            <Link to='/'>
                <img src={logo} alt="Miaudote logo"></img>
            </Link>

            <Link to='/pets'>
                <BotaoAdotar>
                    Adopt Pets
                </BotaoAdotar>
            </Link>

            <div>
                <Link to='/signin'>
                    <BotaoApagado>
                        Sign-in
                    </BotaoApagado>
                </Link>

                <Link to='/signup'>
                    <BotaoCadastro>
                        Sign-up
                    </BotaoCadastro>
                </Link>
            </div>
        </HeaderContainer>
    )
}
const BotaoApagado = styled.button`
    font-size: 1.25em;
    min-width: max-content;
    background-color: #DADADA;
    color: #6A459C;
    border: none;
`
const BotaoAdotar = styled.button`
    font-size: 1.25em;
    min-width: max-content;
    background-color: #DADADA;
    color: #6A459C;
    border: none;
`
const BotaoCadastro = styled.button`
    font-size: 1.25em;
    min-width: max-content;
    background-color: #6A459C;
    color: #fff;
    border: none;
`
const HeaderContainer = styled.div`
    width: 100vw;
    background-color: #DADADA;
    margin-top: -1.5em;
    margin-bottom: 0.5em;
    padding: 1em 3em;
    box-shadow: 0em 0.25em 0.75em 0.25em rgba(0, 0, 0, 0.2);

    display: flex;
    justify-content: space-between;
    align-items: center;

    img{
        max-width: 20vw;
    }
    div{
        display: flex;
        gap:1em
    }

    @media screen and (max-width: 767px) {
        padding: 1em;
        img{
            max-width: 45vw;
            padding-left: 1em;
            margin: -0em 0.125em;
        }
        div{
            display: flex;
            gap:0em
        }
        ${BotaoCadastro} {
            display: none;
        }
        ${BotaoAdotar} {
            display: none;
        }
        ${BotaoApagado} {
            font-size: 1em;
        }
    }
`

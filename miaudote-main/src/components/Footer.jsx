import { styled } from "styled-components"
import logo from "../images/miaudote-menu.svg"                      
import { Link } from "react-router-dom"

export default function Footer(){
    return(
        <FooterContainer>
            <img src={logo} alt="Miaudote logo"></img>
            <p> <Link to='https://strayanimalfoundationindia.org/5-reasons-why-you-should-consider-adopting-a-stray-animal-as-a-pet/?gad_source=1&gclid=CjwKCAjwhvi0BhA4EiwAX25ujx_Tm4MqYQCu2Z6rDTHA7alyaCQm9_zG8WJxivvHgKY1m7Ydamm-PRoCbBIQAvD_BwE/'>Stray Animal foundation of India</Link>.</p>
        </FooterContainer>
    )
}

const FooterContainer = styled.div`
    width: 100vw;
    background-color: #DADADA;
    margin-bottom: -1.5em;
    margin-top: 2em;
    padding: 1em 3em;

    display: flex;
    justify-content: space-between;
    align-items: center;

    img{
        max-width: 20vw;
    }

    @media screen and (max-width: 767px) {
        padding: 0.75em;
        gap: 0.75em;
        img{
            max-width: 45vw;
            padding-left: 1em;
            margin: -0em 0.125em;
        }
        p{
            font-size: 0.75em;
        }
    }
`

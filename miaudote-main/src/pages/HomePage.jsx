import { styled } from "styled-components"
import miaudote from "../images/miaudote-logo.svg"
import Header from "../components/Header"
import { Link } from "react-router-dom"
import Footer from "../components/Footer"
import fotoHome from "../images/home-photo.jpg"
export default function HomePage(){
    return(
        <>
        <Header />
        <PageContainer>
            <TextDiv>
                <h1>Welcome to our Pet Adoptation App!</h1>

                <p>Explore the pets to<b> Find the perfect pet to become part of your family.</b>.</p>
                <Link to="/pets">
                <button>I want to adopt a pet.!</button>
                </Link>

                <p><b>Register a pet for adoption</b> Help us unite adorable animals with loving families..</p>
                <Link to="/new-pet">
                <button>
                Register a pet!</button>
                </Link>
            </TextDiv>
            <PetPhoto src={fotoHome} alt="Miaudote and find your new best friend."/>

        </PageContainer>
        <Footer />
        </>
    )
}
const PetPhoto = styled.img`
    width: 80%;
    height: 50vh;
    object-fit: contain;
    
    @media screen and (max-width: 770px){
        display: none;
    }
`
const TextDiv = styled.div`
    padding-left: 8em;
    width: 60%;
    flex-direction: column;
    @media screen and (min-width: 771px) and (max-width: 1200px){
        padding-left: 4em;
    }
    @media screen and (max-width: 770px){
        display: none;
        padding-left: 0em;
        width: 90%;
        margin: auto;
    }
`
const PageContainer = styled.div`
    display: flex;
    margin: auto;
    width: 100vw;
    flex-direction: row;
    justify-content: space-between;
    align-items: start;
    padding-top: 2em;
    gap: 1.5em;
    text-align: center;
    img{
        width: 45vw;
    }
    button{
        margin-bottom: 1.5em;
    }
    div{
        display: flex;
        gap: 2.5em;
        margin-top: -1em;
    }
    @media screen and (max-width: 770px){
        width: 100%;
        h1{
            font-size: 2em;
        }
    }
`

import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import axios from "axios";
import { styled } from "styled-components";
import pawButton from "../images/paw1.svg"
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function PetGallery(){
    const [pets, setPets] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/pets`)
        .then((resp) =>{
            console.log(resp.data)
            setPets(resp.data);
        })
        .catch((error) =>{
            Swal.fire({
                title: 'Could not load, please try again.',
                icon: 'error',
                confirmButtonText: 'Go back to the home',
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/");
                }
            });
        })
    }, []);
    return(
        <>
            <Header />
                <PageContainer>
                    <h2>Find your new best friend</h2>
                    <p>Explore our selection of pets looking for a home. Each little face has a unique story, waiting for a new chapter by your side.</p>
                    
                    {pets.length === 0 ? (
                        <StyledText>All the pets have already been adopted!</StyledText>
                    ) : (
                        <PetsContainer>
                            {pets.map((pet) => (
                            <PetInfo key={pet.id}>
                                <img src={pet.photo} onClick={() => navigate(`/pets/${pet.id}`)}/>
                                <TextDiv>
                                    <h3>{pet.name}</h3>
                                    <p>{pet.city}, {pet.state}</p>
                                    <PawButton src={pawButton} alt="Abrir pet" onClick={() => navigate(`/pets/${pet.id}`)} />
                                </TextDiv>
                            </PetInfo>
                            ))}
                        </PetsContainer>
                    )}
                </PageContainer>
            <Footer />
        </>
    )
}
const StyledText = styled.p`
    font-size: 1.75em;
    font-weight: 500;
    color: #fff;
    background-color: #F0494F;
    padding: 0.5em;
`
const PetsContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    flex-wrap: wrap;
    align-items: stretch;
    row-gap: 0.5em;
    column-gap: 1.5em;
`
const PawButton = styled.img`
    cursor: pointer;
`
const TextDiv = styled.div`
`
const PetInfo = styled.div`
    background-color: #fff;
    width: 30%;
    height: auto;
    position: relative;
    aspect-ratio: 1;
    border-radius: 2em;
    border: #d7d7d7 solid 0.15em;
    box-shadow: 0em 0.25em 0.75em 0.25em rgba(0, 0, 0, 0.2);
    img{
        aspect-ratio: 1;
        width: 100%;
        object-fit: cover;
        border-radius: 2em 2em 0em 0em;
        margin-bottom: -0.1em;
    }
    ${TextDiv}{
        display: flex;
        flex-direction: column;
        gap: 0.75em;
        background-color: #fff;
        padding: 1em 0em 1.5em 2em;
        border-top: solid 0.3em #F0494F;
        border-radius: 0em 0em 2em 2em;

        p{
            text-align: left;
            color: #5e5e5e;
            width: 60%;
        }

        ${PawButton} {
            border-radius: 0;
            aspect-ratio: auto;
            width: 25%;
            position: absolute;
            right: 1em;
            bottom: 1em;
        }
    }

    @media screen and (min-width: 385px) and (max-width: 770px){
        width: 100%;
        margin-bottom: 1em;
        h3{
            font-size: 2em;
        }

        ${TextDiv}{
            min-height: 7em;
            padding: 1em 0em 1.5em 2em;
            gap: 0.5em;
            padding: 1em;
        }

        ${PawButton}{
            max-width: 20%;
            bottom: 0.5em;
        }
    }

    @media screen and (max-width: 384px){
        width: 100%;
        margin-bottom: 1em;

        ${TextDiv}{
            gap: 0.5em;
            padding: 1em;
        }
    }
`
const PageContainer = styled.div`
    width: 90vw;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    padding-top: 2em;
    text-align: center;
    margin: auto;
    gap: 3em;
    min-height: 100vh;
    button{
        margin-bottom: 1.5em;
    }
    p{
        text-align: center;
    }
`
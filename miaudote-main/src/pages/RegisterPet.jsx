import { styled } from "styled-components";
import validator from "validator";
import ReactInputMask from "react-input-mask";
import { useForm } from "react-hook-form";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/userContext";
import Swal from "sweetalert2";


export default function RegisterPet(){
    const { register, handleSubmit, watch, setValue, formState: {errors} } = useForm();
    const navigate = useNavigate();
    const watchCEP = watch('cep');

    const [city, setCity] = useState("");
    const [state, setState] = useState("");

    const { user } = useContext(UserContext);
    const token = user;
    const config = {
        headers: {
            Authorization:`Bearer ${token}`
        }
    }

    useEffect(()=>{
        const lsUser = JSON.parse(localStorage.getItem('user'));
        if(!lsUser === null){
            Swal.fire({
                title: 'Você foi desconectado',
                text: 'Faça o login novamente.',
                icon: 'info',
                confirmButtonText: 'OK',
            }).then(() => {
                navigate('/signin');
            });
        }
    }, [])

    function onSubmit(data){
        const {name, photo, category, description, characteristics, cep, city, state} = data;

        const onlyNumbersCEP = cep.replace(/\D/g, "");

        axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/pets`,
            {name, photo, category, description, characteristics, cep: onlyNumbersCEP, city, state},
            config)
        .then(resp=>{
            const { id } = resp.data;
            Swal.fire({
                title: 'Animal cadastrado com sucesso!',
                icon: 'success',
                confirmButtonText: 'OK',
            }).then(() => {
                navigate(`/pets/${id}`);
            });
        })
        .catch(error =>{
            console.log(error)
            if(error.response.status === 422){
                return Swal.fire({
                    title: 'Os dados informados são inválidos.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            }
            if(error.response.status === 401){
                return Swal.fire({
                    title: 'Token inválido.',
                    text: 'Faça o login novamente.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                }).then(() => {
                    navigate('/signin');
                });
            }
            if(error.response.status === 500){
                Swal.fire({
                    title: 'Erro, tente novamente em alguns instantes.',
                    icon: 'error',
                    confirmButtonText: 'Voltar para a home',
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate("/");
                    }
                });
            }
        })
    }

    return(
        <>
        <Header />
        <PageContainer>
            <div>
                <h2>Register an Animal for Adoption</h2>
                <p>Sure, I'd be happy to help! Could you please provide the details of the pet that you'd like to share?.</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label>Name of animal</label>
                    <input
                        className={errors?.name && "input-error"}
                        type="text"
                        placeholder="Raja"
                        {...register("name", {required:true})}
                    />
                    {errors?.name?.type === 'required' && <p className="error-message">Nome do pet é obrigatório.</p>}

                    <label>Image</label>
                    <input
                        className={errors?.photo && "input-error"}
                        type="text"
                        placeholder=" Paste the link to the image here"
                        {...register("photo", {required:true, validate: (value) => validator.isURL(value) })}
                    />
                    {errors?.photo?.type === 'required' && <p className="error-message">Foto é obrigatório.</p>}
                    {errors?.photo?.type === 'validate' && <p className="error-message">Link inválido.</p>}

                    <label>Species</label>
                    <select
                        className={errors?.category && "input-error"}
                        {...register("category", {required:true, validate: (value) =>{return value !=="0";} })}
                    >
                        <option value="0">Select a species of animal</option>
                        <option value="1">Dog</option>
                        <option value="2">Cat</option>
                    </select>
                    {errors?.category?.type === 'required' && <p className="error-message">Espécie é obrigatório.</p>}
                    {errors?.category?.type === 'validate' && <p className="error-message">Selecione uma espécie.</p>}

                    <label>Description</label>
                    <textarea
                        className={errors?.description && "input-error"}
                        rows="3"
                        placeholder="Tell a little about the history of this pet."
                        {...register("description", {required:true})}
                    />
                    {errors?.description?.type === 'required' && <p className="error-message">Descrição é obrigatório.</p>}
                    {errors?.description?.type === 'pattern' && <p className="error-message">Descrição em formato inválido.</p>}

                    <label>Characteristics of pet</label>
                    <textarea
                        className={errors?.characteristics && "input-error"}
                        rows="3"
                        placeholder="Medium-sized and short-haired. Very friendly with children. Lives well in an apartment"
                        {...register("characteristics", {required:true})}
                    />
                    {errors?.characteristics?.type === 'required' && <p className="error-message">Descrição é obrigatório.</p>}
                    {errors?.characteristics?.type === 'pattern' && <p className="error-message">Descrição em formato inválido.</p>}

                    <label>Cell</label>
                    <ReactInputMask
                        mask="99999-999"
                        className={errors?.cep && "input-error"}
                        type="text"
                        placeholder="9234567845"
                        {...register("cep", {required: true, pattern: /^\d{5}-\d{3}$/, validate: async (value) =>{
                            const onlyNumbersCEP = value.replace(/\D/g, "");
                            await axios.get(`https://viacep.com.br/ws/${onlyNumbersCEP}/json/`)
                            .then(resp=>{
                                const cityName = resp.data.localidade;
                                const stateName = resp.data.uf;

                                if(!cityName || !stateName){
                                    return Swal.fire({
                                        title: 'ZIP code not found.',
                                        icon: 'error',
                                        confirmButtonText: 'OK',
                                    });
                                }
                                
                                setCity(cityName);
                                setValue('city', cityName);

                                setState(stateName);
                                setValue('state', stateName);
                            })
                            .catch(error =>{
                                if(error.response.status === 500){
                                    return alert("Try again in a few moments");
                                }else{
                                    return alert("Try again");
                                }
                            })
                        }})}
                    />
                    {errors?.cep?.type === 'required' && <p className="error-message">CEP é obrigatório.</p>}
                    {errors?.cep?.type === 'pattern' && <p className="error-message">CEP em formato inválido.</p>}

                    <label>City</label>
                    <input
                        className={errors?.city && "input-error"}
                        type="text"
                        placeholder="Erode"
                        {...register("city", {required:true})}
                    />
                    {errors?.city?.type === 'required' && <p className="error-message">Cidade é obrigatório.</p>}

                    <label>State</label>
                    <select
                        className={errors?.state && "input-error"}
                        type="text"
                        placeholder="MG"
                        {...register("state", {required:true, validate: (value) =>{return value !=="0";}})}
                    >
                        <option value="0">Select state</option>
                        <option value="AC">Andhra Pradesh</option>
                        <option value="AL">Arunachal Pradesh</option>
                        <option value="AP">Assam</option>
                        <option value="AM">Bihar</option>
                        <option value="BA">Chhattisgarh</option>
                        <option value="CE">Goa</option>
                        <option value="DF">Gujarat</option>
                        <option value="ES">Haryana</option>
                        <option value="GO">Himachal Pradesh</option>
                        <option value="MA">Jharkhand</option>
                        <option value="MT">Mato Grosso</option>
                        <option value="MS">Karnataka</option>
                        <option value="MG">Kerala</option>
                        <option value="PA">Maharashtra</option>
                        <option value="PB">Madhya Pradesh</option>
                        <option value="PR">Manipur</option>
                        <option value="PE">Meghalaya</option>
                        <option value="PI">Mizoram</option>
                        <option value="RJ">Nagaland</option>
                        <option value="RN">Odisha</option>
                        <option value="RS">Punjab</option>
                        <option value="RO">Rajasthan</option>
                        <option value="RR">Sikkim</option>
                        <option value="SC">Tamil Nadu</option>
                        <option value="SP">Tripura</option>
                        <option value="SE">Telangana</option>
                        <option value="TO">Uttar Pradesh</option>
                        <option value="TO">Uttarakhand</option>
                        <option value="TO">West Bengal</option>
                    </select>
                    {errors?.state?.type === 'required' && <p className="error-message">Estado é obrigatório.</p>}
                    {errors?.state?.type === 'validate' && <p className="error-message">Selecione um estado.</p>}

                    <button type="submit">Register pet</button>
                </form>
            </div>
        </PageContainer>
        <Footer />
        </>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 1em;
    text-align: center;
    button{
        margin-bottom: 1.5em;
    }
    p{
        text-align: center;
    }
    div{
        max-width: 80vw;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2.5em;
    }
`
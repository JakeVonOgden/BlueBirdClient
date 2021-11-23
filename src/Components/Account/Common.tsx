import styled from 'styled-components';

export const BoxContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items;
    margin-top: 50px;
`;

export const FormContainer = styled.form`
    width: 100%
    display: flex;
    flex-direction: column;
    box-shadow: 0px 0px 2.5px rgba(15,15,15,0.19);
    margin-top: 20px;
`;

export const MutedLink = styled.div`
    font-size: 21px;
    color: rgba(100,100,100,1);
    font-family: nunito, sans-serif;
    font-weight: 500;
    text-decoration: none;
    margin-top: 10px;
`;

export const BoldLink = styled.a`
    font-size: 21px;
    color: crimson;
    font-weight: 800;
    text-decoration: none;
    margin: 0 7px;
    
`;

export const Input = styled.input`
    width: 100%;
    height: 42px;
    outline: none;
    border: 1px solid rgba(0,0,0,1);
    padding: 0px 10px;
    border-bottom: 1.4px solid transparent;
    transition: all 200ms ease-in-out;
    background: rgba(31,31,31,0.9);
    font-size: 25px;
    font-family: nunito, sans-serif;
    color: rgba(200,200,200,1);

    &::placeholder {
        color: rgba(200,200,200,1);
    }

    &:not(:last-of-type) {
        border-bottom: 1.5px solid rgba(200,200,200, 0.4);
    }

    &:focus {
        outline: none;
        border-bottom: 2px solid crimson;
    }
`;

export const SubmitButton = styled.button`
    width: 100%;
    padding: 5px 10%;
    color: #fff;
    font-size: 30px;
    font-weight: 600;
    border: none;
    border-radius: 100px 100px 100px 100px;
    cursor: pointer;
    transition: all, 240ms ease-in-out;
    background: crimson;
    font-family: nunito, sans-serif;
    margin-top: 30px;

    &:hover {
        background-color: black;
        color: crimson;
    }
`;
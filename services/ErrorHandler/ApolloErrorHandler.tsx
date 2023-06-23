import React, { useState } from 'react';
import { ApolloError } from '@apollo/client';


export const useErrorModal = () => {
    const [popupVisible, setPopupVisible] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');

    const closeModal = () => {
        setPopupVisible(false);
        setPopupMessage('');
    };

    const showErrorModal = (message) => {
        setPopupMessage(message);
        setPopupVisible(true);
    };

    return {
        popupVisible,
        popupMessage,
        closeModal,
        showErrorModal,
        setPopupMessage,
    };
};

export function handleInvalidIdentifierOrPasswordError(showErrorModal) {
    showErrorModal('Invalid Email or Password');
}

export function handlePasswordRequiredError(showErrorModal) {
    showErrorModal('Password is a required field');
}
export function handleIdentifierRequiredError(showErrorModal) {
    showErrorModal('Email is a required field');
}
export function handle2RequiredError(showErrorModal) {
    showErrorModal('You forgot to populate the fields');
}
export function handlePasswordLengthRequirement(showErrorModal) {
    showErrorModal('Your password must be at least 6 characters long.');
}

export function handleAnotherSpecificError(showErrorModal) {
    showErrorModal('Another specific error');
}

export function handleGraphQLError(graphQLErrors, showErrorModal) {
    const deepestErrorMessage = graphQLErrors[graphQLErrors.length - 1].message;

    switch (deepestErrorMessage) {
        case '2 errors occurred':
            handle2RequiredError(showErrorModal)
            break;
        case 'Invalid identifier or password':
            handleInvalidIdentifierOrPasswordError(showErrorModal);
            break;
        case 'password is a required field':
            handlePasswordRequiredError(showErrorModal);
            break;
        case 'identifier is a required field':
            handleIdentifierRequiredError(showErrorModal);
            break;
        case 'email must be a valid email':
            handleIdentifierRequiredError(showErrorModal)
            break;
        case 'password must be at least 6 characters':
            handlePasswordLengthRequirement(showErrorModal)
            break;
        default:
            showErrorModal(`GraphQL error: ${deepestErrorMessage}`);
            console.error([...graphQLErrors.jsonParseErrorDefault()]);
            break;
    }
}

export function handleNetworkOrServerError(error, showErrorModal) {
    showErrorModal(`Non-Apollo error: ${error}`);
}

export function handleApolloError(error, showErrorModal) {
    if (error instanceof ApolloError) {
        const graphQLErrors = error.graphQLErrors;
        if (graphQLErrors.length > 0) {
            handleGraphQLError(graphQLErrors, showErrorModal);
        }
    } else {
        handleNetworkOrServerError(error, showErrorModal);
    }
}



import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View } from 'react-native';
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
    showErrorModal('Invalid identifier or password');
}

export function handlePasswordRequiredError(showErrorModal) {
    showErrorModal('Password is a required field');
}
export function handleIdentifierRequiredError(showErrorModal) {
    showErrorModal('Email is a required field');
}

export function handleAnotherSpecificError(showErrorModal) {
    showErrorModal('Another specific error');
}

export function handleGraphQLError(graphQLErrors, showErrorModal) {
    const deepestErrorMessage = graphQLErrors[graphQLErrors.length - 1].message;

    if (deepestErrorMessage === 'Invalid identifier or password') {
        handleInvalidIdentifierOrPasswordError(showErrorModal);
    } else if (deepestErrorMessage === 'password is a required field') {
        handlePasswordRequiredError(showErrorModal);
    } else if (deepestErrorMessage === 'identifier is a required field') {
        handleIdentifierRequiredError(showErrorModal);
    } else {
        showErrorModal(`GraphQL error: ${deepestErrorMessage}`);
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

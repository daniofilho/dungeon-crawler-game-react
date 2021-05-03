import { createStandaloneToast } from '@chakra-ui/react';

const toast = createStandaloneToast();

// # toasts
export const toastErrorMessage = (message: string): void => {
  toast({
    description: message,
    status: 'error',
    duration: 5000,
    isClosable: true,
    position: 'bottom-right',
  });
};
export const toastSuccessMessage = (message: string): void => {
  toast({
    description: message,
    status: 'success',
    duration: 5000,
    isClosable: true,
    position: 'bottom-right',
  });
};
export const toastWarnMessage = (message: string): void => {
  toast({
    description: message,
    status: 'warning',
    duration: 5000,
    isClosable: true,
    position: 'bottom-right',
  });
};

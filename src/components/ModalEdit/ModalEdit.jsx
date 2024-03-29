import { createPortal } from 'react-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';

import { updateContact } from 'redux/contacts/operations';
import {
  Box,
  Button,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Stack,
  Text,
} from '@chakra-ui/react';
import { AiOutlineUser, AiOutlinePhone } from 'react-icons/ai';

const modalRoot = document.querySelector('#modal-root');

export const ModalEdit = ({ contact, modalHandler }) => {
  const dispatch = useDispatch();
  const { id, name, number } = contact;
  const { isOpen, onClose } = modalHandler;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name,
      number,
    },
  });

  const onSubmit = data => {
    dispatch(updateContact({ id, data }));
    reset();
    onClose();
  };

  return createPortal(
    <Modal size="md" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent p={3}>
        <ModalCloseButton zIndex="docked" />
        <Stack as="form" gap={3} onSubmit={handleSubmit(onSubmit)}>
          <Box pos="relative">
            <FormLabel>
              Name
              <InputGroup mt={3}>
                <Input
                  {...register('name', {
                    required: 'Name is required',
                    pattern: {
                      value:
                        /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
                      message:
                        'Name may contains only letters, apostrophe, dash and spaces.',
                    },
                  })}
                  type="text"
                />
                <InputLeftElement
                  pointerEvents="none"
                  children={<AiOutlineUser color="gray.300" />}
                />
              </InputGroup>
            </FormLabel>
            <Box position="absolute" top="95%">
              {errors?.name && (
                <Text
                  fontSize="xs"
                  color="#ff001b"
                  textShadow="rgb(0 0 0 / 25%) 0px 2px 2px"
                >
                  {errors?.name?.message || 'Error'}
                </Text>
              )}
            </Box>
          </Box>
          <Box pos="relative">
            <FormLabel>
              Number
              <InputGroup mt={3}>
                <Input
                  {...register('number', {
                    required: 'Number is required',
                    pattern: {
                      value: /^\+?[0-9()\s-]{4,}$/,
                      message:
                        'Number must be digits and at least 4 characters',
                    },
                  })}
                  type="tel"
                />
                <InputLeftElement
                  pointerEvents="none"
                  transform="rotate(-90deg) scale(-1) "
                  children={<AiOutlinePhone color="gray.300" />}
                />
              </InputGroup>
            </FormLabel>

            <Box position="absolute" top="95%">
              {errors?.number && (
                <Text
                  fontSize="xs"
                  color="#ff001b"
                  textShadow="rgb(0 0 0 / 25%) 0px 2px 2px"
                >
                  {errors?.number?.message || 'Error'}
                </Text>
              )}
            </Box>
          </Box>
          <Button type="submit">Save</Button>
        </Stack>
      </ModalContent>
    </Modal>,
    modalRoot
  );
};

ModalEdit.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }).isRequired,
  modalHandler: PropTypes.object.isRequired,
};

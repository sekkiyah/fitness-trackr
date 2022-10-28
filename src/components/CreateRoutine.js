import React, { useState } from 'react';
import { createRoutine } from '../api';
import { Button, Modal, Form, FloatingLabel } from 'react-bootstrap';

const CreateRoutine = ({ jwt }) => {
  const [showModal, setShowModal] = useState(false);

  const [name, setName] = useState('');
  const [goal, setGoal] = useState('');
  const [isPublic, setIsPublic] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setShowModal(false);
    setName('');
    setGoal('');
    setIsPublic(false);
  };

  const handleSubmit = async () => {
    const routine = {
      name,
      goal,
      isPublic,
    };
    const response = await createRoutine(routine, jwt);
    if (!response.error) {
      closeModal();
    } else {
      console.error(response.error);
    }
  };

  return (
    <>
      <Button
        variant='success'
        className='position-fixed sticky-bottom rounded-pill shadow'
        size='lg'
        style={{ bottom: '25px', right: '25px' }}
        onClick={() => {
          openModal();
        }}>
        Create Routine
      </Button>

      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header style={{ fontSize: '20px' }}>
          <Modal.Title className='w-100 text-center'>New Routine</Modal.Title>
        </Modal.Header>
        <Form
          onSubmit={e => {
            e.preventDefault();
            handleSubmit();
          }}>
          <Form.Group className='m-3'>
            <FloatingLabel label='Name'>
              <Form.Control
                id='routineName'
                placeholder='Name'
                required
                onChange={e => setName(e.target.value)}
                value={name}
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className='m-3'>
            <FloatingLabel label='Goal'>
              <Form.Control
                as='textarea'
                id='routineGoal'
                placeholder='Goal'
                required
                style={{ height: '80px' }}
                onChange={e => setGoal(e.target.value)}
                value={goal}
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group className='m-3'>
            <Form.Check
              id='routineIsPublic'
              type='checkbox'
              label='Public'
              onChange={e => {
                setIsPublic(e.target.checked);
              }}
              checked={isPublic}
            />
          </Form.Group>

          <Form.Group className='m-3 d-flex justify-content-end'>
            <Button variant='success' type='submit'>
              Create Routine
            </Button>
            <Button
              variant='secondary'
              className='mx-2 justify-self-end'
              onClick={() => closeModal()}>
              Close
            </Button>
          </Form.Group>
        </Form>
      </Modal>
    </>
  );
};

export default CreateRoutine;

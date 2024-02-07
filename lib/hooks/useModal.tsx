import React, { useState } from 'react';
import { Dialog, DialogBody, DialogHeader } from '../components/ui/Dialog';
import { FaTimes } from 'react-icons/fa';

export interface ModalProps {
  title: string;
  children: JSX.Element;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  head?: boolean;
  type?: string;
}
const useModal = () => {
  const [showModal, setModal] = useState(false);

  const setShowModal: boolean | any = (state: boolean) => setModal(state);

  const Modal: React.FC<ModalProps> = ({ title, children, size, type }) => {
    return (
      <>
        <Dialog
          placeholder={''}
          open={showModal}
          size={size || 'md'}
          handler={() => setShowModal(false)}
          animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 0.9, y: -100 },
          }}
          className="py-5 border-0 outline-none"
        >
          <DialogHeader placeholder={''}>
            {type === 'withCancel' ? (
              <div className="flex items-center border-b justify-between w-full px-2">
                <p className='text-xl'>{title}</p>{' '}
                <FaTimes
                  className="text-gray-500"
                  onClick={() => setShowModal(false)}
                />
              </div>
            ) : (
              <p className="text-center w-full">{title}</p>
            )}
          </DialogHeader>
          <DialogBody placeholder={''}>{children}</DialogBody>
        </Dialog>
      </>
    );
  };

  return { Modal, showModal, setShowModal };
};

export default useModal;
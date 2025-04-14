import React from 'react';
import { Modal } from 'antd';
import PlanForm from '../PlanForm';

interface PlanModalProps {
  visible: boolean;
  onClose: () => void;
}

const PlanModal: React.FC<PlanModalProps> = ({ visible, onClose }) => {
  return (
    <Modal
      title="创建新旅行计划"
      open={visible}
      onCancel={onClose}
      footer={null}
      width={600}
      destroyOnClose
    >
      <PlanForm onSuccess={onClose} onCancel={onClose} isModal={true} />
    </Modal>
  );
};

export default PlanModal;
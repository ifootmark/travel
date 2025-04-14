import React from 'react';
import { Modal } from 'antd';
import PlanForm from '../PlanForm';
import { PlanItem } from '../PlanList';

interface PlanModalProps {
  visible: boolean;
  onClose: () => void;
  plan?: PlanItem;
  isEdit?: boolean;
}

const PlanModal: React.FC<PlanModalProps> = ({ visible, onClose, plan, isEdit = false }) => {
  return (
    <Modal
      title={isEdit ? "编辑旅行计划" : "创建新旅行计划"}
      open={visible}
      onCancel={onClose}
      footer={null}
      width={600}
      destroyOnClose
    >
      <PlanForm 
        onSuccess={onClose} 
        onCancel={onClose} 
        isModal={true} 
        initialValues={plan}
        isEdit={isEdit}
      />
    </Modal>
  );
};

export default PlanModal;
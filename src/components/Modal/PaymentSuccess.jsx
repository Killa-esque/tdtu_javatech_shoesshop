import { Modal } from 'antd';

const PaymentSuccess = ({ visible, handleOk, handleCancel }) => {
  return (
    <Modal
      open={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      title="Order Successful"
    >
      <p>Your order has been successfully placed.</p>
    </Modal>
  );
};
export default PaymentSuccess

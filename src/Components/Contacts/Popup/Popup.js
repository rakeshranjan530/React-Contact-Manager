import Modal from 'react-bootstrap/Modal';

const PopupModal = ({isModal,setModal,handleModalDelete}) => {

    return(
        <div>
            <Modal show={isModal} onHide={()=> setModal(false)} animation={false}>
                <div className="modal-box">
                    <div className="modal-heading">
                        <p className='h4 text-center'>Are you sure want to delete this contact</p>
                    </div>
                    <div className='button-box'>
                        <button className='btn btn-danger me-4' onClick={handleModalDelete}>Yes</button>
                        <button className='btn btn-success' onClick={()=>setModal(false)}>Cancel</button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}
export default PopupModal;
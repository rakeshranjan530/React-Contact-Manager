import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import PopupModal from "../Popup/Popup";

const ContactList = () => {
    const [isModal, setModal] = useState(false)
    const [index,setIndex] = useState(null)
    const [data, setData] = useState({
        dataArr: JSON.parse(localStorage.getItem('data')) || []
    })

    const handleDelete = (i) => {
        setModal(true)
        setIndex(i)
    }
    const handleModalDelete = () =>{
         const tempArr = [...data.dataArr];
        tempArr.splice(index,1);

        setData((state)=>({
         ...state,
           dataArr:tempArr
         }))
        localStorage.setItem("data", JSON.stringify(tempArr))
        setModal(false)
    }
    return (
        <>
            {
                isModal && (<PopupModal isModal={isModal} handleModalDelete={handleModalDelete}  setModal={setModal} />)
            }
            <section className="contact-search p-3">
                <div className="container">
                    <div className="grid">
                        <div className="row">
                            <div className="col">
                                <p className="h3">Contact Manager
                                    <Link to={'/contacts/add'} className="btn btn-primary ms-2">
                                        <i className="fa fa-plus-circle me-2" />
                                        New</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="contact-list">
                <div className="container">
                    <div className="row">
                        {
                            data?.dataArr.length === 0
                                ? <p className="h1 fw-bold">No contact saved create new </p>
                                : data?.dataArr?.map((e, i) => {
                                    return (
                                        <div className="col-md-6" key={i}>
                                            <div className="card my-2">
                                                <div className="card-body">
                                                    <div className="row align-items-center d-flex justify-content-around">
                                                        <div className="col-md-4">
                                                            <img src={e?.photo} className="image-fluid contact-image" alt=".jpg" />
                                                        </div>
                                                        <div className="col-md-7">
                                                            <ul className="list-group">
                                                                <li className="list-group-item list-group-item-action">
                                                                    Name : <span className="fw-bold">{e?.name}</span>
                                                                </li>
                                                                <li className="list-group-item list-group-item-action">
                                                                    Mobile : <span className="fw-bold">{e?.number}</span>
                                                                </li>
                                                                <li className="list-group-item list-group-item-action">
                                                                    Whatsapp : <span className="fw-bold">{e?.whatsapp === true ? 'Yes': 'No'}</span>
                                                                </li>
                                                                <li className="list-group-item list-group-item-action">
                                                                    Group : <span className="fw-bold">{e?.group}</span>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className="col-md-1 d-flex flex-column align-items-center">
                                                            <Link to={{ pathname: `/contacts/edit/${e?.id}`, omg: "OMG" }} className="btn btn-primary my-2">
                                                                <i className="fa fa-pen"></i>
                                                            </Link>
                                                            <button className="btn btn-danger my-2" onClick={() => handleDelete(i)}>
                                                                <i className="fa fa-trash"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                        }
                    </div>
                </div>
            </section>
        </>
    )
}
export default ContactList;
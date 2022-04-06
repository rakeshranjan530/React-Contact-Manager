import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const EditContact = () => {
    const location = useLocation();
    let navigate = useNavigate();
    const { pathname } = location || ""
    let id = pathname.split('/');
    id = id[id.length - 1];

    const [volatile, setVolatile] = useState(null);
    useEffect(() => {
        let tempData = JSON.parse(localStorage.getItem('data')) || [];
        const array = tempData.filter(e => e?.id === id);
        setVolatile(array[0])
    }, [])

    const handleChange = (e) => {
        const { name, value,checked } = e.target;
        setVolatile((state) => ({
            ...state,
            [name]: checked ? (value === 'true') : value
        }))
    }
    const handleUpdate = (e) => {
        e.preventDefault();
        let info = JSON.parse(localStorage.getItem("data")) || [];
        info.map((d) => {
            if (d?.id === id) {
                d['name'] = volatile['name'];
                d['photo'] = volatile['photo'];
                d['number'] = volatile['number'];
                d['whatsapp'] = volatile['whatsapp'];
                d['group'] = volatile['group']
                return { ...d }
            }
            return { ...d }
        })
        try {
            localStorage.setItem("data", JSON.stringify(info));
            navigate('/contacts/list')
        } catch (error) {
            console.log("Getting error in local Storage")
        }
    }
    return (
        <>
            <section className="edit-contact p-3">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="h4 text-primary">Edit contact</p>
                        </div>
                    </div>
                    <div className="row pt-3">
                        <div className="col-md-4">
                            <form>
                                <div className="mb-2">
                                    <input className="form-control" onChange={handleChange} name="name" value={volatile?.name} placeholder="Name" type="text" />
                                </div>
                                <div className="mb-2">
                                    <input className="form-control" onChange={handleChange} name="photo" value={volatile?.photo} placeholder="Photo url" type="text" />
                                </div>
                                <div className="mb-2">
                                    <input className="form-control" onChange={handleChange} name="number" value={volatile?.number} placeholder="Mobile" type="number" />
                                </div>
                                <div className="mb-2">
                                    <select className="form-control" value={volatile?.group} onChange={handleChange} name="group">
                                        <option value="">Select a group</option>
                                        <option value="Family">Family</option>
                                        <option value="Friend">Friends</option>
                                        <option value="Office">Office</option>
                                        <option value="home">Home</option>
                                    </select>
                                </div>
                                <div className="mb-2 d-flex align-items-baseline">
                                    <input type="radio" name="whatsapp" value={true} onChange={handleChange} />
                                    <label className="ms-1">Yes</label>
                                    <input className="ms-2" type="radio" name="whatsapp" value={false} onChange={handleChange} />
                                    <label className="ms-1">No</label>
                                    <p className="h5 ms-5"> Whatsapp</p>
                                </div>
                                <div className="mb-2">
                                    <input className="btn btn-primary" value="Update" onClick={(e) => handleUpdate(e)} type="submit" />
                                    <Link to={"/contacts/list"} className="btn btn-dark ms-2">Cancel</Link>
                                </div>
                            </form>
                        </div>
                        <div className="col-md-6">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnQBTpYr6EhVVbhSCTgv__fM6KPdeOpD63FX2YTKCp39M8PO9GrR5_E647Axc0Qdt8ZWM&usqp=CAU" alt=".jpg" className="contact-image" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default EditContact;
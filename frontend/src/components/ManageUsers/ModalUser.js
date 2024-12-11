import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from 'react';
import { fetchAllGroup, createNewUser } from '../../services/apiServices';
import { toast } from 'react-toastify';
import _, { groupBy } from 'lodash';


const ModalUser = (props) => {
    const defaultUserData = {
        email: '',
        phone: '',
        username: '',
        password: '',
        address: '',
        sex: '',
        group: ''
    }
    const validInputsDefault = {
        email: true,
        phone: true,
        username: true,
        password: true,
        address: true,
        sex: true,
        group: true
    }
    const [userGroups, setUserGroups] = useState([]);

    const [validInputs, setValiInputs] = useState(validInputsDefault);
    const [userData, setUserData] = useState(defaultUserData);
    useEffect(() => {
        getGroup();
        if (props.action === 'UPDATE') {
            setUserData(props.dataModalUser);
        }
    }, [])

    const getGroup = async () => {
        let res = await fetchAllGroup();
        if (res && res.errCode === 0) {
            setUserGroups(res.data);
            if (res.data && res.data > 0) {
                let groups = res.data;
                setUserData({ ...userData, group: groups[0].id })
            }
        } else {
            toast.error(res.errMessage);
        }
    }
    const handleOnChangeInput = (value, name) => {
        let _userData = _.cloneDeep(userData);
        _userData[name] = value;
        setUserData(_userData);
    }
    const checkValidateInput = () => {
        setValiInputs(validInputsDefault);
        let check = true;
        let arr = ['email', 'phone', 'password', 'group'];
        for (let i = 0; i < arr.length; i++) {
            if (!userData[arr[i]]) {
                let _validInputs = _.cloneDeep(validInputsDefault);
                _validInputs[arr[i]] = false;
                setValiInputs(_validInputs);
                toast.error(`Empty input ${arr[i]}`)
                check = false;
                break;
            }
        }
        return check;
    }

    const handleConfirmUser = async () => {
        let check = checkValidateInput();
        if (check === true) {
            let res = await createNewUser(
                { ...userData, groupId: userData['group'] }
            );
            if (res && res.errCode === 0) {
                toast.success(res.errMessage);
                props.handleClose();
                setUserData({ ...defaultUserData, group: userGroups[0].id });
            } else {
                toast.error(res.errMessage);
                let _validInputs = _.cloneDeep(validInputsDefault);
                _validInputs[res.data] = false;
                setValiInputs(_validInputs);
            }

        }
    }

    return (
        <>
            <Modal size='lg' show={props.show} onHide={props.handleClose} className='modal-user'>
                <Modal.Header closeButton >
                    <Modal.Title>
                        <span>{props.action === 'CREATE' ? 'Create new user' : 'Edit a user'}</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='content-body row'>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Email address (<span className='red'>*</span>):</label>
                            <input className={validInputs.email ? 'form-control' : 'form-control is-invalid'}
                                type='email'
                                value={userData.email}
                                onChange={(event) => handleOnChangeInput(event.target.value, 'email')}
                            />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Phone number (<span className='red'>*</span>):</label>
                            <input className={validInputs.phone ? 'form-control' : 'form-control is-invalid'} type='text' value={userData.phone}
                                onChange={(event) => handleOnChangeInput(event.target.value, 'phone')}
                            />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Username:</label>
                            <input className={validInputs.username ? 'form-control' : 'form-control is-invalid'} type='text' value={userData.username}
                                onChange={(event) => handleOnChangeInput(event.target.value, 'username')}
                            />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Password (<span className='red'>*</span>):</label>
                            <input className={validInputs.password ? 'form-control' : 'form-control is-invalid'} type='password' value={userData.password}
                                onChange={(event) => handleOnChangeInput(event.target.value, 'password')}
                            />
                        </div>
                        <div className='col-12 form-group'>
                            <label>Address:</label>
                            <input className={validInputs.address ? 'form-control' : 'form-control is-invalid'} type='text' value={userData.address}
                                onChange={(event) => handleOnChangeInput(event.target.value, 'address')}
                            />
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Gender:</label>
                            <select className={validInputs.phone ? 'form-select' : 'form-select is-invalid'}
                                onChange={(event) => handleOnChangeInput(event.target.value, 'sex')}
                            >
                                <option value="1">Male</option>
                                <option value="2">Female</option>
                                <option value="3">Other</option>
                            </select>
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Group(<span className='red'>*</span>):</label>

                            <select className={validInputs.phone ? 'form-select' : 'form-select is-invalid'}
                                onChange={(event) => handleOnChangeInput(event.target.value, 'group')}
                            >
                                {userGroups && userGroups.length > 0
                                    && userGroups.map((item, index) => {
                                        return (
                                            <option key={`group-${index}`} value={item.id}>{item.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose} >
                        Close
                    </Button>
                    <Button variant="primary"
                        onClick={() => handleConfirmUser()}
                    >
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalUser;
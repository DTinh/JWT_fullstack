
import { useEffect, useState } from 'react';
import './Users.scss';
import { fetchAllUsers, deleteUser } from '../../services/apiServices';
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';
import ModalDelete from './ModalDelete';
import ModalUser from './ModalUser';
const Users = (props) => {
    const [listUsers, setListUser] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(3);
    const [totalPage, setTotalPage] = useState(0);
    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [isShowModalUser, setIsShowModalUser] = useState(false);
    const [dataModalDelete, setDataModal] = useState({});
    const [actionModalUser, setActionModalUser] = useState('CREATE');
    const [dataModalUser, setDataModalUser] = useState({});
    useEffect(() => {
        fetchUsers();
    }, [currentPage])
    const fetchUsers = async (page) => {
        let res = await fetchAllUsers(currentPage, currentLimit);
        if (res && res.errCode === 0) {
            setTotalPage(res.data.totalPages);
            setListUser(res.data.users);

        }
    }
    const handlePageClick = async (event) => {
        setCurrentPage(+event.selected + 1)
    };
    const handleDeleteUser = async (user) => {
        setDataModal(user);
        setIsShowModalDelete(true);
    }
    const handleClose = () => {
        setDataModal({});
        setIsShowModalDelete(false);
        setIsShowModalUser(false);
    }
    const confiemDeleteUser = async () => {
        let res = await deleteUser(dataModalDelete);
        if (res && res.errCode === 0) {
            setIsShowModalDelete(false);
            toast.success(res.errMessage);
            await fetchUsers();
        } else {
            toast.error(res.errMessage);
        }

    }
    const handleCreateUser = () => {
        setIsShowModalUser(true);
    }
    const handleEditUser = (user) => {
        setDataModalUser(user);
        setIsShowModalUser(true);
    }
    return (
        <>
            <div className='container'>
                <div className='manage-users-container'>
                    <div className='user-header'>
                        <div>
                            <h3>
                                Table User
                            </h3>
                        </div>
                        <div className='action'>
                            <button className='btn btn-success'>Refesh</button>
                            <button className='btn btn-primary'
                                onClick={() => handleCreateUser()}
                            >Add new user</button>
                        </div>
                    </div>
                    <div className='user-body'>
                        <table className="table table-hover table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">No</th>
                                    <th scope="col">Id</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Username</th>
                                    <th scope="col">Group</th>
                                </tr>
                            </thead >
                            <tbody>
                                {listUsers && listUsers.length > 0 ?
                                    <>
                                        {listUsers.map((item, index) => {
                                            return (
                                                <tr key={`row-${index}`}>
                                                    <td>{(currentPage - 1) * currentLimit + index + 1}</td>
                                                    <td>{item.id}</td>
                                                    <td>{item.email}</td>
                                                    <td>{item.username}</td>
                                                    <td>{item.Group ? item.Group.name : ''}</td>
                                                    <td>
                                                        <button className='btn btn-warning mx-3'
                                                            onClick={() => handleEditUser(item)}
                                                        >Edit</button>
                                                        <button className='btn btn-danger'
                                                            onClick={() => handleDeleteUser(item)}
                                                        >Delete</button>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </>
                                    :
                                    <>
                                        <tr><td>Not found users</td></tr>
                                    </>
                                }
                            </tbody>
                        </table >
                    </div >
                    {totalPage > 0 &&
                        <div className='user-footer'>
                            <ReactPaginate
                                nextLabel="next >"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={3}
                                marginPagesDisplayed={2}
                                pageCount={totalPage}
                                previousLabel="< previous"
                                pageClassName="page-item"
                                pageLinkClassName="page-link"
                                previousClassName="page-item"
                                previousLinkClassName="page-link"
                                nextClassName="page-item"
                                nextLinkClassName="page-link"
                                breakLabel="..."
                                breakClassName="page-item"
                                breakLinkClassName="page-link"
                                containerClassName="pagination"
                                activeClassName="active"
                                renderOnZeroPageCount={null}
                            />
                        </div>
                    }

                </div >
            </div>
            <ModalDelete
                show={isShowModalDelete}
                handleClose={handleClose}
                confiemDeleteUser={confiemDeleteUser}
                dataModalDelete={dataModalDelete}
            />
            <ModalUser
                show={isShowModalUser}
                handleClose={handleClose}
                action={actionModalUser}
                dataModalUser={dataModalUser}
            />
        </>


    )
}

export default Users;
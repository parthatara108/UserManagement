import { useEffect, useState } from 'react'
import { PlusIcon, ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ITEMS_PER_PAGE } from '../app/constants'
import Pagination from './Pagination'
import Popup from './Popup'
import { useAlert } from 'react-alert'
import { deleteUserAsync, fetchUsersAsync } from '../features/user/userSlice'

export default function UserList() {
    const dispatch = useDispatch()
    const users = useSelector(state => state.user.userInfo)
    const status = useSelector(state => state.user.status)
    const [sort, setSort] = useState({})
    const [page, setPage] = useState(1)
    const totalItems = useSelector(state => state.user.totalUsers)
    const [showPopUp, setShowPopUp] = useState(null)
    const alert = useAlert()

    const sortOptions = [
        { name: 'ASC', sort: 'firstname', order: 'asc' },
        { name: 'DEC', sort: 'firstname', order: 'desc' },
    ];

    const handlePage = (page) => {
        setPage(page);
    }

    const handleRemove = (id) => {
        dispatch(deleteUserAsync({ id: id, alert }))
            .then(() => {
                const pagination = { _page: page, _limit: ITEMS_PER_PAGE }
                dispatch(fetchUsersAsync({ sort, pagination }))
            })
    }

    const handleSort = (option) => {
        const sort = { _sort: option.sort, _order: option.order };
        setSort(sort);
    };

    useEffect(() => {
        const pagination = { _page: page, _limit: ITEMS_PER_PAGE }
        dispatch(fetchUsersAsync({ sort, pagination }))
    }, [dispatch, page, sort])

    useEffect(() => {
        setPage(1)
    }, [totalItems])

    return (
        <>
            <div className='flex justify-between mx-16 mt-10'>
                <h1 className='text-black text-2xl font-bold br md:text-4xl'>Manage Users:</h1>
                <select onChange={(e) => handleSort(sortOptions[e.target.selectedIndex])}>
                    {sortOptions.map((option) => {
                        return (
                            <option key={option.name} value={option.sort}>{option.name}</option>
                        )
                    })}
                </select>
                <Link to={'/user-form'}>
                    <button type="button" className="text-white w-20 bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-3 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 mr-2 mb-2">
                        <PlusIcon className='w-5 h-5 mr-1' />
                        Add
                    </button>
                </Link>
            </div>
            {users < 1 ?
                <div className='flex justify-center'>No User Available</div>
                :
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-16">
                    <table className="w-full mt-5 text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-900 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="text-center px-6 py-3">
                                    FirstName
                                </th>
                                <th scope="col" className="text-center px-6 py-3">
                                    LastName
                                </th>
                                <th scope="col" className="text-center px-6 py-3">
                                    Email
                                </th>
                                <th scope="col" className="text-center px-6 py-3">
                                    Phone
                                </th>
                                <th scope="col" className="text-center px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {users?.map((user, index) => {
                                return (
                                    <tr key={index} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                        <td className="px-6 text-center py-4">{user.firstname}</td>
                                        <td className="px-6 text-center py-4">{user.lastname}</td>
                                        <td className="px-6 text-center py-4">
                                            {user.email}
                                        </td>
                                        <td className="px-6 text-center py-4">{user.phone}</td>
                                        <td className="px-6 text-center py-4">
                                            <Link
                                                to={`/user-form/${user.id}`}
                                                className="font-medium mx-3 text-blue-600 dark:text-blue-500 cursor:pointer"
                                            >
                                                Update
                                            </Link>
                                            {showPopUp === user?.id && <Popup title={`Delete ${user?.firstname}`} message={'Are You Sure You Want To Delete This User'} dangerOption={'Delete'} cancelOption={'Cancel'} dangerAction={() => handleRemove(user?.id)} showPopup={showPopUp === user?.id} cancelAction={() => setShowPopUp(-1)} />}
                                            <button
                                                type='button'
                                                onClick={() => { setShowPopUp(user.id) }}
                                                className="font-medium text-red-600 dark:text-red-500 cursor:pointer"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <Pagination handlePage={handlePage} totalItems={totalItems} page={page} setPage={setPage} />
                </div>
            }
        </>
    );
}

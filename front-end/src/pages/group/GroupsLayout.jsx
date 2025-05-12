import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setGroups } from '../../Redux/groupsSlice';

export default function GroupLayout() {
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token);
    const [loading, setLoading] = useState(true); // <--- Add this

    useEffect(() => {
        axios.get('/api/groups', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                dispatch(setGroups(res.data));
            })
            .catch(error => {
                console.error('Error fetching groups:', error);
            })
            .finally(() => {
                setLoading(false); // <--- When done, stop loading
            });
    }, [dispatch, token]);

    // if (loading) {
    //     return (
    //         <div className="flex items-center justify-center h-screen">
    //             <h1 className="text-xl font-medium">Chargement...</h1>
    //         </div>
    //     );
    // }

    return <Outlet context={loading}/>;
}

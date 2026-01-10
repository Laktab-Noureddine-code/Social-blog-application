import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'
import { uploadPosts } from '@/Redux/PostsSilce';
import ContainerPostsGroup from './ContainerPostsGroup';
import api from '@/lib/api';


function GroupPost() {
    const [loding,setLoding] = useState(true);
    const { groupeId } = useParams();
    const dispatcher = useDispatch();
    useEffect(() => {
        const fetchData = async () => {
            const response = await api.get(`/api/groups/${groupeId}/posts`);
            const res = response.data;
            setLoding(false);
            dispatcher(uploadPosts(res.posts));

            // console.log('MOHO',res);
        } 
        fetchData();
    })
  return (
    <div>
      <ContainerPostsGroup loding={loding} id_group={groupeId} />
    </div>
  );
}

export default GroupPost

import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { uploadPosts } from '@/Redux/PostsSilce';
import ContainerPostsGroup from './ContainerPostsGroup';


function GroupPost() {
    const [loding,setLoding] = useState(true);
    const { groupeId } = useParams();
    const access_token = useSelector(state => state.auth.access_token)
    const dispatcher = useDispatch();
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`/api/groups/${groupeId}/posts`, {
              headers: {
                Authorization: `Bearer ${access_token}`,
              },
            });
            const res = await response.json();
            if (response.ok) setLoding(false);
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

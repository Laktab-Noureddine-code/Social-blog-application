import { Outlet, useParams } from 'react-router-dom'
import GroupHeader from '../../components/pages/group/GroupeHeader'
import { useState } from 'react'
import { groups } from '../../data/group'

function Group() {
  const { groupeId } = useParams()
  const [group, setGroup] = useState(groups.filter((e) => e.id === +groupeId)[0])
  return (
    <div>
      <GroupHeader group={group} />
      <div className='w-full bg-[#e3e5e8] '>
        <div className='md:max-w-3xl mx-auto py-6'>
          <Outlet context={{group}}/>
        </div>
      </div>
    </div>
  )
}

export default Group

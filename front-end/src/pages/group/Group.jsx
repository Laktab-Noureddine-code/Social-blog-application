import { Outlet, useParams } from 'react-router-dom'
import GroupHeader from '../../components/pages/group/GroupeHeader'
import { useSelector } from 'react-redux'

function Group() {
  const { groupeId } = useParams()
  const group = useSelector(state => state.groups.groups.find(group => group.id === +groupeId))
  if (!group) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-xl font-medium">Chargement du groupe...</h1>
      </div>
    )
  }
  return (
    <div>
      <GroupHeader group={group} />
      <div className='w-full bg-[#e3e5e8] '>
        <div className='md:max-w-3xl mx-auto py-6'>
          <Outlet context={{ group }} />
        </div>
      </div>
    </div>
  )
}

export default Group

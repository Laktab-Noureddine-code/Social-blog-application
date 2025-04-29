import { useOutletContext } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getNumber } from '../../../helpers/helper';


function Memebers() {
  const { group } = useOutletContext()
  return (
    <div className='shadow-lg rounded-lg bg-white'>
      <h1></h1>
      <Card className="shadow-lg">
        <CardHeader className="pb-3 ">
          <CardTitle className="text-xl font-medium">Membres · {getNumber(group.members)}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-6'>
            {
              group.members.map((member, index) => (
                <div key={index} className='flex items-center gap-3'>
                  <img src={member.profileImage} loading='lazy' className='size-16 rounded-full border' />
                  <div>
                    <h1 className='text-lg'>{member.name}</h1>
                  </div>
                </div>
              ))
            }
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Memebers

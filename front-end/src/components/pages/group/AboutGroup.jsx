/* eslint-disable no-unused-vars */
// components & pages
import { useSelector } from "react-redux"
function AboutGroup() {
    const group = useSelector(state => state.groups.currentGroup)
    return (
        <div>
            <div className="space-y-6">
                hello world
            </div>
        </div>
    )
}

export default AboutGroup

// components & pages
import { useOutletContext } from "react-router-dom"
import { GroupDescription } from "./AboutComponents/GroupDescription"
import { GroupMembers } from "./AboutComponents/GroupMembers"
import { GroupRules } from "./AboutComponents/GroupRules"

function About() {
    const { group } = useOutletContext()
    return (
        <div>
            <div className="space-y-6">
                <GroupDescription group={group} />
                <GroupMembers group={group} />
                <GroupRules group={group} />
            </div>
        </div>
    )
}

export default About

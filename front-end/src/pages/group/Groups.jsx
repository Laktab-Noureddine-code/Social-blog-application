import { Link } from "react-router-dom"
import { groups } from "../../data/group"


function Groups() {
    return (
        <div>
            <h1>All Groupes</h1>
            <div>
                {groups.map((group, index) => (
                    <div key={index}>
                        <Link to={`/group/${group.id}`}>{group.groupName}</Link>
                    </div>
                )
                )}
            </div>
        </div>
    )
}

export default Groups

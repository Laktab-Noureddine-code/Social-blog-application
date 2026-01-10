import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import GroupMembersIcons from "../GroupMembersIcons";
import { getNumber } from "@/shared/helpers/helper";

export const GroupMembers = ({group}) => {
    return (
        <Card className="shadow-lg">
            <CardHeader className="pb-3 ">
                <CardTitle className="text-xl font-medium">Membres · {getNumber(group.members)}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex -space-x-2 mb-4 ml-3">
                    <GroupMembersIcons group={group}/>
                </div>

                <p className="text-sm text-gray-600 mb-4">
                    CryptoTambay et 5 autres membres sont administrateurs. Pau et Azi sont modérateurs.
                </p>

                <button className="w-full py-2 text-center bg-gray-100 text-gray-700 font-medium rounded-md hover:bg-gray-200 transition-colors">
                    Voir tout
                </button>
            </CardContent>
        </Card>
    );
};
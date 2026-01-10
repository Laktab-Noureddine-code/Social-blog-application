import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Globe2, Eye, Clock, Tag } from "lucide-react";
import { Badge } from "@/shared/ui/badge";
import { formatDate } from "@/shared/helpers/helper";

export const GroupDescription = ({ group }) => {

    return (
        <Card className="shadow-lg">
            <CardHeader className="pb-3">
                <CardTitle className="text-2xl font-bold">À propos de ce groupe</CardTitle>
                <div className="border-b border-gray-300 mt-3" />
            </CardHeader>
            <CardContent>
                <div className="space-y-5">
                    <div className="flex items-start gap-3">
                        <Globe2 className="h-6 w-6 text-gray-500 mt-0.5" />
                        <div>
                            <p className="font-bold text-gray-900">{group.status}</p>
                            <p className="text-sm font-semibold text-gray-600">
                                {group.status === "Privé" ?
                                    'Seuls les membres du groupe peuvent voir qui en fait partie et ce qui est publié.'
                                    : 'Tout le monde peut voir qui est dans le groupe et ce qui est publié.'}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Eye className="h-6 w-6 text-gray-500 mt-0.5" />
                        <div>
                            <p className="font-bold text-gray-900">Visible</p>
                            <p className="text-sm font-semibold text-gray-600">Tout le monde peut trouver ce groupe.</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Clock className="h-6 w-6 text-gray-500 mt-0.5" />
                        <div>
                            <p className="font-bold text-gray-900">Historique</p>
                            <p className="text-sm font-semibold text-gray-600">
                                Groupe créé le {formatDate(group.created_at)}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <Tag className="h-6 w-6 text-gray-500 mt-0.5" />
                        <div>
                            <p className="font-bold text-gray-900">Tags</p>
                            <div className="mt-1 flex items-center gap-2 flex-wrap">
                                {
                                    group.tags.map((tag ,index)=>(
                                        <Badge key={index} variant="secondary" className="rounded-md mr-2 p-1">{tag}</Badge>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
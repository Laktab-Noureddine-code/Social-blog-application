import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, Lock } from 'lucide-react';

function GroupForm({
    groupName, setGroupName, confidentiality, setConfidentiality, visibility, setVisibility, handleSubmit, handleCoverUpload, groupProfile, handleProfileUpload, groupCover }) {
    return (
        <div className="bg-white fixed top-0 w-full lg:w-[26%] p-6 space-y-6 border-r h-screen overflow-y-auto shadow-xl">
            <div>
                <h1 className="text-2xl font-bold mt-1">Créer un groupe</h1>
            </div>

            <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="font-semibold text-gray-600">N</span>
                </div>
                <div>
                    <div className="font-semibold">Noureddine Läktab</div>
                    <div className="text-sm text-gray-500">Admin</div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <Input
                        placeholder="Nom du groupe"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                        className="w-full border rounded p-2"
                    />
                </div>

                <div>
                    <div className="text-sm text-gray-500 mb-1">Choisissez la confidentialité</div>
                    <Select
                        value={confidentiality}
                        onValueChange={setConfidentiality}
                    >
                        <SelectTrigger className="w-full">
                            <div className="flex items-center">
                                <Lock className="w-4 h-4 mr-2" />
                                <SelectValue>{confidentiality === 'privé' ? 'Privé' : 'Public'}</SelectValue>
                            </div>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="privé">Privé</SelectItem>
                            <SelectItem value="public">Public</SelectItem>
                        </SelectContent>
                    </Select>
                    <div className="mt-2 text-sm text-gray-500">
                        {confidentiality === 'privé' ? (
                            <span>
                                Seuls les membres peuvent voir qui est dans le groupe et ce qui est publié.
                                Vous ne pourrez pas transformer ce groupe en groupe public plus tard.
                            </span>
                        ) : (
                            <span>
                                Tout le monde peut voir qui est dans le groupe et ce qui est publié.
                                Vous pouvez transformer ce groupe en groupe privé maintenant ou plus tard.
                            </span>
                        )}
                    </div>
                </div>

                <div>
                    <div className="text-sm text-gray-500 mb-1">Visibilité</div>
                    <Select
                        value={visibility}
                        onValueChange={setVisibility}
                    >
                        <SelectTrigger className="w-full">
                            <div className="flex items-center">
                                {visibility === 'visible' ? (
                                    <Eye className="w-4 h-4 mr-2" />
                                ) : (
                                    <EyeOff className="w-4 h-4 mr-2" />
                                )}
                                <SelectValue>{visibility === 'visible' ? 'Visible' : 'Masqué'}</SelectValue>
                            </div>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="visible">Visible</SelectItem>
                            <SelectItem value="Masqué">Masqué</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <div className="text-sm text-gray-500 mb-1">Photo de couverture</div>
                    <input
                        type="file"
                        onChange={handleCoverUpload}
                        accept="image/*"
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                    />
                    {groupCover && (
                        <div className="mt-2">
                            <img src={groupCover} alt="Cover preview" className="h-20 rounded-md object-cover" />
                        </div>
                    )}
                </div>

                <div>
                    <div className="text-sm text-gray-500 mb-1">Photo de profil</div>
                    <input
                        type="file"
                        onChange={handleProfileUpload}
                        accept="image/*"
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                    />
                    {groupProfile && (
                        <div className="mt-2">
                            <img src={groupProfile} alt="Profile preview" className="h-20 w-20 rounded-full object-cover" />
                        </div>
                    )}
                </div>
                <div className='w-full '>
                    <Button className={`w-full  bg-gray-200 font-bold transform text-black hover:bg-gray-300 ${groupName !== "" ? "bg-blue-600 text-white" : ""}`}>
                        Créer
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default GroupForm

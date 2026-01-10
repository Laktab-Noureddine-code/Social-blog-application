/* eslint-disable react/prop-types */
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import { Eye, EyeOff, Lock } from 'lucide-react';
import { userProfile } from "@/shared/helpers/helper";

function GroupForm({
    userName,
    groupName,
    setGroupName,
    description,
    setDescription,
    confidentiality,
    setConfidentiality,
    visibility,
    setVisibility,
    handleSubmit,
    handleCoverUpload,
    groupCover,
    isGroupNameValid,
    isSubmitting,
    error,
    user
}) {
    console.log(user)
    const canCreate = isGroupNameValid && groupCover && visibility && true
    return (
        <div className="bg-white border fixed top-0 w-full lg:w-[26%] px-6 py-2 space-y-6 border-r max-h-[90vh] overflow-y-scroll top-15 shadow-xl">
            <div>
                <h1 className="text-2xl font-bold mt-1">Créer un groupe</h1>
            </div>

            {error && (
                <div className="p-4 bg-red-100 text-red-700 rounded-md">
                    {error}
                </div>
            )}

            <div className="flex items-center space-x-3">
                <div className="w-10 h-10 overflow-hidden bg-gray-200 rounded-full flex items-center justify-center">
                    <img src={userProfile(user.image_profile_url)}  />
                </div>
                <div>
                    <div className="font-semibold">{userName}</div>
                    <div className="text-sm text-gray-500">Admin</div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    placeholder="Nom du groupe"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    className="w-full border rounded p-2"
                />

                <div>
                    <textarea
                        placeholder="Description du groupe"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full border rounded p-2 min-h-[100px] text-sm"
                        rows={4}
                    />
                </div>

                <div>
                    <div className="text-sm text-gray-500 mb-1">Choisissez la confidentialité</div>
                    <Select value={confidentiality} onValueChange={setConfidentiality}>
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
                </div>

                <div>
                    <div className="text-sm text-gray-500 mb-1">Visibilité</div>
                    <Select value={visibility} onValueChange={setVisibility}>
                        <SelectTrigger className="w-full">
                            <div className="flex items-center">
                                {visibility === 'visible' ? <Eye className="w-4 h-4 mr-2" /> : <EyeOff className="w-4 h-4 mr-2" />}
                                <SelectValue>{visibility === 'visible' ? 'Visible' : 'Masqué'}</SelectValue>
                            </div>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="visible">Visible</SelectItem>
                            <SelectItem value="masqué">Masqué</SelectItem>
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
                    {groupCover && <img src={groupCover} alt="Cover preview" className="mt-2 h-20 rounded-md object-cover" />}
                </div>

                <Button
                    className={`w-full font-bold transform ${isGroupNameValid ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
                    disabled={!canCreate || isSubmitting}
                    type="submit"
                >
                    {isSubmitting ? 'Création en cours...' : 'Créer'}
                </Button>
            </form>
        </div>
    );
}

export default GroupForm;
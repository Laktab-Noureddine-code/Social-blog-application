import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, Lock } from 'lucide-react';

function GroupForm({
    userName,
    groupName,
    setGroupName,
    confidentiality,
    setConfidentiality,
    visibility,
    setVisibility,
    handleSubmit,
    handleCoverUpload,
    handleProfileUpload,
    groupCover,
    groupProfile,
    isGroupNameValid,
    isSubmitting,
    error
}) {
    return (
        <div className="bg-white fixed top-0 w-full lg:w-[26%] p-6 space-y-6 border-r h-screen overflow-y-auto shadow-xl">
            <div>
                <h1 className="text-2xl font-bold mt-1">Créer un groupe</h1>
            </div>

            {/* Error message */}
            {error && (
                <div className="p-4 bg-red-100 text-red-700 rounded-md">
                    {error}
                </div>
            )}

            <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="font-semibold text-gray-600">{userName.charAt(0).toUpperCase()}</span>
                </div>
                <div>
                    <div className="font-semibold">{userName}</div>
                    <div className="text-sm text-gray-500">Admin</div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Group name input */}
                <Input
                    placeholder="Nom du groupe"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    className="w-full border rounded p-2"
                />

                {/* Confidentiality selector */}
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

                {/* Visibility selector */}
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

                {/* Cover upload */}
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

                {/* Profile upload */}
                <div>
                    <div className="text-sm text-gray-500 mb-1">Photo de profil</div>
                    <input
                        type="file"
                        onChange={handleProfileUpload}
                        accept="image/*"
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                    />
                    {groupProfile && <img src={groupProfile} alt="Profile preview" className="mt-2 h-20 w-20 rounded-full object-cover" />}
                </div>

                {/* Submit button */}
                <Button
                    className={`w-full font-bold transform ${isGroupNameValid ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
                    disabled={!isGroupNameValid || isSubmitting}
                    type="submit"
                >
                    {isSubmitting ? 'Création en cours...' : 'Créer'}
                </Button>
            </form>
        </div>
    );
}

export default GroupForm;
